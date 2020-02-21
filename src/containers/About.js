import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Hp, Wp, isIphoneX, isIos } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
import Collapsible from 'react-native-collapsible';
import { termsAndConditions, privacyPolicy } from '../lib/legal';
import FastImage from 'react-native-fast-image';

class About extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    };

    state = {
        termsAndConditionsCollapsed: true,
        privacyPolicyCollapsed: true
    }
    
    renderTermsAndConditions() {
        const {termsAndConditionsCollapsed} = this.state;
        return (
            <View style={styles.settingOptionContainer}>
                <TouchableOpacity activeOpacity={1} onPress={()=> this.setState({termsAndConditionsCollapsed: !termsAndConditionsCollapsed})} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.title, {flex: 1}]}>Terms & Conditions</Text>
                    {termsAndConditionsCollapsed ?
                    <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-down.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>
                    : <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-up.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>}
                </TouchableOpacity>
                <Collapsible collapsed={termsAndConditionsCollapsed}>
                    {termsAndConditions}
                </Collapsible>
            </View>
        )
    };

    renderPrivacyPolicy() {
        const {privacyPolicyCollapsed} = this.state;
        return (
            <View style={styles.settingOptionContainer}>
                <TouchableOpacity activeOpacity={1} onPress={()=> this.setState({privacyPolicyCollapsed: !privacyPolicyCollapsed})} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.title, {flex: 1}]}>Privacy Policy</Text>
                    {privacyPolicyCollapsed ?
                    <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-down.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>
                    : <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-up.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>}
                </TouchableOpacity>
                <Collapsible collapsed={privacyPolicyCollapsed}>
                    {privacyPolicy}
                </Collapsible>
            </View>
        )
    };

   render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> Navigation.pop(this.props.componentId)}
                                      activeOpacity={0.8} 
                                      style={styles.backButtonContainer}>
                        <FastImage source={require('../assets/icons/left-arrow-black.png')}
                                   style={{ width: Wp(0.07), height: Wp(0.07) }}
                                   resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerText}>About</Text>
                    </View>
                    <View style={{ width: Wp(0.15) }} />
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewAbout}>
                    {this.renderTermsAndConditions()}
                    {this.renderPrivacyPolicy()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: isIphoneX() ? 30 : isIos() ? 15 : null
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Hp(0.08),
        backgroundColor: 'white',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2.62,
        // elevation: 4
    },
    titleContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: Hp(0.025),
        paddingBottom: Hp(0.01)
    },
    headerText: {
        textAlign: 'center',
        fontFamily: font.medium,
        fontSize: Hp(0.04),
        lineHeight: Hp(0.045)
    },
    contextualMenuContainer: {
        width: Wp(0.15),
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row'
    },
    backButtonContainer: {
        width: Wp(0.15),
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row'
    },
    settingOptionContainer: {
        borderRadius: Hp(0.004),
        padding: Hp(0.02),
        paddingTop: Hp(0.016),
        paddingBottom: Hp(0.014),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: Hp(0.014)
    },
    title: {
        fontSize: Hp(0.03),
        fontFamily: font.medium,
        lineHeight: Hp(0.04),
    },
    scrollViewAbout: {
        paddingTop: Hp(0.016),
        padding: Hp(0.02),
    },
})

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(About)
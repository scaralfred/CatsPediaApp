import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Hp, Wp } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
import { CheckCircle } from '../component/UI/CheckCircle';
import FastImage from 'react-native-fast-image';

class LayoutOptionsModal extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    };

   render() {

        const {mainLayout, favorites, favoritesLayout, theme} = this.props;

        return (
            <TouchableOpacity onPress={()=> Navigation.dismissOverlay(this.props.componentId)}
                              activeOpacity={1} 
                              style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.boxContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=> Navigation.dismissOverlay(this.props.componentId)} style={styles.closeButtonContainer}>
                            <FastImage source={require('../assets/icons/close-black-2.png')} style={styles.closeButton} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{favorites ? 'Favorites' : 'Main'} layout</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity activeOpacity={0.8} 
                                          onPress={()=> {
                                                favorites ? this.props.actions.changeFavoritesLayout('1') 
                                                : this.props.actions.changeMainLayout('1')
                                          }} style={styles.layoutImageContainer}>
                            <FastImage resizeMode={'contain'} source={require('../assets/images/layout-1.jpg')} style={styles.layoutImage} />
                            <View style={styles.checkerContainer}>
                                <CheckCircle color={theme.primaryColor} checked={favorites ? favoritesLayout == '1' : mainLayout == '1'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} 
                                          onPress={()=> {
                                                favorites ? this.props.actions.changeFavoritesLayout('2') 
                                                : this.props.actions.changeMainLayout('2')
                                          }} style={styles.layoutImageContainer}>
                            <FastImage resizeMode={'contain'} source={require('../assets/images/layout-2.jpg')} style={styles.layoutImage} />
                            <View style={styles.checkerContainer}>
                                <CheckCircle color={theme.primaryColor}  checked={favorites ? favoritesLayout == '2' : mainLayout == '2'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} 
                                          onPress={()=> {
                                                favorites ? this.props.actions.changeFavoritesLayout('3') 
                                                : this.props.actions.changeMainLayout('3')
                                          }} style={styles.layoutImageContainer}>
                            <FastImage resizeMode={'contain'} source={require('../assets/images/layout-3.jpg')} style={styles.layoutImage} />
                            <View style={styles.checkerContainer}>
                                <CheckCircle color={theme.primaryColor}  checked={favorites ? favoritesLayout == '3' : mainLayout == '3'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} 
                                          onPress={()=> {
                                                favorites ? this.props.actions.changeFavoritesLayout('4') 
                                                : this.props.actions.changeMainLayout('4')
                                          }} style={styles.layoutImageContainer}>
                            <FastImage resizeMode={'contain'} source={require('../assets/images/layout-4.jpg')} style={styles.layoutImage} />
                            <View style={styles.checkerContainer}>
                                <CheckCircle color={theme.primaryColor}  checked={favorites ? favoritesLayout == '4' : mainLayout == '4'} />
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end',
    },
    boxContainer: {
        paddingTop: Hp(0.005),
        backgroundColor: '#fff',
        borderTopLeftRadius: Hp(0.01),
        borderTopRightRadius: Hp(0.01)
    },
    header: {
        height: Hp(0.07),
        alignItems: 'center',
        justifyContent: 'center'
    },
    layoutImageContainer: {
        alignItems: 'center',
        width: Wp(0.4),
        height: Hp(0.319),
        paddingTop: Hp(0.012),
        marginBottom: -Hp(0.015),
    },
    layoutImage: {
        width: '100%',
        height: Hp(0.22),
    },
    headerText: {
        textAlign: 'center',
        fontFamily: font.medium,
        fontSize: Hp(0.04)
    },
    checkerContainer: {
        paddingTop: Hp(0.013)
    },
    closeButtonContainer: {
        padding: Hp(0.02),
        marginTop: -Hp(0.012),
        marginRight: -Hp(0.015),
        position: 'absolute',
        top: Hp(0.015),
        right: Hp(0.015),
    },
    closeButton: {
        width: Hp(0.025),
        height: Hp(0.025)
    }
})

const mapStateToProps = state => ({
    theme: state.global.theme,
    mainLayout: state.global.settings.mainLayout,
    favoritesLayout: state.global.settings.favoritesLayout
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LayoutOptionsModal)
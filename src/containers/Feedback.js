import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Hp, Wp, isIphoneX, isIos } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
// var Mailer = require('NativeModules').RNMail;
import Mailer from 'react-native-mail';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import FeaIcon from 'react-native-vector-icons/Feather'; 

class Feedback extends Component {

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
        nameField: '',
        contentField: ''
    }

    _emailSender() {
        const {nameField, contentField} = this.state;

        this.setState({nameField: nameField.trim(), contentField: contentField.trim()})

        Mailer.mail({
            subject: `Help request from user - ${nameField.trim()}`,
            recipients: [Config.APP_SUPPORT_EMAIL],
            body: contentField.trim(),
            isHTML: true
        }, (error, event) => {
            Alert.alert(
                'Something went wrong',
                `If the problem persist, plase send an email directly to ${Config.APP_SUPPORT_EMAIL}`,
                [
                    { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
                    { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
                ],
                { cancelable: true }
            )
        });
    }

    renderHelloSection() {
        return (
            <View style={{minHeight: Hp(0.28), flexDirection: 'row', paddingTop: Hp(0.01), paddingBottom: Hp(0.02)}}>
                <View style={{ paddingRight: Wp(0.1), paddingLeft: Wp(0.08), justifyContent: 'center', alignItems: 'center'}}>
                    <FastImage resizeMode={'contain'} source={require('../assets/icons/feedback.png')} style={styles.feedbackIcon}/>
                    <FastImage resizeMode={'contain'} source={require('../assets/appIcon/AppLogo.png')} style={styles.appIcon}/>
                </View>
                <View style={{flex: 1, padding: Hp(0.03), paddingLeft: 0, justifyContent: 'center', alignItems:'center'}}>
                    <View>
                        <Text style={[styles.greetingText, {paddingBottom: Hp(0.01)}]}>Hello!</Text>
                        <Text style={[styles.descriptionText]}>We would love to hear your thoughts and suggestions about {Config.APP_NAME} app. Please leave us a message.</Text>
                    </View>
                </View>
            </View>
        )
    };

    renderEmailSection() {
        const {nameField, contentField} = this.state;
        
        return (
            <View style={{ padding: Hp(0.04), paddingTop: Hp(0.02), paddingHorizontal: Wp(0.08)}}>
                <View style={{marginBottom: Hp(0.05)}}>
                    <Text style={styles.fieldLabel}>Name</Text>
                    <TextInput placeholder={'Your name here'}
                               style={[styles.nameFieldInput, {borderColor: this.props.theme.primaryColor}]}
                               onChangeText={text => this.setState({nameField: text})}
                               value={nameField}
                               ref={(input) => { this.searchInputName = input; }}
                               onBlur={()=> this.setState({nameField: nameField.trim()})}
                            />
                </View>
                <View style={{marginBottom: Hp(0.05)}}>
                    <Text style={[styles.fieldLabel]}>Message</Text>
                    <TextInput placeholder={'Your message here'}
                               style={[styles.contentFieldInput, {borderColor: this.props.theme.primaryColor}]}
                               onChangeText={text => this.setState({contentField: text})}
                               value={contentField}
                               multiline
                               onBlur={()=> this.setState({contentField: contentField.trim()})}
                            />
                </View>
            </View>
        )
    }

   render() {
        const {nameField, contentField} = this.state;

        const sendButtonDisabled = nameField.trim() === "" || contentField.trim() === "" ? true : false;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> Navigation.pop(this.props.componentId)}
                                      activeOpacity={0.8} 
                                      style={styles.backButtonContainer}>
                        <FastImage source={require('../assets/icons/left-arrow-black.png')}
                            style={{ width: Wp(0.07), height: Wp(0.07) }}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerText}>Feedback</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> this.searchInputName.focus()} style={styles.contextualMenuContainer}>
                        <FeaIcon name="user" size={Hp(0.04)} color={this.props.theme.primaryColor} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled style={{ }}>
                        {this.renderHelloSection()}
                        {this.renderEmailSection()}
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={{ flexDirection: 'row', padding: Wp(0.08), paddingTop: Wp(0.03)}}>
                        <TouchableOpacity activeOpacity={0.8} 
                                          onPress={()=> this._emailSender()} 
                                          disabled={sendButtonDisabled}
                                          style={[styles.button, {backgroundColor: sendButtonDisabled ? "rgba(0,0,0,0.3)" : this.props.theme.primaryColor}]}>
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: isIphoneX() ? 25 : isIos() ? 15 : null
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
    appIcon: {
        width: Wp(0.16),
        height: Wp(0.16),
        borderRadius: Hp(0.004)
    },
    feedbackIcon: {
        width: Wp(0.21),
        height: Wp(0.21),
        marginRight: -Wp(0.06),
        marginBottom: Hp(0.008)
    },
    greetingText: {
        fontFamily: font.bold,
        fontSize: Hp(0.036),
        lineHeight: Hp(0.045)
    },
    descriptionText: {
        fontFamily: font.medium,
        fontSize: Hp(0.028),
        lineHeight: Hp(0.035),
        color: '#303030'
    },
    fieldLabel: {
        fontFamily: font.medium,
        fontSize: Hp(0.025),
        lineHeight: Hp(0.028)
    },
    nameFieldInput: {
        fontFamily: font.regular,
        fontSize: Hp(0.022),
        borderBottomWidth: Hp(0.003),
        height: Hp(0.06),
        paddingLeft: Hp(0.008)
        
    },
    contentFieldInput: {
        fontFamily: font.regular,
        fontSize: Hp(0.022),
        borderWidth: Hp(0.003),
        marginTop: Hp(0.025),
        paddingHorizontal: Hp(0.013),
        borderRadius: Hp(0.005),
        height: Hp(0.15),
        textAlignVertical: 'top'
    },
    button: {
        borderRadius: Hp(0.004), 
        backgroundColor: '#000', 
        height: Hp(0.07), 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: font.medium,
        fontSize: Hp(0.035),
        color: '#fff'
    },
})

const mapStateToProps = state => ({
    theme: state.global.theme
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
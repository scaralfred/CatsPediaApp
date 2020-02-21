import FastImage from 'react-native-fast-image';
import React, { Component } from 'react'
import {
    Animated,
    Easing,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import { font } from '../../styles/variables';
import { Hp } from '../../lib/util';
import { Navigation } from 'react-native-navigation';

export default class CentralTab extends Component {

    state = {
        showButtons: false,
        cameraButtonOpacityValue: new Animated.Value(0),
        folderButtonOpacityValue: new Animated.Value(0),
        historyButtonOpacityValue: new Animated.Value(0),
        cameraButtonYvalue: new Animated.Value(0),
        folderButtonXvalue: new Animated.Value(0),
        folderButtonYvalue: new Animated.Value(0),
        historyButtonXvalue: new Animated.Value(0),
        historyButtonYvalue: new Animated.Value(0),
        easing: Easing.linear(),
        duration: 150
    }

    showButtons = () => {
        this.setState({showButtons: true})
        this.showCameraButton();
        this.showFolderButton();
        this.showHistoryButton();
    }

    hideButtons = () => {
        this.setState({showButtons: false})
        this.hideCameraButton();
        this.hideFolderButton();
        this.hideHistoryButton();
    }

    showCameraButton = () => {
        const { cameraButtonYvalue, cameraButtonOpacityValue, easing, duration } = this.state;
        Animated.timing( cameraButtonOpacityValue, { toValue: 1, delay: 150, easing, duration: 200 } ).start();
        Animated.timing( cameraButtonYvalue, { toValue: -78, easing, duration: 200 } ).start();
    }

    hideCameraButton = () => {
        const { cameraButtonYvalue, cameraButtonOpacityValue, easing, duration } = this.state;
        Animated.timing( cameraButtonOpacityValue, { toValue: 0, easing, duration: 80 } ).start();
        Animated.timing( cameraButtonYvalue, { toValue: 0, easing, duration } ).start();
    }

    showFolderButton = () => {
        const { folderButtonXvalue, folderButtonYvalue, folderButtonOpacityValue, easing, duration } = this.state;
        Animated.timing( folderButtonOpacityValue, { toValue: 1, delay: 100, easing, duration: 150 } ).start();
        Animated.timing( folderButtonXvalue, { toValue: -60, easing, duration } ).start();
        Animated.timing( folderButtonYvalue, { toValue: -40, easing, duration } ).start();
    }

    hideFolderButton = () => {
        const { folderButtonXvalue, folderButtonYvalue, folderButtonOpacityValue, easing, duration } = this.state;
        Animated.timing( folderButtonOpacityValue, { toValue: 0, easing, duration: 80 } ).start();
        Animated.timing( folderButtonXvalue, { toValue: 0, easing, duration } ).start();
        Animated.timing( folderButtonYvalue, { toValue: 0, easing, duration } ).start();
    }

    showHistoryButton = () => {
        const { historyButtonXvalue, historyButtonYvalue, historyButtonOpacityValue, easing, duration } = this.state;
        Animated.timing( historyButtonOpacityValue, { toValue: 1, delay: 200, easing, duration: 250 } ).start();
        Animated.timing( historyButtonXvalue, { toValue: 60, easing, duration: 250 } ).start();
        Animated.timing( historyButtonYvalue, { toValue: -40, easing, duration: 250 } ).start();
    }

    hideHistoryButton = () => {
        const { historyButtonXvalue, historyButtonYvalue, historyButtonOpacityValue, easing, duration } = this.state;
        Animated.timing( historyButtonOpacityValue, { toValue: 0, easing, duration: 80 } ).start();
        Animated.timing( historyButtonXvalue, { toValue: 0, easing, duration } ).start();
        Animated.timing( historyButtonYvalue, { toValue: 0, easing, duration } ).start();
    }

    renderCameraButton() {
        const { cameraButtonYvalue, cameraButtonOpacityValue } = this.state;
        return (
            <TouchableWithoutFeedback onPress={()=> {
                this.props.onCameraPressed();
                this.hideButtons();
                }}>
                <Animated.View style={[styles.floatingButton,
                    {
                        backgroundColor: '#D64040',
                        width: Hp(0.065), 
                        height: Hp(0.065),
                        opacity: cameraButtonOpacityValue,
                        transform: ([{translateY: cameraButtonYvalue}]),
                    }
                ]}>
                <FastImage style={{width: Hp(0.035), height: Hp(0.035)}} 
                        resizeMode='contain'
                        source={require('../../assets/icons/Navigation/camera-white.png')} />
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }

    renderFolderButton() {
        const { folderButtonXvalue, folderButtonYvalue, folderButtonOpacityValue } = this.state;
        return (
            <TouchableWithoutFeedback onPress={()=> {
                this.props.onFolderPressed();
                this.hideButtons();
                }}>
                <Animated.View style={[styles.floatingButton,
                    {
                        backgroundColor: '#004063',
                        opacity: folderButtonOpacityValue,
                        transform: ([{translateY: folderButtonYvalue}, {translateX: folderButtonXvalue}]),
                    }
                ]}>
                <FastImage style={styles.floatingIcon} 
                        resizeMode='contain'
                        source={require('../../assets/icons/Navigation/folder-white.png')} />
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }

    renderHistoryButton() {
        const { historyButtonXvalue, historyButtonYvalue, historyButtonOpacityValue } = this.state;
        return (
            <TouchableWithoutFeedback onPress={()=> {
                this.props.onHistoryPressed();
                this.hideButtons();
                }}>
                <Animated.View style={[styles.floatingButton,
                    {
                        backgroundColor: '#F79C3B',
                        opacity: historyButtonOpacityValue,
                        transform: ([{translateY: historyButtonYvalue}, {translateX: historyButtonXvalue}]),
                    }
                ]}>
                    <FastImage style={styles.floatingIcon} 
                               resizeMode='contain'
                               source={require('../../assets/icons/Navigation/history-white.png')} />
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }


    render() {

        const {showButtons } = this.state;
        const {tabColor} = this.props;

        return (
            <View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: -Hp(0.0315)}}>
                    <FastImage style={{ marginTop: Hp(0.017), height: Hp(0.11), width: Hp(0.12)}} 
                               source={require('../../assets/icons/Navigation/Scanner-2.png')} />
                    <TouchableOpacity activeOpacity={0.9}  
                                       onPress={() => Navigation.push(this.props.componentId, {component: {name: 'CameraScreen'}})/*!showButtons ? this.showButtons() : this.hideButtons()*/}
                                       style={[styles.cameraButton, {borderColor: tabColor}]}>
                        <FastImage style={{ marginTop: Hp(0.003), height: Hp(0.062), width: Hp(0.062)}} 
                                   source={require('../../assets/appIcon/AppLogo.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#fff', marginTop: -Hp(0.008), height: Hp(0.013), flexDirection: 'row'}}/>
                {/* {this.renderCameraButton()}
                {this.renderFolderButton()}
                {this.renderHistoryButton()} */}
            </View>
        )
    }
 };

 var styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        alignSelf: 'center',
        height: Hp(0.055), 
        width: Hp(0.055), 
        borderRadius: Hp(0.055),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196f3',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        },
        floatingIcon: {
            width: Hp(0.025),
            height: Hp(0.025)
        },
        cameraButton: {
            position: 'absolute',
            borderWidth: Hp(0.0035),
            bottom: Hp(0.027), 
            height: Hp(0.088), 
            width: Hp(0.088), 
            borderRadius: Hp(0.09),  
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 3,
        }
});
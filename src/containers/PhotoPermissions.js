import React, { Component, Fragment } from 'react';
import { View,  StyleSheet, Button, ScrollView, Text, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { Wp, Hp, formatHeight, formatWeight, isIphoneX, isIos } from '../lib/util';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import { font } from '../styles/variables';
import FeaIcon from 'react-native-vector-icons/Feather';
import { requestCameraPermission, checkCameraPermission, checkStoragePermission, requestStoragePermission } from '../lib/permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'


class PhotoPermissions extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    };
    
    renderButtons() {
        const { mainColor, 
                removeGetFromStoragePressed, 
                storagePermission, 
                storagePermissionGranted, 
                storagePermissionBlocked, 
                cameraPermission, 
                cameraPermissionGranted, 
                cameraPermissionBlocked,
                getFromStorage
            } = this.props;
        
        return (
            <Fragment>
                <View style={{ flexDirection: 'row', margin: Wp(0.05), marginBottom: Hp(0.028) }}>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> {
                                        checkCameraPermission()
                                        .then(res => {
                                            if (res == 'granted') {
                                                cameraPermissionGranted();
                                                removeGetFromStoragePressed();
                                            } else {
                                                if (cameraPermission == 'blocked') {
                                                    isIos() ? Linking.openURL('app-settings:')
                                                    : AndroidOpenSettings.appDetailsSettings();
                                                } else {
                                                    requestCameraPermission()
                                                    .then(res => {
                                                        if (res == 'granted') {
                                                            cameraPermissionGranted();
                                                            removeGetFromStoragePressed();
                                                        };
                                                        if (res == 'blocked') return cameraPermissionBlocked();
                                                    })
                                                }
                                            }
                                        });
                                      }} 
                                      style={[styles.button, {backgroundColor: mainColor}]}>
                        <FeaIcon name="camera" size={Hp(0.038)} color="#fff" />
                        <Text style={[styles.buttonText, {paddingRight: Wp(0.02), paddingLeft: Wp(0.04), paddingTop: Hp(0.005)}]}>
                            {`${cameraPermission == 'granted' ? 'Use Camera' : 'Enable Camera Access'}`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: Wp(0.05), marginBottom: Hp(0.02) }}>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> {
                                        checkStoragePermission()
                                        .then(res => {
                                            if (res == 'granted') {
                                                storagePermissionGranted();
                                                getFromStorage();
                                                removeGetFromStoragePressed();
                                            } else {
                                                if (storagePermission == 'blocked') {
                                                    isIos() ? Linking.openURL('app-settings:')
                                                    : AndroidOpenSettings.appDetailsSettings();
                                                } else {
                                                    requestStoragePermission()
                                                    .then(res => {
                                                        if (res == 'granted') {
                                                            storagePermissionGranted();
                                                            getFromStorage();
                                                            removeGetFromStoragePressed();
                                                        }
                                                        if (res == 'blocked') {
                                                            storagePermissionBlocked();
                                                        } 
                                                    })
                                                }
                                            }
                                        });
                                      }} 
                                      style={[styles.emptyButton, {backgroundColor: mainColor}]}>
                        {storagePermission != 'granted' ?
                            <FeaIcon name="folder-plus" size={Hp(0.038)} color={'#fff'} />
                            : <View style={[styles.folderContainer]}>
                                    <FastImage resizeMode={'cover'} 
                                            style={{ width: Hp(0.032), height: Hp(0.032), borderRadius: Hp(0.001) }} 
                                            source={require('../assets/images/dog.jpg')} 
                                    />
                              </View>
                        }
                        <Text style={[styles.buttonText, {paddingRight: Wp(0.02), paddingLeft: Wp(0.04), paddingTop: Hp(0.005)}]}>
                            {`${storagePermission == 'granted' ? 'Get From Storage' : 'Enable Storage Access'}`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: Hp(0.045)}}>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> Navigation.pop(this.props.componentId)} 
                                      style={styles.askMeLaterButton}>
                        <Text style={[styles.descriptionText, {color: '#808080'}]}>Ask Me Later</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>
        )
    }

   render() { 
        const { mainColor, cameraPermission, storagePermission } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ width: Wp(0.15) }} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerText}>Breed Identifier</Text>
                    </View>
                    <TouchableOpacity onPress={()=> Navigation.pop(this.props.componentId)}
                                      activeOpacity={0.8} 
                                      style={styles.closeButtonContainer}>
                        <FastImage source={require('../assets/icons/close-black-2.png')}
                                   style={{ width: Wp(0.06), height: Wp(0.06) }}
                                   resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.mainContent}>
                        {(cameraPermission != 'granted' && storagePermission == 'granted')
                          && <View style={[styles.cameraIconContainer, {backgroundColor: mainColor}]}>
                                <FeaIcon name="camera" size={Hp(0.1)} color="#fff" />
                             </View>
                        }
                        {(storagePermission != 'granted' && cameraPermission == 'granted')
                          && <View style={[styles.cameraIconContainer, {backgroundColor: mainColor}]}>
                                <FeaIcon name="folder-plus" size={Hp(0.1)} color="#fff" />
                             </View>
                        }
                        {(storagePermission != 'granted' && cameraPermission != 'granted')
                          && <View style={{flexDirection: 'row', width: Wp(0.8), justifyContent: 'space-evenly'}}>
                                <View style={[styles.cameraIconContainer, {backgroundColor: mainColor}]}>
                                    <FeaIcon name="camera" size={Hp(0.1)} color="#fff" />
                                </View>
                                <View style={[styles.cameraIconContainer, {backgroundColor: mainColor}]}>
                                    <FeaIcon name="folder-plus" size={Hp(0.1)} color="#fff" />
                                </View>
                             </View>
                        }
                    <View style={{marginTop: Hp(0.04)}}>
                        
                        {(cameraPermission != 'granted' && storagePermission == 'granted')
                          && <Text style={[styles.descriptionText, {fontFamily: font.medium, fontSize: Hp(0.033)}]}>Enable Camera</Text>}
                        {(storagePermission != 'granted' && cameraPermission == 'granted')
                          && <Text style={[styles.descriptionText, {fontFamily: font.medium, fontSize: Hp(0.033)}]}>Enable Storage</Text>}
                        {(storagePermission != 'granted' && cameraPermission != 'granted')
                          && <Text style={[styles.descriptionText, {fontFamily: font.medium, fontSize: Hp(0.033)}]}>Enable Camera or Storage</Text>}

                        {(cameraPermission != 'granted' && storagePermission == 'granted')
                          && <Text style={[styles.descriptionText, {paddingTop: Hp(0.01)}]}>We need your permission to access your phone’s camera and let you take pictures.</Text>}
                        {(storagePermission != 'granted' && cameraPermission == 'granted')
                          && <Text style={[styles.descriptionText, {paddingTop: Hp(0.01)}]}>We need your permission to access your storage and let you get pictures.</Text>}
                        {(storagePermission != 'granted' && cameraPermission != 'granted')
                          && <Text style={[styles.descriptionText, {paddingTop: Hp(0.01)}]}>We need your permission to access your phone’s camera or storage and let you take or get pictures.</Text>}

                        {(cameraPermission == 'blocked' && storagePermission != 'blocked')
                          && <Text style={[styles.descriptionText, {paddingTop: Hp(0.01)}]}>But you have to set the camera permission manually, through your phone settings.</Text>}
                        {(cameraPermission != 'blocked' && storagePermission == 'blocked')
                          && <Text style={[styles.descriptionText, {paddingTop: Hp(0.01)}]}>But you have to set the storage permission manually, through your phone settings.</Text>}
                        {(cameraPermission == 'blocked' && storagePermission == 'blocked')
                          && <Text style={[styles.descriptionText, {paddingTop: Hp(0.01)}]}>But you have to set them manually, through your phone settings.</Text>}

                    </View>
                </ScrollView>
                {this.renderButtons()}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: isIphoneX() ? 25 : isIos() ? 15 : null
    },
    header: {
        // paddingTop: isIphoneX() ? 35 : isIos() ? 15 : null,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Hp(0.08)
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
    closeButtonContainer: {
        width: Wp(0.15),
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row'
    },
    mainContent: {
        marginHorizontal: Wp(0.08),
        paddingTop: Hp(0.13),
        alignItems: 'center'
    },
    cameraIconContainer: {
        height: Hp(0.14),
        width: Hp(0.15),
        borderRadius: Hp(0.008),
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionText: {
        fontFamily: font.regular,
        fontSize: Hp(0.025),
        color: '#000',
        textAlign: 'center'
    },
    button: {
        borderRadius: Hp(0.004), 
        backgroundColor: '#000', 
        height: Hp(0.07), 
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    emptyButton: {
        borderRadius: Hp(0.004), 
        height: Hp(0.07), 
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    folderContainer: {
        borderColor: '#fff',
        borderWidth: Hp(0.004),
        height: Hp(0.04),
        width: Hp(0.04),
        borderRadius: Hp(0.004)
      },
    askMeLaterButton:{
        padding: Wp(0.08), 
        paddingVertical: Hp(0.01)
    },
    buttonText: {
        fontFamily: font.medium,
        fontSize: Hp(0.032),
        color: '#fff'
    }
});

export default PhotoPermissions;
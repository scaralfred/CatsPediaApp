import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View,  Text, StyleSheet, Image, TouchableOpacity, Share, Linking } from 'react-native';
import { Hp, Wp, isIos } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeaIcon from 'react-native-vector-icons/Feather';

class SideMenu extends Component {

    static options(passProps) {
        return {
            statusBar: {
                visible: true,
                backgroundColor: '#000',
                style: 'light'
              },
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    }

    goToOption = (optionName) => {
        const currentTabId = () => {
            if (this.props.selectedTab == 0) return "AllBreeds"
            if (this.props.selectedTab == 1) return "Scanner"
            if (this.props.selectedTab == 2) return "Favorites"
        } 

        Navigation.push(currentTabId(), {
            component: {
                name: optionName,
                options: {
                    sideMenu: {
                        left: {
                            visible: false
                        }
                    },
                    bottomTabs: {
                        visible: false,
                        drawBehind: true
                    }
                }
            }
        })
    };

    _onShare() {

        Share.share({
            message: `Download ${Config.APP_NAME} app by clicking one of these links:\n- iOS: ${`https://apps.apple.com/app/id${Config.APPLE_ID}`}\n- ANDROID: ${`https://play.google.com/store/apps/details?id=${Config.MY_APPLICATION_ID}`}`,
            // title: 'Best title ever!',
            // url: 'http://codingmiles.com'  // only IOS
            }, {
                dialogTitle: 'Share with',
                trackColor: 'orange'
            })
            .then(null)
            .catch(err => console.log(err))
    };

    _onLikeUs(){
        const link = isIos() ? `https://apps.apple.com/app/id${Config.APPLE_ID}` : `https://play.google.com/store/apps/details?id=${Config.MY_APPLICATION_ID}`;
        Linking.openURL(link);
    }

   render() {

    const  { sideMenuBackgroundColor, iconMainColor } = this.props.theme;

        return (
            <View style={styles.container}>
                <View style={[styles.logoSectionContainer, {backgroundColor: /* sideMenuBackgroundColor */ '#fff'}]}>
                    <View style={styles.logoTextContainer}>
                        <View>
                            <FastImage source={require('../assets/appIcon/AppLogo.png')}
                                       style={styles.appLogo}
                                       resizeMode={'contain'}
                            />
                        </View>
                        <View style={{paddingHorizontal: Wp(0.01), justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            {/* <Text style={[styles.logoText, {color: this.props.theme.sideMenuBackgroundColor}]}>{Config.APP_NAME}</Text> */}
                            <FastImage source={require('../assets/appIcon/LogoText.png')}
                                       style={styles.appLogoText}
                                       resizeMode={'contain'}
                            />
                            <Text style={styles.appVersionText}>{DeviceInfo.getVersion()}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.logoDivider, {backgroundColor: this.props.theme.sideMenuBackgroundColor}]}/>
                <View style={styles.menuOptionsContainer}>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.goToOption('Settings')} 
                                      style={styles.optionContainer}>
                        <FeaIcon name="settings" style={styles.iconShadow} size={Hp(0.035)} color={sideMenuBackgroundColor} />
                        {/* <FastImage source={require('../assets/icons/settings-empty-black.png')}
                                   style={styles.optionIcon}
                                   resizeMode={'contain'}
                        /> */}
                        <Text style={styles.menuOptionText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.goToOption('ScanHistory')} 
                                      style={styles.optionContainer}>
                        <MCIcon name="history" size={Hp(0.04)} style={[styles.iconShadow, {marginLeft: -Hp(0.003), marginRight: -Hp(0.002)}]} color={sideMenuBackgroundColor} />
                        {/* <FastImage source={require('../assets/icons/info-empty-black.png')}
                                   style={styles.optionIcon}
                                   resizeMode={'contain'}
                        /> */}
                        <Text style={styles.menuOptionText}>Identifier history</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.goToOption('Feedback')} 
                                      style={styles.optionContainer}>
                        <FeaIcon name="edit-3" style={styles.iconShadow} size={Hp(0.035)} color={sideMenuBackgroundColor} />
                        {/* <FastImage source={require('../assets/icons/feedback-empty-black.png')}
                                  style={styles.optionIcon}
                                  resizeMode={'contain'}
                        /> */}
                        <Text style={styles.menuOptionText}>Feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.goToOption('About')} 
                                      style={styles.optionContainer}>
                        <FeaIcon name="info" style={styles.iconShadow} size={Hp(0.035)} color={sideMenuBackgroundColor} />
                        {/* <FastImage source={require('../assets/icons/info-empty-black.png')}
                                   style={styles.optionIcon}
                                   resizeMode={'contain'}
                        /> */}
                        <Text style={styles.menuOptionText}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this._onLikeUs()} 
                                      style={styles.optionContainer}>
                        <FeaIcon name="thumbs-up" style={styles.iconShadow} size={Hp(0.035)} color={sideMenuBackgroundColor} />
                        {/* <FastImage source={require('../assets/icons/like-empty-black.png')}
                                   style={styles.optionIcon}
                                   resizeMode={'contain'}
                        /> */}
                        <Text style={styles.menuOptionText}>Like us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this._onShare()} 
                                      style={styles.optionContainer}>
                        <FeaIcon name="share-2" style={styles.iconShadow} size={Hp(0.035)} color={sideMenuBackgroundColor} />
                        {/* <FastImage source={require('../assets/icons/share-empty-black.png')}
                                   style={styles.optionIcon}
                                   resizeMode={'contain'}
                        /> */}
                        <Text style={styles.menuOptionText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    logoSectionContainer: {
        flex: 0.28,
        justifyContent: 'center',
        paddingHorizontal: Wp(0.05)
    },
    logoTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuOptionsContainer: {
        flex: 0.7,
        backgroundColor: 'white',
        padding: Wp(0.06)
    },
    appLogo: {
        width: Wp(0.2),
        height: Wp(0.2),
        borderRadius: Hp(0.008)
    },
    appLogoText: {
        width: Wp(0.48),
        height: Wp(0.1),
        borderRadius: Hp(0.008)
    },
    logoText: {
        fontFamily: font.bold,
        fontSize: Wp(0.092),
        color: '#000',

    },
    appVersionText: {
        fontFamily: font.medium,
        color: '#000',
        lineHeight: Hp(0.025),
        fontSize: Hp(0.022),
        paddingLeft: Wp(0.03)
    },
    logoDivider: {
        flexDirection: 'row', 
        height: 2,
        marginBottom: Hp(0.02),
        marginHorizontal: Wp(0.04),
        borderRadius: Hp(0.1)
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: Hp(0.03)
    },
    optionIcon: {
        height: Hp(0.034),
        width: Hp(0.034)
    },
    menuOptionText: {
        paddingHorizontal: Wp(0.06),
        paddingTop: Wp(0.004),
        fontFamily: font.medium,
        fontSize: Hp(0.028)
    },
    iconShadow: {
        textShadowColor: '#C8C8C8',
        textShadowRadius: 1,
        textShadowOffset:{width: -0.8, height: -0.8}
    }
})

const mapStateToProps = state => ({
    selectedTab: state.global.tab,
    theme: state.global.theme
});

export default connect(mapStateToProps, null)(SideMenu)
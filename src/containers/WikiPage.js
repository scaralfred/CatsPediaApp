import React, { Component } from 'react';
import { View,  Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Hp, Wp, isIphoneX, isIos } from '../lib/util';
import { font } from '../styles/variables';
import FastImage from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation';
import WebView from 'react-native-webview';

class WikiPage extends Component {

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
        loadingError: false
    }

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
                        <Text style={styles.headerText}>{this.props.title}</Text>
                    </View>
                    <View style={{ width: Wp(0.15) }} />
                </View>
                <WebView style={{marginTop: -55}} 
                               onError={()=> this.setState({loadingError: true})}
                               onHttpError={()=> this.setState({loadingError: true})}
                               startInLoadingState={true}
                               renderLoading={() => (
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <ActivityIndicator size="large" color="#000" />
                                        </View>   
                               )}
                            //    renderError={() => (
                            //     <View style={{flex: 1, alignItems: 'center'}}>
                            //         <Text style={{fontFamily: font.medium, fontSize: Hp(0.02)}}>Error: please try again</Text>
                            //     </View>   
                            //    )}
                               source={{ uri: this.props.link }}/> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: isIphoneX() ? 25 : isIos() ? 15 : null
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Hp(0.08),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
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
    }
})

export default WikiPage;
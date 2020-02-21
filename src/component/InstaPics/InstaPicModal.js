import React, { Component } from 'react'
import { View, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { isIos, isIphoneX, Wp, Hp } from '../../lib/util';
import { font } from '../../styles/variables';
import Carousel from 'react-native-looped-carousel';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
    container : {
        backgroundColor: '#000',
        flex: 1
    },
    captionText: {
        color: '#fff',
        fontSize: Wp(0.044),
        textAlign: 'justify'
    },
    captionContainer: {
        paddingTop: Wp(0.042),
        paddingHorizontal: Wp(0.055)
    },
    header: {
        // paddingTop: isIphoneX() ? 35 : isIos() ? 15 : null,
        flexDirection: 'row',
        paddingBottom: Wp(0.018),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class InstaPicModal extends Component {

 render() {
     const { images, currentPage } = this.props;

     const Header = () => (
         <View style={styles.header}>
             <View style={{ flex: 1, alignItems: 'flex-end' }}>
                 <TouchableOpacity style={{ padding: Wp(0.084) }} onPress={() => Navigation.dismissModal(this.props.componentId)}>
                    <FastImage resizeMode={'contain'} 
                               style={{marginTop: isIphoneX() ? Hp(0.02) : 0, width: Wp(0.055), height: Wp(0.055) }} 
                               source={require('../../assets/icons/close-white.png')} 
                    />
                 </TouchableOpacity> 
             </View>
         </View>
     )
        return (
         <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <Header />
            <Carousel
                    delay={2000}
                    style={{ height: '80%', width: "100%" }}
                    autoplay={false}
                    currentPage={currentPage}
                >   
                    {images.map( el => {
                        return (
                            <View style={{
                                        alignItems: 'center', 
                                        justifyContent: 'center'}}>
                                        <FastImage  style={{ width, height }}
                                                    source={{ uri: el.img }}
                                                    resizeMode={'contain'}
                                        />
                                        {/* {el.caption ?
                                        <View style={styles.captionContainer}>
                                            <Text style={styles.captionText}>{el.caption.replace(/(\r\n|\n|\r)/gm," ") || 'caption'}</Text>
                                        </View>
                                        : null} */}
                                </View>
                        )
                    })}
            </Carousel>
            
         </View>
     )
 }
} 
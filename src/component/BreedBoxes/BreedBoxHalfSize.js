import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Keyboard, ScrollView, ActivityIndicator } from 'react-native';
import { Hp, Wp } from '../../lib/util';
import { font } from '../../styles/variables';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

class BreedBoxHalfSize extends Component {

    state = {
        loadingPicture: false,
        finalPicture: true
    }

    goToBreedDetails = () => {
        const { breed, isFavorite, heightUnitOfMeasure, weightUnitOfMeasure } = this.props;
        Keyboard.dismiss();
        Navigation.push(this.props.componentId,
            {
                component: {
                    name: 'BreedDetails',
                    options: {
                        bottomTabs: {
                            visible: false,
                            drawBehind: true
                        }
                    },
                    passProps: { breed, isFavorite, heightUnitOfMeasure, weightUnitOfMeasure }
                }
            })
    }

    render() {

        const { breed, isFavorite } = this.props;
        const { loadingPicture, finalPicture } = this.state;
        const placeholder = require('../../assets/images/placeholder.png');
        const breedPicture = breed.pictures && breed.pictures.length > 0 ? {uri : breed.pictures[0]} : require('../../assets/images/dog-placeholder.png');

        return (
            <TouchableOpacity activeOpacity={1}
                              onPress={this.goToBreedDetails}
                              style={styles.container}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.imageContainer}>
                        {loadingPicture ?
                        <View style={{ position: 'absolute',  justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                            <ActivityIndicator size={'small'} color='#000'/>
                        </View>
                        : null}
                        {finalPicture ?
                        <FastImage resizeMode={'cover'} 
                                   source={breedPicture} 
                                   style={styles.image} 
                                   onLoadStart={()=> {
                                    // setTimeout(() => {
                                    //     // alert(loadingPicture)
                                    //     loadingPicture ? this.setState({finalPicture: false, loadingPicture: false}) : null
                                    // }, 5000);
                                    this.setState({loadingPicture: true})
                                   }}
                                   onLoad={()=> {
                                    this.setState({finalPicture: true, loadingPicture: false})
                                   }}
                                   onLoadError={()=> {
                                    this.setState({finalPicture: false, loadingPicture: false})
                                   }}
                        /> :
                        <FastImage resizeMode={'cover'} 
                                   source={placeholder} 
                                   style={styles.image}
                        />}
                    </View>
                        <View style={styles.contentContainer}>
                            <Text numberOfLines={1} style={styles.nameText}>{breed.name}</Text>
                        </View>
                        <LinearGradient style={styles.fadeAwayEffect}
                                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.13)','rgba(0, 0, 0, 0.23)', 'rgba(0, 0, 0, 0.33)',  'rgba(0, 0, 0, 0.358)']}
                                        start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
                                        // pointerEvents={'none'}
                        />
                </View>
                {/* <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => {
                                    isFavorite ? this.props.removeFromFavorites(breed.id) : this.props.addToFavorites(breed.id);
                                  }}
                                  style={styles.favoriteIconContainer}>
                    {isFavorite ?
                        <Image source={require('../../assets/icons/heart-red.png')}
                            style={styles.favoriteIcon}
                        />
                        :  //null
                        <Image source={require('../../assets/icons/heart-empty-white.png')}
                            style={styles.unfavoriteIcon}
                        />
                        }
                </TouchableOpacity> */}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Hp(0.17),
        width: Wp(0.44),
        marginHorizontal: Wp(0.022),
        backgroundColor: '#fff',
        marginBottom: Hp(0.022),
        borderRadius: Hp(0.004),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2
    },
    imageContainer: {
        height: '100%'
    },
    fadeAwayEffect: {
        position:'absolute', 
        right: 0, 
        left: 0, 
        bottom: 0, 
        width: '100%', 
        height: Hp(0.04),
        borderBottomLeftRadius: Hp(0.004),
        borderBottomRightRadius: Hp(0.004)
    },
    contentContainer: {
        position:'absolute', 
        justifyContent: 'center',
        alignContent: 'center',
        right: 0, 
        left: 0, 
        bottom: 0, 
        width: '100%', 
        paddingBottom: Hp(0.0025),
        borderBottomLeftRadius: Hp(0.004),
        borderBottomRightRadius: Hp(0.004),
        zIndex: 20,
        paddingHorizontal: Hp(0.012)
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: Hp(0.004)
    },
    nameText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: font.bold,
        fontSize: Hp(0.0225),
        lineHeight: Hp(0.025),
        letterSpacing: 0.5
    },
    descriptionText: {
        fontFamily: font.regular,
        fontSize: Hp(0.015),
        letterSpacing: 0.5
    },
    favoriteIcon: {
        height: Hp(0.022),
        width: Hp(0.022)
    },
    unfavoriteIcon: {
        height: Hp(0.022),
        width: '100%'
    },
    favoriteIconContainer: {
        width: Hp(0.03),
        height: Hp(0.03),
        padding: Hp(0.004),
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0
    }
})

export default BreedBoxHalfSize;
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Keyboard } from 'react-native';
import { Hp, Wp, formatHeight, formatWeight, isIos } from '../../lib/util';
import { font } from '../../styles/variables';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';

class BreedBoxLargeTall extends Component {

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

        const { breed, isFavorite, heightUnitOfMeasure, weightUnitOfMeasure } = this.props;
        const { loadingPicture, finalPicture } = this.state;
        const placeholder = require('../../assets/images/placeholder.png');
        const breedPicture = breed.pictures && breed.pictures[0] && breed.pictures[0].replace("200px", "500px") ? {uri : breed.pictures[0].replace("200px", "500px")} : require('../../assets/images/dog-placeholder.png');
        const breedOrigin = breed.origin.replace('United Kingdom', '')
                                        .replace('(', '').replace(')', '')
                                        .replace('/', ', ')
                                        .replace(' - ', ', ')
                                        .replace('\n', '')
                                        .replace('Democratic Republic of the Congo', 'Congo')
                                        .replace('United States', 'U.S.A');

        return (
            <TouchableOpacity activeOpacity={1}
                              onPress={this.goToBreedDetails}
                              style={styles.container}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageContainer}>
                        {/* <FastImage resizeMode={'cover'} source={breedPicture} style={styles.image} /> */}
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
                </ScrollView>
                <View style={styles.contentContainer}>
                        <View style={{flex: 1 }}>
                            <View style={{ flexDirection: 'row', flex: 1,  paddingTop: Hp(0.002) }}>
                                    <View style={{flex: 1}}>
                                        <Text numberOfLines={1} style={[styles.nameText, {marginTop: -Hp(0.005), paddingRight: Wp(0.05), flex: 1}]}>{breed.name}</Text>
                                        <Text style={[ styles.descriptionText, {paddingBottom: Hp(0.002)}]}>{breed.breedGroup}</Text>
                                    </View>
                                    <View style={{}}>
                                        <Text numberOfLines={2} style={[styles.featureText, {maxWidth: Wp(0.2), textAlign: 'right'}]}>{breedOrigin}</Text>
                                    </View>
                            </View>
                        </View>
                        <View style={{flex: 0.7, borderTopWidth: Hp(0.0015), paddingVertical: Hp(0.008), borderTopColor: 'rgba(223, 223, 223, 1)', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: Wp(0.005) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FastImage resizeMode={'contain'} source={require('../../assets/icons/dog-2.png')}
                                                       style={[styles.featureIcon, {height: Hp(0.028), width:  Hp(0.028)}]} />
                                            <View style={{}}>
                                                <Text style={[styles.featureText, {paddingTop: Hp(0.009)}]}>{breed.heightRange && breed.heightRange.min ? formatHeight(heightUnitOfMeasure, breed.heightRange.min, breed.heightRange.max) : breed.heightRange}</Text>
                                            </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FastImage source={require('../../assets/icons/scale-8.png')}
                                                       style={[styles.featureIcon, {marginTop: Hp(0.002)}]} 
                                                       resizeMode={'contain'}
                                                       />
                                            <View style={{}}>
                                                <Text style={[styles.featureText, {paddingTop: Hp(0.009)}]}>{breed.weightRange && breed.weightRange.min ? formatWeight(weightUnitOfMeasure, breed.weightRange.min, breed.weightRange.max) : breed.weightRange}</Text>
                                            </View>
                                </View>
                                {breed.lifeSpan ? 
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FastImage source={require('../../assets/icons/lifespan-2.png')}
                                               style={[styles.featureIcon, {height: Hp(0.025), width: Hp(0.025), marginTop: Hp(0.0035)}]} 
                                               resizeMode={'contain'}
                                               />
                                    <View style={{}}>
                                        <Text style={[styles.featureText, {paddingTop: Hp(0.009)}]}>{breed.lifeSpan.replace('years', 'ys')}</Text>
                                    </View>
                                </View> : null}
                            </View>
                        </View>
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
                        : <Image source={require('../../assets/icons/heart-empty-white.png')}
                            style={styles.unfavoriteIcon}
                        />}
                </TouchableOpacity> */}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Hp(0.35),
        marginHorizontal: Wp(0.022),
        backgroundColor: '#fff',
        marginBottom: isIos() ? Hp(0.025) : Hp(0.02),
        borderRadius: Hp(0.004),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderRadius: Hp(0.004),
        position: 'absolute',
        bottom: -2,
        right: 0,
        left: 0,
        padding: Hp(0.018),
        paddingBottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    imageContainer :{
        borderRadius: Hp(0.004)
    },
    image: {
        height: Hp(0.35),
        borderRadius: Hp(0.004)
    },
    nameText: {
        fontFamily: font.bold,
        fontSize: Hp(0.025),
        letterSpacing: 0.5,
        lineHeight: Hp(0.030),
    },
    descriptionText: {
        fontFamily: font.regular,
        fontSize: Hp(0.018),
        lineHeight: Hp(0.03),
        letterSpacing: 0.5
    },
    featureText: {
        fontFamily: font.medium,
        fontSize: Hp(0.018),
        lineHeight: Hp(0.022),
        letterSpacing: 0.1
    },
    favoriteIcon: {
        height: Hp(0.035),
        width: '100%',
        marginTop: -Hp(0.001),
        marginLeft: -Hp(0.001)
    },
    unfavoriteIcon: {
        height: Hp(0.034),
        width: '100%'
    },
    favoriteIconContainer: {
        width: Hp(0.06),
        height: Hp(0.06),
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0
    },
    featureIcon: {
        height: Hp(0.024),
        width:  Hp(0.024),
        marginRight: Wp(0.015)
    }
})

export default BreedBoxLargeTall;
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Keyboard } from 'react-native';
import { Hp, Wp } from '../../lib/util';
import { font } from '../../styles/variables';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import { sizeCalculator } from '../../lib/dogSize';

class BreedBoxLarge extends Component {

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

        const {breed, isFavorite} = this.props;
        const { loadingPicture, finalPicture } = this.state;
        const placeholder = require('../../assets/images/placeholder.png');
        const breedPicture = breed.pictures && breed.pictures.length > 0 ? {uri : breed.pictures[0]} : require('../../assets/images/dog-placeholder.png');
        const breedOrigin = breed.origin.replace('United Kingdom', '')
                                        .replace('(', '').replace(')', '')
                                        .replace('/', ', ')
                                        .replace(' - ', ', ')
                                        .replace('\n', '')
                                        .replace('Democratic Republic of the Congo', 'Congo')
                                        .replace('United States', 'U.S.A');

        return (
            <TouchableOpacity activeOpacity={0.8} 
                              onPress={this.goToBreedDetails}
                              style={styles.container}
            >
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
                   <View style={{flex: 0.7 }}>
                        <View style={{flex: 1 , flexDirection: 'row'}}>
                                <View style={{flex: 1, justifyContent: 'center', paddingRight: Wp(0.03),  }}>
                                    <Text style={styles.nameText}>{breed.name}</Text>
                                    {/* <Text style={[styles.featureText, {fontFamily: font.regular}]}>{breed.origin}</Text> */}
                                </View>
                                <View style={{ maxWidth: '40%'}}>
                                    <View style={{ flexDirection:'row', alignItems: 'center'}}>
                                    <Text numberOfLines={3} style={[styles.featureText, {lineHeight: Hp(0.022), paddingTop: Hp(0.003), fontFamily: font.regular, textAlign: 'right'}]}>{breedOrigin}</Text>
                                        {/* <Image source={require('../../assets/icons/origin-color-2.png')}
                                               style={styles.breedFeatureIcon}
                                        /> */}
                                        
                                        {/* <Text style={styles.featureText}>{breed.lifeSpan.min.toString().length == 1 ? ' ' + breed.lifeSpan.min : breed.lifeSpan.min} - {breed.lifeSpan.max}</Text> */}
                                    </View>
                                </View>
                        </View>
                   </View>
                   <View style={{flex: 0.3, justifyContent: 'flex-end'}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <View style={{flex: 1,  flexDirection:'row', alignItems: 'center'}}>
                                {/* <Image source={require('../../assets/icons/origin-2.png')}
                                           style={[styles.breedFeatureIcon, {height: Hp(0.023), width: Hp(0.023)}]}
                                /> */}
                                <Text style={[styles.featureText, { paddingRight: Hp(0.008), paddingLeft: 0, fontFamily: font.medium}]}>{breed.breedGroup}</Text>
                            </View>
                            <View style={{ flexDirection:'row', alignItems: 'center'}}>
                                <View style={{position: 'absolute', bottom: 20, right: 0,}}>
                                    <FastImage source={sizeCalculator(breed).icon}
                                               resizeMode={'contain'}
                                               style={[
                                                        sizeCalculator(breed).size == 'Toy' ?
                                                        styles.breedFeatureIconToy :
                                                        sizeCalculator(breed).size == 'Small' ?
                                                        styles.breedFeatureIconSmall :
                                                        sizeCalculator(breed).size == 'Medium' ?
                                                        styles.breedFeatureIconMedium :
                                                        sizeCalculator(breed).size == 'Big' ?
                                                        styles.breedFeatureIconBig :
                                                        styles.breedFeatureIcon
                                                    ]}
                                    />
                                </View>
                                <Text style={styles.featureText}>{sizeCalculator(breed).size}</Text>
                            </View>
                        </View>
                   </View>
               </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: Hp(0.15),
        marginHorizontal: Wp(0.022),
        backgroundColor: '#fff',
        marginBottom: Hp(0.016),
        borderRadius: Hp(0.004),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    imageContainer: {
        width: '36%'
    },
    contentContainer: {
        width: '64%',
        paddingHorizontal: Hp(0.012),
        paddingVertical: Hp(0.006)
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: Hp(0.004), 
        borderBottomLeftRadius: Hp(0.004)
    },
    nameText: {
        // textAlign: 'center',
        fontFamily: font.bold,
        fontSize: Hp(0.024),
        lineHeight: Hp(0.035),
        letterSpacing: 0.5
    },
    descriptionText: {
        fontFamily: font.regular,
        fontSize: Hp(0.05),
        letterSpacing: 0.5
    },
    favoriteIconContainer: { 
        width: Hp(0.045),
        height: Hp(0.045),
        marginTop: -Hp(0.013),
        marginRight: -Hp(0.013),
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoriteIcon: {
        height: Hp(0.025),
        width: '100%',
    },
    unfavoriteIcon: {
        height: Hp(0.026),
        width: '100%'
    },
    breedFeatureRow: {
        flexDirection: 'row', 
        // justifyContent: 'space-evenly'
    },
    breedFeatureContainer: {
        flexDirection: 'row',
        flex: 1

    },
    breedFeatureIcon: {
        height: Hp(0.028),
        width: Hp(0.028),
        marginHorizontal: Hp(0.01)
    },
    breedFeatureIconToy: {
        height: Hp(0.028),
        width: Hp(0.028),
        marginHorizontal: Hp(0.01)
    },
    breedFeatureIconSmall: {
        height: Hp(0.032),
        width: Hp(0.032),
        marginHorizontal: Hp(0.01)
    },
    breedFeatureIconMedium: {
        height: Hp(0.035),
        width: Hp(0.035),
        marginHorizontal: Hp(0.01)
    },
    breedFeatureIconBig: {
        height: Hp(0.039),
        width: Hp(0.039),
        marginHorizontal: Hp(0.005)
    },
    featureText: {
        fontFamily: font.medium,
        fontSize: Hp(0.018),
        letterSpacing: 0.5,
        paddingHorizontal: Hp(0.008)
    }
})

export default BreedBoxLarge;
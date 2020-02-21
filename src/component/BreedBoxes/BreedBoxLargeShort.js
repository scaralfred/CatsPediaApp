import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Keyboard } from 'react-native';
import { Hp, Wp } from '../../lib/util';
import { font } from '../../styles/variables';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';

class BreedBoxLargeShort extends Component {

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

        return (
            <TouchableOpacity activeOpacity={0.8} 
                              onPress={this.goToBreedDetails}
                              style={styles.container}
            >
               <View style={styles.imageContainer}>
                    {/* <Image source={breedPicture} style={styles.image}/> */}
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
                        <FastImage  resizeMode={'cover'} 
                                    source={placeholder} 
                                    style={styles.image}
                        />
                    }
               </View>
               <View style={styles.contentContainer}>
                   <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nameText}>{breed.name}</Text>
                        </View>
                        {/* <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=> {
                                            isFavorite ? this.props.removeFromFavorites(breed.id) : this.props.addToFavorites(breed.id);
                                          }} 
                                          style={styles.favoriteIconContainer}>
                            {isFavorite ?
                            <Image source={require('../../assets/icons/heart-red-black.png')}
                                   style={styles.favoriteIcon}
                            /> 
                            : <Image source={require('../../assets/icons/heart-empty-black.png')}
                                   style={styles.unfavoriteIcon}
                            />}
                        </TouchableOpacity> */}
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
        height: Hp(0.08),
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
        elevation: 4
    },
    imageContainer: {
        width: Wp(0.25)
    },
    contentContainer: {
        width: Wp(0.67),
        padding: Hp(0.012),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: Wp(0.25),
        borderTopLeftRadius: Hp(0.004),
        borderBottomLeftRadius: Hp(0.004)
    },
    nameText: {
        textAlign: 'center',
        fontFamily: font.bold,
        fontSize: Hp(0.026),
        lineHeight: Hp(0.035),
        letterSpacing: 0.5,
    },
    descriptionText: {
        fontFamily: font.regular,
        fontSize: Hp(0.015),
        letterSpacing: 0.5
    },
    favoriteIconContainer: { 
        justifyContent: 'center',
        alignItems: 'center',
        width: Hp(0.05),
        height: Hp(0.05),
        padding: Hp(0.005)
    },
    favoriteIcon: {
        resizeMode: 'contain',
        height: Hp(0.028),
        width: '100%'
    },
    unfavoriteIcon: {
        resizeMode: 'contain',
        height: Hp(0.029),
        width: '100%'
    }
})

export default BreedBoxLargeShort;
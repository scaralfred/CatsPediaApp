import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Easing, Animated, StyleSheet, Button, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Wp, Hp, formatHeight, formatWeight, isIphoneX, isIos } from '../lib/util';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { font } from '../styles/variables';
import breeds from '../../scraper/breeds';

class ScannerResult extends Component {

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
        featureNameHeight: null,
        breedGroupHeight: null,
        spinnerValue: new Animated.Value(0)
    }

    goToBreedDetails = (breed) => {
        const { favorites, heightUnitOfMeasure, weightUnitOfMeasure } = this.props;
        const isFavorite = favorites.includes(breed.id);

        if (breed) {
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
        
    }

    renderFeaturesSection(scanResult, firstResult, secondResult, thirdResult) {
        const { heightUnitOfMeasure, weightUnitOfMeasure } = this.props;
        const firstResultPercentage = parseInt(scanResult.firstResult.percentage.replace("$", "")) || null;
        const secondResultPercentage = parseInt(scanResult.secondResult.percentage.replace("$", "")) || null;
        const thirdResultPercentage = parseInt(scanResult.thirdResult.percentage.replace("$", "")) || null;

        if ((firstResultPercentage >= 45 && secondResultPercentage >= 40) || (firstResultPercentage < 45 && secondResultPercentage >= 40)) {
            const { featureNameHeight, breedGroupHeight } = this.state;
            // 2 results
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Hp(0.025), width: Wp(0.84)}}>
                    <TouchableOpacity style={{width: Wp(0.412)}}
                                      activeOpacity={0.8}
                                      onPress={()=> this.goToBreedDetails(firstResult)}
                    >
                        <Text onLayout={(e)=> e.nativeEvent.layout.height > featureNameHeight && this.setState({featureNameHeight: e.nativeEvent.layout.height})}
                              style={[styles.featureNameTwoColumns, {height: featureNameHeight}]}>{firstResult.name}</Text>
                        <View onLayout={(e)=> e.nativeEvent.layout.height > breedGroupHeight && this.setState({breedGroupHeight: e.nativeEvent.layout.height})}
                              style={{height: this.state.breedGroupHeight}}>
                            <Text style={[styles.featureTitleTwoTwoColumns]}>Breed Group:</Text>
                            <Text style={styles.featureTextTwoColumns}>{firstResult.breedGroup}</Text>
                        </View>
                        <Text style={[styles.seeMoreDetailsTwoColumns]}>See more details...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: Wp(0.412)}}
                                      activeOpacity={0.8}
                                      onPress={()=> this.goToBreedDetails(secondResult)}
                    >
                        <Text onLayout={(e)=> e.nativeEvent.layout.height > featureNameHeight && this.setState({featureNameHeight: e.nativeEvent.layout.height})}
                              style={[styles.featureNameTwoColumns, {height: featureNameHeight}]}>{secondResult.name}</Text>
                        <View onLayout={(e)=> e.nativeEvent.layout.height > breedGroupHeight && this.setState({breedGroupHeight: e.nativeEvent.layout.height})}
                              style={{height: this.state.breedGroupHeight}}>
                            <Text style={[styles.featureTitleTwoTwoColumns]}>Breed Group:</Text>
                            <Text style={styles.featureTextTwoColumns}>{secondResult.breedGroup}</Text>
                        </View>
                        <Text style={[styles.seeMoreDetailsTwoColumns]}>See more details...</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (firstResultPercentage < 45 && secondResultPercentage < 40) {
            const { featureNameHeight, breedGroupHeight } = this.state;
            // 3 results
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Hp(0.025), width: Wp(0.84)}}>
                    <TouchableOpacity style={{width: Wp(0.27)}}
                                      activeOpacity={0.8}
                                      onPress={()=> this.goToBreedDetails(firstResult)}
                    >
                        <Text onLayout={(e)=> e.nativeEvent.layout.height > featureNameHeight && this.setState({featureNameHeight: e.nativeEvent.layout.height})}
                              style={[styles.featureNameTwoColumns, {height: featureNameHeight}]}>{firstResult.name}</Text>
                        <View onLayout={(e)=> e.nativeEvent.layout.height > breedGroupHeight && this.setState({breedGroupHeight: e.nativeEvent.layout.height})}
                              style={{height: this.state.breedGroupHeight}}>
                            <Text style={[styles.featureTitleTwoTwoColumns]}>Breed Group:</Text>
                            <Text style={styles.featureTextTwoColumns}>{firstResult.breedGroup}</Text>
                        </View>
                        <Text style={[styles.seeMoreDetailsTwoColumns]}>See more details...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: Wp(0.27)}}
                                      activeOpacity={0.8}
                                      onPress={()=> this.goToBreedDetails(secondResult)}
                    >
                        <Text onLayout={(e)=> e.nativeEvent.layout.height > featureNameHeight && this.setState({featureNameHeight: e.nativeEvent.layout.height})}
                              style={[styles.featureNameTwoColumns, {height: featureNameHeight}]}>{secondResult.name}</Text>
                        <View onLayout={(e)=> e.nativeEvent.layout.height > breedGroupHeight && this.setState({breedGroupHeight: e.nativeEvent.layout.height})}
                              style={{height: this.state.breedGroupHeight}}>
                            <Text style={[styles.featureTitleTwoTwoColumns]}>Breed Group:</Text>
                            <Text style={styles.featureTextTwoColumns}>{secondResult.breedGroup}</Text>
                        </View>
                        <Text style={[styles.seeMoreDetailsTwoColumns]}>See more details...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: Wp(0.27)}}
                                      activeOpacity={0.8}
                                      onPress={()=> this.goToBreedDetails(thirdResult)}
                    >
                        <Text onLayout={(e)=> e.nativeEvent.layout.height > featureNameHeight && this.setState({featureNameHeight: e.nativeEvent.layout.height})}
                              style={[styles.featureNameTwoColumns, {height: featureNameHeight}]}>{thirdResult.name}</Text>
                        <View onLayout={(e)=> e.nativeEvent.layout.height > breedGroupHeight && this.setState({breedGroupHeight: e.nativeEvent.layout.height})}
                              style={{height: this.state.breedGroupHeight}}>
                            <Text style={[styles.featureTitleTwoTwoColumns]}>Breed Group:</Text>
                            <Text style={styles.featureTextTwoColumns}>{thirdResult.breedGroup}</Text>
                        </View>
                        <Text style={[styles.seeMoreDetailsTwoColumns]}>See more details...</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            // 1 result
            return (
                <TouchableOpacity style={{ marginBottom: Hp(0.025), marginTop: Hp(0.025), width: Wp(0.84)}}
                                  activeOpacity={0.8}
                                  onPress={()=> this.goToBreedDetails(firstResult)}
                >
                    <View style={styles.featureRow}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <FastImage source={require('../assets/icons/dog-4.png')}
                                            style={styles.featureIcon} 
                                            resizeMode={'contain'}
                                        />
                                <View style={{}}>
                                    <Text style={styles.featureTitle}>Breed Group: </Text>
                                    <Text style={styles.featureText}>{firstResult.breedGroup}</Text>
                                </View>
                            </View>
                            {firstResult.lifeSpan ?
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: Wp(0.06) }}>
                                <FastImage source={require('../assets/icons/lifespan-2.png')}
                                            style={styles.featureIcon} 
                                            resizeMode={'contain'}
                                            />
                                <View style={{}}>
                                    <Text style={styles.featureTitle}>Life Span:</Text>
                                    <Text style={styles.featureText}>{firstResult.lifeSpan.replace('years', 'ys')}</Text>
                                </View>
                            </View> : null}
                    </View>
                    <View style={styles.featureRow}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <FastImage source={require('../assets/icons/dog-2.png')}
                                           style={[styles.featureIcon, {height: Hp(0.05), width: Hp(0.05), marginTop: Hp(0.018), marginRight: Wp(0.022)}]} 
                                           resizeMode={'contain'}
                                    />
                                <View style={{}}>
                                    <Text style={styles.featureTitle}>Height:</Text>
                                    <Text style={styles.featureText}>{firstResult.heightRange.min ? formatHeight(heightUnitOfMeasure, firstResult.heightRange.min, firstResult.heightRange.max) : firstResult.heightRange}</Text>
                                </View>
                            </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginLeft: Wp(0.06) }}>
                            <FastImage source={require('../assets/icons/scale-8.png')}
                                        style={styles.featureIcon}
                                        resizeMode={'contain'}
                                        />
                            <View style={{}}>
                                    <Text style={styles.featureTitle}>Weight:</Text>
                                    <Text style={styles.featureText}>{firstResult.weightRange.min ? formatWeight(weightUnitOfMeasure, firstResult.weightRange.min, firstResult.weightRange.max) : firstResult.weightRange}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{padding: Hp(0.03)}}
                                      onPress={()=> this.goToBreedDetails(firstResult)}
                                    >
                        <Text style={[styles.seeMoreDetailsText]}>See more details</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }
    };

    renderDoneButton() {
        return (
            <View style={{ flexDirection: 'row', padding: Wp(0.08), paddingTop: Wp(0.03)}}>
                <TouchableOpacity activeOpacity={0.8} 
                                  onPress={()=> {
                                    this.props.historyResult ?
                                    Navigation.pop(this.props.componentId)
                                    : Navigation.popToRoot(this.props.componentId);
                                  }} 
                                  style={[styles.button, {backgroundColor: this.props.theme.primaryColor}]}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderResultImages(scanResult, resultImage, firstDefaultResult, secondDefaultResult, thirdDefaultResult) {
        const firstResultName = scanResult.firstResult.breed || null;
        const secondResultName = scanResult.secondResult.breed || null;
        const thirdResultName = scanResult.thirdResult.breed || null;
        const firstResultPercentage = parseInt(scanResult.firstResult.percentage.replace("$", "")) || null;
        const secondResultPercentage = parseInt(scanResult.secondResult.percentage.replace("$", "")) || null;
        const thirdResultPercentage = parseInt(scanResult.thirdResult.percentage.replace("$", "")) || null;

        const findFirstBreed = breeds.find( el => el.name.toLowerCase() == firstResultName.toLowerCase());
        const firstImage = findFirstBreed !== 'undefined' && findFirstBreed && findFirstBreed.pictures[0] ? findFirstBreed.pictures[0] : null;

        const findSecondBreed = breeds.find( el => el.name.toLowerCase() == secondResultName.toLowerCase());
        const secondImage = findSecondBreed !== 'undefined' && findSecondBreed && findSecondBreed.pictures[0] ? findSecondBreed.pictures[0] : null;

        const findThirdBreed = breeds.find( el => el.name.toLowerCase() == thirdResultName.toLowerCase());
        const thirdImage = findThirdBreed !== 'undefined' && findThirdBreed && findThirdBreed.pictures[0] ? findThirdBreed.pictures[0] : null;

        if (firstResultPercentage >= 45 && secondResultPercentage < 40) {
            // 1 image
            return (
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', width: Wp(0.84)}}
                                  activeOpacity={0.8}
                                  onPress={()=> this.goToBreedDetails(firstDefaultResult)}
                >
                    <FastImage source={resultImage} 
                               style={[styles.mainBreedImageBig, firstImage ? {marginLeft: -Wp(0.0)} : null]} 
                               resizeMode='cover' />
                    <View style={{position: 'absolute', backgroundColor: '#fff', bottom: -Wp(0.05), right: -Wp(0.04), paddingTop: Hp(0.005), paddingLeft: Hp(0.005), borderTopLeftRadius: Hp(0.004)}}>
                        <FastImage source={firstImage ? {uri: firstImage} : require('../assets/images/dog-placeholder.png')} 
                                    style={[styles.mainBreedImageSmallAbsolute]} 
                                    resizeMode='cover' />
                    </View>
                </TouchableOpacity>
            )
        } else if ((firstResultPercentage >= 45 && secondResultPercentage >= 40) || (firstResultPercentage < 45 && secondResultPercentage >= 40)) {
            return (// 2 images
                <Fragment>
                    <FastImage source={resultImage} 
                               style={[firstImage || secondImage ? styles.mainBreedImageShort : styles.mainBreedImage]} 
                               resizeMode='cover' />
                    <View style={{height: firstImage || secondImage ? Wp(0.016) : null}}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: Wp(0.84)}}>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=> this.goToBreedDetails(firstDefaultResult)}
                        >
                            <FastImage source={firstImage ? {uri: firstImage} : require('../assets/images/dog-placeholder.png')} 
                                       style={styles.mainBreedImageHalfShort} 
                                       resizeMode='cover' />
                            <View style={styles.percentage}>
                                <Text style={styles.percentageText}>{firstResultPercentage + '%'}</Text>
                            </View>
                            <LinearGradient style={styles.fadeAwayEffect}
                                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.13)','rgba(0, 0, 0, 0.23)', 'rgba(0, 0, 0, 0.33)',  'rgba(0, 0, 0, 0.358)']}
                                            start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=> this.goToBreedDetails(secondDefaultResult)}
                        >
                            <FastImage source={secondImage ? {uri: secondImage} : require('../assets/images/dog-placeholder.png')} 
                                       style={styles.mainBreedImageHalfShort} 
                                       resizeMode='cover' />
                            <View style={styles.percentage}>
                                <Text style={styles.percentageText}>{secondResultPercentage + '%'}</Text>
                            </View>
                            <LinearGradient style={styles.fadeAwayEffect}
                                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.13)','rgba(0, 0, 0, 0.23)', 'rgba(0, 0, 0, 0.33)',  'rgba(0, 0, 0, 0.358)']}
                                            start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                            />
                        </TouchableOpacity>
                    </View>
                </Fragment>
            )
        } else if (firstResultPercentage < 45 && secondResultPercentage < 40) {
            return (// 3 images
                <Fragment>
                    <FastImage source={resultImage} 
                               style={[firstImage || secondImage || thirdImage ? styles.mainBreedImageShort : styles.mainBreedImage]} 
                               resizeMode='cover' />
                    <View style={{height: firstImage || secondImage || thirdImage ? Wp(0.016) : null}}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: Wp(0.84)}}>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=> this.goToBreedDetails(firstDefaultResult)}
                        >
                            <FastImage source={firstImage ? {uri: firstImage} : require('../assets/images/dog-placeholder.png')} 
                                    style={styles.mainBreedImageHalfShortThree} 
                                    resizeMode='cover' />
                            <View style={styles.percentage}>
                                <Text style={styles.percentageText}>{firstResultPercentage + '%'}</Text>
                            </View>
                            <LinearGradient style={styles.fadeAwayEffect}
                                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.13)','rgba(0, 0, 0, 0.23)', 'rgba(0, 0, 0, 0.33)',  'rgba(0, 0, 0, 0.358)']}
                                            start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=> this.goToBreedDetails(secondDefaultResult)}
                        >
                            <FastImage source={secondImage ? {uri: secondImage} : require('../assets/images/dog-placeholder.png')} 
                                    style={styles.mainBreedImageHalfShortThree} 
                                    resizeMode='cover' />
                            <View style={styles.percentage}>
                                <Text style={styles.percentageText}>{secondResultPercentage + '%'}</Text>
                            </View>
                            <LinearGradient style={styles.fadeAwayEffect}
                                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.13)','rgba(0, 0, 0, 0.23)', 'rgba(0, 0, 0, 0.33)',  'rgba(0, 0, 0, 0.358)']}
                                            start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=> this.goToBreedDetails(thirdDefaultResult)}
                        >
                            <FastImage source={thirdImage ? {uri: thirdImage} : require('../assets/images/dog-placeholder.png')} 
                                    style={styles.mainBreedImageHalfShortThree} 
                                    resizeMode='cover' />
                            <View style={styles.percentage}>
                                <Text style={styles.percentageText}>{thirdResultPercentage + '%'}</Text>
                            </View>
                            <LinearGradient style={styles.fadeAwayEffect}
                                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.13)','rgba(0, 0, 0, 0.23)', 'rgba(0, 0, 0, 0.33)',  'rgba(0, 0, 0, 0.358)']}
                                            start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                            />
                        </TouchableOpacity>
                    </View>
                </Fragment>
            )
        } else {
            return (
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={()=> this.goToBreedDetails(firstDefaultResult)}
                >
                    <FastImage source={resultImage} 
                               style={styles.mainBreedImage} 
                               resizeMode='cover' />
                </TouchableOpacity>
            )
        }
    }

   render() { 
        const { scanImageThroughServerRequest, scanImageThroughServerError, scanResults } = this.props;

        const scanResult = this.props.historyResult ? this.props.historyResult : scanResults;

        // scanResult = {
        //     firstResult: { breed: 'Pug', percentage: '45%' },
        //     secondResult: { breed: 'Golden Retriever', percentage: '19%' },
        //     thirdResult: { breed: 'Labrador retriever', percentage: '15%' }
        // }

        // scanResult = {
        //     firstResult: { breed: 'Pug', percentage: '42%' },
        //     secondResult: { breed: 'Golden Retriever', percentage: '40%' },
        //     thirdResult: { breed: 'Labrador retriever', percentage: '15%' }
        // }

        // scanResult = {
        //     firstResult: { breed: 'Pug', percentage: '35%' },
        //     secondResult: { breed: 'Golden Retriever', percentage: '35%' },
        //     thirdResult: { breed: 'Labrador retriever', percentage: '15%' }
        // }

        const Header = ({resultName}) =>  {
            const firstResultPercentage = parseInt(scanResult.firstResult.percentage.replace("$", "")) || null;
            const secondResultPercentage = parseInt(scanResult.secondResult.percentage.replace("$", "")) || null;
            const headerTitle = () => {
                if (firstResultPercentage >= 45 && secondResultPercentage < 40) return _.startCase(resultName);
                else if ((firstResultPercentage >= 45 && secondResultPercentage >= 40) || (firstResultPercentage < 45 && secondResultPercentage >= 40)) return "2 Results";
                else if (firstResultPercentage < 45 && secondResultPercentage < 40) return "3 Results";
                else return _.startCase(resultName);
            }

            return (
                <View style={styles.header}>
                    <View style={{width: Wp(0.145), height: Wp(0.145)}}/>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.breedTitle}>{headerTitle()}</Text>
                    </View>
                    <View style={{  alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ padding: Wp(0.05), marginTop: -Hp(0.02) }} onPress={() => {
                            this.props.historyResult ?
                            Navigation.pop(this.props.componentId)
                            : Navigation.popToRoot(this.props.componentId);
                        }}>
                        <FastImage resizeMode={'contain'} 
                                    style={{ width: Wp(0.055), height: Wp(0.055) }} 
                                    source={require('../assets/icons/close-black-2.png')} 
                        />
                        </TouchableOpacity> 
                    </View>
                </View>
            )
        };

        if (scanImageThroughServerRequest) {
            const { spinnerValue } = this.state;
            const { primaryColor } = this.props.theme;
            Animated.loop(Animated.timing(spinnerValue, { toValue: 1, duration: 2500, easing: Easing.linear })).start()

            const spin = this.state.spinnerValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })

            return (
                <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {/* <ActivityIndicator size="large" color="#000" /> */}
                    <View style={{marginTop: -Hp(0.02),justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.buttonText, {color: '#000', paddingBottom: Hp(0.03)}]}>Identifying Breed</Text>
                        <Animated.View style={[styles.spinner, {transform: [{rotate: spin}], borderColor: primaryColor}]}>
                            <FastImage style={{ marginTop: Hp(0.0043), height: Hp(0.05), width: Hp(0.05)}} 
                                    source={require('../assets/appIcon/AppLogo.png')} />
                        </Animated.View>
                    </View>
                </View> 
            )
        } else {
            if (scanImageThroughServerError) {
                return (
                    <View style={styles.container}>
                       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                           <View style={{marginTop: -Hp(0.1), alignItems: 'center', justifyContent: 'center', paddingHorizontal: Wp(0.1)}}>
                            <Text style={[styles.errorText, {textAlign: 'center'}]}>Internal Server Error.{'\n'}It's not you, It's us!{'\n'}We are updating our server, Please try again later.</Text>
                                <TouchableOpacity activeOpacity={0.8}
                                                  style={{padding: Hp(0.03)}}
                                                  onPress={()=> Navigation.pop(this.props.componentId)}
                                                >
                                    <Text style={[styles.errorText, {fontFamily: font.bold}]}>Ok</Text>
                                </TouchableOpacity>
                           </View>
                       </View>
                    </View>
                )
            } else if (scanResult) {
                const resultName = (scanResult && scanResult.firstResult && scanResult.firstResult.breed) && scanResult.firstResult.breed;
                const secondResultName = (scanResult && scanResult.secondResult && scanResult.secondResult.breed) && scanResult.secondResult.breed;
                const thirdResultName = (scanResult && scanResult.thirdResult && scanResult.thirdResult.breed) && scanResult.thirdResult.breed;
                
                const result = () => {
                    if (resultName) {
                        if (typeof breeds.find( el => el.name.toLowerCase() == resultName.toLowerCase()) !== 'undefined') {
                            return breeds.find( el => el.name.toLowerCase() == resultName.toLowerCase())
                        } else if (typeof breeds.find( el => el.name.toLowerCase().includes(resultName.toLowerCase())) !== 'undefined') {
                            return breeds.find( el => el.name.toLowerCase().includes(resultName.toLowerCase()))
                        } else { return false }
                    }
                };
                const resultImage = (result() &&  scanResult.originalPicture) ? {uri: scanResult.originalPicture} : require('../assets/images/dog-placeholder.png');

                const secondResult = () => {
                    if (secondResultName) {
                        if (typeof breeds.find( el => el.name.toLowerCase() == secondResultName.toLowerCase()) !== 'undefined') {
                            return breeds.find( el => el.name.toLowerCase() == secondResultName.toLowerCase())
                        } else if (typeof breeds.find( el => el.name.toLowerCase().includes(secondResultName.toLowerCase())) !== 'undefined') {
                            return breeds.find( el => el.name.toLowerCase().includes(secondResultName.toLowerCase()))
                        } else { return false }
                    }
                };

                const thirdResult = () => {
                    if (thirdResultName) {
                        if (typeof breeds.find( el => el.name.toLowerCase() == thirdResultName.toLowerCase()) !== 'undefined') {
                            return breeds.find( el => el.name.toLowerCase() == thirdResultName.toLowerCase())
                        } else if (typeof breeds.find( el => el.name.toLowerCase().includes(thirdResultName.toLowerCase())) !== 'undefined') {
                            return breeds.find( el => el.name.toLowerCase().includes(thirdResultName.toLowerCase()))
                        } else { return false }
                    }
                };

                if (result()) {
                    return (
                        <View style={styles.container}>
                           <Header resultName={resultName}/>
                           <ScrollView contentContainerStyle={{ alignItems: 'center', paddingHorizontal: Wp(0.08)}}>
                                <View style={{paddingVertical: Hp(0.015)}}>
                                    {this.renderResultImages(scanResult, resultImage, result(), secondResult(), thirdResult())}
                                    <View style={{ paddingBottom: Hp(0.02), paddingTop: Hp(0.01)}}>
                                        {this.renderFeaturesSection(scanResult, result(), secondResult(), thirdResult())}
                                    </View>
                                </View>
                           </ScrollView>
                           {this.renderDoneButton()}
                           {/* <Button title='check result' onPress={()=> alert(JSON.stringify(scanResult))}/> */}
                        </View>
                    )
                } else {
                    return (
                        <View style={[styles.container, {padding: Hp(0.05)}]}>
                            <Header />
                            <View style={{flex: 1, marginTop: -Hp(0.1), justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={[styles.breedTitle]}>Is this a {_.startCase(resultName)}?</Text>
                                <View style={{height: Hp(0.05)}}/>
                                <Text style={[styles.breedTitle, {fontSize: Hp(0.03)}]}>No info found for this breed. 😔</Text>
                                <Text style={[styles.breedTitle , {fontSize: Hp(0.03)}]}>Is this a pure dog breed? 🤔</Text>
                            </View> 
                        </View>
                    )
                }
            } else {
                return (
                    <View style={styles.container}>
                       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                           <View style={{marginTop: -Hp(0.1), alignItems: 'center', justifyContent: 'center', paddingHorizontal: Wp(0.1)}}>
                            <Text style={[styles.errorText, {textAlign: 'center'}]}>Internal Server Error.{'\n'}It's not you, It's us!{'\n'}We are updating our server, Please try again later.</Text>
                                <TouchableOpacity activeOpacity={0.8}
                                                  style={{padding: Hp(0.03)}}
                                                  onPress={()=> Navigation.pop(this.props.componentId)}
                                                >
                                    <Text style={[styles.errorText, {fontFamily: font.bold}]}>Ok</Text>
                                </TouchableOpacity>
                           </View>
                       </View>
                    </View>
                )
            }
        }
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: isIphoneX() ? 65 : isIos() ? 45 : 35
    },
    header: {
        // paddingTop: isIphoneX() ? 35 : isIos() ? 15 : 5,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center'
    },
    breedTitle: {
        fontFamily: font.medium,
        fontSize: Hp(0.05),
        lineHeight: Hp(0.055),
        color: '#000',
        textAlign: 'center'
    },
    spinner: {
            borderWidth: Hp(0.0035),
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
    },
    errorText: {
        fontFamily: font.regular,
        fontSize: Hp(0.03),
        color: '#000'
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
    mainBreedImage: {
        width: Wp(0.84),
        height: Hp(0.28),
        borderRadius: Hp(0.004),
    },
    mainBreedImageBig: {
        width: Wp(0.84),
        height: Hp(0.28),
        borderRadius: Hp(0.004),
    },
    mainBreedImageSmallAbsolute: {
        width: Wp(0.32),
        height: Hp(0.13),
        borderRadius: Hp(0.004),
    },
    mainBreedImageShort: {
        width: Wp(0.84),
        height: Hp(0.23),
        borderRadius: Hp(0.004),
    },
    mainBreedImageHalf: {
        width: Wp(0.412),
        height: Hp(0.25),
        borderRadius: Hp(0.004),
    },
    mainBreedImageHalfShort: {
        width: Wp(0.412),
        height: Hp(0.14),
        borderRadius: Hp(0.004),
    },
    mainBreedImageHalfShortThree: {
        width: Wp(0.27),
        height: Hp(0.12),
        borderRadius: Hp(0.004),
    },
    seeMoreDetailsText: {
        fontFamily: font.medium,
        fontSize: Hp(0.03),
        color: '#000',
        textAlign: 'center'
    },
    featureRow: { 
        flexDirection: 'row',
        paddingVertical: Hp(0.01)
    },
    featureIcon: {
        resizeMode: 'contain',
        height: Hp(0.045),
        width: Hp(0.045),
        marginRight: Wp(0.03),
        marginLeft: Wp(0.01),
        marginTop: Hp(0.02)
    },
    featureTitle: {
        marginRight: -Wp(0.005),
        fontFamily: font.bold,
        fontSize: Hp(0.023),
        letterSpacing: 0.5,
        paddingTop: Wp(0.025)
    },
    featureText: {
        fontFamily: font.medium,
        fontSize: Hp(0.02),
        letterSpacing: 0.5,
        paddingHorizontal: Wp(0.005),
        paddingRight: Wp(0.12),
        lineHeight: Hp(0.025)
    },
    featureNameTwoColumns: {
        marginRight: -Wp(0.005),
        fontFamily: font.bold,
        fontSize: Hp(0.025),
        letterSpacing: 0.5,
        paddingBottom: Wp(0.02)
    },
    featureTitleTwoTwoColumns: {
        paddingLeft: Wp(0.005),
        fontFamily: font.bold,
        fontSize: Hp(0.02),
        letterSpacing: 0.5,
        paddingTop: Wp(0.025)
    },
    featureTextTwoColumns: {
        fontFamily: font.medium,
        fontSize: Hp(0.018),
        letterSpacing: 0.5,
        paddingHorizontal: Wp(0.005),
        lineHeight: Hp(0.025)
    },
    seeMoreDetailsTwoColumns: {
        paddingTop: Hp(0.035), 
        fontFamily: font.medium,
        fontSize: Hp(0.02),
        letterSpacing: 0.5,
        paddingHorizontal: Wp(0.005),
        lineHeight: Hp(0.025)
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
    percentage: {
        position:'absolute', 
        right: 0, 
        left: 0, 
        bottom: 0, 
        width: '100%', 
        borderBottomLeftRadius: Hp(0.004),
        borderBottomRightRadius: Hp(0.004),
        zIndex: 20,
        paddingHorizontal: Hp(0.012)
    },
    percentageText: {
        marginRight: -Wp(0.005),
        fontFamily: font.bold,
        fontSize: Hp(0.023),
        letterSpacing: 0.5,
        paddingTop: Wp(0.025),
        color: '#fff',
        textAlign: 'center'
    },
});

const mapStateToProps = state => ({
    theme: state.global.theme,
    scanResults: state.scanner.scanResult,
    favorites: state.global.favorites,
    scanImageThroughServerRequest: state.scanner.scanImageThroughServerRequest,
    scanImageThroughServerError: state.scanner.scanImageThroughServerError,
    heightUnitOfMeasure: state.global.settings.heightUnitOfMeasure,
    weightUnitOfMeasure: state.global.settings.weightUnitOfMeasure
});

export default connect(mapStateToProps, null)(ScannerResult)
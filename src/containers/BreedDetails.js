import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, TouchableWithoutFeedback } from 'react-native';
import { Hp, Wp, onLayout, bigPic, formatHeight, formatWeight, isIos, isIphoneX, isAndroid, objectToArray, objectToArrayFilterMainRate } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
import Carousel from 'react-native-looped-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { FloatingBackArrow } from '../component/UI/FloatingBackArrow';
import SlidingUpPanel from 'rn-sliding-up-panel';
import InstaPics from '../component/InstaPics/InstaPics';
import Collapsible from 'react-native-collapsible';
import FlickrPics from '../component/FlickrPics/FlickrPics';
import YoutubeVids from '../component/youtubeVids/YoutubeVids';
import FastImage from 'react-native-fast-image';
import { sizeCalculator } from '../lib/dogSize';
import Modal from 'react-native-modal';
import FeaIcon from 'react-native-vector-icons/Feather';

class BreedDetails extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    }

    state = {
        draggableRange: {
            top: Hp(0.655),
            bottom: Hp(0.655)
        },
        contentHeigth: null,
        featuresExpanded: false,
        federationsAndClubsCollapsed: true,
        showDescription: false,
        loadingPicture: false,
        finalPicture: true,
        optionsModal: false,
        currentPage: 0
    }
    
    componentWillMount() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    enabled: false,
                    visible: false
                },
            }
        });
    }

    renderHeader(){
        const { breed, isFavorite } = this.props;

        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => Navigation.pop(this.props.componentId)}
                    activeOpacity={0.8}
                    style={styles.backButtonContainer}>
                    <FastImage source={require('../assets/icons/left-arrow-black.png')}
                               style={{ width: Wp(0.07), height: Wp(0.07)}}
                               resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerText}>{breed.name}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.contextualMenuContainer}>
                    <FastImage source={require('../assets/icons/three-dots-black.png')}
                               style={{ width: Wp(0.07), height: Wp(0.07) }}
                               resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderCarousel(){
        const { breed } = this.props;
        const { loadingPicture, finalPicture } = this.state;
        const placeholder = require('../assets/images/placeholder.png');
        const picturesArray = breed.pictures && breed.pictures.length > 0 ? 
                              breed.pictures.map( el => {
                                if (el && el.replace("200px", "500px")) {
                                    
                                    return (
                                        // <FastImage resizeMode={'cover'} source={{ uri: bigPic(el) }} style={styles.carouselImage} />
                                        <TouchableWithoutFeedback
                                        onPress={() => Navigation.showModal({
                                          component: {
                                                name: 'CarouselModal',
                                                passProps: {
                                                  text: 'Carousel',
                                                  images: breed.pictures,
                                                  currentPage: this.state.currentPage,
                                                  changePage: (page) => this._carousel.animateToPage(page)
                                                  }
                                                }
                                              })}
                                        >
                                         <View>
                                            {loadingPicture ?
                                                <View style={{ position: 'absolute',  justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                                                    <ActivityIndicator size={'small'} color='#000'/>
                                                </View>
                                                : null}
                                                {finalPicture ?
                                                <FastImage resizeMode={'cover'} 
                                                            source={{ uri: bigPic(el) }} 
                                                            style={styles.carouselImage} 
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
                                                            style={styles.carouselImage}
                                                />
                                            }
                                        </View>
                                    </TouchableWithoutFeedback>
                                    )
                                }
                              })
                             : <FastImage resizeMode={'cover'} source={require('../assets/images/dog-placeholder.png')} style={styles.carouselImage} />;
        return (
            <View style={{zIndex: isIos() ? null : 1}}>
                <FloatingBackArrow onPress={() => Navigation.pop(this.props.componentId)} />
                <Carousel
                    delay={2000}
                    style={{ height: Hp(0.4), marginTop: -45  }}
                    ref={(ref) => this._carousel = ref}
                    onPageBeingChanged={(page)=> this.setState({currentPage: page})}
                    currentPage={this.state.currentPage}
                    autoplay={false}
                    bullets={breed.pictures && breed.pictures.length > 1}  
                    bulletsContainerStyle={{ marginBottom: Hp(0.045) }}
                    bulletStyle={{ margin: Hp(0.006), borderWidth: 1, borderColor: '#fff', borderRadius: 50, width: Hp(0.012), height: Hp(0.012) }}
                    chosenBulletStyle={{ margin: 4, backgroundColor: '#fff', borderRadius: 50, height: Hp(0.012), width: Hp(0.012) }}
                    onAnimateNextPage={(p) => console.log(p)}
                >   
                    {picturesArray}
                </Carousel>
            </View>
        )
    }

    renderTitle() {
        const { breed, favorites } = this.props; 
        const isFavorite = favorites.includes(breed.id);
        const origin = breed.origin || null;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{flex: 1}}>
                    <Text style={[styles.nameText, {  }]}>{breed.name}</Text>
                    {origin ?
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.originTitle}>Origin:</Text>
                            <Text style={styles.originText}> {origin}</Text>
                        </View>
                    : null}
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: -Hp(0.013), paddingRight: Wp(0.018),  marginRight: Wp(-0.036)}}>
                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={() => this.setState({optionsModal: true})}
                                        style={styles.settingsIconContainer}>
                        <FastImage source={require('../assets/icons/three-dots-black-horizontal.png')}
                                style={styles.favoriteIcon}
                                resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => {
                                        isFavorite ? this.props.actions.removeFromFavorites(breed.id) : this.props.actions.addToFavorites(breed.id);
                                    }}
                                    style={[styles.favoriteIconContainer]}>
                        {isFavorite ?
                            <FastImage source={require('../assets/icons/heart-red-black.png')}
                                    style={styles.favoriteIcon}
                                    resizeMode={'contain'}
                            />
                            : <FastImage source={require('../assets/icons/heart-empty-black.png')}
                                        style={styles.unfavoriteIcon}
                                        resizeMode={'contain'}
                            />}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

   renderFeaturesSection() {
       const { breedGroup, lifeSpan, weightRange, heightRange } = this.props.breed;
       const { heightUnitOfMeasure, weightUnitOfMeasure } = this.props;
       
       return (
           <View style={{ marginBottom: Hp(0.025), marginTop: Hp(0.01)}}>
               <View style={styles.featureRow}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <FastImage source={require('../assets/icons/dog-4.png')}
                                       style={styles.featureIcon} 
                                       resizeMode={'contain'}
                                   />
                            <View style={{}}>
                               <Text style={styles.featureTitle}>Breed Group: </Text>
                               <Text style={styles.featureText}>{breedGroup}</Text>
                            </View>
                        </View>
                        {lifeSpan ?
                        <View style={{ flexDirection: 'row', flex: 1, marginLeft: Wp(0.06) }}>
                            <FastImage source={require('../assets/icons/lifespan-2.png')}
                                       style={styles.featureIcon} 
                                       resizeMode={'contain'}
                                       />
                            <View style={{}}>
                                <Text style={styles.featureTitle}>Life Span:</Text>
                                <Text style={styles.featureText}>{lifeSpan.replace('years', 'ys')}</Text>
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
                                <Text style={styles.featureText}>{heightRange && heightRange.min ? formatHeight(heightUnitOfMeasure, heightRange.min, heightRange.max) : heightRange}</Text>
                            </View>
                        </View>
                       <View style={{ flexDirection: 'row', flex: 1, marginLeft: Wp(0.06) }}>
                           <FastImage source={require('../assets/icons/scale-8.png')}
                                      style={styles.featureIcon}
                                      resizeMode={'contain'}
                                      />
                           <View style={{}}>
                                <Text style={styles.featureTitle}>Weight:</Text>
                                <Text style={styles.featureText}>{weightRange && weightRange.min ? formatWeight(weightUnitOfMeasure, weightRange.min, weightRange.max) : weightRange}</Text>
                           </View>
                       </View>
                </View>
           </View>
       )
   }

    renderDescription(){
        const { description } = this.props.breed;

        if (description && description.length > 20) {
            return (   
                <TouchableOpacity activeOpacity={1} 
                                  disabled={this.state.showDescription || description.length < 180 } 
                                  onPress={()=> this.setState({showDescription: true})}>
                    <View>
                        <Text style={[styles.sectionTitleText, {paddingBottom: Hp(0.01)}]}>Description</Text>
                        <Text numberOfLines={this.state.showDescription || description.length < 180 ? null : 3}
                              style={[styles.sectionContentText, {textAlign: 'justify'}]}>{description.replace(/(\[.*?\])/g, '')}</Text>
                    </View>
                    {description.length > 180 ?
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{ paddingTop: Hp(0.01) }}
                                      onPress={()=> this.setState({showDescription: !this.state.showDescription})}
                    >   
                        <View style={{flexDirection: 'row', marginTop: Hp(0.01)}}>
                            <Text style={[styles.viewMoreOrLess, {flex: 1, lineHeight: Hp(0.028)}]}>View {`${this.state.showDescription ? 'less' : 'more'}`}</Text>             
                            {this.state.showDescription ? this.renderWikipediaLink(2) : this.renderWikipediaLink(3)}
                        </View>
                    </TouchableOpacity>
                    : this.renderWikipediaLink(1)}
                </TouchableOpacity>
            )
        }
    }

    renderCharacteristics(){
        const { characteristics, heightRange} = this.props.breed;
        const adaptability = characteristics && characteristics.adaptability ? characteristics.adaptability : null;
        const friendliness = characteristics && characteristics.friendliness ? characteristics.friendliness : null;
        const grooming = characteristics && characteristics.grooming ? characteristics.grooming : null;
        const trainability = characteristics && characteristics.trainability ? characteristics.trainability : null;
        const exerciseNeeds = characteristics && characteristics.exerciseNeeds ? characteristics.exerciseNeeds : null;

        const abilities = [{adaptability}, {friendliness}, {grooming}, {trainability}, {"exercise Needs": exerciseNeeds}, "View More"];

        if (characteristics && (adaptability || friendliness || grooming || trainability || exerciseNeeds) ) {
            if (!this.state.featuresExpanded) {
                return (
                        <View>
                            <View style={{ paddingBottom: Hp(0.01) }}> 
                                    <FlatList contentContainerStyle={{ padding: Wp(0.005), paddingVertical: Hp(0.01) }}
                                            data={abilities}
                                            numColumns={2}
                                            columnWrapperStyle={{paddingBottom: Hp(0.01)}}
                                            keyExtractor={(item, index) => index}
                                            renderItem={({item}) => {
                                            const abilityName = Object.keys(item)[0];
                                            
                                                
                                                if (item == "View More") {
                                                    return (
                                                        <TouchableOpacity onPress={()=> this.setState({featuresExpanded: !this.state.featuresExpanded})}
                                                                          activeOpacity={0.8} 
                                                                          style={{ flex: 1, justifyContent: 'center'}}>
                                                            <Text style={[styles.featureTitle, {paddingLeft: Wp(0.04), paddingTop: 0,color: this.props.theme.primaryColor}]}>View More</Text>
                                                        </TouchableOpacity>
                                                    )
                                                } else {
                                                    const fullStars = Array.from(Array(Number(Object.values(item[abilityName].mainRate)[0])).keys());
                                                    const emptyStars = Array.from(Array(5 - Number(Object.values(item[abilityName].mainRate)[0])).keys());

                                                    return (
                                                        <TouchableOpacity onPress={()=> this.setState({featuresExpanded: !this.state.featuresExpanded})}
                                                                          activeOpacity={0.8}
                                                                          style={{ flex: 1}}>
                                                                <Text style={[styles.featureTitle, {textTransform: 'capitalize', paddingBottom: Hp(0.005)}]}>{abilityName}: </Text>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    {fullStars.map(el => {
                                                                        return <FastImage resizeMode={'contain'}
                                                                                        style={styles.abilityStarImage} 
                                                                                        source={require('../assets/icons/star-yellow-black-shape.png')}/>
                                                                    })}
                                                                    {emptyStars.map(el => {
                                                                        return <FastImage resizeMode={'contain'}
                                                                                        style={styles.abilityStarImage} 
                                                                                        source={require('../assets/icons/star-empty-black.png')}/>
                                                                    })}
                                                                </View>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            }}
                                    />
                            </View>
                        </View>
                )
            } else {
                return (
                    <View style={{ paddingBottom: Hp(0.01) }}> 
                          <FlatList contentContainerStyle={{ padding: Wp(0.005), paddingVertical: Hp(0.01) }}
                                    data={abilities}
                                    numColumns={1}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({item}) => {
                                            if (item !== "View More") {
                                                const abilityName = Object.keys(item)[0];
                                            
                                                const fullStars = Array.from(Array(Number(Object.values(item[abilityName].mainRate)[0])).keys());
                                                const emptyStars = Array.from(Array(5 - Number(Object.values(item[abilityName].mainRate)[0])).keys());
                                            
                                            return (
                                                <View style={{paddingBottom: Hp(0.02)}}>
                                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                                            <Text style={[styles.featureTitleExpanded, {textTransform: 'capitalize', paddingBottom: Hp(0.005)}]}>{abilityName} </Text>
                                                            <View style={{flex: 1}}/>
                                                            <View style={{flexDirection: 'row'}}>
                                                                {fullStars.map(el => {
                                                                    return <FastImage resizeMode={'contain'}
                                                                                      style={styles.abilityStarImage} 
                                                                                      source={require('../assets/icons/star-yellow-black-shape.png')}/>
                                                                })}
                                                                {emptyStars.map(el => {
                                                                    return <FastImage resizeMode={'contain'}
                                                                                      style={styles.abilityStarImage} 
                                                                                      source={require('../assets/icons/star-empty-black.png')}/>
                                                                })}
                                                            </View>
                                                    </View>
                                                        <FlatList   //contentContainerStyle={{ padding: Wp(0.005), paddingVertical: Hp(0.01) }}
                                                                    data={objectToArrayFilterMainRate(item[abilityName])}
                                                                    numColumns={1}
                                                                    keyExtractor={(item, index) => index}
                                                                    renderItem={({item}) => {

                                                                        const fullStars = Array.from(Array(Number(Object.values(Object.values(item))[0])).keys());
                                                                        const emptyStars = Array.from(Array(5 - Number(Object.values(Object.values(item))[0])).keys());

                                                                        return (
                                                                            <View style={{flexDirection: 'row', paddingBottom: Hp(0.01)}}>
                                                                                <View style={{flex: 1, paddingRight: Wp(0.05)}}>
                                                                                    <Text style={[styles.featureTitleSmall, {textTransform: 'capitalize', paddingBottom: Hp(0.005)}]}>{Object.keys(item)}</Text>
                                                                                </View>
                                                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                                                                    {fullStars.map(el => {
                                                                                        return <FastImage resizeMode={'contain'}
                                                                                                        style={styles.abilityStarImageSmall} 
                                                                                                        source={require('../assets/icons/star-yellow-black-shape.png')}/>
                                                                                    })}
                                                                                    {emptyStars.map(el => {
                                                                                        return <FastImage resizeMode={'contain'}
                                                                                                        style={styles.abilityStarImageSmall} 
                                                                                                        source={require('../assets/icons/star-empty-black.png')}/>
                                                                                    })}
                                                                                </View>
                                                                            </View>
                                                                        )
                                                                    }}
                                                        />
                                                </View>
                                            )
                                            } else {
                                                return (
                                                    <TouchableOpacity onPress={()=> this.setState({featuresExpanded: !this.state.featuresExpanded})}
                                                                      activeOpacity={0.8} 
                                                                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: Hp(0.015), paddingBottom: Hp(0.005)}}>
                                                        <Text style={[styles.featureTitle, { paddingTop: 0,color: this.props.theme.primaryColor}]}>View Less</Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                    }}
                            />
                     </View>
                )
            }
        }
    }

    renderFederationsAndClubs(){
        const { federationsAndClubs } = this.props.breed;
        const {federationsAndClubsCollapsed} = this.state;

        const FCI = federationsAndClubs && federationsAndClubs.federationCynologiqueInternationale.replace(/(\r\n|\n|\r)/gm, "") ? federationsAndClubs.federationCynologiqueInternationale : null;
        const AKC = federationsAndClubs && federationsAndClubs.americanKennelClub ? federationsAndClubs.americanKennelClub.replace(/(\r\n|\n|\r)/gm, "") : null;
        const ANKC = federationsAndClubs && federationsAndClubs.australianNationalKennelCouncil ? federationsAndClubs.australianNationalKennelCouncil.replace(/(\r\n|\n|\r)/gm, "") : null;
        const CKC = federationsAndClubs && federationsAndClubs.canadianKennelClub ? federationsAndClubs.canadianKennelClub.replace(/(\r\n|\n|\r)/gm, "") : null;
        const TKC = federationsAndClubs && federationsAndClubs.theKennelClub ? federationsAndClubs.theKennelClub.replace(/(\r\n|\n|\r)/gm, "") : null;
        const NZKC = federationsAndClubs && federationsAndClubs.newZealandKennelClub ? federationsAndClubs.newZealandKennelClub.replace(/(\r\n|\n|\r)/gm, "") : null;
        const UKC = federationsAndClubs && federationsAndClubs.unitedKennelClub ? federationsAndClubs.unitedKennelClub.replace(/(\r\n|\n|\r)/gm, "") : null;

        const data = [
            { name: 'Fédération Cynologique Internationale', 
              content: FCI,
              image: require('../assets/dogsClubs/FCI.png')
            },
            { name: 'American Kennel Club', 
              content: AKC,
              image: require('../assets/dogsClubs/AKC.png')
            },
            { name: 'Australian National Kennel Council', 
              content: ANKC,
              image: require('../assets/dogsClubs/ANKC.png')
            },
            { name: 'Canadian Kennel Club', 
              content: CKC,
              image: require('../assets/dogsClubs/CKC.png')
            },
            { name: 'The Kennel Club', 
              content: TKC,
              image: require('../assets/dogsClubs/TKC.png') 
            },
            { name: 'New Zealand Kennel Club', 
              content: NZKC,
              image: require('../assets/dogsClubs/NZKC.png')
            },
            { name: 'United Kennel Club', 
              content: UKC,
              image: require('../assets/dogsClubs/UKC.png') 
            }
        ]
        
        if (FCI || AKC || ANKC || CKC || TKC || NZKC || UKC) {
        return ( 
            <View style={{ paddingVertical: Hp(0.01), paddingBottom: Hp(0.014) }}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.setState({federationsAndClubsCollapsed: !federationsAndClubsCollapsed})} style={{flexDirection: 'row',  paddingVertical: Hp(0.01)}}>
                    <Text style={[styles.sectionTitleText, {flex: 1}]}>Federations & Clubs</Text>
                    <Text style={styles.viewMoreOrLess}>{federationsAndClubsCollapsed ? 'View More' : 'Show Less'}</Text>
                </TouchableOpacity>
                {federationsAndClubsCollapsed ?
                <TouchableOpacity activeOpacity={1} 
                                  disabled={!this.state.federationsAndClubsCollapsed} 
                                  onPress={()=> this.setState({federationsAndClubsCollapsed: false})}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
                        {data.map( item => {
                            if (item.content) {
                                return <View style={{marginRight: Wp(0.045)}}> 
                                        <FastImage source={item.image}
                                                   style={{ height: Hp(0.06), width: Hp(0.06)}} 
                                                   resizeMode={'contain'}
                                                   />
                                    </View>
                            }
                        })}
                    </ScrollView>
                    <LinearGradient
                            style={{position:'absolute', right:0, top: 0, bottom: 0, width: Wp(0.5), height: Hp(0.06)}}
                            colors={[...Array.from(Array(10)).map( () => 'rgba(255, 255, 255, 0)'), 'rgba(255, 255, 255, 1)']}
                            start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} 
                            // pointerEvents={'none'}
                    />
                </TouchableOpacity>
                : 
                <Collapsible collapsed={federationsAndClubsCollapsed}>
                    <FlatList contentContainerStyle={{ padding: Wp(0.005), paddingTop: Hp(0.01), paddingBottom: 0  }}
                              data={data}
                              keyExtractor={(item, index) => index}
                              renderItem={({item}) => {
                                if (item.content) {
                                    return (
                                        <View style={styles.clubsRow}>
                                            <FastImage source={item.image}
                                                       style={styles.clubIcon} 
                                                       resizeMode={'contain'}
                                                       />
                                            <View style={{paddingHorizontal: Wp(0.028)}}>
                                                <Text style={styles.clubTitle}>{item.name}</Text>
                                                <Text style={styles.clubText}>{item.content}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                              }}
                        />
                </Collapsible>
                }
            </View>
        )
      }
    }

    renderWikipediaLink(layout){
        const { wikipediaLink, name } = this.props.breed;
        const navigateToLInk = () => Navigation.push(this.props.componentId, {
            component: {
                name: 'WikiPage',
                passProps: {
                    title: name,
                    link: wikipediaLink
                },
                options: {
                    bottomTabs: {
                         visible: false,
                         drawBehind: true
                     }
             }
            }
         })

        if (wikipediaLink) {
            if (layout == 1) {
                return (
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> navigateToLInk()}
                                      style={{  marginBottom: Hp(0.01), flexDirection: 'row', alignItems: 'center' }}
                                      >
                        
                        <Text style={[styles.featureText, {fontSize: Hp(0.018),}]}>Check out more on:</Text>
                        <FastImage source={require('../assets/images/wikipedia-logo.png')}
                                   style={{width: Hp(0.14), height: Hp(0.04)}}
                                   resizeMode={'contain'}
                                   />
                    </TouchableOpacity>
                )
            } else if (layout == 2) {
                return (
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> navigateToLInk()}
                                      style={{  marginBottom: Hp(0.01)}}
                                      >
                        
                        <Text style={[styles.featureText, {fontSize: Hp(0.018), marginBottom: Hp(0.01)}]}>Check out more on:</Text>
                        <FastImage source={require('../assets/images/wikipedia-logo.png')}
                                   style={{ width: Hp(0.13), height: Hp(0.04)}}
                                   resizeMode={'contain'}
                                   />
                    </TouchableOpacity>
                )
            } else if (layout == 3) {
                return (
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> navigateToLInk()}
                                      style={{  marginBottom: Hp(0.01), paddingRight: Hp(0.02) }}
                                      >
                        <FastImage source={require('../assets/images/wikipedia-logo.png')}
                                   style={{ width: Hp(0.1), height: Hp(0.04)}}
                                   resizeMode={'contain'}
                                   />
                    </TouchableOpacity>
                )
            }
        } else {
            return
        }
    }

    renderFlickrSection(tag){

        if (this.props.showFlickr) return (
            <View style={{  }}>
                <FlickrPics breedName={tag} />
            </View>
        )
    }

    renderYoutubeSection(tag){

        if (this.props.showYoutube) return  (
            <View style={{  }}>
                <YoutubeVids componentId={this.props.componentId} breedName={tag} />
            </View>
        )
    }

    renderInstagramSection(tag){
        
        if (this.props.showInstagram) return  (
            <View style={{ }}>
                <InstaPics breedName={tag} />
            </View>
        )
    }

    renderContent(){
        const { name } = this.props.breed;
        const ambiguousNames = ["Afghan Hound", "Aidi", "Akita", "Armant", "Barbet", "Beagle", "Billy", "Bolognese", "Brittany", "Chinook",
                                "Combai", "Docker", "Dunker", "Drever","Harrier", "Hokkaido", "Kanni", "Kintamani", "Maltese", "Newfoundland", 
                                "Papillon", 'Phalène', "Poitevin", "Puli", "Pumi", "Shikoku", "Taigan", "Tosa"]
        const socialTag = ambiguousNames.includes(name) ? name.replace(/\s/g, '') + 'dog' : name.replace(/\s/g, '');
        return (
            <View style={styles.contentContainer}>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} colors={['#e4e2e4', '#FFF']}
                    style={{ height: 80, width: 1.5, position: 'absolute', left: -1.5, top: 40 }}
                />
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} colors={['#e4e2e4', '#FFF']}
                    style={{ height: 80, width: 1.5, position: 'absolute', right: -1.5, top: 40 }}
                />
                <View  
                    onLayout={(e) => { 
                    const updatedHeight = onLayout(e).height;
                    updatedHeight > this.state.draggableRange.top ?
                    this.setState({ draggableRange: { ...this.state.draggableRange,  top: onLayout(e).height }}) 
                    : null
                    }}
                    style={{paddingBottom: Hp(0.04)}}
                >
                    {this.renderTitle()}
                    {this.renderFeaturesSection()}
                    {this.renderDescription()}
                    {this.renderCharacteristics()}
                    {this.renderFederationsAndClubs()}
                    {/* {this.renderWikipediaLink()} */}
                    {this.renderFlickrSection(socialTag)}
                    {/* {this.renderYoutubeSection(socialTag)} */}
                    {this.renderInstagramSection(socialTag)}
               </View>
            </View>
        )
    }

    renderOptionsModal() {
        const { optionsModal } = this.state;
        return (
            <Modal isVisible={optionsModal}
                  coverScreen={true}
                  // deviceHeight={height}
                  // deviceWidth={width}
                  swipeDirection={['up', 'left', 'right', 'down']}
                  style={{ justifyContent: 'flex-end', margin: 0 }}
                  backdropColor={'rgba(0, 0, 0, 0.3)'}
                  // backdropOpacity={1}
                  onBackdropPress={()=> this.setState({optionsModal: false})}
            >
              <View style={styles.optionsModal}>
                <TouchableOpacity style={{flexDirection: 'row', paddingBottom: isIphoneX() ? 20 : null}}
                                  onPress={()=> {
                                      this.setState({optionsModal: false})
                                      setTimeout(() => {
                                        Navigation.push(this.props.componentId, {component: {name: 'Settings'}})
                                      }, 100);
                                  }}>
                    <FeaIcon name="settings" size={Hp(0.035)} color={'#000'} />
                    <Text style={styles.optionsModalText}>Settings</Text>
                </TouchableOpacity>
              </View>
          </Modal>
        )
      }

   render() {
       
        if (true) {
            return (
                <ScrollView contentContainerStyle={{ paddingTop: isIphoneX() ? 0 : 45}}
                            bounces={false}
                            >
                    {this.renderCarousel()}
                    <View style={{flex: 1, zIndex: 10000, marginTop: -Hp(0.055)}}>
                        {this.renderContent()}
                        {this.renderOptionsModal()}
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <View style={styles.container}>
                    {/* {this.renderHeader()} */}
                    {this.renderCarousel()}
                    <SlidingUpPanel
                        showBackdrop={false}
                        onBackButtonPress={()=> null}
                        ref={c => (this._panel = c)}
                        height={this.state.draggableRange.top}
                        draggableRange={this.state.draggableRange}
                        friction={100}
                    >
                        {this.renderContent()}
                        {this.renderOptionsModal()}
                    </SlidingUpPanel>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45
    },
    text: {
        fontFamily: font.regular,
        fontSize: Hp(0.005)
    },
    viewMoreOrLess: {
        fontFamily: font.medium,
        fontSize: Hp(0.02),
        letterSpacing: 0.5,
        lineHeight: Hp(0.044),
        color: '#20639b'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: Wp(0.008),
        marginHorizontal: Wp(0.04),
        paddingTop: Hp(0.012),
        padding: Hp(0.018)
    },
    nameText: {
        fontFamily: font.bold,
        fontSize: Hp(0.04),
        paddingTop: Hp(0.013),
        lineHeight: Hp(0.045),
        letterSpacing: 0.5
    },
    originTitle: {
        fontFamily: font.bold,
        fontSize: Hp(0.023),
        letterSpacing: 0.5,
        // paddingTop: Wp(0.025)
    },
    originText: {
        fontFamily: font.medium,
        fontSize: Hp(0.02),
        letterSpacing: 0.5,
        lineHeight: Hp(0.037),
        color: '#9b9b9b'
    },
    sectionTitleText: {
        fontFamily: font.bold,
        fontSize: Hp(0.026),
        letterSpacing: 0.5
    },
    sectionContentText: {
        fontFamily: font.regular2,//font.regular, 
        fontSize: Hp(0.018),
        lineHeight: Hp(0.03),
        letterSpacing: Wp(0.0005),
        paddingHorizontal: Wp(0.003)
    },
    featureTitle: {
        marginRight: -Wp(0.005),
        fontFamily: font.bold,
        fontSize: Hp(0.023),
        letterSpacing: 0.5,
        paddingTop: Wp(0.025)
    },
    featureTitleExpanded: {
        marginRight: -Wp(0.005),
        fontFamily: font.bold,
        fontSize: Hp(0.026),
        letterSpacing: 0.5,
        paddingTop: Wp(0.008)
    },
    featureTitleSmall: {
        marginRight: -Wp(0.005),
        fontFamily: font.bold,
        fontSize: Hp(0.021),
        letterSpacing: 0.5,
        paddingTop: Wp(0.005)
    },
    featureText: {
        fontFamily: font.medium,
        fontSize: Hp(0.02),
        letterSpacing: 0.5,
        paddingHorizontal: Wp(0.005),
        paddingRight: Wp(0.12),
        lineHeight: Hp(0.025)
    },
    sizeText: {
        fontFamily: font.medium,
        fontSize: Hp(0.024),
        letterSpacing: 0.5,
        paddingHorizontal: Wp(0.005),
        paddingTop: Wp(0.01),
        paddingRight: Wp(0.12)
    },
    clubTitle: {
        fontFamily: font.bold,
        fontSize: Hp(0.02),
        letterSpacing: 0.5
    },
    clubText: {
        fontFamily: font.medium,
        fontSize: Hp(0.018),
        letterSpacing: 0.5,
        lineHeight: Hp(0.025),
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
        paddingBottom: Hp(0.015)
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
    },
    carouselImage: {
        width: Wp(1),
        height: Hp(0.5)
    },
    favoriteIconContainer: {
        padding: Hp(0.015),
        marginRight: -Hp(0.008)
    },
    favoriteIcon: {
        resizeMode: 'contain',
        width: Hp(0.03),
        height: Hp(0.03)
    },
    unfavoriteIcon: {
        resizeMode: 'contain',
        width: Hp(0.03),
        height: Hp(0.03)
    },
    settingsIconContainer: {
        padding: Hp(0.015),
        paddingRight: Hp(0.005),
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
    clubsRow: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: Hp(0.02)
    },
    clubIcon: {
        resizeMode: 'contain',
        height: Hp(0.045),
        width: Hp(0.045)
    },
    abilityStarImage: {
        width: Hp(0.025), 
        height: Hp(0.03), 
        marginRight: Wp(0.015), 
        resizeMode: 'contain'
    },
    abilityStarImageSmall: {
        width: Hp(0.018), 
        height: Hp(0.022), 
        marginRight: Wp(0.015), 
        resizeMode: 'contain'
    },
    optionsModal: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: Hp(0.04),
        paddingBottom: Hp(0.04),
        borderTopLeftRadius: Hp(0.02),
        borderTopRightRadius: Hp(0.02),
    },
    optionsModalText: {
        textAlign: 'center',
        fontFamily: font.medium,
        color: '#000',
        fontSize: Hp(0.032),
        marginLeft: Hp(0.02),
        lineHeight: Hp(0.042),
    }
})

const mapStateToProps = state => ({
    theme: state.global.theme,
    favorites: state.global.favorites,
    showFlickr: state.global.settings.showFlickr,
    showYoutube: state.global.settings.showYoutube,
    showInstagram: state.global.settings.showInstagram,
    heightUnitOfMeasure: state.global.settings.heightUnitOfMeasure,
    weightUnitOfMeasure: state.global.settings.weightUnitOfMeasure
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BreedDetails)
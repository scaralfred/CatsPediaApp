import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import breeds from '../../scraper/breeds';
import BreedBoxLarge from '../component/BreedBoxes/BreedBoxLarge';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { Hp, Wp, isIphoneX, isIos } from '../lib/util';
import SortableList from 'react-native-sortable-list';
import { font } from '../styles/variables';
import BreedBoxLargeShort from '../component/BreedBoxes/BreedBoxLargeShort';
import BreedBoxLargeTall from '../component/BreedBoxes/BreedBoxLargeTall';
import BreedBoxHalfSize from '../component/BreedBoxes/BreedBoxHalfSize';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import BottomTabsBar from '../component/bottomTabsBar/BottomTabsBar';
import FeaIcon from 'react-native-vector-icons/Feather';
import OcIcon from 'react-native-vector-icons/Octicons';
import { FbAdsSmallBanner } from '../lib/fbAds';

class Favorites extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidAppear() {
        this.props.actions.setTab(2);
    }

    componentWillMount () {
        // alert(JSON.stringify(breeds))
    }

    openSideMenu = () => {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: true,
                },
            }
        });
    }

    scrollToTop = (animation) => {
        this.favoritesRef.scrollToOffset({ animated: true, offset: 0 });
    }

   render() {

        const {favorites, favoritesLayout} = this.props;
        const  { barIconColor, iconMainColor, backgroundColor, primaryColor } = this.props.theme;

        return (
                <View style={styles.container}>
                    {/* <View>
                        <Text>SELECTED TAB => {this.props.selectedTab}</Text>
                        <Text>RATE GIVEN => {this.props.appRatingGiven ? 'true' : 'false'}  </Text>
                        <Text>OPEN APP COUNT => {this.props.appOpenCount}</Text>
                    </View> */}
                    <View style={{zIndex: 1000, marginRight: Wp(0.035)}}>
                        <MenuTrigger>
                            <View style={[styles.header, {backgroundColor}]}>
                                <TouchableOpacity onPress={this.openSideMenu}
                                                  activeOpacity={0.8}
                                                  style={styles.sideMenuIconContainer}>
                                    <OcIcon name="three-bars" size={Hp(0.04)} color={barIconColor} /> 
                                    {/* <FeaIcon name="menu" size={Hp(0.05)} color="#000" /> */}
                                    {/* <FastImage source={require('../assets/icons/side-menu-black.png')}
                                               style={styles.sideMenuImage}
                                               resizeMode={'contain'}
                                    /> */}
                                </TouchableOpacity>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.headerText, {color: barIconColor}]}>Favorites</Text>
                                </View>
                                <Menu>
                                    <MenuTrigger>
                                        <View style={styles.contextualMenuContainer}>
                                            <FeaIcon name="more-vertical" size={Hp(0.04)} color={barIconColor} />
                                            {/* <FastImage source={require('../assets/icons/three-dots-black.png')}
                                                       style={{ width: Wp(0.075), height: Wp(0.075) }}
                                                       resizeMode={'contain'}
                                            /> */}
                                        </View>
                                    </MenuTrigger>
                                    <MenuOptions optionsContainerStyle={[styles.contextualMenuList]}>
                                        <MenuOption onSelect={() => Navigation.showOverlay({ component: { name: 'LayoutOptionsModal', passProps: {favorites} } })}>
                                            <View style={{flexDirection: 'row', alignItems: 'center' }}>
                                                <FeaIcon name="layout" size={Hp(0.035)} style={{marginLeft: Wp(0.02), marginRight: Wp(0.03)}} color={primaryColor} />
                                                {/* <FastImage source={require('../assets/icons/layout-black.png')}
                                                           style={styles.contextualMenuImage}
                                                           resizeMode={'contain'}
                                                /> */}
                                                <Text style={[styles.menuText]}>Favorites layout</Text>
                                            </View>
                                        </MenuOption>
                                        <MenuOption onSelect={() => Navigation.push(this.props.componentId, { component: { name: 'Settings' } })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <FeaIcon name="settings" size={Hp(0.035)} style={{marginLeft: Wp(0.02), marginRight: Wp(0.03)}} color={primaryColor} />
                                                {/* <FastImage source={require('../assets/icons/settings-empty-black.png')}
                                                           style={styles.contextualMenuImage}
                                                           resizeMode={'contain'}
                                                /> */}
                                                <Text style={styles.menuText}>Settings</Text>
                                            </View>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </View>
                        </MenuTrigger>
                    </View>
                    <FbAdsSmallBanner />
                    <FlatList
                        ref={(ref) => { this.favoritesRef = ref; }}
                        style={{ marginHorizontal: Wp(0.014)}}
                        contentContainerStyle={{paddingTop: Hp(0.016), paddingBottom: Hp(0.14)}}
                        columnWrapperStyle={favoritesLayout == '3' ? { paddingBottom: Hp(0.004) } : null}
                        showsVerticalScrollIndicator={false}
                        key={(favoritesLayout == '3' ? '3' : '1')}
                        numColumns={favoritesLayout == '3' ? 2 : 1}
                        data={breeds.filter(el => favorites.includes(el.id))}
                        ListEmptyComponent={()=> {
                            return (
                                <View style={{paddingTop: Hp(0.25), alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{paddingHorizontal: Hp(0.05), textAlign: 'center', fontFamily: font.medium, fontSize: Hp(0.025), letterSpacing: 1}}>No Favorites!</Text>
                                </View>
                            )
                        }}
                        renderItem={({ item, index }) => {
                            const properties = {
                                breed: item,
                                isFavorite: favorites.includes(item.id),
                                addToFavorites: (id) => this.props.actions.addToFavorites(id),
                                removeFromFavorites: (id) => this.props.actions.removeFromFavorites(id),
                                componentId: this.props.componentId,
                                heightUnitOfMeasure: this.props.heightUnitOfMeasure,
                                weightUnitOfMeasure: this.props.weightUnitOfMeasure
                            }

                            if (favoritesLayout == '1') return <BreedBoxLargeTall {...properties} />
                            if (favoritesLayout == '2') return <BreedBoxLarge {...properties} />
                            if (favoritesLayout == '3') return <BreedBoxHalfSize {...properties} />
                            if (favoritesLayout == '4') return <BreedBoxLargeShort {...properties} />
                        }}
                        keyExtractor={item => item.id}
                    />
                    <BottomTabsBar setTab={(tabIndex)=> this.props.actions.setTab(tabIndex)} tabNumber={2} onTabReselected={() => this.scrollToTop(true)} componentId={this.props.componentId}/>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: isIphoneX() ? 35 : isIos() ? 20 : null,
        paddingBottom: isIphoneX() ? 18 : isIos() ? 5 : null,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Hp(0.08),
        backgroundColor: 'white',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2.62,
        // elevation: 4
    },
    headerText: {
        fontFamily: font.medium,
        fontSize: Hp(0.04),
        marginLeft: -Wp(0.05)
    },
    contextualMenuContainer: {
        marginRight: -Wp(0.035),
        width: Wp(0.09),
        justifyContent: 'center',
        alignItems: 'center'
    },
    contextualMenuList: {
        marginTop: Hp(0.065),
        width: Wp(0.6),
        paddingTop: Hp(0.014),
        paddingLeft: Hp(0.007),
        paddingBottom: Hp(0.014)
    },
    contextualMenuImage: {
        width: Wp(0.06),
        height: Wp(0.06),
        margin: Wp(0.02),
        marginRight: Wp(0.033),
    },
    menuText: {
        fontFamily: font.medium,
        fontSize: Hp(0.028),
    },
    layoutOptionsContainer: {
        height: '100%',
        width: Wp(0.15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    layoutOptionsImage: {
        width: Wp(0.07),
        height: Wp(0.07)
    },
    sideMenuIconContainer: {
        height: '100%',
        width: Wp(0.14),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sideMenuImage: {
        width: Wp(0.07),
        height: Wp(0.07)
    }
})

const mapStateToProps = state => ({
    selectedTab: state.global.tab,
    appRatingGiven: state.global.appRatingGiven,
    appOpenCount: state.global.appOpenCount,
    theme: state.global.theme,
    favorites: state.global.favorites,
    favoritesLayout: state.global.settings.favoritesLayout,
    heightUnitOfMeasure: state.global.settings.heightUnitOfMeasure,
    weightUnitOfMeasure: state.global.settings.weightUnitOfMeasure
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
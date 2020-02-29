import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator,Dimensions, Animated } from 'react-native';
import BreedBoxLarge from '../component/BreedBoxes/BreedBoxLarge';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { Hp, Wp, isIphoneX, isIos } from '../lib/util';
import SearchBar from '../component/UI/SearchBar';
import BreedBoxLargeTall from '../component/BreedBoxes/BreedBoxLargeTall';
import BreedBoxHalfSize from '../component/BreedBoxes/BreedBoxHalfSize';
import BreedBoxLargeShort from '../component/BreedBoxes/BreedBoxLargeShort';
import breeds from '../../scraper/breeds';
import { Navigation } from 'react-native-navigation';
import BottomTabsBar from '../component/bottomTabsBar/BottomTabsBar';
import { font } from '../styles/variables';
import { FbAdsSmallBanner, FbAdsInterstitial } from '../lib/fbAds';

let { width } = Dimensions.get("window");

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

class AllBreeds extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            },
            statusBar: {
                visible: true,
                backgroundColor: '#fff',
                style: 'dark'
            }
        };
    }

    state = { 
        applyingFilters: false,
        scrollPosition: 0
    }

    componentWillMount() {
        this.props.actions.clearSearchField();
        this.props.actions.setInitialFilters();
        this.onFilterApplied();
    };

    componentDidMount() {
        !this.props.appRatingGiven && this.props.appOpenCount >= 5 ? 
        setTimeout(() => {
            this.setState({ onAppRating: true})
            Navigation.showOverlay({component: {name: 'RateApp', options: {passProps: {componentId: this.props.componentId}} }});
        }, 25000)
        : null;
        this.props.actions.increaseOpenAppCount();
        FbAdsInterstitial();
    }

    constructor(props) { 
        super(props);
        Navigation.events().bindComponent(this);
        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        //Create the layout provider
        //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
        //Second: Given a type and object set the height and width for that type on given object
        //If you need data based check you can access your data provider here
        //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
        //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
        
        const { favorites, mainLayout} = this.props;

        this._layoutProvider = new LayoutProvider(
            index => {
                if (mainLayout != '3') {
                    return ViewTypes.FULL;
                } else if (index % 2 === 1) {
                    return ViewTypes.HALF_LEFT;
                } else {
                    return ViewTypes.HALF_RIGHT;
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = (width - Wp(0.032)) / 2;
                        dim.height = Hp(0.196);
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = (width - Wp(0.032)) / 2;
                        dim.height = Hp(0.196);
                        break;
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = mainLayout == '1' ? Hp(0.37) : mainLayout == '2' ? Hp(0.166) : mainLayout == '4' ? Hp(0.096) : 0;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        
        this.state = {
            dataProvider: dataProvider.cloneWithRows(breeds)
        };
        
    }

    componentDidAppear() {
        this.props.actions.setTab(0);
    }

    componentWillReceiveProps(nextProps) {
        const { mainLayout } = nextProps;

        
        if (this.props.mainLayout != mainLayout) {
            this._layoutProvider = new LayoutProvider(
                index => {
                    if (mainLayout != '3') {
                        return ViewTypes.FULL;
                    } else if (index % 2 === 1) {
                        return ViewTypes.HALF_LEFT;
                    } else {
                        return ViewTypes.HALF_RIGHT;
                    }
                },
                (type, dim) => {
                    switch (type) {
                        case ViewTypes.HALF_LEFT:
                            dim.width = (width - Wp(0.032)) / 2;
                            dim.height = Hp(0.196);
                            break;
                        case ViewTypes.HALF_RIGHT:
                            dim.width = (width - Wp(0.032)) / 2;
                            dim.height = Hp(0.196);
                            break;
                        case ViewTypes.FULL:
                            dim.width = width;
                            dim.height = mainLayout == '1' ? Hp(0.37) : mainLayout == '2' ? Hp(0.166) : mainLayout == '4' ? Hp(0.096) : 0;
                            break;
                        default:
                            dim.width = 0;
                            dim.height = 0;
                    }
                }
            );
            this.setState({applyingFilters: true});
            setTimeout(() => this.setState({applyingFilters: false}), 200);
        }
    }

    //Given type and data return the view component
    _rowRenderer(type, item) {
        //You can return any view here, CellContainer has no special significance

        const { favorites, mainLayout} = this.props;

        const properties = {
            breed: item,
            isFavorite: favorites.includes(item.id),
            addToFavorites: (id) => this.props.actions.addToFavorites(id),
            removeFromFavorites: (id) => this.props.actions.removeFromFavorites(id),
            componentId: this.props.componentId,
            heightUnitOfMeasure: this.props.heightUnitOfMeasure,
            weightUnitOfMeasure: this.props.weightUnitOfMeasure
        }

        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                        <BreedBoxHalfSize {...properties} />
                );
            case ViewTypes.HALF_RIGHT:
                return (
                        <BreedBoxHalfSize {...properties} />
                );
            case ViewTypes.FULL:
                    if (mainLayout == '1') return <BreedBoxLargeTall {...properties} />
                    if (mainLayout == '2') return <BreedBoxLarge {...properties} />
                    if (mainLayout == '4') return <BreedBoxLargeShort {...properties} />
            default:
                return null;
        }
    }









    openFilters() {
        Navigation.showOverlay({ component: {
            name: 'Filters',
            passProps: {
                applyingFilters: ()=> this.onFilterApplied()
                } 
            }
        })
    };

    onFilterApplied(){
        this.setState({applyingFilters: true});
        setTimeout(() => {
            this.setState({applyingFilters: false});
        }, 400);
    }

    scrollToTop = (animation) => {
        this.allBreedsRef.scrollToOffset(0, 0, true);
    }

   render() {
        const { primaryColor } = this.props.theme;
       
        return (
                <View style={styles.container}>
                    {/* <View>
                        <Text>RATE GIVEN => {this.props.appRatingGiven ? 'true' : 'false'}  </Text>
                        <Text>OPEN APP COUNT => {this.props.appOpenCount}</Text>
                    </View> */}
                    <View style={{zIndex: 1000}}>
                        <SearchBar scrollPosition={this.state.scrollPosition} onPressFilters={()=> this.openFilters()} componentId={this.props.componentId} />
                        <FbAdsSmallBanner />
                    </View>
                    {this.state.applyingFilters ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color={primaryColor} />
                    </View> 
                    : 
                    <RecyclerListView layoutProvider={this._layoutProvider} 
                                      dataProvider={this.state.dataProvider} 
                                      rowRenderer={this._rowRenderer} 
                                      ref={(ref) => { this.allBreedsRef = ref; }}
                                      onScroll={(e)=> {
                                        const offsetY = e.nativeEvent.contentOffset.y
                                        this.setState({scrollPosition: offsetY})
                                      }}
                                      style={{marginHorizontal: Wp(0.014), paddingTop: Hp(0.016)}}
                                      renderFooter={()=> <View style={{paddingBottom: Hp(0.14)}}/>}
                                      />
                    }
                    <BottomTabsBar setTab={(tabIndex)=> this.props.actions.setTab(tabIndex)} tabNumber={0} onTabReselected={() => this.scrollToTop(true)} componentId={this.props.componentId}/>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: isIphoneX() ? 35 : isIos() ? 20 : null,
        paddingBottom: isIphoneX() ? 18 : isIos() ? 5 : null,
        backgroundColor: '#fff'
    }
})

const mapStateToProps = state => ({
    selectedTab: state.global.tab,
    appRatingGiven: state.global.appRatingGiven,
    appOpenCount: state.global.appOpenCount,
    theme: state.global.theme,
    sortBy: state.global.sortBy,
    favorites: state.global.favorites,
    search: state.global.search,
    mainLayout: state.global.settings.mainLayout,
    heightUnitOfMeasure: state.global.settings.heightUnitOfMeasure,
    weightUnitOfMeasure: state.global.settings.weightUnitOfMeasure,
    selectedBreedGroups: state.global.filters.selectedBreedGroups,
    selectedClubs: state.global.filters.selectedClubs
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AllBreeds)
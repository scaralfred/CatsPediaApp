import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  Text, StyleSheet, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native';
import { Hp, Wp, KgToLbs, CmToFt, isIphoneX, isIos } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Collapsible from 'react-native-collapsible';
import { CheckBox } from '../component/UI/CheckBox';
import FastImage from 'react-native-fast-image';
import FeaIcon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';

class Filters extends Component {

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
        scrollEnabled: true,
        breedGroupsCollapsed: false,
        selectedClubsCollapsed: false,
        initialFilters: null,
        filters: null,
        sortByCriteria: null
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=> Navigation.dismissOverlay(this.props.componentId));
    }
    
    componentWillUnmount() {
    this.backHandler.remove()
    }

    componentWillMount() {
        const { filters, sortByCriteria } = this.props;
        this.setState({filters, sortByCriteria});
    }

    applyFilters(){
        this.props.applyingFilters();
        this.props.actions.sortByCriteria(this.state.sortByCriteria)
        this.props.actions.setFilters(this.state.filters);
        setTimeout(() => Navigation.dismissOverlay(this.props.componentId), 200);
    }

    resetFilters(){
        const { initialFilters } = this.props;
        this.props.actions.resetFilters();
        this.setState({filters: initialFilters})
    }

    renderHeader() {
        const { primaryColor } = this.props.theme;
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.resetFilters()}
                                  activeOpacity={0.8}
                                  style={[styles.backButtonContainer]}>
                    <Text style={[styles.valuesText, {color: primaryColor, fontSize: Hp(0.028), fontFamily: font.medium}]}>Reset</Text>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerText}>Filters</Text>
                </View>
                <TouchableOpacity onPress={() => Navigation.dismissOverlay(this.props.componentId)}
                                  activeOpacity={0.8}
                                  style={styles.closeButtonContainer}>
                    {/* <FeaIcon name="x" size={Hp(0.052)} color="#000" /> */}
                    <FastImage source={require('../assets/icons/close-black-2.png')}
                               style={{ width: Wp(0.06), height: Wp(0.06) }}
                               resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderSortBy() {

        const { sortByCriteria } = this.state;
        const { primaryColor } = this.props.theme;

        const CriteriaBlock = ({onPress, criteria, selected}) => (
            <TouchableOpacity activeOpacity={0.9} 
                              style={[styles.criteriaStyle, selected ? {borderColor: primaryColor, /*backgroundColor: '#000'*/ } : null]}
                              onPress={onPress}>
                <Text style={[styles.criteriaText, selected ? { fontFamily: font.medium, fontSize: Hp(0.023), color: primaryColor, marginTop: -Hp(0.005) } : null]}>{criteria}</Text>
                <View style={[styles.criteriaUnderline, selected && {backgroundColor: primaryColor}]}/>
            </TouchableOpacity>

        )
        
        return (
            <View style={[styles.settingOptionContainer, {paddingTop: Hp(0.002), paddingBottom: Hp(0.01), paddingRight: Hp(0.01)}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText, { marginRight: Wp(0.01)}]}>Sort by:</Text>
                    <ScrollView contentContainerStyle={{paddingLeft: Wp(0.01), paddingRight: 0, alignItems: 'center', paddingTop: Hp(0.018)}}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                    >
                        <CriteriaBlock criteria='Name' selected={sortByCriteria == 'name'} onPress={()=> this.setState({sortByCriteria: 'name'})}/>
                        <CriteriaBlock criteria='Popularity' selected={sortByCriteria == 'popularity'} onPress={()=> this.setState({sortByCriteria: 'popularity'})}/>
                        <CriteriaBlock criteria='Size (B to s)' selected={sortByCriteria == 'size(B|S)'} onPress={()=> this.setState({sortByCriteria: 'size(B|S)'})}/>
                        <CriteriaBlock criteria='Size (s to B)' selected={sortByCriteria == 'size(S|B)'} onPress={()=> this.setState({sortByCriteria: 'size(S|B)'})}/>
                    </ScrollView>
                </View>
            </View>
        )
    }

    renderSizeFilter() {

        const { minHeight, maxHeight, theme } = this.props;
        const { primaryColor } = this.props.theme;
        const { filters } = this.state;

        // const sizeTargets = {
        //     toy: [0,25],
        //     small: [26,40],
        //     medium: [41,60],
        //     big: [61 - 150]
        // }

        const SizeBlock = ({onPress, size, selected}) => (
            <TouchableOpacity activeOpacity={0.9} 
                              style={[styles.filterBlock, selected ? {borderColor: primaryColor, backgroundColor: primaryColor } : null]}
                              onPress={onPress}>
                <Text style={[styles.filterBlockText, selected ? { color: '#fff' } : null]}>{size}</Text>
            </TouchableOpacity>

        )

        let toySelected = filters.heightRange[0] <= 25 && filters.heightRange[1] > minHeight;
        let smallSelected = filters.heightRange[0] <= 40 && filters.heightRange[1] >= 26;
        let mediumSelected = filters.heightRange[0] <= 60 && filters.heightRange[1] >= 41;
        let bigSelected = filters.heightRange[1] > 60 && filters.heightRange[0] < maxHeight;
        let allSizesSelected = toySelected && smallSelected && mediumSelected && bigSelected;
        
        return (
            <View style={[styles.settingOptionContainer, {paddingTop: Hp(0.02)}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText]}>Size:</Text>
                    <ScrollView horizontal 
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{paddingHorizontal: Wp(0.04), marginTop: Hp(0.004)}}>
                        <SizeBlock size='Toy' 
                                   selected={toySelected}
                                   onPress={()=> {
                                        if (toySelected) {
                                            allSizesSelected ? this.setState({filters: { ...filters, heightRange: [minHeight, 25]}}) :
                                            smallSelected ? this.setState({filters: { ...filters, heightRange: [26, filters.heightRange[1]]}}) : 
                                            this.setState({filters: { ...filters, heightRange: [minHeight, minHeight]}})
                                        } else {
                                            let rightPin = smallSelected ? filters.heightRange[1] : 25;
                                            mediumSelected ? this.setState({filters: { ...filters, heightRange: [ minHeight, filters.heightRange[1]]}}) :
                                            this.setState({filters: { ...filters, heightRange: [minHeight, rightPin]}})
                                        }
                                   }}/>
                        <SizeBlock size='Small' 
                                   selected={smallSelected}
                                   onPress={()=> {
                                        if (smallSelected) {
                                            allSizesSelected ? this.setState({filters: { ...filters, heightRange: [26, 40]}}) :
                                            mediumSelected && toySelected ? this.setState({filters: { ...filters, heightRange: [26, 40]}}) :
                                            mediumSelected ? this.setState({filters: { ...filters, heightRange: [41, filters.heightRange[1]]}}) :
                                            toySelected ? this.setState({filters: { ...filters, heightRange: [filters.heightRange[0], 25]}}) :
                                            this.setState({filters: { ...filters, heightRange: [minHeight, minHeight]}})
                                        } else {
                                            bigSelected && !mediumSelected ? this.setState({filters: { ...filters, heightRange: [26, filters.heightRange[1]]}}) :
                                            mediumSelected ? this.setState({filters: { ...filters, heightRange: [26, filters.heightRange[1]]}}) :
                                            toySelected ? this.setState({filters: { ...filters, heightRange: [filters.heightRange[0], 40]}}) :
                                            this.setState({filters: { ...filters, heightRange: [26, 40]}})
                                        }
                                   }}/>
                        <SizeBlock size='Medium' 
                                   selected={mediumSelected}
                                   onPress={()=> {
                                        if (mediumSelected) {
                                            allSizesSelected ? this.setState({filters: { ...filters, heightRange: [41, 60]}}) :
                                            bigSelected && smallSelected ? this.setState({filters: { ...filters, heightRange: [41, 60]}}) :
                                            bigSelected ? this.setState({filters: { ...filters, heightRange: [61, filters.heightRange[1]]}}) :
                                            smallSelected ? this.setState({filters: { ...filters, heightRange: [filters.heightRange[0], 40]}}) :
                                            this.setState({filters: { ...filters, heightRange: [maxHeight, maxHeight]}})
                                        } else {
                                            toySelected && !smallSelected ? this.setState({filters: { ...filters, heightRange: [filters.heightRange[0], 60]}}) :
                                            bigSelected ? this.setState({filters: { ...filters, heightRange: [41, filters.heightRange[1]]}}) :
                                            smallSelected ? this.setState({filters: { ...filters, heightRange: [filters.heightRange[0], 60]}}) :
                                            this.setState({filters: { ...filters, heightRange: [41, 60]}})
                                        }
                                   }}/>
                        <SizeBlock size='Big' 
                                   selected={bigSelected}
                                   onPress={()=> {
                                        if (bigSelected) {
                                            allSizesSelected ? this.setState({filters: { ...filters, heightRange: [61, maxHeight]}}) :
                                            mediumSelected ? this.setState({filters: { ...filters, heightRange: [filters.heightRange[0], 60]}}) :
                                            this.setState({filters: { ...filters, heightRange: [maxHeight, maxHeight]}});
                                        } else {
                                            let leftPin = mediumSelected ? filters.heightRange[0] : 61;
                                            smallSelected ? this.setState({filters: { ...filters, heightRange: [ filters.heightRange[0], maxHeight]}}) :
                                            this.setState({filters: { ...filters, heightRange: [leftPin, maxHeight]}})
                                        }
                                        
                                   }}/>
                    </ScrollView>
                </View>
                <View style={{ alignItems: 'center'}}>
                  
                </View>
            </View>
        )
    }

    renderCustomSliderMarker = (value, unitOfMeasure) => {
        const { primaryColor } = this.props.theme;
        var convertedValue = unitOfMeasure == 'Lbs' ? KgToLbs(value) : unitOfMeasure == 'Ft/In' ? CmToFt(value) : value;
        var unit = unitOfMeasure == 'Ft/In' ? '' : (' ' + unitOfMeasure)

        return (
          <View style={{ alignItems: 'center', width: Wp(0.2)}}>
            <View style={[styles.customMarkerSlider, {borderColor: primaryColor}]} />
            {/* <View>
                <Text style={[styles.valuesText]}>{convertedValue}{unit}</Text>
            </View> */}
          </View>
        )
      };

    renderHeightFilter() {
        const { heightUnitOfMeasure } = this.props;
        const { primaryColor } = this.props.theme;

        var convertedValue = (value, unitOfMeasure) =>
            unitOfMeasure == 'Lbs' ? KgToLbs(value) : unitOfMeasure == 'Ft/In' ? CmToFt(value) : value;
        var convertedUnit = (unitOfMeasure) =>
            unitOfMeasure == 'Ft/In' ? '' : (' ' + unitOfMeasure.toLowerCase())

        return (
            <View style={[styles.settingOptionContainer, { paddingBottom: Hp(0.006)}]}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.settingText, {flex: 1}]}>Height:</Text>
                    <Text style={[styles.valuesText]}>{convertedValue(this.state.filters.heightRange[0], heightUnitOfMeasure)}{convertedUnit(heightUnitOfMeasure)} - </Text>
                    <Text style={[styles.valuesText]}>{convertedValue(this.state.filters.heightRange[1], heightUnitOfMeasure)}{convertedUnit(heightUnitOfMeasure)}</Text>
                </View>
                <View style={{ alignItems: 'center'}}>
                    <MultiSlider isMarkersSeparated={true}
                                 values={this.state.filters.heightRange}
                                 min={this.props.initialMinHeight}
                                 max={this.props.initialMaxHeight}
                                 sliderLength={Wp(1) - Wp(0.3)}
                                 customMarkerLeft={(e) => this.renderCustomSliderMarker(e.currentValue, heightUnitOfMeasure)}
                                 customMarkerRight={(e) => this.renderCustomSliderMarker(e.currentValue, heightUnitOfMeasure)}
                                 unselectedStyle={{ backgroundColor: '#bdbdbd', borderRadius: Hp(0.025) }}
                                 selectedStyle={{ backgroundColor: primaryColor }}
                                 touchDimensions={{ height: 100,  width: 100, borderRadius: 20, slipDisplacement: 400 }}
                                 onValuesChange={(values) => this.setState({...this.state, filters: {...this.state.filters, heightRange: values}})}
                                 />
                </View>
            </View>
        )
    }

    renderWeightFilter() {

        const { weightUnitOfMeasure } = this.props;
        const { primaryColor } = this.props.theme;

        var convertedValue = (value, unitOfMeasure) =>
            unitOfMeasure == 'Lbs' ? KgToLbs(value) : unitOfMeasure == 'Ft/In' ? CmToFt(value) : value;
        var convertedUnit = (unitOfMeasure) =>
            unitOfMeasure == 'Ft/In' ? '' : (' ' + unitOfMeasure.toLowerCase())
        
        return (
            <View style={[styles.settingOptionContainer, { paddingBottom: Hp(0.006)}]}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.settingText, {flex: 1}]}>Weight:</Text>
                    <Text style={[styles.valuesText]}>{convertedValue(this.state.filters.weightRange[0], weightUnitOfMeasure)}{convertedUnit(weightUnitOfMeasure)} - </Text>
                    <Text style={[styles.valuesText]}>{convertedValue(this.state.filters.weightRange[1], weightUnitOfMeasure)}{convertedUnit(weightUnitOfMeasure)}</Text>
                </View>
                <View style={{ alignItems: 'center'}}>
                    <MultiSlider isMarkersSeparated={true}
                                 values={this.state.filters.weightRange}
                                 min={this.props.initialMinWeight}
                                 max={this.props.initialMaxWeight}
                                 sliderLength={Wp(1) - Wp(0.3)}
                                 customMarkerLeft={(e) => this.renderCustomSliderMarker(e.currentValue, weightUnitOfMeasure)}
                                 customMarkerRight={(e) => this.renderCustomSliderMarker(e.currentValue, weightUnitOfMeasure)}
                                 unselectedStyle={{ backgroundColor: '#bdbdbd', borderRadius: Hp(0.025) }}
                                 selectedStyle={{ backgroundColor: primaryColor }}
                                 touchDimensions={{ height: 100,  width: 100, borderRadius: 20, slipDisplacement: 400 }}
                                 onValuesChange={(values) => this.setState({...this.state, filters: {...this.state.filters, weightRange: values}})}
                                 />
                </View>
            </View>
        )
    }

    
    renderLifeSpanFilter() {
        
        return (
            <View style={styles.settingOptionContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.settingText, {flex: 1}]}>Life Span</Text>
                </View>
                <View style={{ alignItems: 'center'}}>
                    <MultiSlider isMarkersSeparated={true}
                                 values={this.state.filters.lifeSpan}
                                 min={0}
                                 max={20}
                                 sliderLength={Wp(1) - Wp(0.3)}
                                 customMarkerLeft={(e) => this.renderCustomSliderMarker(e.currentValue, 'lbs')}
                                 customMarkerRight={(e) => this.renderCustomSliderMarker(e.currentValue, 'lbs')}
                                 unselectedStyle={{ backgroundColor: '#bdbdbd' }}
                                 selectedStyle={{ backgroundColor: '#000' }}
                                 touchDimensions={{ height: 100,  width: 100, borderRadius: 20, slipDisplacement: 400 }}
                                 onValuesChange={(values) => this.setState({...this.state, filters: {...this.state.filters, lifeSpan: values}})}
                                 />
                </View>
            </View>
        )
    }

    renderBreedGroupSelector() {
        const { breedGroups } = this.props;
        const {breedGroupsCollapsed, clubsCollapsed, filters} = this.state;
        const {selectedBreedGroups} = filters;
        const { primaryColor } = this.props.theme;

        const BreedGroupRow = ({name, checked}) => (
            <TouchableOpacity onPress={()=> {
                               !checked ? this.setState({...this.state, filters: {...this.state.filters, selectedBreedGroups: [...selectedBreedGroups, name]}}) 
                               : this.setState({...this.state, filters: {...this.state.filters, selectedBreedGroups: selectedBreedGroups.filter(e => e !== name)}})
                              }}
                              activeOpacity={0.8} 
                              style={{flexDirection: 'row', alignItems: 'center', paddingVertical: Hp(0.018)}}>
                <Text style={[styles.breedGroupsText, {flex: 1}]}>{name}</Text>
                <CheckBox color={primaryColor} checked={checked}/>
            </TouchableOpacity>
        )
        
        return (
            <View style={[styles.settingOptionContainer, {paddingBottom: Hp(0.015),}]}>
                <TouchableOpacity activeOpacity={1} 
                                  onPress={()=> {
                                      setTimeout(() => {
                                        !breedGroupsCollapsed && !clubsCollapsed ? this.scrollViewFilters.scrollTo({ y: 1000, animated: true }) : null;
                                      }, 500);
                                      this.setState({breedGroupsCollapsed: !breedGroupsCollapsed});
                                  }} 
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText, {flex: 1, color: selectedBreedGroups.length > 0 ? primaryColor : null}]}>Breed Groups</Text>
                    <FeaIcon name={`chevron-${!breedGroupsCollapsed ? 'down' : 'up'}`} style={{marginRight: -Hp(0.01)}} size={Hp(0.05)} color={selectedBreedGroups.length > 0 ? primaryColor : '#000'} />
                </TouchableOpacity>
                <Collapsible collapsed={!breedGroupsCollapsed}>
                    <View style={{ alignItems: 'center', paddingHorizontal: Hp(0.003), paddingTop: Hp(0.008)}}>
                        {breedGroups.map(el => <BreedGroupRow name={el} checked={selectedBreedGroups.includes(el)}/>)}
                    </View>
                </Collapsible>
            </View>
        )
    }

    renderClubsSelector() {
        const {clubsCollapsed, filters} = this.state;
        const {selectedClubs} = filters;
        const { primaryColor } = this.props.theme;

        const clubs = [ 'Federation Cynologique Internationale', 'American Kennel Club', 'Australian National Kennel Council',
                        'Canadian Kennel Club', 'The Kennel Club', 'New Zealand Kennel Club', 'UnitedKennelClub']

        const ClubRow = ({name, checked}) => (
            <TouchableOpacity onPress={()=> {
                               !checked ? this.setState({...this.state, filters: {...this.state.filters, selectedClubs: [...selectedClubs, name]}}) 
                               : this.setState({...this.state, filters: {...this.state.filters, selectedClubs: selectedClubs.filter(e => e !== name)}})
                              }}
                              activeOpacity={0.8} 
                              style={{flexDirection: 'row', alignItems: 'center', paddingVertical: Hp(0.018)}}>
                <Text style={[styles.breedGroupsText, {flex: 1}]}>{name}</Text>
                <CheckBox color={primaryColor} checked={checked}/>
            </TouchableOpacity>
        )
        
        return (
            <View style={[styles.settingOptionContainer, {paddingBottom: Hp(0.015),}]}>
                <TouchableOpacity activeOpacity={1}  
                                  onPress={()=> {
                                    setTimeout(() => {
                                      !clubsCollapsed ? this.scrollViewFilters.scrollTo({ y: 1500, animated: true }) : null;
                                    }, 500);
                                    this.setState({clubsCollapsed: !clubsCollapsed});
                                  }} 
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText, {flex: 1, color: selectedClubs.length > 0 ? primaryColor : null}]}>Federations & Clubs</Text>
                    <FeaIcon name={`chevron-${!clubsCollapsed ? 'down' : 'up'}`} style={{marginRight: -Hp(0.01)}} size={Hp(0.05)} color={selectedClubs.length > 0 ? primaryColor : '#000'} />
                </TouchableOpacity>
                <Collapsible collapsed={!clubsCollapsed}>
                    <View style={{ alignItems: 'center', paddingHorizontal: Hp(0.003), paddingTop: Hp(0.008)}}>
                        {clubs.map(el => <ClubRow name={el} checked={selectedClubs.includes(el)}/>)}
                    </View>
                </Collapsible>
            </View>
        )
    }

    renderApplyButton() {
        const { primaryColor } = this.props.theme;
        return (
            <View style={{ flexDirection: 'row', padding: Wp(0.05), paddingTop: Wp(0.03)}}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=> this.applyFilters()} style={[styles.button, {backgroundColor: primaryColor}]}>
                    <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        )
    }

   render() {

        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <ScrollView contentContainerStyle={styles.scrollViewFilters}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            ref={c => (this.scrollViewFilters = c)}
                            scrollEnabled={this.state.scrollEnabled}
                            >
                    {this.renderSortBy()}
                    {this.renderSizeFilter()}
                    {this.renderHeightFilter()}
                    {this.renderWeightFilter()}
                    {/* {this.renderLifeSpanFilter()} */}
                    {this.renderBreedGroupSelector()}
                    {this.renderClubsSelector()}
                </ScrollView>
                {this.renderApplyButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: isIphoneX() ? 25 : isIos() ? 15 : null
    },
    header: {
        flexDirection: 'row',
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
        width: Wp(0.25),
        paddingLeft: Wp(0.045),
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row'
    },
    closeButtonContainer: {
        paddingTop: isIos() ? Hp(0.01) : null,
        width: Wp(0.25),
        paddingRight: Wp(0.045),
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        flexDirection: 'row'
    },
    contentContainer: {
        padding: Wp(0.05)
    },
    settingText: {
        fontFamily: font.medium,
        fontSize: Hp(0.028)
    },
    scrollViewFilters: {
        paddingTop: Hp(0.016),
        padding: Hp(0.02),
    },
    settingOptionContainer: {
        borderRadius: Hp(0.004),
        padding: Hp(0.02),
        paddingTop: Hp(0.012),
        paddingBottom: Hp(0.022),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: Hp(0.014)
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
    customMarkerSlider: {
        backgroundColor: '#fff',
        height: Hp(0.027),
        width: Hp(0.027),
        borderRadius: Hp(0.027),
        marginTop: Hp(0.003),
        borderColor: '#000',
        borderWidth: Hp(0.0035)
      },
      breedGroupsText: {
          fontFamily: font.regular,
          fontSize: Hp(0.023),
          lineHeight: Hp(0.026)
      },
      valuesText: {
        fontFamily: font.regular,
        fontSize: Hp(0.028),
        paddingTop: Hp(0.005)
    },
    criteriaStyle: {
        paddingHorizontal: Wp(0.03),
        paddingVertical: Wp(0.006),
        borderRadius: Hp(0.004),
        marginRight: Wp(0.01)
    },
    criteriaUnderline: {
        height: Hp(0.003), 
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        flexDirection: 'row',
        marginTop: Hp(0.005)
    },
    criteriaText: {
        fontFamily: font.medium,
        textAlign: 'center',
        color: '#000',
        fontSize: Hp(0.018)
    },
    filterBlock: {
        paddingHorizontal: Wp(0.03),
        paddingVertical: Wp(0.006),
        borderRadius: Hp(0.004),
        marginRight: Wp(0.038),
        borderColor: '#000',
        borderWidth: Hp(0.002)
    },
    filterBlockText: {
        fontFamily: font.medium,
        textAlign: 'center',
        color: '#000',
        fontSize: Hp(0.018)
    }
})


const mapStateToProps = state => ({
    sortByCriteria: state.global.sortBy,
    theme: state.global.theme,
    filters: state.global.filters,
    initialFilters: state.global.initialFilters,
    minLife: state.global.filters.lifeSpan[0],
    maxLife: state.global.filters.lifeSpan[1],
    breedGroups: state.global.breedGroups,
    selectedBreedGroups: state.global.filters.selectedBreedGroups,
    selectedClubs: state.global.filters.selectedClubs,
    minHeight: state.global.filters.heightRange[0],
    maxHeight: state.global.filters.heightRange[1],
    minWeight: state.global.filters.weightRange[0],
    maxWeight: state.global.filters.weightRange[1],
    initialMinHeight: state.global.initialFilters.heightRange[0],
    initialMaxHeight: state.global.initialFilters.heightRange[1],
    initialMinWeight: state.global.initialFilters.weightRange[0],
    initialMaxWeight: state.global.initialFilters.weightRange[1],
    heightUnitOfMeasure: state.global.settings.heightUnitOfMeasure,
    weightUnitOfMeasure: state.global.settings.weightUnitOfMeasure
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Filters)
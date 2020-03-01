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
import breeds from '../../scraper/breeds';

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
        breedOriginCollapsed: false,
        associationsCollapsed: false,
        bodyTypeCollapsed: false,
        coatLengthCollapsed: false,
        selectedAssociationsCollapsed: false,
        initialFilters: null,
        filters: null
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=> Navigation.dismissOverlay(this.props.componentId));
    }
    
    componentWillUnmount() {
    this.backHandler.remove()
    }

    componentWillMount() {
        const { filters } = this.props;
        this.setState({filters});
        // alert(breeds.map(el => el.origin))
        // alert(this.props.selectedBreedOrigin)
        // alert(breeds.map(el => el.bodyType))
        // alert(breeds.map(el => el.coatLength))
    }

    applyFilters(){
        this.props.applyingFilters();
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

    
    

    

    
    // renderLifeSpanFilter() {
        
    //     return (
    //         <View style={styles.settingOptionContainer}>
    //             <View style={{flexDirection: 'row'}}>
    //                 <Text style={[styles.settingText, {flex: 1}]}>Life Span</Text>
    //             </View>
    //             <View style={{ alignItems: 'center'}}>
    //                 <MultiSlider isMarkersSeparated={true}
    //                              values={this.state.filters.lifeSpan}
    //                              min={0}
    //                              max={20}
    //                              sliderLength={Wp(1) - Wp(0.3)}
    //                              customMarkerLeft={(e) => this.renderCustomSliderMarker(e.currentValue, 'lbs')}
    //                              customMarkerRight={(e) => this.renderCustomSliderMarker(e.currentValue, 'lbs')}
    //                              unselectedStyle={{ backgroundColor: '#bdbdbd' }}
    //                              selectedStyle={{ backgroundColor: '#000' }}
    //                              touchDimensions={{ height: 100,  width: 100, borderRadius: 20, slipDisplacement: 400 }}
    //                              onValuesChange={(values) => this.setState({...this.state, filters: {...this.state.filters, lifeSpan: values}})}
    //                              />
    //             </View>
    //         </View>
    //     )
    // }

    renderCoatLengthSelector() {
        const { coatLength } = this.props;
        const {coatLengthCollapsed, filters} = this.state;
        const {selectedCoatLength} = filters;
        const { primaryColor } = this.props.theme;

        const CoatLengthRow = ({name, checked}) => (
            <TouchableOpacity onPress={()=> {
                               !checked ? this.setState({...this.state, filters: {...this.state.filters, selectedCoatLength: [...selectedCoatLength, name]}}) 
                               : this.setState({...this.state, filters: {...this.state.filters, selectedCoatLength: selectedCoatLength.filter(e => e !== name)}})
                              }}
                              activeOpacity={0.8} 
                              style={{flexDirection: 'row', alignItems: 'center', paddingVertical: Hp(0.018)}}>
                <Text style={[styles.breedOriginText, {flex: 1}]}>{name}</Text>
                <CheckBox color={primaryColor} checked={checked}/>
            </TouchableOpacity>
        )
        
        return (
            <View style={[styles.settingOptionContainer, {paddingBottom: Hp(0.015),}]}>
                <TouchableOpacity activeOpacity={1} 
                                  onPress={()=> {
                                    //   setTimeout(() => {
                                    //     !breedOriginCollapsed && !associationsCollapsed ? this.scrollViewFilters.scrollTo({ y: 1000, animated: true }) : null;
                                    //   }, 500);
                                      this.setState({coatLengthCollapsed: !coatLengthCollapsed});
                                  }} 
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText, {flex: 1, color: selectedCoatLength.length > 0 ? primaryColor : null}]}>Coat Length</Text>
                    <FeaIcon name={`chevron-${!coatLengthCollapsed ? 'down' : 'up'}`} style={{marginRight: -Hp(0.01)}} size={Hp(0.05)} color={selectedCoatLength.length > 0 ? primaryColor : '#000'} />
                </TouchableOpacity>
                <Collapsible collapsed={!coatLengthCollapsed}>
                    <View style={{ alignItems: 'center', paddingHorizontal: Hp(0.003), paddingTop: Hp(0.008)}}>
                        {coatLength.map(el => <CoatLengthRow name={el} checked={selectedCoatLength.includes(el)}/>)}
                    </View>
                </Collapsible>
            </View>
        )
    }

    renderBodyTypeSelector() {
        const { bodyType } = this.props;
        const {bodyTypeCollapsed, filters} = this.state;
        const {selectedBodyType} = filters;
        const { primaryColor } = this.props.theme;

        const BodyTypeRow = ({name, checked}) => (
            <TouchableOpacity onPress={()=> {
                               !checked ? this.setState({...this.state, filters: {...this.state.filters, selectedBodyType: [...selectedBodyType, name]}}) 
                               : this.setState({...this.state, filters: {...this.state.filters, selectedBodyType: selectedBodyType.filter(e => e !== name)}})
                              }}
                              activeOpacity={0.8} 
                              style={{flexDirection: 'row', alignItems: 'center', paddingVertical: Hp(0.018)}}>
                <Text style={[styles.breedOriginText, {flex: 1}]}>{name}</Text>
                <CheckBox color={primaryColor} checked={checked}/>
            </TouchableOpacity>
        )
        
        return (
            <View style={[styles.settingOptionContainer, {paddingBottom: Hp(0.015),}]}>
                <TouchableOpacity activeOpacity={1} 
                                  onPress={()=> {
                                    //   setTimeout(() => {
                                    //     !breedOriginCollapsed && !associationsCollapsed ? this.scrollViewFilters.scrollTo({ y: 1000, animated: true }) : null;
                                    //   }, 500);
                                      this.setState({bodyTypeCollapsed: !bodyTypeCollapsed});
                                  }} 
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText, {flex: 1, color: selectedBodyType.length > 0 ? primaryColor : null}]}>Body Type</Text>
                    <FeaIcon name={`chevron-${!bodyTypeCollapsed ? 'down' : 'up'}`} style={{marginRight: -Hp(0.01)}} size={Hp(0.05)} color={selectedBodyType.length > 0 ? primaryColor : '#000'} />
                </TouchableOpacity>
                <Collapsible collapsed={!bodyTypeCollapsed}>
                    <View style={{ alignItems: 'center', paddingHorizontal: Hp(0.003), paddingTop: Hp(0.008)}}>
                        {bodyType.map(el => <BodyTypeRow name={el} checked={selectedBodyType.includes(el)}/>)}
                    </View>
                </Collapsible>
            </View>
        )
    }

    renderBreedOriginSelector() {
        const { breedOrigin } = this.props;
        const {breedOriginCollapsed, associationsCollapsed, filters} = this.state;
        const {selectedBreedOrigin} = filters;
        const { primaryColor } = this.props.theme;

        const BreedGroupRow = ({name, checked}) => (
            <TouchableOpacity onPress={()=> {
                               !checked ? this.setState({...this.state, filters: {...this.state.filters, selectedBreedOrigin: [...selectedBreedOrigin, name]}}) 
                               : this.setState({...this.state, filters: {...this.state.filters, selectedBreedOrigin: selectedBreedOrigin.filter(e => e !== name)}})
                              }}
                              activeOpacity={0.8} 
                              style={{flexDirection: 'row', alignItems: 'center', paddingVertical: Hp(0.018)}}>
                <Text style={[styles.breedOriginText, {flex: 1}]}>{name}</Text>
                <CheckBox color={primaryColor} checked={checked}/>
            </TouchableOpacity>
        )
        
        return (
            <View style={[styles.settingOptionContainer, {paddingBottom: Hp(0.015),}]}>
                <TouchableOpacity activeOpacity={1} 
                                  onPress={()=> {
                                    //   setTimeout(() => {
                                    //     !breedOriginCollapsed && !associationsCollapsed ? this.scrollViewFilters.scrollTo({ y: 1000, animated: true }) : null;
                                    //   }, 500);
                                      this.setState({breedOriginCollapsed: !breedOriginCollapsed});
                                  }} 
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText, {flex: 1, color: selectedBreedOrigin.length > 0 ? primaryColor : null}]}>Breed Origin</Text>
                    <FeaIcon name={`chevron-${!breedOriginCollapsed ? 'down' : 'up'}`} style={{marginRight: -Hp(0.01)}} size={Hp(0.05)} color={selectedBreedOrigin.length > 0 ? primaryColor : '#000'} />
                </TouchableOpacity>
                <Collapsible collapsed={!breedOriginCollapsed}>
                    <View style={{ alignItems: 'center', paddingHorizontal: Hp(0.003), paddingTop: Hp(0.008)}}>
                        {breedOrigin.map(el => <BreedGroupRow name={el} checked={selectedBreedOrigin.includes(el)}/>)}
                    </View>
                </Collapsible>
            </View>
        )
    }

    renderAssociations() {
        const {associationsCollapsed, filters} = this.state;
        const {selectedAssociations} = filters;
        const { primaryColor } = this.props.theme;

        const associations = [ 
            {name: "CFA", image: require('../assets/catsClubs/CFA.png')},
            {name: "FIFe", image: require('../assets/catsClubs/FIFe.png')},
            {name: "TICA", image: require('../assets/catsClubs/TICA.png')},
            {name: "WCF", image: require('../assets/catsClubs/WCF.png')},
            {name: "FFE", image: require('../assets/catsClubs/NO-LOGO.png')},
            {name: "AACE", image: require('../assets/catsClubs/NO-LOGO.png')},
            {name: "ACF", image:require('../assets/catsClubs/ACF.png')},
            {name: "CCA-AFC", image: require('../assets/catsClubs/CCA-AFC.png')},
            {name: "CCC of A", image: require('../assets/catsClubs/CCC-of-A.png')},
            {name: "CFF", image: require('../assets/catsClubs/CFF.png')},
            {name: "GCCF", image: require('../assets/catsClubs/GCCF.png')},
            {name: "LOOF", image: require('../assets/catsClubs/LOOF.png')},
            {name: "NZCF", image: require('../assets/catsClubs/NZCF.png')},
            {name: "SACC", image: require('../assets/catsClubs/SACC.png')}
        ]

        const AssociationRow = ({name, checked, image}) => (
            <TouchableOpacity onPress={()=> {
                               !checked ? this.setState({...this.state, filters: {...this.state.filters, selectedAssociations: [...selectedAssociations, name]}}) 
                               : this.setState({...this.state, filters: {...this.state.filters, selectedAssociations: selectedAssociations.filter(e => e !== name)}})
                              }}
                              activeOpacity={0.8} 
                              style={{flexDirection: 'row', alignItems: 'center', paddingVertical: Hp(0.018)}}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <FastImage source={image}
                               style={styles.clubIcon} 
                               resizeMode={'contain'}
                            />
                    <Text style={[styles.breedOriginText, {paddingHorizontal: Wp(0.04)}]}>{name}</Text>
                </View>
                <CheckBox color={primaryColor} checked={checked}/>
            </TouchableOpacity>
        )
        
        return (
            <View style={[styles.settingOptionContainer, {paddingBottom: Hp(0.015),}]}>
                <TouchableOpacity activeOpacity={1}  
                                  onPress={()=> {
                                    // setTimeout(() => {
                                    //   !associationsCollapsed ? this.scrollViewFilters.scrollTo({ y: 1500, animated: true }) : null;
                                    // }, 500);
                                    this.setState({associationsCollapsed: !associationsCollapsed});
                                  }} 
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingText, {flex: 1, color: selectedAssociations.length > 0 ? primaryColor : null}]}>Federations & Clubs</Text>
                    <FeaIcon name={`chevron-${!associationsCollapsed ? 'down' : 'up'}`} style={{marginRight: -Hp(0.01)}} size={Hp(0.05)} color={selectedAssociations.length > 0 ? primaryColor : '#000'} />
                </TouchableOpacity>
                <Collapsible collapsed={!associationsCollapsed}>
                    <View style={{ alignItems: 'center', paddingHorizontal: Hp(0.003), paddingTop: Hp(0.008)}}>
                        {associations.map(el => <AssociationRow name={el.name} image={el.image} checked={selectedAssociations.includes(el.name)}/>)}
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
                    {/* {this.renderLifeSpanFilter()} */}
                    {this.renderBodyTypeSelector()}
                    {this.renderCoatLengthSelector()}
                    {this.renderBreedOriginSelector()}
                    {this.renderAssociations()}
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
      breedOriginText: {
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
    },
    clubIcon: {
        resizeMode: 'contain',
        height: Hp(0.045),
        width: Hp(0.045)
    },
})


const mapStateToProps = state => ({
    theme: state.global.theme,
    filters: state.global.filters,
    initialFilters: state.global.initialFilters,
    minLife: state.global.filters.lifeSpan[0],
    maxLife: state.global.filters.lifeSpan[1],
    breedOrigin: state.global.breedOrigin,
    selectedBreedOrigin: state.global.filters.selectedBreedOrigin,
    coatLength: state.global.coatLength,
    selectedCoatLength: state.global.filters.selectedCoatLength,
    bodyType: state.global.bodyType,
    selectedBodyType: state.global.filters.selectedBodyType,
    selectedAssociations: state.global.filters.selectedAssociations
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Filters)
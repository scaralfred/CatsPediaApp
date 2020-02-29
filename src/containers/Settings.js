import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Hp, Wp, isIphoneX, isIos } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
import { Switch } from 'react-native-switch';
import { CheckBox } from '../component/UI/CheckBox';
import { LayoutOptions } from '../component/Layouts/LayoutOptions';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';

class Settings extends Component {

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
        favoritesLayoutCollapsed: true,
        mainLayoutCollapsed: true
    }

    renderHeightMeasureUnit() {
        const {heightUnitOfMeasure} = this.props;
        return (
            <View style={styles.settingOptionContainer}>
                <View style={{flexDirection: 'row',  }}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.settingTitle]}>Height:</Text>
                        <Text style={[styles.settingChoice]}>{heightUnitOfMeasure}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.props.actions.changeHeightUnitOfMeasure('Cm')} 
                                      style={{alignItems: 'center', paddingRight: Hp(0.04)}}>
                        <Text style={[styles.settingTitle, { lineHeight: Hp(0.044), paddingBottom: Hp(0.012)}]}>Cm</Text>
                        <CheckBox color={this.props.theme.primaryColor} checked={heightUnitOfMeasure == 'Cm'} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.props.actions.changeHeightUnitOfMeasure('Ft/In')} 
                                      style={{alignItems: 'center', minWidth: Hp(0.06)}}>
                        <Text style={[styles.settingTitle, { lineHeight: Hp(0.044), paddingBottom: Hp(0.012)}]}>Ft/In</Text>
                        <CheckBox color={this.props.theme.primaryColor} checked={heightUnitOfMeasure == 'Ft/In'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderWeightMeasureUnit() {
        const {weightUnitOfMeasure} = this.props;
        return (
            <View style={styles.settingOptionContainer}>
                <View style={{flexDirection: 'row',  }}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.settingTitle]}>Weight:</Text>
                        <Text style={[styles.settingChoice]}>{weightUnitOfMeasure}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.props.actions.changeWeightUnitOfMeasure('Kg')} 
                                      style={{alignItems: 'center', paddingRight: Hp(0.04)}}>
                        <Text style={[styles.settingTitle, { lineHeight: Hp(0.044), paddingBottom: Hp(0.012)}]}>Kg</Text>
                        <CheckBox color={this.props.theme.primaryColor} checked={weightUnitOfMeasure == 'Kg'} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} 
                                      onPress={()=> this.props.actions.changeWeightUnitOfMeasure('Lbs')} 
                                      style={{alignItems: 'center', minWidth: Hp(0.06)}}>
                        <Text style={[styles.settingTitle, { lineHeight: Hp(0.044), paddingBottom: Hp(0.012)}]}>Lbs</Text>
                        <CheckBox color={this.props.theme.primaryColor} checked={weightUnitOfMeasure == 'Lbs'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderMainLayoutChoice() {
        const {mainLayout} = this.props;
        const {mainLayoutCollapsed} = this.state;
        return (
            <View style={styles.settingOptionContainer}>
            <TouchableOpacity activeOpacity={1} onPress={()=> this.setState({mainLayoutCollapsed: !mainLayoutCollapsed})} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.settingTitle, {flex: 1}]}>Breeds layout</Text>
                {mainLayoutCollapsed ?
                <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-down.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>
                : <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-up.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>}
            </TouchableOpacity>
            <Collapsible collapsed={mainLayoutCollapsed}>
                <LayoutOptions mainLayout={mainLayout} 
                               changeMainLayout={(id)=> this.props.actions.changeMainLayout(id)}
                               color={this.props.theme.primaryColor}
                            />
            </Collapsible>
        </View>
        )
    };
 
    renderFavoritesLayoutChoice() {
        const {favoritesLayout} = this.props;
        const {favoritesLayoutCollapsed} = this.state;
        return (
            <View style={styles.settingOptionContainer}>
                <TouchableOpacity activeOpacity={1} onPress={()=> this.setState({favoritesLayoutCollapsed: !favoritesLayoutCollapsed})} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.settingTitle, {flex: 1}]}>Favorites layout</Text>
                    {favoritesLayoutCollapsed ?
                    <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-down.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>
                    : <FastImage resizeMode={'contain'} source={require('../assets/icons/collapsible-arrow-up.png')} style={{ width: Hp(0.03), height: Hp(0.03)}}/>}
                </TouchableOpacity>
                <Collapsible collapsed={favoritesLayoutCollapsed}>
                    <LayoutOptions favoritesLayout={favoritesLayout}
                                   changeFavoritesLayout={(id)=> this.props.actions.changeFavoritesLayout(id)}
                                   color={this.props.theme.primaryColor}
                                />
                </Collapsible>
            </View>
        )
    };

    renderShowFlickr() {
        return (
                <View style={styles.settingOptionContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.settingTitle]}>Show Flickr</Text>
                        </View>
                        <Switch value={this.props.showFlickr}
                                onValueChange={() => this.props.actions.changeShowFlickr()}
                                circleSize={Hp(0.029)}
                                barHeight={Hp(0.035)}
                                circleBorderWidth={0}
                                backgroundActive={this.props.theme.primaryColor}
                                backgroundInactive={'#e0e0e0'}
                                circleActiveColor={'#fff'}
                                circleInActiveColor={'#BDBDBD'}
                                switchLeftPx={Hp(0.0028)} 
                                switchRightPx={Hp(0.0028)} 
                                switchWidthMultiplier={Hp(0.0032)}
                            />
                    </View>
                </View>
        )  
    }

    renderShowYoutube() {
        return (
                <View style={styles.settingOptionContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.settingTitle]}>Show Youtube</Text>
                        </View>
                        <Switch value={this.props.showYoutube}
                                onValueChange={() => this.props.actions.changeShowYoutube()}
                                circleSize={Hp(0.029)}
                                barHeight={Hp(0.035)}
                                circleBorderWidth={0}
                                backgroundActive={this.props.theme.primaryColor}
                                backgroundInactive={'#e0e0e0'}
                                circleActiveColor={'#fff'}
                                circleInActiveColor={'#BDBDBD'}
                                switchLeftPx={Hp(0.0028)} 
                                switchRightPx={Hp(0.0028)} 
                                switchWidthMultiplier={Hp(0.0032)}
                            />
                    </View>
                </View>
        )  
    };

    renderShowInstagram() {
        return (
                <View style={styles.settingOptionContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.settingTitle]}>Show Instagram</Text>
                        </View>
                        <Switch value={this.props.showInstagram}
                                onValueChange={() => this.props.actions.changeShowInstagram()}
                                circleSize={Hp(0.029)}
                                barHeight={Hp(0.035)}
                                circleBorderWidth={0}
                                backgroundActive={this.props.theme.primaryColor}
                                backgroundInactive={'#e0e0e0'}
                                circleActiveColor={'#fff'}
                                circleInActiveColor={'#BDBDBD'}
                                switchLeftPx={Hp(0.0028)} 
                                switchRightPx={Hp(0.0028)} 
                                switchWidthMultiplier={Hp(0.0032)}
                            />
                    </View>
                </View>
        )  
    };

   render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> Navigation.pop(this.props.componentId)}
                                      activeOpacity={0.8} 
                                      style={styles.backButtonContainer}>
                        <FastImage source={require('../assets/icons/left-arrow-black.png')}
                                   style={{ width: Wp(0.07), height: Wp(0.07) }}
                                   resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerText}>Settings</Text>
                    </View>
                    <View style={{ width: Wp(0.15) }}/>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewFilters}
                            showsVerticalScrollIndicator={false}>
                    {/* {this.renderHeightMeasureUnit()}
                    {this.renderWeightMeasureUnit()} */}
                    {this.renderMainLayoutChoice()}
                    {this.renderFavoritesLayoutChoice()}
                    {this.renderShowFlickr()}
                    {/* {this.renderShowYoutube()} */}
                    {this.renderShowInstagram()}
                </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Hp(0.08),
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
        width: Wp(0.15),
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row'
    },
    scrollViewFilters: {
        paddingTop: Hp(0.016),
        padding: Hp(0.02),
    },
    settingOptionContainer: {
        borderRadius: Hp(0.004),
        padding: Hp(0.02),
        paddingTop: Hp(0.016),
        paddingBottom: Hp(0.014),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: Hp(0.014)
    },
    settingTitle: {
        fontSize: Hp(0.03),
        fontFamily: font.medium,
        lineHeight: Hp(0.04),
    },
    settingChoice: {
        fontSize: Hp(0.03),
        lineHeight: Hp(0.05),
        fontFamily: font.regular,
        color: '#9b9b9b'
    }
})

const mapStateToProps = state => ({
    theme: state.global.theme,
    heightUnitOfMeasure: state.global.settings.heightUnitOfMeasure,
    weightUnitOfMeasure: state.global.settings.weightUnitOfMeasure,
    mainLayout: state.global.settings.mainLayout,
    favoritesLayout: state.global.settings.favoritesLayout,
    showFlickr: state.global.settings.showFlickr,
    showYoutube: state.global.settings.showYoutube,
    showInstagram: state.global.settings.showInstagram,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Settings)
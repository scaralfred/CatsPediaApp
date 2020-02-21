import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../../reducers/global/globalActions';
import { View, Text, Keyboard, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { Hp, Wp, onLayout, isIos } from '../../lib/util';
import { Navigation } from 'react-native-navigation';
import { font } from '../../styles/variables';
import { MenuTrigger, MenuOption, MenuOptions, Menu } from 'react-native-popup-menu';
import FastImage from 'react-native-fast-image';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FeaIcon from 'react-native-vector-icons/Feather';
import OcIcon from 'react-native-vector-icons/Octicons';

const headerShadow = {
                        shadowColor: "#000",
                        shadowOffset: {
                            width: -2,
                            height: 3,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 0,
                        elevation: 4
                    }

class SearchBar extends Component {

    state = {
        value: '',
        searchFocused: null
    }

    openSideMenu = () => {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: true
                },
            }
        });
        Keyboard.dismiss();
    }

    render() {

        const { searchFocused } = this.state;
        const value = this.props.search;
        const  { barIconColor, iconMainColor, backgroundColor, primaryColor } = this.props.theme;
        const  { scrollPosition, filters, initialFilters } = this.props;

        return (
            <MenuTrigger>
                <View style={[styles.container, scrollPosition > 5 ? {...headerShadow} : null, {backgroundColor}]}>
                    <TouchableOpacity onPress={this.openSideMenu}
                                      activeOpacity={0.8} 
                                      style={styles.sideMenuIconContainer}>
                        <OcIcon name="three-bars" size={Hp(0.04)} color={barIconColor} />               
                        {/* <FeaIcon name="menu" size={Hp(0.05)} color="#000" /> */}
                        {/* <FastImage resizeMode={'contain'} source={require('../../assets/icons/side-menu-black.png')}
                                style={{width: Wp(0.07), height: Wp(0.07)}}
                        /> */}
                    </TouchableOpacity>
                    <View style={styles.searchBarContainer}>
                        {!searchFocused && value == '' ?
                        <TouchableOpacity onPress={() => this.searchInput.focus()}
                                        style={styles.searchIconContainer}>
                            <FAIcon name="search" size={Hp(0.025)} color={'#B8B8B8'} />
                            {/* <FastImage source={require('../../assets/icons/search-2-black.png')}
                                    style={{ width: Wp(0.05), height: Wp(0.05)}}
                                    resizeMode={'contain'}
                            /> */}
                        </TouchableOpacity>
                        : null}
                        <TextInput
                            ref={(input) => { this.searchInput = input; }}
                            style={styles.searchBarInput}
                            placeholder={'Search'}
                            placeholderTextColor={'#B8B8B8'}
                            onChangeText={e => this.props.actions.setSearch(e)}
                            value={value}
                            onFocus={()=> this.setState({searchFocused: true})}
                            onBlur={()=> this.setState({searchFocused: false})}
                        />
                        {value != '' || searchFocused ?
                            <TouchableOpacity onPress={() => { 
                                this.props.search == '' ? Keyboard.dismiss() : null;
                                this.props.actions.setSearch('');
                            }}
                                activeOpacity={0.8}
                                style={styles.clearIconContainer}>
                                {/* <FastImage source={require('../../assets/icons/close-black.png')}
                                           style={{ width: Wp(0.04), height: Wp(0.04) }}
                                           resizeMode={'contain'}
                                /> */}
                                <FeaIcon name="x-circle" size={Hp(0.03)} color={'#707070'} />
                            </TouchableOpacity>
                        : null}
                        <TouchableOpacity onPress={this.props.onPressFilters}
                                          onLongPress={()=> alert('new filters\n' + JSON.stringify(filters) + '\nand old filters\n' + JSON.stringify(initialFilters))}
                                          activeOpacity={0.8} 
                                          style={styles.filterContainer}>
                        <FeaIcon name="sliders" size={_.isEqual(filters, initialFilters) ? Hp(0.035) : Hp(0.038)} color={_.isEqual(filters, initialFilters) ? '#585858' : primaryColor} />             
                        {/* <FastImage source={require('../../assets/icons/filter-black.png')}
                                style={styles.filterIconImage}
                                resizeMode={'contain'}
                        /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{marginRight: Wp(0.035)}}>
                    <Menu>
                        
                        <MenuTrigger>
                            <View style={styles.contextualMenuContainer}>
                                <FeaIcon name="more-vertical" size={Hp(0.04)} color={barIconColor} />
                                {/* <FastImage source={require('../../assets/icons/three-dots-black.png')}
                                        style={styles.contextualMenuIcon}
                                        resizeMode={'contain'}
                                /> */}
                            </View>
                        </MenuTrigger>
                        
                        <MenuOptions optionsContainerStyle={[styles.contextualMenuList]}>
                            <MenuOption onSelect={() => Navigation.showOverlay({ component: { name: 'LayoutOptionsModal' } })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FeaIcon name="layout" size={Hp(0.035)} style={{marginLeft: Wp(0.02), marginRight: Wp(0.03)}} color={primaryColor} />
                                    {/* <FastImage source={require('../../assets/icons/layout-black.png')}
                                            style={styles.contextualMenuImage}
                                            resizeMode={'contain'}
                                    /> */}
                                    <Text style={styles.menuText}>Breeds layout</Text>
                                </View>
                            </MenuOption>
                            <MenuOption onSelect={() => Navigation.push(this.props.componentId, { component: { name: 'Settings' } })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FeaIcon name="settings" size={Hp(0.035)} style={{marginLeft: Wp(0.02), marginRight: Wp(0.03)}} color={primaryColor} />
                                    {/* <FastImage source={require('../../assets/icons/settings-empty-black.png')}
                                        style={styles.contextualMenuImage}
                                        resizeMode={'contain'}
                                    /> */}
                                    <Text style={styles.menuText}>Settings</Text>
                                </View>
                            </MenuOption>
                        </MenuOptions>
                        
                    </Menu>
                    </View>
                </View>
            </MenuTrigger>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: Hp(0.008),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: Hp(0.08),
        backgroundColor: '#fff',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2.62,
        // elevation: 4
    },
    searchBarContainer: {
        height: '66%',
        flexDirection: 'row',
        flex: 1,
        marginVertical: Hp(0.009),
        paddingLeft: Wp(0.01),
        backgroundColor: '#f1f1f1',
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    searchBarInput: {
        flex: 1,
        marginBottom: isIos() ? null : -Hp(0.011),
        fontFamily: font.regular,
        fontSize: Hp(0.028),
        paddingLeft: Wp(0.023)
    },
    searchIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: Wp(0.015)
    },
    clearIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Wp(0.08)
    },
    sideMenuIconContainer: {
        height: '100%',
        width: Wp(0.14),
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterContainer: {
        width: Wp(0.12),
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterIconImage: {
        width: Wp(0.068), 
        height: Wp(0.068),
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
        marginRight: Wp(0.033)
    },
    contextualMenuIcon: {
        width: Wp(0.075), 
        height: Wp(0.075)
    },
    menuText: {
        fontFamily: font.medium,
        fontSize: Hp(0.028),
    },
})

const mapStateToProps = state => ({
    filters: state.global.filters,
    initialFilters: state.global.initialFilters,
    search: state.global.search,
    theme: state.global.theme
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
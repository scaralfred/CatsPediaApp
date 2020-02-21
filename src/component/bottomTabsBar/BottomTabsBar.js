import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../../reducers/global/globalActions';
import * as scannerActions from '../../reducers/scanner/scannerActions';
import FastImage from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation'
import React, { Component } from 'react'
import {
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import { font } from '../../styles/variables';
import { Hp, Wp } from '../../lib/util';
import CentralTab from './CentralTab';
import FeaIcon from 'react-native-vector-icons/Feather';

class BottomTabsBar extends Component {

    state = {
        tabIndex: 0
    }

    switchTab(tabNumber) {

            // tabNumber === 0 && this.props.onTabReSelected ? this.props.onTabReSelected() : null; 
            Navigation.mergeOptions(this.props.componentId, {
                bottomTabs: {
                    currentTabIndex: tabNumber,
                },
            });
            this.props.actions.setTab(tabNumber);
    }

    render() {

        const  { primaryColor, selectedIconColor, backgroundColor } = this.props.theme;

        return(
            <View>
                <View style={[styles.bottomTabsContainer]}>
                    <TouchableOpacity activeOpacity={1} 
                                      onPress={() => this.props.tabNumber == 0 ? this.props.onTabReselected() : this.switchTab(0)} 
                                      style={[styles.tabContainer]}>
                        <BottomTab selected={this.props.tabNumber == 0} 
                                   tabID={0}
                                   tabNumber={this.props.tabNumber}
                                   tabName={'Breeds'} 
                                   iconName={'Profile'} 
                                   selectedIconColor={primaryColor}
                                   />
                    </TouchableOpacity>
                    <CentralTab onCameraPressed={()=> this.props.actions.pickAndUploadImageFromCamera(this.props.componentId)}
                                onFolderPressed={()=> this.props.actions.pickAndUploadImageFromPhone(this.props.componentId)}
                                onHistoryPressed={()=> Navigation.push(this.props.componentId, {component: {name: 'ScanHistory'}})}
                                componentId={this.props.componentId}
                                tabColor={primaryColor}
                    />
                    <TouchableOpacity activeOpacity={1} 
                                      onPress={() => this.props.tabNumber == 2 ? this.props.onTabReselected() : this.switchTab(2)} 
                                      style={[styles.tabContainer]}>
                        <BottomTab  selected={this.props.tabNumber == 2} 
                                    tabID={2}
                                    tabNumber={this.props.tabNumber}
                                    tabName={'Favorites'} 
                                    iconName={'ClassIcon'} 
                                    selectedIconColor={primaryColor}
                                    />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.global.theme
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions, ...scannerActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BottomTabsBar)


class BottomTab extends Component {

    render() {

        const { selectedIconColor } = this.props;
        
        // function getTabIcon(tabID, selected) {

        //     let tabName;

        //     switch (tabID) {
        //         case 0:
        //             tabName = selected ? require('../../assets/icons/Navigation/Search-Activated-2.png')
        //                 : require('../../assets/icons/Navigation/Search-Inactivated-2.png');
        //             break;
        //         case 2:
        //             tabName = selected ? require('../../assets/icons/Navigation/Favorites-Activated.png')
        //                 : require('../../assets/icons/Navigation/Favorites-Inactivated-2.png');
        //             break;
        //         default:
        //             tabName = selected ? require('../../assets/icons/Navigation/Search-Activated.png')
        //                 : require('../../assets/icons/Navigation/Search-Inactivated.png');
        //     }

        //     return tabName
        // };


        return (
            <View activeOpacity={1} style={{ flex: 1, alignItems: 'center' }} onPress={this.props.onPress}>
                <FeaIcon name={this.props.tabID == 0 ? 'search' : 'heart'} size={Hp(this.props.tabID == 0  ? 0.033 : 0.032)} color={this.props.selected ? selectedIconColor : '#B8B8B8'} />
                {/* <FastImage resizeMode="contain" 
                           style={styles.icons} 
                           source={getTabIcon(this.props.tabID, this.props.selected)} 
                           selected={this.props.selected}
                           /> */}
                <Text style={[styles.text, !this.props.selected ? { color: '#B8B8B8' } : {color: selectedIconColor}]}>{this.props.tabName}</Text>
            </View>
        )
    }
 };

 var styles = StyleSheet.create({
    bottomTabsContainer: {
        // backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Wp(1),
        flexDirection: 'row'
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Hp(0.015),
        height: Hp(0.085),
        marginTop: Hp(0.02),
        // justifyContent: 'space-evenly',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
        // elevation: 5
    },
    text: {
        fontFamily: font.medium,
        color: '#000',
        fontSize: Hp(0.018),
        textAlign: 'center',
        padding: Hp(0.002),
    },
    icons: {
        height: Hp(0.032),
        width: Hp(0.032)
    }
});
import _ from 'lodash';
import React, { Component } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as scannerActions from '../reducers/scanner/scannerActions';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Hp, Wp, isIphoneX, isIos } from '../lib/util';
import { font } from '../styles/variables';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import breeds from '../../scraper/breeds';
import FeaIcon from 'react-native-vector-icons/Feather';

class ScanHistory extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            },
            
        };
    };

    state = {
        history: null
    }

//    componentWillMount(){
//        const { history } = this.props;
//        history ? this.setState({history}) : null;
//    }

   goToBreedDetails = (breed) => {
        const { favorites } = this.props;
        const isFavorite = favorites.includes(breed.id);

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
                    passProps: { breed, isFavorite }
                }
            })
    }

    goToScannerResults = (historyResult) => {

        Navigation.push(this.props.componentId,
            {
                component: {
                    name: 'ScannerResult',
                    options: {
                        bottomTabs: {
                            visible: false,
                            drawBehind: true
                        }
                    },
                    passProps: { historyResult }
                }
            })
    }
    
    renderItem = ({ item, index }) => {

        const firstResultName = item.result.firstResult.breed || null;
        const secondResultName = item.result.secondResult.breed || null;
        const thirdResultName = item.result.thirdResult.breed || null;
        const firstResultPercentage = parseInt(item.result.firstResult.percentage.replace("$", "")) || null;
        const secondResultPercentage = parseInt(item.result.secondResult.percentage.replace("$", "")) || null;
        const thirdResultPercentage = parseInt(item.result.thirdResult.percentage.replace("$", "")) || null;

        const twoResults = (firstResultPercentage >= 45 && secondResultPercentage >= 40) || (firstResultPercentage < 45 && secondResultPercentage >= 40);
        const threeResults = (firstResultPercentage < 45 && secondResultPercentage < 40);

        const result = (name) => {
            if (typeof breeds.find( el => el.name.toLowerCase() == name.toLowerCase()) !== 'undefined') {
                return breeds.find( el => el.name.toLowerCase() == name.toLowerCase())
            } else if (typeof breeds.find( el => el.name.toLowerCase().includes(name.toLowerCase())) !== 'undefined') {
                return breeds.find( el => el.name.toLowerCase().includes(name.toLowerCase()))
            } else { return false }
        }

        if (twoResults) {
            return (
                <TouchableOpacity activeOpacity={1}
                                    onPress={()=> this.goToScannerResults(item.result)}
                                    style={styles.settingOptionContainer}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <FastImage source={item.result.originalPicture ? {uri: item.result.originalPicture} : require('../assets/images/dog-placeholder.png')} 
                                    style={styles.mainBreedImage} 
                                    resizeMode='cover' />
                        <View style={{paddingLeft: Wp(0.03), flex: 1}}>
                            <Text style={styles.breedNameTwoResults}>{firstResultPercentage}% {_.startCase(firstResultName)}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={styles.breedNameTwoResults}>{secondResultPercentage}% {_.startCase(secondResultName)}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={styles.timeStamp}>{moment(item.timeStamp).format('DD-MM-YYYY, HH:mm a')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else if (threeResults) {
            return (
                <TouchableOpacity activeOpacity={1}
                                    onPress={()=> this.goToScannerResults(item.result)}
                                    style={styles.settingOptionContainer}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <FastImage source={item.result.originalPicture ? {uri: item.result.originalPicture} : require('../assets/images/dog-placeholder.png')} 
                                    style={styles.mainBreedImage} 
                                    resizeMode='cover' />
                        <View style={{paddingLeft: Wp(0.03), flex: 1}}>
                            <Text style={styles.breedNameThreeResults}>{firstResultPercentage}% {_.startCase(firstResultName)}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={styles.breedNameThreeResults}>{secondResultPercentage}% {_.startCase(secondResultName)}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={styles.breedNameThreeResults}>{thirdResultPercentage}% {_.startCase(thirdResultName)}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={styles.timeStamp}>{moment(item.timeStamp).format('DD-MM-YYYY, HH:mm a')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {

                return (
                    <TouchableOpacity activeOpacity={1}
                                        onPress={()=> {
                                            if (!result(firstResultName)) {
                                                this.goToScannerResults(item.result)
                                            } else{
                                                this.goToBreedDetails(result(firstResultName))
                                            }
                                        }}
                                        style={styles.settingOptionContainer}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <FastImage source={item.result.originalPicture ? {uri: item.result.originalPicture} : require('../assets/images/dog-placeholder.png')} 
                                    style={styles.mainBreedImage} 
                                    resizeMode='cover' />
                            <View style={{paddingLeft: Wp(0.03), flex: 1}}>
                                <View style={{flex: 1}}/>
                                <Text style={styles.breedName}>{_.startCase(firstResultName)}</Text>
                                <View style={{flex: 1}}/>
                                <Text style={styles.timeStamp}>{moment(item.timeStamp).format('DD-MM-YYYY, HH:mm a')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
    

   render() {

        const sortedData = this.props.history.sort((a,b) => moment(b.timeStamp).unix() - moment(a.timeStamp).unix());

         

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
                        <Text style={styles.headerText}>Identifier history</Text>
                    </View>
                    <View style={{ width: Wp(0.15) }} />
                </View>
                <SwipeListView
                    style={{ marginHorizontal: Wp(0.014)}}
                    contentContainerStyle={styles.scrollViewHistory}
                    showsVerticalScrollIndicator={false}
                    data={sortedData}
                    renderItem={this.renderItem}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity onPress={()=> {
                                if (data && data.item && data.item.id) {
                                    this.props.actions.removeItemFromHistory(data.item.id);
                                }
                            }} activeOpacity={0.5} style={styles.binIconContainer}>
                                <FeaIcon name="trash-2" size={Wp(0.1)} color={'#fff'} />
                            </TouchableOpacity>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity onPress={()=> {
                                if (data && data.item && data.item.id) {
                                    this.props.actions.removeItemFromHistory(data.item.id);
                                }
                                }} activeOpacity={0.5} style={styles.binIconContainer}>
                                    <FeaIcon name="trash-2" size={Wp(0.1)} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    )}
                    leftOpenValue={Wp(0.2)}
                    rightOpenValue={-Wp(0.2)}
                    ListEmptyComponent={()=> {
                        return (
                            <View style={{paddingTop: Hp(0.25), alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{paddingHorizontal: Hp(0.05), textAlign: 'center', fontFamily: font.medium, fontSize: Hp(0.025), letterSpacing: 1}}>History Empty!</Text>
                            </View>
                        )
                    }}
                    keyExtractor={item => item.timeStamp}
                />
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
    settingOptionContainer: {
        minHeight: Hp(0.12),
        borderRadius: Hp(0.004),
        padding: Hp(0.008),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        justifyContent:'center',
        marginBottom: Hp(0.02)
    },
    title: {
        fontSize: Hp(0.03),
        fontFamily: font.medium,
        lineHeight: Hp(0.04),
    },
    scrollViewHistory: {
        paddingTop: Hp(0.016),
        padding: Hp(0.02),
    },
    mainBreedImage: {
        width: Wp(0.23),
        minHeight: Hp(0.08),
        borderRadius: Hp(0.004),
    },
    breedName:{
        fontSize: Hp(0.026),
        fontFamily: font.medium
    },
    timeStamp: {
        fontSize: Hp(0.016),
        fontFamily: font.regular,
        textAlign: 'right',
        marginBottom: -Hp(0.004)
    },
    breedNameTwoResults:{
        fontSize: Hp(0.022),
        fontFamily: font.medium
    },
    breedNameThreeResults:{
        fontSize: Hp(0.021),
        fontFamily: font.medium
    },
    rowBack: {
        borderRadius: Hp(0.004),
        minHeight: Hp(0.12),
        backgroundColor: 'red',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    binIconContainer: {
        paddingHorizontal: Wp(0.05),
    },
    binIcon: {
        height: Wp(0.1),
        width: Wp(0.1)
    }
})

const mapStateToProps = state => ({
    history: state.scanner.scanHistory,
    favorites: state.global.favorites,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...scannerActions }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanHistory)
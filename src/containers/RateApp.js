// REACT NATIVE NAVIGATION FUNCTIONS
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as globalActions from '../reducers/global/globalActions';
import { bindActionCreators } from 'redux';

/**
 * The necessary React
 */
import React, { Component } from 'react';
import { StyleSheet, Button, Platform, View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { isIphoneX, isIos } from '../lib/util';
import Config from 'react-native-config';
import Rate, { AndroidMarket } from 'react-native-rate';
import StarRating from 'react-native-star-rating';
import { font } from '../styles/variables';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: isIphoneX() ? 40 : isIos() ? 18 : 0
    },
    boxContainer: {
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        width: width * 0.75
    },
    boxText: {
        textAlign: 'center',
        fontFamily: font.regular,
        fontSize: 16,
        color: '#000'
    },
    boldText: {
        fontWeight: isIos() ? '700' : '100',
        fontFamily: font.medium,
        letterSpacing: 0.01
    }
})

class RateApp extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            options: {
                overlay: {
                    interceptTouchOutside: false,
                }
            }

        };
    }

    state = {
        ratingGiven: false,
        rating: null,
        negativeRating: false
    };

    cancelSubmitButtons() {
        if (this.state.ratingGiven && !this.state.negativeRating) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => {
                        Navigation.dismissOverlay(this.props.componentId);
                        this.props.actions.resetOpenAppCount();
                    }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.boxText}>{'Cancel'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        let options = {
                            AppleAppID: Config.APPLE_ID,
                            GooglePackageName: Config.MY_APPLICATION_ID,
                            preferredAndroidMarket: AndroidMarket.Google,
                            preferInApp: true,
                            openAppStoreIfInAppFails: true,
                        }
                        let stars = this.state.rating;

                        if (stars) {
                            this.props.actions.appRatingGiven();
                            if (stars < 4) {
                                Navigation.push(
                                    this.props.selectedTab == 0 ? 'AllBreeds' : this.props.selectedTab == 2 ? 'Favorites' : this.props.componentId, 
                                    { component: { name: 'Feedback', options: { blurOnUnmount: true } } 
                                });
                                this.setState({negativeRating: true});
                                this.props.actions.resetOpenAppCount();
                                // setTimeout(() => {
                                    // Navigation.dismissOverlay(this.props.componentId);
                                // }, 6000); 
                            } else if (stars >= 4) {
                                Rate.rate(options, success => {
                                    if (success) {
                                        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                                        Navigation.dismissOverlay(this.props.componentId);
                                    }
                                })
                            }
                        }
                    }}
                    >
                        <View style={{ flex: 1, paddingVertical: 10, borderLeftColor: '#E8E8E8', borderLeftWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.boxText, { color: '#002278' }]}>{"Submit"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    Navigation.dismissOverlay(this.props.componentId);
                    this.props.actions.resetOpenAppCount();
                }}>
                    <View style={{ paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.boxText}>{this.state.negativeRating ? 'Ok' :  'Not Now'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    renderContent(){
        return ( 
            <View style={{ paddingHorizontal: 6, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 10, marginBottom: 8 }}>
                    <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('../assets/appIcon/AppIcon.png')} />
                </View>
                <Text style={[styles.boxText, styles.boldText, { fontSize: 19, paddingVertical: 5 }]}>{"Enjoying"} {Config.APP_NAME} App?</Text>
                <Text style={[styles.boxText, { lineHeight: 22, fontSize: 15 }]}>{"Tap a star to rate it on the"}{'\n'}{isIos() ? 'App Store' : 'Google Play Store'}.</Text>
            </View>
        )
    }

    renderFeedbackInvite() {
        return (
            <View style={{ paddingHorizontal: 6, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' }}>
                <View style={{  borderRadius: 15, marginBottom: 8 }}>
                    <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('../assets/icons/Sorry.png')} />
                </View>
                <Text style={[styles.boxText, { fontSize: 19, paddingVertical: 5, letterSpacing: -0.5 }]}>{"We are sorry to hear about your bad experience"}...</Text>
                <View style={{ paddingHorizontal: 20, paddingTop: 5 }}>
                    <Text style={[styles.boxText, { lineHeight: 22, fontSize: 15 }]}>{"We would like to personally assist you with making things right"}.</Text>
                    <Text style={[styles.boxText, { lineHeight: 22, fontSize: 15 }]}>{"Please let us know your concerns and we'll contact you back soon"}.</Text>
                </View>
            </View>
        )
    }

    renderStars(){
        return (
            <View style={{ paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#E8E8E8', alignItems: 'center' }}>
                <StarRating
                    Component={'TouchableWithoutFeedback'}
                    disabled={this.props.disabled}
                    maxStars={5}
                    emptyStar={require('../assets/icons/StarRateBlackEmpty.png')}
                    fullStar={require('../assets/icons/StarRateBlue.png')}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starColor={'#000'}
                    starSize={height > 600 ? 22 : 18}
                    buttonStyle={{ paddingHorizontal: 9 }}
                    rating={this.state.rating}
                    selectedStar={(a) => { this.setState({ rating: a, ratingGiven: true }); }}
                />
            </View>
        )
    }

    render() {

        return (
            <TouchableWithoutFeedback disabled={!this.state.negativeRating} onPress={() => {
                Navigation.dismissOverlay(this.props.componentId);
            }}>
                <View style={styles.overlayContainer}>
                    <TouchableWithoutFeedback disabled={!this.state.negativeRating} onPress={()=> null}>
                        <View style={styles.boxContainer}>
                            {!this.state.negativeRating ? this.renderContent() : this.renderFeedbackInvite()}
                            {!this.state.negativeRating ? this.renderStars() : null}
                            {this.cancelSubmitButtons()}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const mapStateToProps = state => ({
    selectedTab: state.global.tab
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RateApp)
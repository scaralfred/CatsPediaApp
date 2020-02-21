import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { isIos, onLayout, Wp, Hp } from '../../lib/util';
import { font } from '../../styles/variables';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

var styles = StyleSheet.create({
    sectionContentText: {
        fontFamily: font.bold,
        fontSize: Hp(0.028),
        paddingTop: Hp(0.003),
        letterSpacing: 0.5
    },
    thumbnailContainer: {
        marginRight: Hp(0.02),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    thumbnail: {
        height: Hp(0.15), 
        width: Hp(0.26),
        borderRadius: Hp(0.004)
    },
    videoTitle: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        paddingHorizontal: Hp(0.008),
        paddingHorizontal: Hp(0.012),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderBottomLeftRadius: Hp(0.004),
        borderBottomRightRadius: Hp(0.004)
    },
    videoTitleText: {
        fontFamily: font.medium,
        fontSize: Hp(0.018),
        color: '#fff',
    },
    playVideoImageContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playVideoImage: {
        width: Hp(0.07),
        height: Hp(0.07)
    }
});

const youtubeApiKey = 'AIzaSyCTkNbwgMya7jpT5AVWSBfDF4HC7l2sjXs';

export default class YoutubeVids extends Component {

    state = { 
        youtubeVids: []
    }

    componentWillMount() {

        const {breedName} = this.props;

        const youtubeApi = 'https://www.googleapis.com/youtube/v3/';

        const maxResults = '9';
        const searchWord = breedName;
        const type = 'video';
        const order = 'viewCount';
        const videoDefinition = 'high';

        const youtubeApiBySearch = `${youtubeApi}search/?key=${youtubeApiKey}&maxResults=${maxResults}&q=${searchWord}&videoDefinition=${videoDefinition}&type=${type}&order=${order}&part=snippet`;
        // const youtubeApiBySearch = `${youtubeApi}videos/?key=${youtubeApiKey}&chart=mostPopular&maxResults=${maxResults}&q=${searchWord}&videoDefinition=${videoDefinition}&type=${type}&order=${order}&part=snippet`;
        // &chart=mostPopular
        axios.get(youtubeApiBySearch)
        .then((response) => {
          const youtubeVids = response.data.items.map(el => { 
              return {
                        videoId: el.id.videoId, 
                        title: el.snippet.title,
                        thumbnail: el.snippet.thumbnails.medium.url
                     } 
                });
                
           this.setState({youtubeVids});
        //    alert(JSON.stringify(response))
        })
        .catch((err) => {
            alert(err.message)
        });

    }

 render() {
     const {youtubeVids} = this.state;

     const videoExample = null//'2jq-pXnd8Lo';

     if (youtubeVids && youtubeVids.length > 2) { 
         return (
            <View style={{paddingTop: Hp(0.03)}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: Hp(0.02)}}>
                    <FastImage resizeMode={'contain'} source={require('../../assets/logos/youtube-logo.png')} 
                               style={{ width: Hp(0.029), height: Hp(0.029), marginRight: Hp(0.013)}}/>
                    <Text style={[styles.sectionContentText]}>YouTube</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: Hp(0.025)}} horizontal showsHorizontalScrollIndicator={false}>
                    {youtubeVids.map(el => {
                        return <TouchableOpacity activeOpacity={0.8}
                                                 onPress={()=> Navigation.push(this.props.componentId, 
                                                    { 
                                                        component: {
                                                            name: 'YoutubePlayer',
                                                            options: {
                                                                bottomTabs: { 
                                                                    visible: false, 
                                                                    drawBehind: true
                                                                }
                                                            },
                                                            passProps: {
                                                                videoId: el.videoId,
                                                                apiKey: 'AIzaSyCbTYKwD41EFBTBR0m1nNUnWtFFkPCi__s'
                                                            }
                                                        }
                                                    }
                                                 )}
                                                 style={styles.thumbnailContainer}>
                                    <FastImage resizeMode={'cover'} source={{uri: el.thumbnail}} style={styles.thumbnail}/>
                                    <View style={styles.playVideoImageContainer}>
                                        <FastImage resizeMode={'center'} source={require('../../assets/icons/play-button-white.png')} style={styles.playVideoImage}/>
                                    </View>
                                    <View style={styles.videoTitle}>
                                        <Text numberOfLines={1} style={styles.videoTitleText}>{el.title}</Text>
                                    </View>
                                </TouchableOpacity>
                    })}
                </ScrollView>
                {/* <LinearGradient
                            style={{position:'absolute', right: 0, top: 0, bottom: 0, width: Wp(0.2), height: Hp(0.4)}}
                            colors={[...Array.from(Array(10)).map( () => 'rgba(255, 255, 255, 0)'), 'rgba(255, 255, 255, 1)']}
                            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} 
                            // pointerEvents={'none'}
                /> */}
            </View>
        ) 
     } else if (videoExample) {
         return (
            <View style={{paddingBottom: Hp(0.025)}}>
                <TouchableOpacity activeOpacity={0.8}
                                         onPress={()=> Navigation.push(this.props.componentId, 
                                            { 
                                                component: {
                                                    name: 'YoutubePlayer',
                                                    options: {
                                                        bottomTabs: { 
                                                            visible: false, 
                                                            drawBehind: true
                                                        }
                                                    },
                                                    passProps: {
                                                        videoId: videoExample,
                                                        apiKey: 'xxx'
                                                    }
                                                }
                                            }
                                         )}
                                         style={{width: 50, height: 50, backgroundColor: 'red'}}>
                    {/* <FastImage resizeMode={'cover'} source={{uri: el.thumbnail}} style={styles.thumbnail}/> */}
                    <View style={styles.playVideoImageContainer}>
                        <FastImage resizeMode={'center'} source={require('../../assets/icons/play-button-white.png')} style={styles.playVideoImage}/>
                    </View>
                    <View style={styles.videoTitle}>
                        <Text numberOfLines={1} style={styles.videoTitleText}>{videoExample}</Text>
                    </View>
                </TouchableOpacity>
            </View>
         )

     } else { return null }
 }
} 
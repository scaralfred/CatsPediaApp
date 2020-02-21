import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { isIos, onLayout, Wp, Hp } from '../../lib/util';
import { font } from '../../styles/variables';
import FastImage from 'react-native-fast-image';
import YouTube from 'react-native-youtube';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { WebView } from 'react-native-webview';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});

export default class YoutubePlayer extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    }

    componentWillMount() {
        
        YouTubeStandaloneAndroid.playVideo({
            apiKey: this.props.apiKey, // Your YouTube Developer API Key
            videoId: this.props.videoId, // YouTube video ID'
            lightboxMode: true,
            autoplay: true, // Autoplay the video
            startTime: 0, // Starting point of video (in seconds)
          })
            .then((e) => Navigation.pop(this.props.componentId))
            .catch(errorMessage => console.log(errorMessage));
    }
   
    render() {
    
        return ( 
            <View style={styles.container}>
                {/* <WebView style={videoStyle} 
                         source={{ uri: url${video.id.videoId}?version=3& autoplay=0& showinfo=0& controls=0& modestbranding=1& fs=1& rel=0 }}
                /> */}
                
                {/* <WebView
                        javaScriptEnabled={true}
                        source={{ html: `<html><body><iframe width=${Wp(3)} height='315' src='https://www.youtube.com/embed/RJa4kG1N3d0?autoplay=1' frameborder='0' allowfullscreen></iframe></body></html>` }}
                        style={{flex: 1}}
                        /> */}
                         {/* <YouTube videoId={this.props.videoId} // The YouTube video ID
                         play // control playback of video with true/false
                        //  fullscreen // control whether the video should play in fullscreen or inline
                         loop // control whether the video should loop when ended
                         onReady={e => alert(e)}
                         controls={1}
                         fullscreen={true}
                         onChangeState={e => alert(e)}
                         onChangeQuality={e => alert(e)}
                         onError={e => alert(e)}
                         style={{ width: 300, height: 300 }}
                         apyKey={this.props.apiKey}
                /> */}
            </View>
        )
    } 
}
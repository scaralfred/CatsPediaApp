import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { isIos, onLayout, Wp, Hp } from '../../lib/util';
import { font } from '../../styles/variables';
import axios from 'axios'
import FastImage from 'react-native-fast-image';

var styles = StyleSheet.create({
    sectionContentText: {
        fontFamily: font.bold,
        fontSize: Hp(0.028),
        paddingTop: Hp(0.0055),
        letterSpacing: 0.5
    },
});

export default class FlickrPics extends Component {

    state = { 
        flickrContainerWidth: Wp(0.85),
        flickrPics: []
    }

    componentWillMount() {
        
        const flickrApiByTag = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${this.props.breedName}&format=json&nojsoncallback=true`;

        axios.get(flickrApiByTag, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            credentials: 'include'
          })
            .then((response) => {
              const flickrPics = response.data.items.map(el => { return {imageUrl: el.media.m, title: el.title} }).slice(0, 6);
            //   alert(JSON.stringify(response.data))
              this.setState({flickrPics})
            })
            .catch((err) => {
            })
 
    }

 render() {
     const {flickrPics} = this.state;

     if (flickrPics && flickrPics.length > 2) { 
         return (
         <View style={{paddingTop: Hp(0.03)}} onLayout={(e) => this.setState({ flickrContainerWidth: onLayout(e).width })}>
             <View style={{flexDirection: 'row', alignItems: 'center',  marginBottom: Hp(0.02)}}>
                <FastImage resizeMode={'contain'} source={require('../../assets/logos/flickr-logo.png')} 
                           style={{ width: Hp(0.028), height: Hp(0.028), marginRight: Hp(0.014)}}/>
                <Text style={[styles.sectionContentText]}>Flickr</Text>
             </View>
             <FlatList data={this.state.flickrPics}
                       renderItem={({ item, index }) => (
                        <TouchableOpacity activeOpacity={0.8} 
                                            onPress={() => {
                                                Navigation.showModal(
                                                    {
                                                        component:
                                                        {
                                                            name: 'InstaPicModal',
                                                            passProps: {
                                                                images: flickrPics.map(el => { return {img: el.imageUrl || null, caption: el.title || null}}),
                                                                caption: item.title,
                                                                currentPage: index
                                                            }
                                                        }
                                                    })
                                            }} 
                                            style={{
                                            backgroundColor: 'grey',
                                            borderRadius: Hp(0.004),
                                            height: (this.state.flickrContainerWidth / 3) - Wp(0.028),
                                            width: (this.state.flickrContainerWidth / 3) - Wp(0.028),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: (index == 2 || index == 5 || index == 8) ? 0 : Wp(0.042),
                                            marginBottom: Wp(0.042)
                        }}>
                            <FastImage resizeMode={'cover'} 
                                       style={{ height: '100%', width: '100%', borderRadius: Hp(0.004) }}
                                       source={{ uri: item.imageUrl }}
                            />
                        </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
             />
         </View>
     ) 
     } else { return null }
 }
} 
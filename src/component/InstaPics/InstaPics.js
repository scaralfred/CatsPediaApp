import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { isIos, onLayout, Wp, Hp } from '../../lib/util';
import { font } from '../../styles/variables';
import Axios from 'axios';
import FastImage from 'react-native-fast-image';

var styles = StyleSheet.create({
    sectionContentText: {
        fontFamily: font.bold,
        fontSize: Hp(0.028),
        paddingTop: Hp(0.003),
        letterSpacing: 0.5
    },
});

export default class InstaPics extends Component {

    state = { 
        instagramContainerWidth: Wp(0.85),
        instaPics: []
        // instaPics: [1,1,1,1,1,1]
    }

    componentWillMount() {
        const instaApi = `https://www.instagram.com/dogs.lovers/?__a=1`;

        getInstagramFromApi = async () => {
            try {
                let response = await Axios(instaApi);
                let responseJson = await response.json();
                let getsPicsArray = responseJson.graphql.user.edge_owner_to_timeline_media.edges
                let instaPicsArray = getsPicsArray.map(el => {
                    let imageThumbnail = el.node.thumbnail_resources[0].src;
                    let imageFullSize = el.node.display_url;
                    let caption = el.node.edge_media_to_caption.edges.length > 0 && el.node.edge_media_to_caption.edges[0].node.text || null;
                    return {imageThumbnail, imageFullSize, caption}
                }).slice(0, 9)
                this.setState({ instaPics: instaPicsArray});
                if (instaPicsArray.length > 0) { 
                    // this.props.instaPicsFetched()
                } else {
                    this.setState({ instaPicsError: true })
                }
            } catch (error) {
                this.setState({ instaPicsError: true})
            }
        }

        const instaApiByTag = `https://www.instagram.com/explore/tags/${this.props.breedName}/?__a=1`;

        getInstagramFromApiByTag = async () => {
            try {
                let response = await fetch(instaApiByTag);
                let responseJson = await response.json();
                let getsPicsArray = responseJson.graphql.hashtag.edge_hashtag_to_media.edges
                let instaPicsArray = getsPicsArray.map(el => {
                    let imageThumbnail = el.node.thumbnail_resources[0].src;
                    let imageFullSize = el.node.display_url;
                    let caption = el.node.edge_media_to_caption.edges.length > 0 && el.node.edge_media_to_caption.edges[0].node.text || null;
                    return { imageThumbnail, imageFullSize, caption }
                }).slice(0, 9)
                this.setState({ instaPics: instaPicsArray });
                if (instaPicsArray.length > 0) {
                    // this.props.instaPicsFetched()
                } else {
                    this.setState({ instaPicsError: true })
                }
            } catch (error) {
                this.setState({ instaPicsError: true })
            }
        }

        getInstagramFromApiByTag();

        // getInstagramFromApi()
    }

 render() {
     const {instaPics} = this.state;
     if (instaPics && instaPics.length > 2) {  
         return (
         <View style={{paddingTop: Hp(0.028)}} onLayout={(e) => this.setState({ instagramContainerWidth: onLayout(e).width })}>
             <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: Hp(0.0)}}>
                <FastImage source={require('../../assets/logos/instagram-logo.png')} 
                           style={{ width: Hp(0.027), height: Hp(0.027), marginRight: Hp(0.015)}}
                           resizeMode={'contain'}
                           />
                <Text style={[styles.sectionContentText, {flex: 1}]}>Instagram</Text>
             </View>
             <View style={{paddingTop: Hp(0.008), flexDirection: 'row', marginBottom: Hp(0.02)}}>
                    <Text style={[styles.sectionContentText, {fontFamily: font.medium, fontSize: Hp(0.018)}]}>#</Text>
                    <Text style={[styles.sectionContentText, {fontFamily: font.medium, fontSize: Hp(0.016), lineHeight: Hp(0.03)}]}>{this.props.breedName.toUpperCase()}</Text>
             </View>
             <FlatList data={this.state.instaPics}
                       renderItem={({ item, index }) => (
                        <TouchableOpacity activeOpacity={0.8} 
                                            onPress={() => {
                                                Navigation.showModal(
                                                    {
                                                        component:
                                                        {
                                                            name: 'InstaPicModal',
                                                            passProps: {
                                                                images: instaPics.map(el => { return {img: el.imageFullSize || null, caption: el.caption || null}}),
                                                                imageUrl: item.imageFullSize,
                                                                caption: item.caption,
                                                                currentPage: index
                                                            }
                                                        }
                                                    })
                                            }} 
                                            style={{
                                            backgroundColor: 'grey',
                                            borderRadius: Hp(0.004),
                                            height: (this.state.instagramContainerWidth / 3) - Wp(0.028),
                                            width: (this.state.instagramContainerWidth / 3) - Wp(0.028),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: (index == 2 || index == 5 || index == 8) ? 0 : Wp(0.042),
                                            marginBottom: Wp(0.042)
                        }}>
                            <FastImage resizeMode={'cover'} 
                                       style={{ height: '100%', width: '100%', borderRadius: Hp(0.004) }}
                                       source={{ uri: item.imageThumbnail }}
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
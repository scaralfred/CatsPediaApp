import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { CheckCircle } from '../UI/CheckCircle';
import { Wp, Hp } from '../../lib/util';
import FastImage from 'react-native-fast-image';

export const LayoutOptions = ({changeFavoritesLayout, changeMainLayout, favoritesLayout, mainLayout, color}) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={0.8} 
                                onPress={()=> {
                                    changeFavoritesLayout ? changeFavoritesLayout('1') : changeMainLayout('1')
                                }} style={styles.layoutImageContainer}>
                <FastImage resizeMode={'contain'} source={require('../../assets/images/layout-1.jpg')} style={styles.layoutImage} />
                <View style={styles.checkerContainer}>
                    <CheckCircle color={color} checked={favoritesLayout ? favoritesLayout == '1' : mainLayout == '1'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    changeFavoritesLayout ? changeFavoritesLayout('2') : changeMainLayout('2')
                                }} 
                                style={styles.layoutImageContainer}>
                <FastImage resizeMode={'contain'} source={require('../../assets/images/layout-2.jpg')} style={styles.layoutImage} />
                <View style={styles.checkerContainer}>
                    <CheckCircle color={color} checked={favoritesLayout ? favoritesLayout == '2' : mainLayout == '2'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} 
                                onPress={()=> {
                                    changeFavoritesLayout ? changeFavoritesLayout('3') : changeMainLayout('3')
                                }} style={styles.layoutImageContainer}>
                <FastImage resizeMode={'contain'} source={require('../../assets/images/layout-3.jpg')} style={styles.layoutImage} />
                <View style={styles.checkerContainer}>
                    <CheckCircle color={color} checked={favoritesLayout ? favoritesLayout == '3' : mainLayout == '3'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} 
                                onPress={()=> {
                                    changeFavoritesLayout ? changeFavoritesLayout('4') : changeMainLayout('4')
                                }} style={styles.layoutImageContainer}>
                <FastImage resizeMode={'contain'} source={require('../../assets/images/layout-4.jpg')} style={styles.layoutImage} />
                <View style={styles.checkerContainer}>
                    <CheckCircle color={color} checked={favoritesLayout ? favoritesLayout == '4' : mainLayout == '4'} />
                </View>
            </TouchableOpacity>
    </ScrollView>
);

const styles = StyleSheet.create({
    layoutImageContainer: {
        alignItems: 'center',
        width: Wp(0.36),
        paddingTop: Hp(0.02),
        marginBottom: Hp(0.005)
    },
    layoutImage: {
        width: Wp(0.4),
        height: Hp(0.22),
    },
    checkerContainer: {
        paddingTop: Hp(0.015)
    }
})
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Wp } from '../../lib/util';
import FastImage from 'react-native-fast-image';

export const FloatingSettingsArrow = ({onPress}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
        <FastImage resizeMode={'contain'} source={require('../../assets/icons/settings-empty-white.png')} style={styles.icon}/>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Wp(0.035),
        right: Wp(0.035),
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: Wp(0.1),
        width: Wp(0.1),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: Wp(0.065),
        marginTop: Wp(0.005),
        marginLeft: Wp(0.005)
    }
})
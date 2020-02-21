import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Wp, isIos, isIphoneX } from '../../lib/util';
import FastImage from 'react-native-fast-image';

export const FloatingBackArrow = ({onPress}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
        <View style={styles.arrowContainer}>
            <FastImage resizeMode={'contain'} source={require('../../assets/icons/left-arrow-white.png')} style={styles.icon} />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        zIndex: 9999,
        position: 'absolute',
        top: isIphoneX() ? -10 : -30,
        left: 0,
        height: Wp(0.18),
        width: Wp(0.18),
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: Wp(0.1),
        width: Wp(0.1),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -Wp(0.015),
        marginLeft: -Wp(0.015)
    },
    icon: {
        height: Wp(0.065),
        width: Wp(0.065),
        marginTop: Wp(0.005),
        marginLeft: Wp(0.005)
    }
})
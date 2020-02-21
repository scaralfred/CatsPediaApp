import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Wp, Hp } from '../../lib/util';

export const CheckBox = ({checked, color}) => (
    <View style={[styles.outerCircle, checked ? {backgroundColor: color, borderColor: color} : null]}/>
);

const styles = StyleSheet.create({
    outerCircle: {
        height: Wp(0.045),
        width: Wp(0.045),
        borderRadius: Hp(0.004),
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Wp(0.004),
    }
})
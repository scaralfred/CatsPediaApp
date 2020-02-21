import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Wp } from '../../lib/util';

export const CheckCircle = ({checked,color}) => (
    <View style={[styles.outerCircle, color && {borderColor: color}]}>
        {checked ? <View style={[styles.innerCircle, color && {backgroundColor: color}]}/> : null}
    </View>
);

const styles = StyleSheet.create({
    outerCircle: {
        height: Wp(0.06),
        width: Wp(0.06),
        borderRadius: Wp(0.06),
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Wp(0.006),
    },
    innerCircle: {
        height: Wp(0.03),
        width: Wp(0.03),
        borderRadius: Wp(0.03),
        backgroundColor: '#000'
    }
})
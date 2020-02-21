import React, { Component } from 'react';
import { View, NetInfo, Text, StatusBar, StyleSheet, Platform } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

const styles = StyleSheet.create({
    container: {

    }
});

const Wrapper = (WrappedComponent) => {
    return class extends Component {

        static options(passProps) {
            return {
                layout: { orientation: ['portrait'] },
                topBar: {
                    visible: false,
                    drawBehind: true
                }
            };
        }


        render () {
            return (
                <MenuProvider>
                        <WrappedComponent {...this.props} />
                </MenuProvider>
            );
        }
    }
}

export default Wrapper;
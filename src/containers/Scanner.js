import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from '../reducers/global/globalActions';
import { View,  StyleSheet, Button } from 'react-native';
import { Wp, Hp } from '../lib/util';
import ImagePicker from 'react-native-image-crop-picker';
import BottomTabsBar from '../component/bottomTabsBar/BottomTabsBar';
const axios = require('axios');

// URL = 'http://dog-scanner.herokuapp.com'
// URL = 'https://animal-scanner.appspot.com'
URL = 'http://159.65.224.98:8000'
// URL = 'http://192.168.1.4:80'

class Scanner extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            }
        };
    };

    getHomePage() {
        axios.get(`${URL}/`)
        .then(res => alert(JSON.stringify(res.data)))
        .catch(err => alert(err))
    }

    getImageFolder() {
        axios.get(`${URL}/images`)
        .then(res => alert(JSON.stringify(res.data)))
        .catch(err => alert(err))
    }

    pickAndUploadImage = (source) => {
        this.pickImageFromPhone(source)
        .then(image => {
            var formData = new FormData();
            let file = { uri: image.path, type: 'image/jpeg', name: image.path }
            formData.append('file', file);
            // alert(JSON.stringify(formData))

            axios({
                method: 'post',
                url: `${URL}/uploader`,
                data:  formData,
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function (response) {
                // handle success
                alert(JSON.stringify(response.data));
            })
            .catch(function (error) {
            // handle error 
                alert(error.message);
            })
        })
    }

    pickImageFromPhone = (source) => new Promise((resolve, reject) => {
        if (source == 'file') {
            ImagePicker.openPicker({ compressImageMaxWidth: 250, compressImageMaxHeight: 250, cropping: true })
                .then(image => resolve(image))
                .catch(error => reject(error))
        } 
        if (source == 'camera') {
            ImagePicker.openCamera({ compressImageMaxWidth: 250, compressImageMaxHeight: 250, cropping: true })
                .then(image => resolve(image))
                .catch(error => reject(error))
        } 
    });
  
   render() { 

        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginTop: 20}}>
                        <Button title={'load picture from file'} onPress={()=> this.pickAndUploadImage('file')} style={{width: Wp(0.1), height: Hp(0.001)}}/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button title={'load picture from camera'} onPress={()=> this.pickAndUploadImage('camera')} style={{width: Wp(0.1), height: Hp(0.001)}}/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button title={'get home page'} onPress={this.getHomePage} style={{width: Wp(0.1), height: Hp(0.001), marginTop: 50}}/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button title={'get image folder'} onPress={this.getImageFolder} style={{width: Wp(0.1), height: Hp(0.001), marginTop: 50}}/>
                    </View>
                </View>
                <BottomTabsBar tabNumber={1} onTabReSelected={() => null /*this.scrollToTop(true)*/} componentId={this.props.componentId}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Scanner)
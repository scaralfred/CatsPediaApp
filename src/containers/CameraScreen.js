import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scannerActions from '../reducers/scanner/scannerActions';
import { View,  StyleSheet, Button, ScrollView, Text, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import { Wp, Hp, formatHeight, formatWeight, isIphoneX, isIos } from '../lib/util';
import { Navigation } from 'react-native-navigation';
import { RNCamera } from 'react-native-camera';
import FastImage from 'react-native-fast-image';
import ImageCropper from 'react-native-simple-image-cropper';
import { font } from '../styles/variables';
import { checkCameraPermission, requestCameraPermission, checkStoragePermission } from '../lib/permissions';
import PhotoPermissions from './PhotoPermissions';

class CameraScreen extends Component {

    static options(passProps) {
        return {
            layout: { orientation: ['portrait'] },
            topBar: {
                visible: false,
                drawBehind: true
            },
            statusBar: {
                backgroundColor: '#000',
                style: 'light'
            }
        };
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    state = {
        takenPictureUri: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081',
        cropperParams: {},
        croppedImage: '',
        croppingImage: false,
        getFromStoragePressed: false,
        storagePermission: false,
        cameraPermission: false,
        cameraView: false,
        frontCamera: false,
        flashMode: 'auto',
        flashModeIcon: require('../assets/icons/flash-auto-white.png'),
        loadingTakenPicture: false
    }

    componentWillMount() {
        checkCameraPermission().then(res => this.setState({ cameraPermission: res }));
        checkStoragePermission().then(res => this.setState({ storagePermission: res }));
    }

    componentDidAppear() {
        this.setState({ cameraView: true });
    }

    componentDidDisappear() {
        this.setState({ cameraView: false });
    }

    
    takePicture = async() => {
        setTimeout(() => this.setState({loadingTakenPicture: true}), 500);
        if (this.camera) {
          const options = { quality: 1, width: 500, height: 500, mirrorImage: this.state.frontCamera, pauseAfterCapture: true};
          const data = await this.camera.takePictureAsync(options);
        //   this.props.actions.uploadImageTakenFromCamera(data.uri, this.props.componentId)
          this.setState({loadingTakenPicture: false})
          data && setTimeout(() => this.setState({takenPictureUri: data.uri, croppingImage: true }), 100);
          
        }
      };

    changeFlashMode = () => {
        const { flashMode } = this.state;
        switch(flashMode) {
            case 'auto':
                this.setState({flashMode: 'on', flashModeIcon: require('../assets/icons/flash-on-white.png')})
              break;
            case 'on':
                this.setState({flashMode: 'off', flashModeIcon: require('../assets/icons/flash-off-white.png')})
              break;
            case 'off':
                this.setState({flashMode: 'torch', flashModeIcon: require('../assets/icons/flash-torch-white.png')})
              break;
            case 'torch':
                this.setState({flashMode: 'auto', flashModeIcon: require('../assets/icons/flash-auto-white.png')})
              break;
            default:
                this.setState({flashMode: 'auto', flashModeIcon: require('../assets/icons/flash-auto-white.png')})
          }
    }
     
    setCropperParams = cropperParams => {
        this.setState(prevState => ({
            ...prevState,
            cropperParams,
        }));
    };

    onCropImage = async () => {
        const { cropperParams, takenPictureUri } = this.state;
     
        const cropSize = { width: 400, height: 400 };
     
        const cropAreaSize = { width: Dimensions.get('window').width * 0.85, height: Dimensions.get('window').width * 0.85};
     
        try {
          const result = await ImageCropper.crop({
            ...cropperParams,
            imageUri: takenPictureUri,
            cropSize,
            cropAreaSize
          });
        //   this.setState(prevState => ({
        //     ...prevState,
        //     croppedImage: result,
        //   }));
          this.props.actions.uploadCroppedImageTakenFromCamera(result, this.props.componentId)
        } catch (error) {
          console.log(error);
        }
      };

   render() { 

        const { takenPictureUri,
                croppingImage, 
                getFromStoragePressed, 
                storagePermission, 
                cameraPermission, 
                cameraView, 
                frontCamera, 
                flashMode, 
                flashModeIcon, 
                loadingTakenPicture 
            } = this.state;

        const { primaryColor } = this.props.theme;

        const Header = () => (
            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} 
                                        style={{ paddingVertical: Hp(0.02), paddingHorizontal: Hp(0.04)}} 
                                        onPress={this.changeFlashMode}>
                        <FastImage resizeMode={'contain'} 
                                    style={{ width: Wp(0.075), height: Wp(0.075) }} 
                                    source={flashModeIcon} 
                        />
                        </TouchableOpacity> 
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} 
                                        style={{ paddingVertical: Hp(0.02), paddingHorizontal: Hp(0.04)}} 
                                        onPress={() => Navigation.pop(this.props.componentId)}>
                        <FastImage resizeMode={'contain'} 
                                    style={{ width: Wp(0.055), height: Wp(0.055) }} 
                                    source={require('../assets/icons/close-white.png')} 
                        />
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        )

        const CentralButton = () => (
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingBottom: Hp(0.03)}}>
                <TouchableOpacity onPress={()=> this.takePicture()} 
                                    activeOpacity={0.8} 
                                    style={styles.outerCircle}>
                    <View style={styles.innerCircle}/>
                </TouchableOpacity>
            </View>
        )
        
        const LowerButtons = () => (
            <View style={styles.lowerButtonsContainer}>
                {/* <View style={{paddingBottom: Hp(0.03)}}>
                    <TouchableOpacity onPress={()=> this.takePicture()} 
                                      activeOpacity={0.8} 
                                      style={styles.outerCircle}>
                        <View style={styles.innerCircle}/>
                    </TouchableOpacity>
                </View> */}
                <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <View style={{  alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} 
                                          style={{ paddingVertical: Hp(0.02), paddingHorizontal: Hp(0.04)}}  
                                          onPress={() => {
                                            if (storagePermission == 'granted') {
                                                this.props.actions.pickAndUploadImageFromPhone(this.props.componentId);
                                            } else {
                                                this.setState({getFromStoragePressed: true});
                                            }
                                          }}>
                        <View style={styles.folderContainer}>
                                <FastImage resizeMode={'cover'} 
                                        style={{ width: Hp(0.04), height: Hp(0.04), borderRadius: Hp(0.004) }} 
                                        source={require('../assets/images/dog.jpg')} 
                            />
                        </View>
                        </TouchableOpacity> 
                    </View>
                    <View style={{flex: 1}}/>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.8} 
                                          style={{ paddingVertical: Hp(0.02), paddingHorizontal: Hp(0.04)}} 
                                          onPress={() => this.setState({frontCamera: !frontCamera})}>
                        <FastImage resizeMode={'contain'} 
                                   style={{ width: Wp(0.085), height: Wp(0.085), marginLeft: -Wp(0.00) }} 
                                   source={require('../assets/icons/flip-camera-white.png')} 
                        />
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        )   
                                          
            if (croppingImage) {

                const Header = () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: Wp(0.2), height: 50}}/>
                        <View style={{flex: 1, paddingTop: Hp(0.02), justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center', fontFamily: font.medium, fontSize: Hp(0.04), lineHeight: Hp(0.045)}}>Photo Preview</Text>
                        </View>
                        <TouchableOpacity style={{ padding: Hp(0.04), paddingBottom: Hp(0.02) }} 
                                          onPress={()=> this.setState({croppingImage: false})}
                                          >
                            <FastImage resizeMode={'contain'} 
                                        style={{ width: Wp(0.055), height: Wp(0.055) }} 
                                        source={require('../assets/icons/close-black-2.png')} 
                            />
                        </TouchableOpacity> 
                    </View>
                )

                return (
                    <View style={{flex: 1}}>
                        <Header />
                        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                            <ImageCropper
                            imageUri={takenPictureUri}
                            cropAreaWidth={Wp(0.85)}
                            cropAreaHeight={Wp(0.85)}
                            setCropperParams={this.setCropperParams}
                            style={{ borderColor: this.props.theme.primaryColor, borderWidth: Hp(0.0045)}}
                            />
                            <View style={{marginHorizontal: Wp(0.08), marginTop: Hp(0.01)}}>
                                <Text style={styles.cropDescription}>Crop the picture or choose an option below</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: Wp(0.075), marginTop: Hp(0.1), marginBottom: Hp(0.02) }}>
                                <TouchableOpacity activeOpacity={0.8} 
                                                  onPress={this.onCropImage} 
                                                  style={[styles.cropImageButton, {backgroundColor: primaryColor}]}>
                                    <Text style={[styles.cropImageButtonText, {paddingHorizontal: Wp(0.02), paddingTop: Hp(0.005)}]}>Identify</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity activeOpacity={0.8} 
                                                  onPress={()=> this.setState({croppingImage: false})} 
                                                  style={styles.reTakeButton}>
                                    <Text style={styles.reTakeText}>ReTake</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        
            if (cameraPermission == 'denied' || cameraPermission == 'blocked' || getFromStoragePressed) {
               
                return <PhotoPermissions mainColor={this.props.theme.primaryColor} 
                                         componentId={this.props.componentId}
                                         cameraPermission={cameraPermission} 
                                         cameraPermissionGranted={()=> this.setState({cameraPermission: 'granted'})}
                                         cameraPermissionBlocked={()=> this.setState({cameraPermission: 'blocked'})}
                                         storagePermission={storagePermission} 
                                         storagePermissionGranted={()=> this.setState({storagePermission: 'granted'})}
                                         storagePermissionBlocked={()=> this.setState({storagePermission: 'blocked'})}
                                         removeGetFromStoragePressed={() => this.setState({getFromStoragePressed: false})}
                                         getFromStorage={()=> this.props.actions.pickAndUploadImageFromPhone(this.props.componentId)}
                                         />
                                         
            } else if (cameraView && cameraPermission == "granted") {
                return (
                    <View style={styles.container}>
                        <StatusBar backgroundColor="#000" barStyle="light-content" />
                        <Header />
                        <View style={{flex: 1}}>
                            <RNCamera
                            captureAudio={false}
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={frontCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode[flashMode]}
                            />
                            <CentralButton />
                        </View>
                        <LowerButtons />
                        {loadingTakenPicture ?
                            <View style={styles.loadingTakenPicture}>
                                <ActivityIndicator size={'large'} color={'#fff'}/>
                            </View>
                        : null}
                    </View>
                )
            } else {
                return <View />
            }

        }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
      },
      header: {
        paddingTop: Hp(0.01) + (isIphoneX() ? 30 : isIos() ? 15 : 0),
        paddingBottom: Hp(0.01),
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        // position: 'absolute',
        // top: isIphoneX() ? 30 : isIos() ? 15 : 0,
        // zIndex: 100
      },
      lowerButtonsContainer: {
        paddingVertical: Hp(0.01)
        // position: 'absolute',
        // alignItems: 'center',
        // justifyContent: 'center',
        // bottom: isIphoneX() ? 18 : 0, 
        // right: 0,
        // left: 0,
        // zIndex: 100
      },
      preview: {
        flex: 1
      },
      outerCircle: {
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: Hp(0.004),
        height: Hp(0.1),
        width: Hp(0.1),
        borderRadius: Hp(0.1),
        marginHorizontal: Hp(0.05),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      },
      innerCircle: {
        backgroundColor: '#fff',
        height: Hp(0.085),
        width: Hp(0.085),
        borderRadius: Hp(0.075)
      },
      uploadImageContainer: {
          width: Hp(0.04),
          height: Hp(0.05),
          borderColor: '#fff',
          borderWidth: Hp(0.004),
          borderRadius: Hp(0.004)
      },
      folderContainer: {
        borderColor: '#fff',
        borderWidth: Hp(0.004),
        height: Hp(0.048),
        width: Hp(0.048),
        borderRadius: Hp(0.008)
      },
      loadingTakenPicture: {
          position: 'absolute',
          top: 0,
          bottom: 0, 
          right: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 2000
      },
      cropDescription:{
        fontFamily: font.regular,
        fontSize: Hp(0.025),
        color: '#000',
        textAlign: 'center'
      },
      cropImageButton: {
        borderRadius: Hp(0.004), 
        height: Hp(0.07), 
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center'
      },
      cropImageButtonText: {
        fontFamily: font.medium,
        fontSize: Hp(0.032),
        color: '#fff'
      },
      reTakeButton: {
        padding: Wp(0.08), 
        paddingVertical: Hp(0.01)
      },
      reTakeText: {
        fontFamily: font.medium,
        fontSize: Hp(0.028),
        color: '#000'
      }
});

const mapStateToProps = state => ({
    theme: state.global.theme
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...scannerActions }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)
import React, {Component} from 'react';
import Carousel from 'react-native-looped-carousel';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Hp, Wp, isIos, isIphoneX, bigPic } from '../../lib/util';

const { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 30
    },
    imageContainer: {
        height: height,
        width,
        marginTop: isIphoneX() ? -20 : null,
    },
    header: {
        flexDirection: 'row',
        marginTop: isIphoneX() ? 20 : null,
        zIndex: 1000
    },
});

class CarouselModal extends Component {

    static options(passProps) {
        return {
            layout: {
                orientation: ['portrait'] // An array of supported orientations
            },
            topBar: {
                animate: false,
                visible: false,
                drawBehind: true,
                elevation: 0,
                background: { color: 'transparent' },
                backButton: {
                    color: 'white'
                },
            }
        }
    }
    
    state = {
        loadingPicture: false,
        finalPicture: true
    }

    render() {
        const { loadingPicture, finalPicture } = this.state;
        const placeholder = require('../../assets/images/placeholder.png');

        const Header = () => (
            <View style={styles.header}>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ padding: Wp(0.084), }} onPress={() => Navigation.dismissModal(this.props.componentId)}>
                       <FastImage resizeMode={'contain'} 
                                  style={{ width: Wp(0.055), height: Wp(0.055) }} 
                                  source={require('../../assets/icons/close-black-2.png')} 
                       />
                    </TouchableOpacity> 
                </View>
            </View>
        )

        return (
                <View style={styles.container}>
                    <Header />
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -Wp(0.2)}}>
                        <Carousel 
                        onPageBeingChanged={(page)=> this.props.changePage(page)} 
                        currentPage={this.props.currentPage} 
                        autoplay={false} 
                        style={styles.imageContainer}
                        bulletsContainerStyle={{ marginBottom: Hp(0.01) }}
                        bulletStyle={{ margin: Hp(0.006), borderWidth: 1, borderColor: '#fff', borderRadius: 50, width: Hp(0.012), height: Hp(0.012) }}
                        chosenBulletStyle={{ margin: 4, backgroundColor: '#fff', borderRadius: 50, height: Hp(0.012), width: Hp(0.012) }}
                        bullets={true}
                        >
                            {this.props.images.map((uri, idx) => (
                                    <View
                                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                        minimumZoomScale={1}
                                        maximumZoomScale={2}
                                        centerContent={true}>
                                        {/* <Image
                                        source={{ uri }}
                                        indicator={()=><Spinner type={'ThreeBounce'} color={'#191A1E'} size={60} />}
                                        style={{ width, height: height / 2.5 }}
                                        /> */}
                                        {loadingPicture ?
                                                <View style={{ position: 'absolute',  justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                                                    <ActivityIndicator size={'small'} color='#000'/>
                                                </View>
                                                : null}
                                                {finalPicture ?
                                                // <ImageZoom cropWidth={Wp(1)}
                                                //            cropHeight={Hp(1)}
                                                //            imageWidth={width}
                                                //            imageHeight={height}>
                                                    <FastImage  resizeMode={'contain'} 
                                                                source={{ uri: bigPic(uri) }} 
                                                                style={{ width, height}} 
                                                                onLoadStart={()=> {
                                                                // setTimeout(() => {
                                                                //     // alert(loadingPicture)
                                                                //     loadingPicture ? this.setState({finalPicture: false, loadingPicture: false}) : null
                                                                // }, 5000);
                                                                this.setState({loadingPicture: true})
                                                                }}
                                                                onLoad={()=> {
                                                                this.setState({finalPicture: true, loadingPicture: false})
                                                                }}
                                                                onLoadError={()=> {
                                                                this.setState({finalPicture: false, loadingPicture: false})
                                                                }}
                                                    /> 
                                                // </ImageZoom>
                                                :
                                                <FastImage  resizeMode={'cover'} 
                                                            source={placeholder} 
                                                            style={styles.carouselImage}
                                                />
                                        }
                                    </View>
                            ))}
                        </Carousel>
                    </View>
                </View>
        )
    }
}

export default CarouselModal;
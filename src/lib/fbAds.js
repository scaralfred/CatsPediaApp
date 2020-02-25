import React, { useState } from 'react';
import { View } from 'react-native';
import { BannerView, InterstitialAdManager } from 'react-native-fbads';
import { isIos } from './util';
import Config from 'react-native-config';

const FBADS = false;

export const FbAdsSmallBanner = () => {
    const [fbAdsSmallBannerActive, setFbAdsSmallBanner] = useState(true);

    if (FBADS && fbAdsSmallBannerActive) {
        return (
            <BannerView placementId={isIos() ? Config.FB_ADS_SMALL_BANNER_IOS : Config.FB_ADS_SMALL_BANNER_ANDROID} 
                        type="standard"
                        onPress={() => console.log('click')}
                        onLoad={() => setFbAdsSmallBanner(true)}
                        onError={err => setFbAdsSmallBanner(false)}
        />
        )
    } else {
        return null;
    }
    
};

export const FbAdsInterstitial = () => {

    const interstitialTime = 35000;

    FBADS ?
    setTimeout(() => {
        InterstitialAdManager.showAd(isIos() ? Config.FB_ADS_INTERSTITIAL_IOS : Config.FB_ADS_INTERSTITIAL_ANDROID)
            .then(didClick => { })
            .catch(error => { })
    
        }, interstitialTime)
    : null;
}

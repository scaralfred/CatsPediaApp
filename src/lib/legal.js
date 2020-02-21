import React from 'react';
import { Text, TouchableWithoutFeedback, Linking } from 'react-native';
import { font } from '../styles/variables';
import { isIos, Hp } from './util';
import Config from "react-native-config";

export const termsAndConditions = (
    <Text style={{fontFamily: font.regular, fontSize: Hp(0.023), paddingTop: Hp(0.02), textAlign: 'justify'}}>
        By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative versions. The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to {Config.DEVELOPER_NAME}.{"\n"}{"\n"}
        
        {Config.DEVELOPER_NAME} is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.{"\n"}{"\n"}

        {Config.APP_NAME} app stores and processes personal data that you have provided to us, in order to provide my Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that {Config.APP_NAME} app won’t work properly or at all.{"\n"}{"\n"}

        You should be aware that there are certain things that {Config.DEVELOPER_NAME} will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but {Config.DEVELOPER_NAME} cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.{"\n"}{"\n"}

        If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.{"\n"}{"\n"}

        Along the same lines, {Config.DEVELOPER_NAME} cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, {Config.DEVELOPER_NAME} cannot accept responsibility.{"\n"}{"\n"}
        
With respect to {Config.DEVELOPER_NAME}’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. {Config.DEVELOPER_NAME} accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.{"\n"}{"\n"}
At some point, we may wish to update the app. The app is currently available on Android and iOS – the requirements for both systems (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. {Config.DEVELOPER_NAME} does not promise that it will always update the app so that it is relevant to you and/or works with the iOS/Android version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.
</Text>
);

export const privacyPolicy = (
    <Text style={{fontFamily: font.regular, fontSize: Hp(0.023), paddingTop: Hp(0.02), textAlign: 'justify'}}>
        {Config.DEVELOPER_NAME} built {Config.APP_NAME} app as a Free app. This service is provided by {Config.DEVELOPER_NAME} at no cost and is intended for use as is.{"\n"}
                                                    
        This page is used to inform website visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.{"\n"}
                            
        If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.{"\n"}
        
        The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at {Config.APP_NAME} unless otherwise defined in this Privacy Policy.{"\n"}{"\n"}
        
        
        <Text style={{ fontWeight: "bold" }}>Information Collection and Use{"\n"}{"\n"}</Text>
        
        For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request is retained on your device and is not collected by me in any way.{"\n"}
        
        The app does use third party services that may collect information used to identify you.{"\n"}
        
        Link to privacy policy of third party service providers used by the app:{"\n"}{"\n"}
        
        {!isIos() ? <TouchableWithoutFeedback onPress={() => Linking.openURL("https://policies.google.com/privacy")}>
        <Text style={{color: "blue", textDecorationLine: "underline"}}>Google Play Services{"\n"}{"\n"}</Text>
        </TouchableWithoutFeedback> : null
        }
        
        <Text style={{ fontWeight: "bold" }}>Log Data{"\n"}{"\n"}</Text>
        
        I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.{"\n"}{"\n"}
        
        
        <Text style={{ fontWeight: "bold" }}>Cookies{"\n"}{"\n"}</Text>
        
        Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
        
        This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.{"\n"}{"\n"}
        
        
        <Text style={{ fontWeight: "bold" }}>Service Providers{"\n"}{"\n"}</Text>
        
        I may employ third-party companies and individuals due to the following reasons:
        
        To facilitate our Service;
        To provide the Service on our behalf;
        To perform Service-related services; or
        To assist us in analyzing how our Service is used.
        I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.{"\n"}{"\n"}
        
        
        <Text style={{ fontWeight: "bold" }}>Security{"\n"}{"\n"}</Text>
        
        I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.{"\n"}{"\n"}
                                
                                
        <Text style={{ fontWeight: "bold" }}>Links to Other Sites{"\n"}{"\n"}</Text>
        
        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.{"\n"}{"\n"}
        
        <Text style={{ fontWeight: "bold" }}>Children’s Privacy{"\n"}{"\n"}</Text>
        
        These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.{"\n"}{"\n"}
    </Text>
)
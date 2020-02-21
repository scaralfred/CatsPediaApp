package com.quickpedia;

import android.app.Application;
import android.content.Context;
import com.chirag.RNMail.*;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import suraj.tiwari.reactnativefbads.FBAdsPackage;
import com.reactnativecommunity.imageeditor.ImageEditorPackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.chirag.RNMail.RNMail;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

// FB ADS
import com.facebook.ads.AudienceNetworkAds;
import suraj.tiwari.reactnativefbads.FBAdsPackage;

public class MainApplication extends NavigationApplication {
  
  // FB ADS
  @Override 
  public void onCreate() {
    super.onCreate();
    AudienceNetworkAds.initialize(this); // <-- add this 
  }
  
  @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

  @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

  protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new ReactNativeConfigPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new RNMail(),
            new RNDeviceInfo(),
            new FastImageViewPackage(),
            new ReactNativeYouTube(),
            new RNCWebViewPackage(),
            new PickerPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new RNPermissionsPackage(),
            new AndroidOpenSettingsPackage(),
            new ImageEditorPackage(),
            new FBSDKPackage(),
            new FBAdsPackage()
        );
    }

  @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    } 
}

// public class MainApplication extends Application implements ReactApplication {

//   private final ReactNativeHost mReactNativeHost =
//       new ReactNativeHost(this) {
//         @Override
//         public boolean getUseDeveloperSupport() {
//           return BuildConfig.DEBUG;
//         }

//         @Override
//         protected List<ReactPackage> getPackages() {
//           @SuppressWarnings("UnnecessaryLocalVariable")
//           List<ReactPackage> packages = new PackageList(this).getPackages();
//           // Packages that cannot be autolinked yet can be added manually here, for example:
//           // packages.add(new MyReactNativePackage());
//           return packages;
//         }

//         @Override
//         protected String getJSMainModuleName() {
//           return "index";
//         }
//       };

//   @Override
//   public ReactNativeHost getReactNativeHost() {
//     return mReactNativeHost;
//   }

//   @Override
//   public void onCreate() {
//     super.onCreate();
//     SoLoader.init(this, /* native exopackage */ false);
//     initializeFlipper(this); // Remove this line if you don't want Flipper enabled
//   }

//   /**
//    * Loads Flipper in React Native templates.
//    *
//    * @param context
//    */
//   private static void initializeFlipper(Context context) {
//     if (BuildConfig.DEBUG) {
//       try {
//         /*
//          We use reflection here to pick up the class that initializes Flipper,
//         since Flipper library is not available in release mode
//         */
//         Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
//         aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
//       } catch (ClassNotFoundException e) {
//         e.printStackTrace();
//       } catch (NoSuchMethodException e) {
//         e.printStackTrace();
//       } catch (IllegalAccessException e) {
//         e.printStackTrace();
//       } catch (InvocationTargetException e) {
//         e.printStackTrace();
//       }
//     }
//   }
// }

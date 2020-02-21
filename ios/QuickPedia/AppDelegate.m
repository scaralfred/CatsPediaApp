/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNSplashScreen.h"
#import "RNSplashScreen.h"
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>

#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

  [ReactNativeNavigation bootstrap:[self sourceURLForBridge: bridge] launchOptions:launchOptions];

  [RNSplashScreen show];

  // You can skip this line if you have the latest version of the SDK installed
  // [[FBSDKApplicationDelegate sharedInstance] application:application
  //   didFinishLaunchingWithOptions:launchOptions];
  
  return YES;
}


//FB SDK
 - (BOOL)application:(UIApplication *)application 
             openURL:(NSURL *)url 
             options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

   BOOL handled =  [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options];
   // Add any custom logic here.
   return handled;
 }

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './Screens';
import SplashScreen from 'react-native-splash-screen';
import { font } from './styles/variables';
import { persistStore as persistStoreRaw } from 'redux-persist';
import reduxStore from "./reducers/index";
import { Wp } from './lib/util';

const store = reduxStore();

registerScreens(store);


// promisify persistStore
const persistStore = (store) =>
  new Promise(resolve => {
    persistStoreRaw(store, undefined, () => {
      resolve();
    });
  });

// promisify app launched event
const onAppLaunched = () =>
  new Promise(resolve => {
    Navigation.events().registerAppLaunchedListener(() => {
      resolve();
    });
  });

(async () => {
  registerScreens(store);
  // persist store and w8 for app start simultaneously
  await Promise.all([persistStore(store), onAppLaunched()]);

  useDefaultOptions();
  setTimeout(() => {  SplashScreen.hide(); }, 200);

  await goToTabStack()
})();

// GO TO SCREEN //

export const goToSpecificScreen = (screen) => Navigation.showOverlay({ component: { name: screen || 'Scanner' } });

// TABS STACK //
export const goToTabStack = () => {
    Navigation.setRoot({
        root: {
            sideMenu: {
              options: {
                sideMenu: {
                  left: {
                    width: Wp(0.8)
                  },
                  openGestureMode: 'bezel'
                }
              },
                left: {
                    component: {
                        name: 'SideMenu'
                    }
                },
                center: {
                    bottomTabs: {
                        id: 'MainStack',
                        options: {
                            bottomTabs: {
                                animate: false,
                                titleDisplayMode: 'alwaysShow',
                                visible: false,
                                drawBehind: true,
                                currentTabIndex: 0
                            }
                        },
                        children: [
                            {
                            stack: {
                                id: "AllBreeds",
                                children: [{
                                    component: {
                                        name: 'AllBreeds'
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        animate: false,
                                        text: 'All Breeds',
                                        icon: require('./assets/icons/search-color.png'),
                                        selectedIcon: require('./assets/icons/search-color.png'),
                                        iconColor: '#B8B8B8',
                                        textColor: '#B8B8B8',
                                        // selectedIconColor: '#1C1C1C',
                                        selectedTextColor: '#1C1C1C',
                                        // fontFamily: font.medium,
                                        testID: 'FIRST_TAB_BAR_BUTTON'
                                    }
                                }
                            }
                        },
                        {
                            stack: {
                                id: "Scanner",
                                children: [{
                                    component: {
                                        name: 'Scanner'
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        animate: false,
                                        text: 'Scanner',
                                        icon: require('./assets/icons/scanner.png'),
                                        iconColor: '#B8B8B8',
                                        textColor: '#B8B8B8',
                                        // selectedIconColor: '#1C1C1C',
                                        selectedTextColor: '#1C1C1C',
                                        // fontFamily: font.medium,
                                        testID: 'SECOND_TAB_BAR_BUTTON',
                                    },
                                }
                            }
                        },
                        {
                            stack: {
                                id: "Favorites",
                                children: [{
                                    component: {
                                        name: 'Favorites'
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        animate: false,
                                        text: 'Favorites',
                                        icon: require('./assets/icons/heart-star.png'),
                                        iconColor: '#B8B8B8',
                                        textColor: '#B8B8B8',
                                        // selectedIconColor: '#1C1C1C',
                                        selectedTextColor: '#1C1C1C',
                                        // fontFamily: font.medium,
                                        testID: 'THIRD_TAB_BAR_BUTTON',
                                    },
                                }
                            }
                        }
                        ]
                    }
                }
            }
        }
    });
};

const useDefaultOptions = () => {
    
    console.disableYellowBox = true;

    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        backgroundColor: '#fff',
        style: 'dark'
      },
      bottomTabs: {
        visible: false,
        drawBehind: true
      },
      animations: {
        push: {
          enabled: /*isIos() ? 'false' :*/ 'true',
          content: {
            alpha: {
                from: 1, // Mandatory, initial value
                to: 1, // Mandatory, end value
                duration: 200, // Default value is 300 ms
            }
          }
        },
        pop: {
          enabled: 'false',
          content: {
            alpha: {
              from: 0,
              to: 1
            }
          }
        }
      }
    });
  };
  
  export const ScreenFadeAnimation = (duration) => {
    return ({
      animations: {
        push: {
          enabled: 'true',
          content: {
            alpha: {
                from: 0, // Mandatory, initial value
                to: 1, // Mandatory, end value
                duration: duration || 400, // Default value is 300 ms
                interpolation: 'accelerate'// Optional
            }
          }
        },
        pop: {
          enabled: 'true',
          content: {
            alpha: {
                from: 1, // Mandatory, initial value
                to: 0, // Mandatory, end value
                duration: 400, // Default value is 300 ms
                interpolation: 'accelerate'// Optional
            }
          }
        }
      }
    })
  }
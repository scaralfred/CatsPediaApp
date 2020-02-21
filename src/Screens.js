// screens.js
import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux';
import Wrapper from './HOC/Wrapper';

export const registerScreens = (store) => {
    Navigation.registerComponentWithRedux('AllBreeds', () => Wrapper(AllBreeds), Provider, store);
    Navigation.registerComponentWithRedux('Favorites', () => Wrapper(Favorites), Provider, store);
    Navigation.registerComponentWithRedux('Scanner', () => Scanner, Provider, store);
    Navigation.registerComponentWithRedux('CameraScreen', () => CameraScreen, Provider, store);
    Navigation.registerComponentWithRedux('ScannerResult', () => ScannerResult, Provider, store);
    Navigation.registerComponentWithRedux('ScanHistory', () => ScanHistory, Provider, store);
    Navigation.registerComponentWithRedux('SideMenu', () => SideMenu, Provider, store);
    Navigation.registerComponentWithRedux('BreedDetails', () => BreedDetails, Provider, store);
    Navigation.registerComponentWithRedux('Settings', () => Settings, Provider, store);
    Navigation.registerComponentWithRedux('Feedback', () => Feedback, Provider, store);
    Navigation.registerComponentWithRedux('About', () => About, Provider, store);
    Navigation.registerComponentWithRedux('LayoutOptionsModal', () => LayoutOptionsModal, Provider, store);
    Navigation.registerComponentWithRedux('Filters', () => Filters, Provider, store);
    Navigation.registerComponentWithRedux('InstaPicModal', () => InstaPicModal, Provider, store);
    Navigation.registerComponentWithRedux('YoutubePlayer', () => YoutubePlayer, Provider, store);
    Navigation.registerComponentWithRedux('WikiPage', () => WikiPage, Provider, store);
    Navigation.registerComponentWithRedux('RateApp', () => RateApp, Provider, store);
    Navigation.registerComponentWithRedux('CarouselModal', () => CarouselModal, Provider, store);
}

// SCREENS //
import AllBreeds from './containers/AllBreeds';
import Favorites from './containers/Favorites';
import Scanner from './containers/Scanner';
import SideMenu from './containers/SideMenu';
import BreedDetails from './containers/BreedDetails';
import Settings from './containers/Settings';
import Feedback from './containers/Feedback';
import About from './containers/About';
import LayoutOptionsModal from './containers/LayoutOptionsModal';
import Filters from './containers/Filters';
import InstaPicModal from './component/InstaPics/InstaPicModal';
import YoutubePlayer from './component/youtubeVids/YoutubePlayer';
import WikiPage from './containers/WikiPage';
import ScannerResult from './containers/ScannerResult';
import ScanHistory from './containers/ScanHistory';
import CameraScreen from './containers/CameraScreen';
import RateApp from './containers/RateApp';
import CarouselModal from './component/CarouselModal.js/CarouselModal';


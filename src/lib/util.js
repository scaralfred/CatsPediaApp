import _ from 'lodash';
import {Platform, Dimensions} from 'react-native';

// Constants
const {width, height} = Dimensions.get('window');
const os = Platform.OS;
const osVersion = parseInt(Platform.Version, 10);

export function isIphoneX() {
  return (
    height >= 812
    && os === 'ios'
    && osVersion >= 11
  );
}

export function isIos() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}


export const onLayout = (e) => {
  const layout ={
    width: e.nativeEvent.layout.width,
    height: e.nativeEvent.layout.height,
    x: e.nativeEvent.layout.x,
    y: e.nativeEvent.layout.y
  }
  return layout
}

// Big Picture //
export const bigPic = (pic) => {
  return pic.replace("100px", "500px").replace("150px", "500px").replace("200px", "500px").replace("220px", "500px").replace("250px", "500px")
}

export const mediumPic = (pic) => {
  let newSize = "200px"
  return pic.replace("100px", newSize).replace("150px", newSize).replace("200px", newSize).replace("220px", newSize).replace("200px", newSize)
}

// Sort array alphabetically by property  //
export const dynamicSort = (property) => {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}

// Get Dimension By Percentage //
export const Hp = (percentage) => height * percentage;
export const Wp = (percentage) => width * percentage;

// min: '1ft, 11in',
// max: '2ft, 3in'
// Ft/In

// Convert Units of measure //

export const CmToFt = (n) => { //* 12
  var feet = (n / 30.48).toString().split('.')[0];
  var inches = Math.round(('0.' + (n / 30.48).toString().split('.')[1]) * 12) 
  return n == 0 ? "0\'\'" : (feet > 0 ? (feet + (inches > 0 ? "\' " : "\'")) : '') + (inches > 0 ? (inches + "\'\'") : '')
}

export const formatHeight = (unit, min, max) => {

  var isCm = unit == 'Cm';

  var min = isCm ? min : CmToFt(min);
  var max = isCm ? max : CmToFt(max);
  var unitOfMeasure = isCm ? 'cm' : ''

  return `${min} to ${max} ${unitOfMeasure}`
};

export const KgToLbs = (n) => Math.round(n * 2.205);

export const formatWeight = (unit, min, max) => {

  var isKg = unit == 'Kg';

  var min = isKg ? min : KgToLbs(min);
  var max = isKg ? max : KgToLbs(max);
  var unitOfMeasure = isKg ? 'Kg' : 'Lbs'

  return `${min} to ${max} ${unitOfMeasure}`
};

export const generateUniqueId = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const objectToArray = (obj) => Object.keys(obj).map(el => { return { [el]: obj[el]} });

export const objectToArrayFilterMainRate = (obj) => Object.keys(obj).map(el => { return { [el]: obj[el]} }).filter(el => Object.keys(el) != "mainRate");

export const capitalizeString = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
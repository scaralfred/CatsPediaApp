export const size = {
    toy: { min: 0, max: 25},
    small: { min: 25, max: 40},
    medium: { min: 40, max: 60},
    big: { min: 60, max: 90}
}

export const sizeCalculator = (breed) => {

    let min = breed.heightRange && breed.heightRange.min ? breed.heightRange.min : null;
    let max = breed.heightRange && breed.heightRange.max ? breed.heightRange.max : null;
    let avarage = !min || !max ? null : ((min + max)/2);

    if (!avarage) return {size: '', icon:  require('../assets/icons/close-white.png')};
    if (avarage <= size.toy.max) return {size: 'Toy', icon:  require('../assets/icons/dog-toy.png')};
    if (avarage > size.toy.max && avarage <= size.small.max) return {size: 'Small', icon:  require('../assets/icons/dog-small.png')};
    if (avarage > size.small.max && avarage <= size.medium.max) return {size: 'Medium', icon:  require('../assets/icons/dog-empty-black.png')};
    if (avarage > size.medium.max) return {size: 'Big', icon:  require('../assets/icons/dog-big.png')};
    
    // return {size: 'Big', icon:  require('../assets/icons/dog-big.png')};
}
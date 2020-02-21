import { isIos } from "../lib/util";

export const font = {
    regular: isIos() ? 'BrandonGrotesque-Regular' : 'Brandon-Grotesque-Regular',
    medium: isIos() ? 'BrandonGrotesque-Medium' : 'Brandon-Grotesque-Medium',
    bold: isIos() ? 'BrandonGrotesque-Black' : 'Brandon-Grotesque-Black',
    regular2: isIos() ? 'Avenir-Roman' : 'AvenirRoman',
    bold2: isIos() ? 'Avenir-Black' : 'AvenirBlack',
    light2: isIos() ? 'Avenir-Light' : 'AvenirLight'
};

const color = {
    main: 'red'
}

const appStyle = {
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default {
    ...color,
    ...appStyle
};

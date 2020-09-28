//Project Wide Styles & Defaults

import { StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

const defaultStyles = StyleSheet.create({

    mainColorBackground: {
        backgroundColor: 'white'
    },

    altColorBackground: {
        backgroundColor: 'gold'
    },

    buttonTextColor: {
        color: 'white'
    },

    distributeEvenBetween: {
        justifyContent:'space-around',
        alignItems:'center'
    },

    distributeEnd: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    distributeCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default defaultStyles;
import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from "react-native";

import defaultStyles from "./style.js"

const CustomButton = ({ onPress, title, color, xAdjust, yAdjust, size, circle}) => {

    const styles = {

        circleButton: {
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size/2, 
            left: xAdjust - size/2, 
            bottom: yAdjust - size/2, 
            backgroundColor: color,
            ...defaultStyles.distributeCenter
        },

        rectButton: {
            position: "absolute",
            width: size * 2.5,
            height: size,
            borderRadius: 20, 
            left: xAdjust - (size * 2.5)/2, 
            bottom: yAdjust - size/2,
            backgroundColor: color,
            ...defaultStyles.distributeCenter
        },

        buttonText: {
            padding:5,
            ...defaultStyles.buttonTextColor
        }

    };
    
    return(
        <TouchableOpacity 
            
            style={ circle ? styles.circleButton : styles.rectButton } 
            onPress={onPress} 
            
        >

            <Text 

                numberOfLines={1} 
                adjustsFontSizeToFit 
                style={styles.buttonText}

            >

                {title}

            </Text>


        </TouchableOpacity>
    )
}

export default CustomButton;
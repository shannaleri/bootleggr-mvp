import React, {Component} from "react"
import {Text, Icon, Button} from "native-base"
import {Dimensions} from "react-native"

import { inject, observer } from "mobx-react";
import { View } from "react-native-animatable";

import defaultStyles from "./style.js"

const phoneWidth = Dimensions.get("window").width

export class NumberSelected extends Component {  
    
    render() {

        styles = {

            sectionContainer: {
                flex: 1,
                flexDirection: "column",
                ...defaultStyles.mainColorBackground,
                ...defaultStyles.distributeEnd
            },

            progressNumbers: {
                fontSize: phoneWidth/10
            }
        }

    	return(

        <View style={ styles.sectionContainer } >

            <Text style={ styles.progressNumbers }>

                {this.props.store.currentSegment.description}
                
            </Text>

        </View>

        )
    }
}

export default inject("store")(observer(NumberSelected))
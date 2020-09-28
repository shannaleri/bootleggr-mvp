import React, {Component} from "react"
import {Dimensions, Text, View} from "react-native"

import { inject, observer } from "mobx-react";

import defaultStyles from "./style.js"

import CustomButton from "./CustomButton.js"

const phoneWidth = Dimensions.get("window").width
const phoneHeight = Dimensions.get("window").height

export class MainNavigationBar extends Component {  
    
    render() {

        const styles = {

            reviewNavBar: {
                flexDirection: "column",
                flex:1,
                ...defaultStyles.altColorBackground,
                ...defaultStyles.distributeCenter
            }

        }

    	return(

        <View style={ styles.reviewNavBar }>

            { this.props.store.selectedFlavours.length > 0 ?
                <CustomButton 
                    title={ "Continue" }
                    color={ "#000" }
                    xAdjust={ phoneWidth/2 }
                    yAdjust={ phoneWidth/8 }
                    size={ phoneWidth/6 }
                    circle={ false }
                    onPress={ () => this.props.store.nextSegment() }
                >
                </CustomButton>
            :
                null
            }

        </View>

        )
    }
}

export default inject("store")(observer(MainNavigationBar))
import React, {Component} from "react"
import {Text, Icon, Button} from "native-base"
import {Dimensions} from "react-native"

import { inject, observer } from "mobx-react";
import { View } from "react-native-animatable";

import defaultStyles from "./style.js"

const phoneWidth = Dimensions.get("window").width

var items = []

export class SelectionList extends Component {  
    
    render() {

        items = this.props.store.selectedFlavours.map((item, index) =>

            <Button 

                style={{
                    margin: 5,
                    backgroundColor: item.color
                }}
                key={index}
                onPress={() => this.props.store.removeFlavourAtIndex(index)} 

            >

                <Text>
                    {item.name}
                </Text>

                <Icon name={"close"}></Icon>

            </Button>
        )

        const styles = {

            sectionContainer: {
                flex: 2,
                ...defaultStyles.mainColorBackground,
                ...defaultStyles.distributeCenter
            },

            selectedItems: {
                width: phoneWidth,
                marginRight: 10,
                borderRadius: phoneWidth / 50,
                display:"flex",
                flexDirection: "row",
                flexWrap: "wrap",
                ...defaultStyles.distributeCenter
            }



        }

    	return(

        <View style={ styles.sectionContainer }>

            <View style={ styles.selectedItems}>

                    {items}

            </View>

            <Text style={{fontSize: phoneWidth/20, color: this.props.store.selectedFlavours.length > 0 ? "green" : "grey"}}>
                    
                    {this.props.store.selectedFlavours.length + " / " + this.props.store.currentSegment.maxSelections}
            
            </Text>
        </View>

        )
    }
}

export default inject("store")(observer(SelectionList))
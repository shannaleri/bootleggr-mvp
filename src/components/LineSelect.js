import React, {Component} from "react"
import {View, Text, Button, Icon} from "native-base"
import {Dimensions, TouchableOpacityBase} from "react-native"

import { inject, observer } from "mobx-react";

import defaultStyles from "./style.js"

const phoneWidth = Dimensions.get("window").width
const radiusOfMenu = phoneWidth /3
const buttonSize = phoneWidth /4

const sweetList = require("../data/flavourProfile/sweetProfileOptions.json")
const spiceList = require("../data/flavourProfile/spiceProfileOptions.json")
const floralList = require("../data/flavourProfile/floralProfileOptions.json")
const wineList = require("../data/flavourProfile/wineProfileOptions.json")
const fruitList = require("../data/flavourProfile/fruitProfileOptions.json")
const sulphurList = require("../data/flavourProfile/sulphurProfileOptions.json")
const peatList = require("../data/flavourProfile/peatProfileOptions.json")
const earthList = require("../data/flavourProfile/earthProfileOptions.json")

var items = []

export class LineSelect extends Component {  
    
    render() {

      const styles = {
      
        menuContainer: {
            flex:4,
            flexDirection:"column",
            ...defaultStyles.mainColorBackground
        },

        rowContainer: {
          flex:1,
          flexDirection:"row",
          ...defaultStyles.distributeEvenBetween
        },

        buttonStyle: {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize/2, 
          justifyContent: "center",
        }

      }

    	return(

          <View style={ styles.menuContainer }>

            <View style={ styles.rowContainer }>

              <Button 
                  style={
                    {
                      ...styles.buttonStyle,
                      backgroundColor: "grey"
                    }
                  }

                  onPress={()=>this.props.store.completeReview(1)}
                  
              >

                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                  > 
                    Enjoyed It
                  </Text>

              </Button>

              <Button 
                    style={
                      {
                        ...styles.buttonStyle,
                        backgroundColor: "gold"
                      }
                    }

                    onPress={()=>this.props.store.completeReview(1)}
                    
                >
  
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                    > 
                      Enjoyed It
                    </Text>
  
                </Button>

                <Button 
                    style={
                      {
                        ...styles.buttonStyle,
                        backgroundColor: "#e38200"
                      }
                    }

                    onPress={()=>this.props.store.completeReview(2)}
                    
                >
  
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                    > 
                      Loved It
                    </Text>
  
                </Button>

            </View>

          </View>

        )
    }
}

export default inject("store")(observer(LineSelect))
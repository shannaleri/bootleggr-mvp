import React, {Component} from "react"
import {Form, Item, Input, Button, Text} from "native-base"
import {Dimensions, TouchableOpacity} from "react-native"

import defaultStyles from "./style.js"

import { inject, observer } from "mobx-react";
import { View } from "react-native-animatable";

const phoneWidth = Dimensions.get("window").width
const phoneHeight = Dimensions.get("window").height

var inputText = { name:"", color:"#888", level: 1}

export class FloatingForm extends Component {  

    handleClick(){

        if(inputText.name != ""){

            this.props.store.addNewFlavour(inputText)

        }

        this.props.store.otherInputToggle()

        inputText.name = ""

    }
    
    render() {

        const styles = {

            fullSizeOverlay: {
                position:"absolute",
                right: 0,
                top:0,
                height:phoneHeight,
                width:phoneWidth
            },

            touchableOverlay: {
                flex:1,
                flexDirection:"row",
                ...defaultStyles.distributeCenter
            },

            formContainer: {
                height:phoneHeight/4,
                width:phoneWidth/3 * 2,
                borderRadius:phoneWidth/100,
                ...defaultStyles.altColorBackground,
                ...defaultStyles.distributeEvenBetween
            },
            
            form: {
                ...defaultStyles.distributeCenter
            },

            submitButton:{
                backgroundColor: "black"
            }
        }

    	return(

        <View style={ styles.fullSizeOverlay } >

            <TouchableOpacity 
            
                style={ styles.touchableOverlay }
                activeOpacity={1}
                onPress={() => this.props.store.otherInputToggle()}

            >
                <View style={ styles.formContainer } >

                    <Form style={ styles.form } >

                        <Item last>

                            <Input 
                                onChangeText={text => inputText.name = text} 
                                placeholder={this.props.store.currentSegment.description} 
                            />

                        </Item>

                    </Form>

                    <Button 

                        style={ styles.submitButton } 
                        onPress={() => this.handleClick()}

                    >

                        <Text>Add</Text>

                    </Button>

                </View>

            </TouchableOpacity>

        </View>

        )
    }
}

export default inject("store")(observer(FloatingForm))
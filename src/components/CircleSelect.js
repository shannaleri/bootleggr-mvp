import React, {Component} from "react"
import {Dimensions, TouchableOpacity, View} from "react-native"

import { inject, observer } from "mobx-react";

import CustomButton from "./CustomButton.js"

import defaultStyles from "./style.js"

const phoneWidth = Dimensions.get("window").width
const radiusOfMenu = phoneWidth /3
const buttonSize = phoneWidth /5

//this data should be moved online
const sweetList = require("../data/flavourProfile/sweetProfileOptions.json")
const spiceList = require("../data/flavourProfile/spiceProfileOptions.json")
const floralList = require("../data/flavourProfile/floralProfileOptions.json")
const wineList = require("../data/flavourProfile/wineProfileOptions.json")
const fruitList = require("../data/flavourProfile/fruitProfileOptions.json")
const sulphurList = require("../data/flavourProfile/sulphurProfileOptions.json")
const peatList = require("../data/flavourProfile/peatProfileOptions.json")
const earthList = require("../data/flavourProfile/earthProfileOptions.json")

var items = []

export class CircleSelect extends Component {  

  //return a position in x, y direction for the button
  //given an angle from the menu centre, radius of the menu and
  //the number of elements to be displayed in the menu
  arrangeInCircle(angle, radius, numberOfElements){

    //angle to rotate the entire menu
    let angleOfRotation = 0
    
    //sets the arrangement to two at the top for odd numbers, 
    //and one at the top for even numbers
    if(numberOfElements % 2 != 0){
      angleOfRotation = 360 / numberOfElements / 2
    }
  
    angle = angle + angleOfRotation
  
    if(angle >= 360){
      angle = angle - 360
    }
  
    let xDirection = 0 
    let yDirection = 0
    
    if (angle > 0 && angle < 90){ 
      xDirection = Math.sin(this.convertDegreesToRadians(angle)) * radius
      yDirection = Math.cos(this.convertDegreesToRadians(angle)) * radius
  
    } else if (angle > 90 && angle < 180) {
      
      let modifiedAngle = angle - 90
  
      yDirection = Math.sin(this.convertDegreesToRadians(modifiedAngle)) * radius
      xDirection = Math.cos(this.convertDegreesToRadians(modifiedAngle)) * radius
  
      yDirection = -yDirection
  
    } else if (angle > 180 && angle < 270) {
  
      let modifiedAngle = angle - 180
  
      xDirection = Math.sin(this.convertDegreesToRadians(modifiedAngle)) * radius
      yDirection = Math.cos(this.convertDegreesToRadians(modifiedAngle)) * radius
  
      yDirection = -yDirection
      xDirection = -xDirection
  
    }  else if (angle > 270 && angle < 360) {
  
      let modifiedAngle = angle - 270
  
      yDirection = Math.sin(this.convertDegreesToRadians(modifiedAngle)) * radius
      xDirection = Math.cos(this.convertDegreesToRadians(modifiedAngle)) * radius
  
      xDirection = -xDirection
  
    }  else if (angle == 0 || angle == 360) {
      //position directly up
      yDirection = radius
  
    }  else if (angle == 90) {
      //position directly right
      xDirection = radius
  
    }  else if (angle == 180) {
      //position directly down
      yDirection = -radius
  
    }  else if (angle == 270) {
      //position directly left
      xDirection = -radius
  
    }
  
    return([xDirection, yDirection])
    
  }
  
  calculatePositionsOfElements(menuOptions, radius){
  
    let angleBetweenEach = 360/menuOptions.length
  
    let buttonPositions = []
  
    for(let index = 0; index < menuOptions.length; index ++){
          
      let angle = angleBetweenEach * index
      
      buttonPositions.push(this.arrangeInCircle(angle, radius, menuOptions.length))
  
    }
  
    return buttonPositions
  
  }
  
  //this could be a general utility function, but use is uncommon.
  convertDegreesToRadians(degrees){
  
    return degrees * Math.PI / 180
  
  }

  handleClick(list, listIndex){

    let categoryList = null

    if(listIndex != null && list != null){
     categoryList = list.values[listIndex].nextList
    }

    //if the pressed button"s menu item has an associated next list
    //then populate the items list with the next list
    //this switch will only work for the flavour profile currently tested.
    //TO DO: handle list navigation directly from the categories in the data source
    if(categoryList && list.selection == "menu"){
  
      switch(categoryList){

        case "sweet":
          this.updateList(sweetList)
          break;

        case "spice":
          this.updateList(spiceList)
          break;

        case "floral":
          this.updateList(floralList)
          break;

        case "wine":
          this.updateList(wineList)
          break;

        case "fruit":
          this.updateList(fruitList)
          break;

        case "sulphur":
          this.updateList(sulphurList)
          break;

        case "peat":
          this.updateList(peatList)
          break;
        
        case "earth":
          this.updateList(earthList)
          break;
        
        case "other":
          this.props.store.otherInputToggle()

        default:
          break;
      }
      
    } else if(list.selection == "multiple"){

      //handling a click when multiple selection is allowed
      this.props.store.addNewFlavour(list.values[listIndex])
      this.props.store.updateList(this.props.store.currentSegment.data)

    } else {
      
      //this is currently sending back to the starting point
      //if the list selection type is not recognized in switch.

      this.props.store.updateList(this.props.store.currentSegment.data)
      console.log("Current list selection type is set to: " + list.selection + " which is an error.")
      
    }
  
  }

  //update the listing in the store
  //and populate the circular menu with it"s
  //contents locally
  updateList(newList){
  
    items = this.populateMenu(newList)
    
    this.props.store.updateList(newList)

  }


  populateMenu(list){

    let elementPositions = this.calculatePositionsOfElements(list.values, radiusOfMenu)
  
    let renderArray = []
  
    for(let index = 0; index < list.values.length; index ++){
  
      renderArray.push(

                <CustomButton

                    title={ list.values[index].name } 
                    color={ list.values[index].color }
                    xAdjust={ elementPositions[index][0] }
                    yAdjust={ elementPositions[index][1] }
                    size={ buttonSize }
                    circle={true}
                    key={ index } 
                    onPress={ ()=>this.handleClick(list, index) } 

                >
                </CustomButton>)
    
    }

    //add a central exit button if open list is a sub-menu
    if(list.level != "base"){
      renderArray.push(
        
        <CustomButton

          key="exit"
          title={"x"}
          color={"#000"}
          xAdjust={0}
          yAdjust={0}
          size={buttonSize/3}
          circle={true}
          onPress={ ()=>this.handleClick(this.props.store.currentSegment.data, null) }

        >
        </CustomButton>
)
    }
  
    return renderArray
  
  }
    render() {

      const styles = {
        circleMenuContainer: {
          ...defaultStyles.distributeCenter,
          flex: 4
        }
      }  

      items = this.populateMenu(this.props.store.currentList)

    	return(

          <View style={ styles.circleMenuContainer }>

              <View>

                { items }

              </View>

          </View>

        )
    }
}

export default inject("store")(observer(CircleSelect))
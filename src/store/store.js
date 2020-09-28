import { firebase } from "../firebase/config"

import {decode, encode} from "base-64"

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

import { decorate, observable, action, computed, onBecomeObserved } from "mobx"

import flavourOptions from "../data/flavourProfile/flavourProfileCategories.json"
import colorOptions from "../data/flavourProfile/colorOptions.json"

const tastingLists = {
    lunnyBarran:[
        {
            position: 1,
            brand:"Macaloney's",
            bottle:"Caol Ila & Bunnahabhain",
            spirit: "Scotch Whisky",
            type: "Blended Malt",
            region: "Islay"
        },
        {
            position: 2,
            brand:"Caol Ila",
            bottle: "12",
            spirit: "Scotch Whisky",
            type: "Single Malt",
            region: "Islay"
        },
        {
            position: 3,
            brand:"Shelter Point",
            bottle: "Artisinal",
            spirit: "Whisky",
            type: "Single Malt",
            region: "Canada"
        },
        {
            position: 4,
            brand:"Victoria Caledonian",
            bottle:"Mac Na Braiche",
            spirit: "Spirit",
            type: "Single Malt",
            region: "Canada"
        },
        {
            position: 5,
            brand: "Highland Park",
            bottle: "Viking Honour",
            spirit: "Scotch Whisky",
            type: "Single Malt",
            region: "Highland"
        }
    ]
}

const reviewSegments = {
    values:[
        {
            description: "What color is it?",
            data: colorOptions,
            maxSelections: 1,
            section:"color"
        },
        {
            description: "What do you smell?",
            data: flavourOptions,
            maxSelections: 5,
            section:"scent"
        },
        {
            description: "What do you taste?",
            data: flavourOptions,
            maxSelections: 5,
            section:"taste"
        },
        {
            description: "Did you like it?",
            data: flavourOptions,
            maxSelections:1,
            section:"score"
        },
    ]
}

var segmentIndex = 0

//mobX store for whisky tasting

const database = firebase.firestore().collection("reviews");

//current destructuring for reference:
//selectedFlavours, addNewFlavour, currentList, updateList, resetFlavourList

class Store {

    //current tasting info object
    currentBottle = {
        brand:"None",
        bottle:"Caol Ila & Bunnahabhain",
        spirit: "Scotch Whisky",
        type: "Blended Malt",
        region: "Islay"
    }
    
    //reviewObject
    review = {}

    //array of currently selected flavours for the profile 
    selectedFlavours = []

    //object of info, handling current segment of the review
    currentSegment = reviewSegments.values[segmentIndex]

    //boolean flag for whether or not the input option should be up
    otherInputIsUp = false

    otherInputToggle = () => {

        if(this.otherInputIsUp){

            this.otherInputIsUp = false

        } else {

            this.otherInputIsUp = true

        }

    }

    //get info from tasting key
    getTastingInfo = () => {
        //find the matching tasting details in tastingLists
    }

    //change the currentBottlen details
    updateBottle = () => {
        //change the current bottle info
    }

    nextSegment = () => {

        segmentIndex ++
        this.currentSegment = reviewSegments.values[segmentIndex]
        this.currentList = this.currentSegment.data
        this.review[this.currentSegment.section] = this.selectedFlavours

        this.selectedFlavours = []

    }

    completeReview = (reviewScore) => {

        //send completed review object to fireabse, then clear review object and reset review
        this.review[this.currentSegment.section] = reviewScore
        database.add({
            user: firebase.auth().getUid(),
            time: Date.now(), 
            brand: this.currentBottle.brand,
            bottle: this.currentBottle.bottle,
            spirit: this.currentBottle.spirit,
            type: this.currentBottle.type,
            region: this.currentBottle.region,
            results: this.review
        })
        .then()
        .catch((error) => {
            alert(error)
        });
        
        this.currentSegment = reviewSegments.values[0]
        this.currentList = this.currentSegment.data
        segmentIndex = 0
        this.review = {}

    }

    //action to add new flavour, only if it is not already there
    //will only allow a maximum of five flavours to be selected
    addNewFlavour = (flavour) => {

        let found = this.selectedFlavours.find(element => element.name == flavour.name)
        let numberSelected = this.selectedFlavours.length

        if(!found){

            if(numberSelected < this.currentSegment.maxSelections){
                this.selectedFlavours.push(flavour)
            }

        }

    }

    //action to remove a flavour at specific index 
    removeFlavourAtIndex = (index) => {

        this.selectedFlavours.splice(index, 1)

    }

    //current data set being processed
    currentList = this.currentSegment.data

    //action to update current list
    updateList = (newList) => {

        this.currentList = newList

    }

}

decorate(Store, {

    currentBottle: observable,
    getTastingInfo: action,
    updateBottle: action,
    selectedFlavours: observable,
    currentSegment: observable,
    otherInputIsUp: observable,
    nextSegment: action,
    addNewFlavour: action, 
    currentList: observable,
    updateList: action,
    removeFlavourAtIndex: action,
    completeReview: action
    
})

export default new Store()
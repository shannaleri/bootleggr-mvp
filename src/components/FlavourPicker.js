import React, {Component} from "react"
import {View, Text, Button, Row} from "native-base"

import { inject, observer } from "mobx-react";

import CircleSelect from "./CircleSelect.js"
import LineSelect from "./LineSelect.js"
import SelectionList from "./SelectionList.js"
import NumberSelected from "./NumberSelected.js"
import MainNavigationBar from "./MainNavigationBar.js"
import FloatingForm from "./FloatingForm.js"

var inputForm = <FloatingForm></FloatingForm>

export class FlavourPicker extends Component {  
    
    render() {

    	return(
        <View>

          <View>

            <NumberSelected>
            </NumberSelected>

            <SelectionList>
            </SelectionList>

            {this.props.store.currentSegment.section == "score" ?

              <LineSelect>
              </LineSelect>
            :
              <CircleSelect>
              </CircleSelect>

            }

            <MainNavigationBar>
            </MainNavigationBar>

            {this.props.store.otherInputIsUp ? inputForm : null}

          </View>

        </View>

      )

    }
}

export default inject("store")(observer(FlavourPicker))
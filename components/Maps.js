import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    View,
    StyleSheet
} from "react-native";

import { PanGestureHandler } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      flexDirection: "column",
      backgroundColor: "#fff",
      borderColor: "#0000ff",
      borderWidth: 5
    },

    image: {
        width: 150,
        height: 150,
        backgroundColor: "#c00000",
        borderColor: "#ff0000",
        borderWidth: 2
      },
  
   })

export default class Maps extends Component {
    handleGesture = (evt) => {
        let { nativeEvent } = evt
        console.log("Map: event", nativeEvent)
    }

    getImageDimensions() {
        const s_width = Dimensions.get('window').width; //full width
        const s_height = Dimensions.get('window').height; //full height
    
        const i_width = 1826
        const i_height = 590
    
        const width_ratio = s_width / i_width,
            height_ratio = s_height / i_height
    
        const ratio = Math.max(width_ratio, height_ratio)
    
        return {
            'width': final_width = i_width * ratio,
            'height': final_height = i_height * ratio
        }
    }

    render() {
        let dimensions = this.getImageDimensions()

        console.log("Map: final size", dimensions)

        return (
            <View style={styles.container} >
                <PanGestureHandler onGestureEvent={this.handleGesture}>
                    <Image
                        // style={styles.stretch}
                        style={styles.image}
                        source={require('../img/maps/01.png')}
                    />
                </PanGestureHandler>
            </View>
        )
    }
}
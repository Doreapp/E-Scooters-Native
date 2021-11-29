import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    View,
    StyleSheet,
    Animated
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
    animatedView: {
        width: 200,
        height: 200,
        borderColor: "#00ff00",
        borderWidth: 2
    },

})

export default class Maps extends Component {
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)
    current_translation = {
        x: 0,
        y: 0
    }
    delta = {
        x: 0,
        y: 0
    }

    handleGesture = (evt) => {
        let { nativeEvent } = evt

        this.current_translation.x = nativeEvent.translationX + this.delta.x
        this.current_translation.y = nativeEvent.translationY + this.delta.y
        this.translateX.setValue(this.current_translation.x)
        this.translateY.setValue(this.current_translation.y)

        console.log("Map: event", nativeEvent.translationX, nativeEvent.translationY)
    }

    handleStateChange = (evt) => {
        let { nativeEvent } = evt
        console.log("state changed ", nativeEvent, this.current_translation)
        if (nativeEvent.state == 2){
            console.log("touch start")
            this.delta.x = this.current_translation.x
            this.delta.y = this.current_translation.y
        }
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

        let transformStyle = {
            transform: [
                { translateY: this.translateY },
                { translateX: this.translateX }]
        }

        return (
            <View style={styles.container} >
                <PanGestureHandler onGestureEvent={this.handleGesture}
                    onHandlerStateChange={this.handleStateChange}>
                    <Animated.View style={[styles.animatedView, transformStyle]}>
                        <Image
                            // style={styles.stretch}
                            style={styles.image}
                            source={require('../img/maps/01.png')}
                        />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}
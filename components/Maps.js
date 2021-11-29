import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    View,
    StyleSheet,
    Animated
} from "react-native";

import { PanGestureHandler } from 'react-native-gesture-handler'
import UserAgent from 'react-native-user-agent';

const TILE_SIZE = 256

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
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundColor: "#fff",
        borderColor: "#ff0000",
        resizeMode : 'stretch',
        borderWidth: 2
    },
    animatedView: {
        width: 200,
        height: 200,
        borderColor: "#00ff00",
        borderWidth: 2
    },

})

const pointToPixels = (lon, lat, zoom) => {
    r = Math.pow(2, zoom) * TILE_SIZE
    lat = Math.PI * lat / 360.0

    x = parseInt((lon + 180.0) / 360.0 * r)
    y = parseInt((1.0 - Math.log(Math.tan(lat) + (1.0 / Math.cos(lat))) / Math.PI) / 2.0 * r)

    return {
        x: x,
        y:y
    }
}

const toUrl = (x,y,z) => {
    return "https://c.tile.openstreetmap.org/"+z+"/"+x+"/"+y+".png"
} 

export default class Maps extends Component {
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)
    zoom = 16
    center = {
        lat: 59.346896080909026,
        lon: 18.07227980042113
    }

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

        let pixel = pointToPixels(this.center.lat, this.center.lon, this.zoom)
        let x_tiles = parseInt(pixel.x / TILE_SIZE), 
            y_tiles = parseInt(pixel.y / TILE_SIZE)

        console.log("Given User Agent: ",UserAgent.getUserAgent())

        return (
            <View style={styles.container} >
                <PanGestureHandler onGestureEvent={this.handleGesture}
                    onHandlerStateChange={this.handleStateChange}>
                    <Animated.View style={[styles.animatedView, transformStyle]}>
                        <Image
                            // style={styles.stretch}
                            style={styles.image}
                            source={{
                                uri: "https://b.tile.openstreetmap.org/12/2048/1361.png",
                                headers: {
                                    'User-Agent': UserAgent.getUserAgent()
                                }
                            }}
                            onLoad={(evt) => {
                                console.log("On Load", evt)
                            }}
                            onLoadEnd   ={() => {
                                console.log("On Load end")
                            }}
                            onLoadStart={() => {
                                console.log("On Load start")
                            }}
                            onProgress={() => {
                                console.log("On progress")
                            }}
                        />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}
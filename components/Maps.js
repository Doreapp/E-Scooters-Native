import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    View,
    StyleSheet,
    Animated
} from "react-native";

import { PanGestureHandler } from 'react-native-gesture-handler'

import MapTile from './MapTile';

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
    animatedView: {
        borderColor: "#00ff00",
        borderWidth: 2
    },

})

const pointToPixels = (lon, lat, zoom) => {
    let n = Math.pow(2, zoom)
    let lat_radian = lat * Math.PI / 180
    let x = Math.floor((lon + 180) / 360 * n)
    let y = Math.floor((1 - Math.log(Math.tan(lat_radian) + 1 / Math.cos(lat_radian)) / Math.PI) / 2 * n)

    return {
        x: x,
        y: y
    }
}

export default class Maps extends Component {
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)
    zoom = 16
    center = {
        lon: 59.346896,
        lat: 18.072280
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
        if (nativeEvent.state == 2) {
            console.log("touch start")
            this.delta.x = this.current_translation.x
            this.delta.y = this.current_translation.y
        }
    }

    render() {
        let dimensions = Dimensions.get('window')
        const horizontal_tile_count = Math.ceil(dimensions.width / TILE_SIZE) + 1
        const vertical_tile_count = Math.ceil(dimensions.height / TILE_SIZE) + 1

        console.log("Map: screen dimensions", dimensions)
        console.log("Tiles : " + horizontal_tile_count + "x" + vertical_tile_count)

        let transformStyle = {
            transform: [
                { translateY: this.translateY },
                { translateX: this.translateX }]
        }

        let pixel = pointToPixels(this.center.lat, this.center.lon, this.zoom)
        let x_tiles = parseInt(pixel.x),
            y_tiles = parseInt(pixel.y)

        tiles = [];

        for (let x = 0; x < horizontal_tile_count; x++) {
            for (let y = 0; y < vertical_tile_count; y++) {
                tile_style = {
                    transform: [
                    { translateX: x * TILE_SIZE },
                    { translateY: x * (- vertical_tile_count * TILE_SIZE)}
                ]}

                tiles.push(
                    <MapTile
                        style={tile_style}
                        x={x_tiles + x}
                        y={y_tiles + y}
                        z={this.zoom} />
                )
            }
        }

        return (
            <View style={styles.container} >
                <PanGestureHandler onGestureEvent={this.handleGesture}
                    onHandlerStateChange={this.handleStateChange}>
                    <Animated.View style={[
                        styles.animatedView,
                        transformStyle, {
                            width: dimensions.width,
                            height: dimensions.height
                        }]}>
                        <View style={{
                            width: dimensions.width,
                            height: dimensions.height
                        }}>
                            {tiles}
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}
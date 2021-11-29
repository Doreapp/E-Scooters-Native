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
import MapMarker from './MapMarker';

const TILE_SIZE = 256

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    animatedView: {
    },

})

const pointToPixels = (lat, lon, zoom) => {
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
    horizontal_tile_count = 0
    vertical_tile_count = 0
    zoom = 16
    center = {
        lat: 59.346896,
        lon: 18.072280
    }
    mapBounds = {
        left: 0, right: 0,
        top: 0, bottom: 0
    }
    screenBounds = {
        left: 0, right: 0,
        top: 0, bottom: 0
    }
    tiles = [];
    markers = [];
    current_translation = {
        x: 0,
        y: 0
    }
    delta = {
        x: 0,
        y: 0
    }

    constructor() {
        super();

        let firstTilePosition = pointToPixels(this.center.lat, this.center.lon, this.zoom)

        this.state = {
            firstTilePosition: firstTilePosition
        }

        let dimensions = Dimensions.get('window')
        this.horizontal_tile_count = Math.ceil(dimensions.width / TILE_SIZE) + 1
        this.vertical_tile_count = Math.ceil(dimensions.height / TILE_SIZE) + 1

        this.mapBounds.right = this.horizontal_tile_count * TILE_SIZE
        this.mapBounds.bottom = this.vertical_tile_count * TILE_SIZE

        this.screenBounds.right = dimensions.width
        this.screenBounds.bottom = dimensions.height

        console.log("Map: screen dimensions", dimensions)
        console.log("Tiles : " + this.horizontal_tile_count + "x" + this.vertical_tile_count)
    }

    handleMarkers() {
        if (this.props.markers === undefined)
            return

        this.markers = []
        this.props.markers.forEach(marker => {
            this.markers.push(marker)
        });
    }

    updateFirstTilePosition(dx, dy) {
        console.log("update first tile positon ", dx, dy)
        // For now, just handle x,y changes (not zoom)

        this.setState({
            firstTilePosition: {
                x: this.state.firstTilePosition.x + dx,
                y: this.state.firstTilePosition.y + dy
            }
        })
    }

    handleGesture = (evt) => {
        let { nativeEvent } = evt

        this.current_translation.x = nativeEvent.translationX + this.delta.x
        this.current_translation.y = nativeEvent.translationY + this.delta.y

        if (this.current_translation.x + this.mapBounds.left > this.screenBounds.left) {
            // Sliding too much to the right
            this.current_translation.x -= TILE_SIZE
            this.delta.x -= TILE_SIZE
            this.updateFirstTilePosition(-1, 0)
        } else if (this.current_translation.x + this.mapBounds.right < this.screenBounds.right) {
            // Sliding too much to the left
            this.current_translation.x += TILE_SIZE
            this.delta.x += TILE_SIZE
            this.updateFirstTilePosition(+1, 0)
        }
        if (this.current_translation.y + this.mapBounds.top > this.screenBounds.top) {
            // Sliding too much to the bottom
            this.current_translation.y -= TILE_SIZE
            this.delta.y -= TILE_SIZE
            this.updateFirstTilePosition(0, -1)
        } else if (this.current_translation.y + this.mapBounds.bottom < this.screenBounds.bottom) {
            // Sliding too much to the top
            this.current_translation.y += TILE_SIZE
            this.delta.y += TILE_SIZE
            this.updateFirstTilePosition(0, +1)
        }

        this.translateX.setValue(this.current_translation.x)
        this.translateY.setValue(this.current_translation.y)
    }

    handleStateChange = (evt) => {
        let { nativeEvent } = evt
        if (nativeEvent.state == 2) {
            // The user start to touch the screen
            this.delta.x = this.current_translation.x
            this.delta.y = this.current_translation.y
        }
    }

    render() {
        console.log(this.props)

        this.handleMarkers()

        let transformStyle = {
            transform: [
                { translateY: this.translateY },
                { translateX: this.translateX }]
        }

        this.tiles = []
        for (let x = 0; x < this.horizontal_tile_count; x++) {
            for (let y = 0; y < this.vertical_tile_count; y++) {
                tile_style = {
                    transform: [
                        { translateX: x * TILE_SIZE },
                        { translateY: x * (- this.vertical_tile_count * TILE_SIZE) }
                    ]
                }

                tile = <MapTile
                    key={x * this.vertical_tile_count + y}
                    style={tile_style}
                    x={this.state.firstTilePosition.x}
                    y={this.state.firstTilePosition.y}
                    relativeX={x}
                    relativeY={y}
                    z={this.zoom} />

                this.tiles.push(tile)
            }
        }

        console.log("markers:", this.markers)

        markerViews = []
        i = 0
        this.markers.forEach(marker => {
            console.log("marker:", marker)
            markerViews.push(
                <MapMarker
                    key={i++}
                    lat={marker.lat}
                    lon={marker.lon}
                    zoom={this.zoom}
                    firstTilePosition={this.state.firstTilePosition} />
            )
        })
        console.log("markerViews:", markerViews)

        return (
            <View style={styles.container} >
                <PanGestureHandler onGestureEvent={this.handleGesture}
                    onHandlerStateChange={this.handleStateChange}>
                    <Animated.View style={[
                        styles.animatedView,
                        transformStyle, {
                            width: this.mapBounds.right,
                            height: this.mapBounds.bottom
                        }]}>
                        <View style={{
                            width: this.mapBounds.right,
                            height: this.mapBounds.bottom
                        }}>
                            {this.tiles}
                            {markerViews}
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}
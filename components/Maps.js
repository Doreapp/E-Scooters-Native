/**
 * Map component, handling movements and markers
 * 
 * MUST BE PLACED IN A GestureHandlerRootView
 */

import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Animated
} from "react-native";

import { PanGestureHandler } from 'react-native-gesture-handler'

import MapTile from './MapTile';
import MapMarker from './MapMarker';

// OSM Tile Size
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

/**
 * Retrun TILE position from coorinates (lat/lon) and zoom
 */
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
    // Used translation value (see https://blog.bitsrc.io/using-the-gesture-handler-in-react-native-c07f84ddfa49)
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)

    // Number of tiles on horizontal/vertical axis
    horizontal_tile_count = 0
    vertical_tile_count = 0

    // Zoom value (for now fixed)
    zoom = 16

    // Center coordinates (KTH)
    center = {
        lat: 59.346896,
        lon: 18.072280
    }

    // Map object (tiles) bounds 
    // TODO replace left,top,right,bottom by width,height
    mapBounds = {
        left: 0, right: 0,
        top: 0, bottom: 0
    }
    // Screen bounds 
    // TODO replace left,top,right,bottom by width,height
    screenBounds = {
        left: 0, right: 0,
        top: 0, bottom: 0
    }

    // Markers object
    markers = [];

    // Current translation (need to be followed to remember position when stopping motion)
    current_translation = {
        x: 0,
        y: 0
    }

    // Delta to apply on translation transform 
    delta = {
        x: 0,
        y: 0
    }

    constructor() {
        super();

        let firstTilePosition = pointToPixels(this.center.lat, this.center.lon, this.zoom)

        // Use **state** to be enable to update the first tile position
        // The firstTilePosition is the position (in OSM space) of the top-left tile 
        this.state = {
            firstTilePosition: firstTilePosition
        }

        // Get and set dimensions constants
        let dimensions = Dimensions.get('window')
        this.horizontal_tile_count = Math.ceil(dimensions.width / TILE_SIZE) + 1
        this.vertical_tile_count = Math.ceil(dimensions.height / TILE_SIZE) + 1

        this.mapBounds.right = this.horizontal_tile_count * TILE_SIZE
        this.mapBounds.bottom = this.vertical_tile_count * TILE_SIZE

        this.screenBounds.right = dimensions.width
        this.screenBounds.bottom = dimensions.height

        // console.log("Map: screen dimensions", dimensions)
        // console.log("Tiles : " + this.horizontal_tile_count + "x" + this.vertical_tile_count)
    }

    updateFirstTilePosition(dx, dy) {
        // console.log("update first tile positon ", dx, dy)
        // For now, just handle x,y changes (not zoom)

        this.setState({
            firstTilePosition: {
                x: this.state.firstTilePosition.x + dx,
                y: this.state.firstTilePosition.y + dy
            }
        })
    }

    /** 
    * Callback whenever the user slides on the map object 
    */
    handleGesture = (evt) => {
        let { nativeEvent } = evt

        // Update current translation
        this.current_translation.x = nativeEvent.translationX + this.delta.x
        this.current_translation.y = nativeEvent.translationY + this.delta.y

        // Handle bounds limits
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

    /**
     * Callback on state change (including user pressing and releasing the screen) 
     */
    handleStateChange = (evt) => {
        let { nativeEvent } = evt
        if (nativeEvent.state == 2) {
            // The user start to touch the screen (state 2)
            this.delta.x = this.current_translation.x
            this.delta.y = this.current_translation.y
        }
    }

    render() {
        let transformStyle = {
            transform: [
                { translateY: this.translateY },
                { translateX: this.translateX }]
        }

        // Build tile views
        tiles = []
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

                tiles.push(tile)
            }
        }

        // Build marker views
        scootersViews = []
        if (this.props.scooters !== undefined) {
            i = 0
            this.props.scooters.forEach(scooter => {
                // console.log("marker:", marker)
                scootersViews.push(
                    <MapMarker
                        key={i++}
                        icon={scooter.icon}
                        width={scooter.iconWidth}
                        height={scooter.iconHeight}
                        lat={scooter.lat}
                        lon={scooter.lon}
                        zoom={this.zoom}
                        firstTilePosition={this.state.firstTilePosition}
                        onClick={(evt) => {
                            // console.log("Maps: OnClick on ",scooter)
                            if (this.props.onScooterClick !== undefined)
                                this.props.onScooterClick(scooter)
                        }} />
                )
            })
            // console.log("markerViews:", markerViews)
        }

        let fillMapStyle = {
            width: this.mapBounds.right,
            height: this.mapBounds.bottom
        }

        return (
            <View style={styles.container} >
                <PanGestureHandler onGestureEvent={this.handleGesture}
                    onHandlerStateChange={this.handleStateChange}>
                    <Animated.View style={[
                        styles.animatedView,
                        transformStyle,
                        fillMapStyle]}>
                        <View style={fillMapStyle}>
                            {tiles}
                            {scootersViews}
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}
/**
 * Marker placed on the map, by coordinates 
 * 
 * Either provide an icon (and iconWidth/iconHeight to ensure that it will be nicelly rendered),
 * or use the default display: a red circle.
 */

import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from "react-native";

// Default size
const WIDTH = 20
const HEIGHT = 20

// OSM Tile Size
const TILE_SIZE = 256

const styles = StyleSheet.create({
    default: {
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#ff0000",
        borderRadius: 99,
        zIndex: 10
    },
    image: {
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        zIndex: 10,
        // borderColor: "#00ffff",
        // borderWidth: 1,
    }
})

/**
 * Return the position of a point the OSM space from coordinates (lat/lon) and zoom
 */
const pointToPixels = (lat, lon, zoom) => {
    let n = Math.pow(2, zoom) * TILE_SIZE
    let lat_radian = lat * Math.PI / 180
    let x = Math.floor((lon + 180) / 360 * n)
    let y = Math.floor((1 - Math.log(Math.tan(lat_radian) + 1 / Math.cos(lat_radian)) / Math.PI) / 2 * n)

    return {
        x: x,
        y: y
    }
}

export default MapMarker = ({ icon, lat, lon, zoom, firstTilePosition, width, height }) => {
    // Find position
    pixel = pointToPixels(lat, lon, zoom)

    // Set width/height
    if (width === undefined) {
        width = WIDTH
    }
    if (height === undefined) {
        height = HEIGHT
    }

    // Position = pixelPosition - TilePosition
    let transformStyle = {
        transform: [
            { translateX: pixel.x - firstTilePosition.x * TILE_SIZE - width / 2 },
            { translateY: pixel.y - firstTilePosition.y * TILE_SIZE - height }
        ]
    }

    let sizeStyle = {
        width: width,
        height: height
    }

    if (icon == undefined) {
        // Return default
        return (
            <View
                style={[
                    styles.default,
                    transformStyle,
                    sizeStyle]}
            />
        )
    } else {
        return (
            <Image
                style={[styles.image,
                    transformStyle,
                    sizeStyle]}
                source={icon}
            />
        )
    }
}
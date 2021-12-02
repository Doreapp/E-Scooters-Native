import React, { Component } from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = StyleSheet.create({
    iconFalse: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 748, left: 300,
        justifyContent: 'center', 
        alignItems: 'center'
        
    },
    iconView: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0, left: 300,
        justifyContent: 'center', 
        alignItems: 'center'
      }
});

const FilterIcon = ({ toggleElem, setToggleElem }) => {
    const styleOption = toggleElem ? 'iconFalse' : 'iconView';
    return (
        <View >
            <Icon
            name="filter"
            size={40}
            style={toggleElem ? styles.iconView : styles.iconFalse}
            color="black"
            onPress={() => setToggleElem(!toggleElem)}
          />
        </View>
    )
}

export default FilterIcon;
import React, { Component } from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = StyleSheet.create({
    icon: {
        
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginLeft: 300,
        bottom: 10
      }
});

const FilterIcon = ({ toggleElem, setToggleElem }) => {
    return (
        <View style={styles.iconView}>
            <Icon
            name="filter"
            size={40}
            style={styles.icon}
            color="black"
            onPress={() => setToggleElem(!toggleElem)}
          />
        </View>
    )
}

export default FilterIcon;
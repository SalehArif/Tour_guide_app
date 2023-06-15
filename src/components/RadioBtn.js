import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { horizontalScale, verticalScale } from '../helpers/Metrics';

export default function RadioButton(props) {

    return (
        <View style={[{
          height: verticalScale(18),
          width: horizontalScale(18),
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: verticalScale(8),
                width: horizontalScale(8),
                borderRadius: 6,
                backgroundColor: '#3CDD8E',
              }}/>
              : null
          }
        </View>
    );
  }
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

export default function RadioButton(props) {

    return (
        <View style={[{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#3CDD8E',
              }}/>
              : null
          }
        </View>
    );
  }
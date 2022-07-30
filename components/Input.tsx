import React from 'react'
import { TextInput, View, TextInputProps, StyleSheet, ViewStyle } from 'react-native'
import colors from '../utility/colors'

interface Props extends TextInputProps {
    containerStyle?: ViewStyle
}

export default function Input(props: Props) {
  return (
    <View style={[styles.inputContainer, props.containerStyle]} >
        <TextInput {...props} style={{height: "100%", paddingHorizontal: 10,  color: colors.black}}  />
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: .4,
        borderColor: colors.blue,
        height: 40,
        borderRadius: 8
    }
})
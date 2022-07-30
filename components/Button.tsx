import { View, Text, TouchableOpacity, ViewStyle, StyleSheet, TouchableOpacityProps } from 'react-native'
import React, { ReactElement } from 'react'
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from '../utility/colors'

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems:"center",
        alignSelf:"center",
    },
    floatBtn: {
        position: "absolute",
        bottom: 30,
        right: 10,
        minHeight: 40,
        width:40,
        borderRadius: 40/2,
        flex: 1,
        zIndex: 100
    }
})

interface Props  {
    title?: string,
    onPress?: () => void,
    buttonStyle?: ViewStyle,
    textColor?: string
    disabled?: boolean
}

const Button = (props: Props) => {
  return (
    <TouchableOpacity disabled={props.disabled} activeOpacity={0.5}  onPress={props.onPress} style={[styles.btn, props.buttonStyle]} >
        { props.disabled ? <MaterialIcon name='cancel' size={18} color={colors.white} /> :<Text style={{color: props.textColor}} >{props.title}</Text>}
    </TouchableOpacity>
  )
}

export default Button

interface FloatProps extends Props {
    icon?: ReactElement
}

export const FloatingButton: React.FC<FloatProps> = (props: FloatProps) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={[{...styles.btn, ...styles.floatBtn}, props.buttonStyle]} >
            {props.icon} 
        </TouchableOpacity>
      )
}
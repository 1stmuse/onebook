import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import colors from '../utility/colors'

interface Props {
    title: string,
    leftIcon?: ReactElement | ReactNode,
    rightIocn?: ReactElement | ReactNode
}

const Header = (props: Props) => {
    const {height} = useWindowDimensions()
  return (
    <View style={[styles.header, {height: height * 0.09}]} >
        <View>
        {props.leftIcon}
        </View>
      <Text style={styles.txt} >{props?.title?.slice(0, 25)}</Text>
      <View>
          {props.rightIocn}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection:"row",
        paddingHorizontal: 5,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        // borderBottomWidth: 1,
        marginBottom: 10,
        borderBottomColor: colors.gray,
        elevation: 1
    },
    txt: {
        fontSize: 19,
        color: colors.blue,
        fontWeight: "500"
    },
})

export default Header
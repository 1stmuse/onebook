import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import AntDesign from "react-native-vector-icons/AntDesign"
import colors from '../utility/colors'
import { Book } from '../store/books'
import Button from './Button'
import { HomeScreenParam } from '../navigators/home/screens'
import { useNavigation } from '@react-navigation/native'

const defaultImg = "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"

interface Props extends Book  {
    onPress?: () => void
}

type nav = StackNavigationProp<HomeScreenParam>

const BookCard = (props: Props) => {
    const {width} = useWindowDimensions()
    const {navigate} = useNavigation<nav>()
  return (
      <View style={[styles.card, {width: width * 0.42}]}>
    <TouchableOpacity onPress={props.onPress} >
        <View style={styles.imgView} >
      <Image source={{uri: props.image ?? defaultImg}} style={{width:"100%", height: 100}} resizeMode="stretch"  />
      </View>
      <View style={styles.body} >
      <View style={styles.section} >
          <Text style={styles.heading}>Title:</Text>
          <Text numberOfLines={2}>{props.title}</Text>
      </View>
      <View style={styles.section} >
          <Text style={styles.heading}>Subtitle:</Text>
          <Text numberOfLines={2} >{props.subtitle}</Text>
      </View>
      <View>
          <Text style={styles.heading}>Custom Amount:</Text>
          <Text numberOfLines={2} >{props.customAmount}</Text>
      </View>
      </View>
    </TouchableOpacity>

    { props.isCustom &&
    <TouchableOpacity style={styles.edit}  onPress={() => navigate("NewBook", {edit: true, data: props })} >
        <AntDesign name='edit' color={colors.white}  size={20}/>
    </TouchableOpacity>}


    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        elevation: 2,
        marginHorizontal: 10,
        minHeight: 250,
        marginBottom: 20,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        position: "relative"
    },
    imgView: {
        width: "100%",
    },
    body: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    heading: {
        fontWeight: "500",
        fontSize: 16
    },
    section: {
        marginBottom: 10, height: 50
    },
    edit: {
        position: "absolute",
        right: 10,
        top: 20,
        backgroundColor: colors.black,
        justifyContent:"center",
        alignItems:"center",
        padding: 5
    }
})

export default BookCard
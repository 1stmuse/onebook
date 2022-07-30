import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import books, { Book } from '../../store/books/index'
import { CompositeNavigationProp , RouteProp, useNavigation, useRoute} from "@react-navigation/native"
import { HomeScreenParam, TabScreenParam } from '../../navigators/home/screens'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Ionicons from "react-native-vector-icons/Ionicons"
import Header from '../../components/Header'
import colors from '../../utility/colors'

interface Props extends Book {}

type composeNav = CompositeNavigationProp<StackNavigationProp<HomeScreenParam>, BottomTabNavigationProp<TabScreenParam>>
type Route = RouteProp<HomeScreenParam, "Book">

const Books = (props: Props) => {
    const { height } = useWindowDimensions()
    const {goBack} = useNavigation<composeNav>()
    const { params: {data} } = useRoute<Route>()
  return (
    <View style={{flex: 1, backgroundColor: colors.white}} >
        <Header title={data?.title ?? ""} leftIcon={<Ionicons name='arrow-back' size={24} color={colors.blue} onPress={goBack} />} />
        <ScrollView  contentContainerStyle={{paddingVertical: 30}}>
      <View>
          <View style={[styles.imgView, {height: height * 0.3}]} >
              <Image source={{uri: data.image}} resizeMethod="scale" resizeMode='cover' style={{height: "100%", width: "100%"}} />
          </View>
        <View style={styles.main} >
            <View style={styles.section} >
            <Text style={styles.heading}>Title:</Text>
            <Text numberOfLines={2}>{data.title}</Text>
            </View>
            <View style={styles.section} >
                <Text style={styles.heading}>Subtitle:</Text>
                <Text numberOfLines={2} >{data.subtitle}</Text>
            </View>
            <View style={styles.section} >
                <Text style={styles.heading}>Custom Amount:</Text>
                <Text numberOfLines={2} >{data.customAmount}</Text>
            </View>
            <View style={styles.section} >
                <Text style={styles.heading}>Custom Book?</Text>
                <Text numberOfLines={2} >{data.isCustom ? "True" : "False"}</Text>
            </View>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 20,
        backgroundColor: colors.white,
       
    },
    imgView: {
        marginBottom: 25
    },
    heading: {
        fontWeight: "500",
        fontSize: 16
    },
    section: {
        marginBottom: 10, height: 50,
    }
})

export default Books
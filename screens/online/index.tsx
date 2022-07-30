import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeScreenParam } from '../../navigators/home/screens'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../../store'
import BookCard from '../../components/BookCard'
import Header from '../../components/Header'
import colors from '../../utility/colors'
import { Book } from '../../store/books'

export type ComposeNav = 
  StackNavigationProp<HomeScreenParam>
interface Props  {}

const Online = (props: Props) => {
  const {books} = useSelector((state: RootState) => state.books)
  const customBooks = books.filter((bk:Book) => !bk?.isCustom)
  const {navigate} = useNavigation<ComposeNav>()
  return (
    <View
    style={styles.main}
    >
      <Header title='Online Books' />
      <FlatList 
      contentContainerStyle={styles.list}
      numColumns={2}
      data={customBooks}
        renderItem={({item}) => <BookCard {...item} onPress={() => navigate("Book", {data: item})}  />}
        ListEmptyComponent={() => <View><Text>No books avialable</Text></View>}
      />
     
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white
  },
  list: {
    paddingHorizontal: 10,
    marginTop: 10
  },
})

export default Online
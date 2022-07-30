import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeScreenParam } from '../../navigators/home/screens';
import Antdesign from "react-native-vector-icons/AntDesign"
import { FlatList, StyleSheet, Text, Platform, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FloatingButton } from '../../components/Button';
import colors from '../../utility/colors';
import { useSelector, useDispatch } from 'react-redux';
import BookCard from '../../components/BookCard';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { RootState } from '../../store';
import { getBook } from '../../store/books/bookActions';
import { Checkbox } from "react-native-paper"
import { logout } from '../../store/auth';

export type ComposeNav =
  StackNavigationProp<HomeScreenParam>

const HomeScreen: React.FC = ({ }) => {

  const { books, loading } = useSelector((state: RootState) => state.books)
  const { navigate } = useNavigation<ComposeNav>()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [customBk, setCustomBk] = useState<boolean>(false)

  const filteredData = () => {
    if (customBk) {
      return books.filter((bk) => bk.isCustom)
    }
    return books.filter((bk) => bk.title?.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  useEffect(() => {
    dispatch(getBook())

  }, [])

  return (
    <View
      style={styles.main}
    >
      <Header title='Books Me' rightIocn={<TouchableOpacity onPress={() => dispatch(logout())} ><Text style={styles.logout} >Logout</Text></TouchableOpacity>} />
      {/* {data?.books.map((bk) => <BookCard {...bk} />)} */}
      <View style={{ paddingHorizontal: 20 }} >
        <Input placeholder='Search for books' containerStyle={styles.search} onChangeText={(text) => setSearchTerm(text)} />
        <View style={styles.filtView} >
          <Text style={styles.filtTxt}>Filter</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <Text style={{ color: "black" }} >Custome books</Text>
            <View style={Platform.OS === "ios" && styles.checkbox} >
              <Checkbox
                status={customBk ? 'checked' : 'unchecked'}
                onPress={() => {
                  setCustomBk(!customBk);
                }}
              />
            </View>
          </View>

        </View>
      </View>
      {
        loading ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
          <ActivityIndicator animating={true} color={colors.blue} />
        </View>) :
          <FlatList
            contentContainerStyle={styles.list}
            numColumns={2}
            data={filteredData()}
            renderItem={({ item }) => <BookCard {...item} onPress={() => navigate("Book", { data: item })} />}
            ListEmptyComponent={() => <View><Text>No books avialable</Text></View>}
          />}

      <FloatingButton onPress={() => navigate("NewBook", { edit: false })} title='Add' buttonStyle={styles.floatBtn} icon={<Antdesign name='plus' size={20} color={colors.white} />} />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white
  },
  floatBtn: {
    backgroundColor: colors.blue,
  },
  list: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  filtView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  filtTxt: {
    fontWeight: "bold",
    color: colors.accent1,
    fontSize: 19
  },
  search: {
    borderWidth: 0,
    borderBottomWidth: .7,
    borderBottomColor: colors.gray
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 3,
    marginLeft: 4,
    borderWidth: .3
  },
  logout: {
    color: colors.blue,
    marginRight: 4
  }
})
export default HomeScreen;

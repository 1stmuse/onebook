import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { CompositeNavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeScreenParam, TabScreenParam } from '../../navigators/home/screens'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from '../../utility/colors'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as ImagePicker from "react-native-image-picker";
import { addBook, Book, editBook } from '../../store/books'
import {useDispatch} from "react-redux"

interface Props {}

const API_KEY = "e64a7ad71cebcc28dc83a4b4f41df688"

type composeNav = CompositeNavigationProp<StackNavigationProp<HomeScreenParam>, BottomTabNavigationProp<TabScreenParam>>
type Route = RouteProp<HomeScreenParam, "NewBook">

const NewBook = (props: Props) => {
    const {goBack} = useNavigation<composeNav>()
    const [imgUrl, setImgUrl] = useState<string>("")
    const [bookInfo, setBookInfo] = useState<Book>({customAmount: 0})
    const [uploading, setUploading] = useState<boolean>(false)
    const { params: {edit, data} } = useRoute<Route>()
    const dispatch = useDispatch()

    const changeInfo = (val:string, field:string) => {
        setBookInfo(prev => ({
            ...prev,
            [field]:  val
        }))
    }

    useEffect(() => {
      if(data && edit){
        setBookInfo((prev) => ({
          ...prev,
          ...data
        }))
      }
    
    }, [])

    const submit = () => {

      if(edit){
        dispatch(editBook(bookInfo))
        goBack()
      }else{
        dispatch(addBook(bookInfo))
        goBack()
      }

      
        
        
    }

    // useEffect(()=> {
    //     if(edit && data){
    //         const bookInfo = 
    //     }
    // },[])

    const upLoad = async (imageUri: string) => {
        const data = new FormData();
        data.append("image", imageUri);
        setUploading(true);
        fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
          method: "post",
          body: data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => res.json())
          .then((data) => {
              console.log(data, "the upload data")
            const url = data?.data?.display_url;
            changeInfo(url, "image");
            setUploading(false);
          })
          .catch((err) => {
            setUploading(false);
          });
    
      };

    const selectImage = () => {

        ImagePicker.launchImageLibrary({mediaType: "mixed", includeBase64: true}, async (result) =>{
           
               if (!result.didCancel) {
              upLoad(result?.assets[0].base64 ?? "")
            // upLoad(result.assets[0].base64);
                }else{
              console.log("caneled")
          }
        })
      };

  return (
    <View style={{flex: 1}} >
        <Header title="New Book" leftIcon={<Ionicons name='arrow-back' size={24} color={colors.blue} onPress={goBack} />} />
      <View style={styles.main}>
         
            {bookInfo.image ? 
            <View style={styles.imgView} >
            <Image source={{uri: bookInfo.image}} style={{height: "100%"}} />
             </View> : (
                <TouchableOpacity style={styles.emptyImgView} onPress={selectImage}  >
                { uploading ? <ActivityIndicator animating={true} color="white" />  : <Ionicons name='camera' size={30} color={colors.white} />}
                </TouchableOpacity>
            ) }
         
        <View style={styles.inputView}>
            <Text>Title</Text>
            <Input onChangeText={(text) => changeInfo(text, "title")} containerStyle={{borderColor: colors.gray}} value={bookInfo.title} />
        </View>
        <View style={styles.inputView}>
            <Text>Subtitle</Text>
            <Input onChangeText={(text) => changeInfo(text, "subtitle")}  containerStyle={{borderColor: colors.gray}} value={bookInfo.subtitle} />
        </View>
        <View style={styles.inputView}>
            <Text>Custom Amount</Text>
            <Input onChangeText={(text) => changeInfo(text, "customAmount")}  containerStyle={{borderColor: colors.gray}} value={`${bookInfo.customAmount}`} />
        </View>
        <Button title='Submit' onPress={submit} buttonStyle={{backgroundColor: colors.blue, width: "80%"}} textColor={colors.white}  />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    inputView: {
        marginBottom: 20
    },
    imgView: {
        marginBottom: 20,
        width: "100%",
        height: 250
    },
    emptyImgView:{
        marginBottom: 20,
        borderRadius: 7,
        backgroundColor: colors.gray,
        width: "20%",
        alignItems:"center",
        justifyContent: 'center',
        paddingVertical: 20
    }
})

export default NewBook
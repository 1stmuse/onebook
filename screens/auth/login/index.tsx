import React, { createRef, useRef, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Alert
} from 'react-native';
import { AuthScreenList } from '../../../navigators/auth/authParamList';
import { useAppDispatch } from '../../../store/hooks';
import { setCredential } from '../../../store/auth';
import colors from '../../../utility/colors';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { useBiometric } from '../../../utility/biometrics';
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login: React.FC = () => {
  const [userInfo, setuserInfo] = useState<{email: string, password:string}>({email:"", password:""})
  const { height } = useWindowDimensions()
  const dispatch = useAppDispatch();
  
  const useBio = async () => {
    const { authenticate,  enrolled, hasHardware, isSupported } =  await useBiometric()

    if (!isSupported) {
      Alert.alert(
        'Device not supported',
        'Device does not support biometry, loggin with credentials'
      );
      return;
    }

    if (!hasHardware) {
      Alert.alert(
        'Hardware not found',
        'Biometry hardware not found, loggin with credentials'
      );
      return;
    }

    if (enrolled == "BiometryNotEnrolled" ) {
      Alert.alert(
        'Biometrics not set',
        'Please go to phone settings and setup biometrics for you device'
      );
      return;
    }

    const authenticated = await authenticate();

    if (authenticated.success) {
      let storedUser: any = await AsyncStorage.getItem("@user")
      storedUser = JSON.parse(storedUser)

      if (!Boolean(storedUser?.user?.email) || !Boolean(storedUser?.user?.password)) {
        Alert.alert(
          "Can't sign you in",
          'Please login with the form at least once before using this feature'
        );
        return;
      }

      dispatch(setCredential({user: storedUser?.user, access_token: "gssdshgycgs"}))
      // onPress(email, password);
    } else {
      Alert.alert('Authentication Error', 'Biometrics does not match');
      return;
    }

  }

  const changeInfo = (val: string, field: string) => {
    setuserInfo((prev) => ({
      ...prev,
      [field]: val
    }))
  }

  const submit = () => {
    if(!userInfo.email || !userInfo.password){
      Alert.alert("Erro loggin in", "Please fill in credentials")
      return
    }
    dispatch(setCredential({user: userInfo, access_token: "gssdshgycgs"}))
  }

  return (
 
          <View
          style={styles.main}
          >
            <View style={[styles.logoView, {height: height * 0.2}]} >
            <Text style={styles.lgTxt}>login</Text>
            </View>
            <View style={[styles.body, {marginTop: height * 0.1}]} >
              <Input onChangeText={(text) =>changeInfo(text, "email")} value={userInfo.email} placeholder='Email' containerStyle={styles.inputCont}  />
              <Input onChangeText={(text) =>changeInfo(text, "password")} value={userInfo.password} placeholder='Password' containerStyle={styles.inputCont} />
              <Button title='login' textColor={colors.white} buttonStyle={{
                width: 280,
                backgroundColor: colors.blue,
                marginTop: 20
                
                
              }} onPress={submit}  />

              <View style={styles.biomet} >
              <TouchableOpacity onPress={useBio} >
              {Platform.OS === 'android' ? (
                  <Ionicons
                    name="finger-print-outline"
                    size={50}
                    color="black"
                  />
                ) : (
                  <MaterialIcon
                    name="face-recognition"
                    size={50}
                    color="black"
                  />
                )}
              </TouchableOpacity>
              </View>
            </View>
          </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  logoView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: "center",
  },
  lgTxt: {
    fontSize: 47,
    color: colors.accent1
  },
  body: {
    paddingHorizontal: 20,
    marginTop: 40
  },
  inputCont: {
    marginBottom: 20
  },
  biomet: {
    alignItems:"center",
    marginTop: 50
  }
})

export default Login;

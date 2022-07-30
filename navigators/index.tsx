import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './auth';
import { RootScreenList } from './RootStackSceenList';
import HomeNavigator from './home';
import { useAuth } from '../store/auth/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const { Screen, Navigator } = createNativeStackNavigator<RootScreenList>();

const RootNavigator: React.FC = () => {
  const { access_token } = useSelector((state: RootState) => state.auth)
  const { user } = useAuth();


  return (
    <Navigator>   
      {!access_token && (
        <Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: !user ? 'pop' : 'push'
          }}
        />
      )}
 
      {user && access_token &&  (
        <Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            headerShown: false
          }}
        />
      )}
    </Navigator>
  );
};

export default RootNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/auth/login';
import { AuthScreenList } from './authParamList';


const { Screen, Navigator } = createStackNavigator<AuthScreenList>();

const AuthNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
 

    </Navigator>
  );
};

export default AuthNavigator;

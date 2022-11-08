import React, { useState } from 'react';
import Login from './components/Login';
import TodoList from './components/TodoList';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {
  const [email, setEmail] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Login'>
          {(props) => <Login heading={!loggedIn ? "TODO App" : "TODO List"} email={email} setEmail={setEmail} setLoggedIn={setLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name='TodoList'>
          {(props) => <TodoList heading={!loggedIn ? "TODO App" : "TODO List"} email={email} setEmail={setEmail} setLoggedIn={setLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

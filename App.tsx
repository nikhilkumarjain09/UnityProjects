/**

 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import NewScreen from './NewScreen';
const Stack = createNativeStackNavigator();
function App(){
  return(
<NavigationContainer>
<Stack.Navigator>
        <Stack.Screen name="Train Data Add" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="NewScreen" component={NewScreen}/>

      </Stack.Navigator>
</NavigationContainer>

)
}
export default App;
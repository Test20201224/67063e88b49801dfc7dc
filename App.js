/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import NewsRow from './NewsRow';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Main=()=>{
  
  const [Page, setPage] = useState(0)
  const [News, setNews] = useState([])
  let interval = null;
  useEffect(() => {

    if (interval == null) {
      interval = setInterval(() => {

        getData()
      }, 10000);
    }


    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
   
    <View>
      <FlatList
        data={News}
        renderItem={({ item }) => (
          <NewsRow data={item}></NewsRow>
        )}
        onEndReachedThreshold={0.3}
        onEndReached={({ distanceFromEnd }) => {
          console.log('on end reached ', distanceFromEnd);
          getData()
        }}
      /> 
   
      
    </View>
  );

  function getData() {

   
    fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" + Page)
      .then(response => response.json())
      .then((responseJson) => {
        // setNews(News.push(...responseJson.hits))
        setNews(oldArray => [...oldArray, ...responseJson.hits]);

        setPage(prevValue => prevValue + 1)

       

      })
      .catch(error => console.log(error))
  }
}


const App = () => {
 return(
  <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={NewsRow} />
      </Stack.Navigator>
  
</NavigationContainer>
   
 )
};




export default App;

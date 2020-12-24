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




const App = () => {
  const [seconds, setSeconds] = useState(0);
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
};




export default App;

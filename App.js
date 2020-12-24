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




const Main = () => {
  const [Loading, setLoading] = useState(true)
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
  if (Loading)
    return (


      <View style={{ flex: 1 ,justifyContent:'center',alignSelf:'center'}}>
        <Text style={{fontSize:24 }}> Loading...</Text>

      </View>
    );
  else
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
        setLoading(false)


      })
      .catch(error => console.log(error))
  }
}

const App = () => {
  return (
    <Main />
  )
};




export default App;

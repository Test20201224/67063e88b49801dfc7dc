import React from 'react'
import { View ,Text } from 'react-native'

export default function NewsRow(props) {
    console.log(props.author)
    return (
        
        <View  style={{ backgroundColor:'grey',margin:20}} >
            
            <Text > Created at {props.created_at}</Text>
            <Text> Title {props.title}</Text>
            <Text> Url  {props.url}</Text>
            <Text> Author {props.author}</Text>
        </View>
    )
}

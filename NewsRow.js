import React from 'react'
import { View ,Text } from 'react-native'

export default function NewsRow(props) {
    
    return (
        
        <View  style={{ backgroundColor:'grey',margin:20,padding:20}} >
            
            <Text  style={{color:'white',padding:10 }} > Created at-- {props.data.created_at}</Text>
            <Text style={{ color:'white',padding:10 }}> Title --{props.data.title}</Text>
            <Text style={{ color:'white',padding:10 }}> Url--   {props.data.url}</Text>
            <Text style={{color:'white',padding:10 }}> Author--- {props.data.author}</Text>
        </View>
    )
}

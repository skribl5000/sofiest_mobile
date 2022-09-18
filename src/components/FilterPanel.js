import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import axios from 'axios';

function FilterPanel({state}){
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('event_category/')
          .then(({ data }) => {
            setData(data)
            console.log(data)
          })
          .catch((error) => console.error(error))
      }, []);
    return (<ScrollView horizontal={true} style={styles.categoriesPannel}>
        {data.map((e, index) => <View key={e.id} style={styles.categoryItem}><Text key={e.id}>{e.name}</Text></View>)}
    </ScrollView>);
}

const styles = StyleSheet.create({
    categoriesPannel:{
        // flex:1,
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10
    },
    categoryItem:{
        padding: 5,
        marginRight: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 3
    }
})
export default FilterPanel;
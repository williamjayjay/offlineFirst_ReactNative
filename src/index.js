import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet , StatusBar, FlatList, TouchableOpacity} from 'react-native'

import api from './services/api'

export default function App() {
  const [theProjects, setTheProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(res => {
      console.log(res.data)
      setTheProjects(res.data)
    })
  }, [])

  async function handleAddProject(){
   const response = await api.post('projects', {
     title:`Novo Projeto ${Date.now()}`,
     owner:'Williamjj'
   })

   setTheProjects([...theProjects, response.data])
  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

<SafeAreaView style={styles.container} >

    <FlatList
    
    data={theProjects}
    keyExtractor={proj => proj.id}
    renderItem={({ item}) => (
      <Text style={styles.title} >{item.title}</Text>
    )}
    />

      <TouchableOpacity onPress={handleAddProject} activeOpacity={0.6} style={styles.button} >
        <Text style={styles.buttonText} >Add Projeto</Text>
      </TouchableOpacity>

</SafeAreaView>

    {/* <View style={styles.container} >
      {theProjects.map(proj => <Text style={styles.title} key={proj.id} > {proj.title} </Text>)}
    </View> */}
    </>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#7159c1',
    // alignItems:'center',
    // justifyContent:'center'
  },
  title:{
    color: '#fff',
    fontSize:28,
  },
  button:{
    // alignSelf:'stretch',
    backgroundColor:"#fff",
    margin:20,
    height: 50,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center'

  },
  buttonText: {
    fontWeight:'700',
    fontSize:16,

  }
})

import React, { useState, useEffect } from 'react'
import {useNetInfo} from "@react-native-community/netinfo";

import { SafeAreaView, View, Text, StyleSheet , StatusBar, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native'

import api from './services/api'

export default function App() {
  const [theProjects, setTheProjects] = useState([])
  const [offTheProjects, setOffTheProjects] = useState([])
  const [offNow, setOffNow] = useState(false)
  const [connect, setConnect] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifyData, setVerifyData] = useState(false)
  const netInfo = useNetInfo();

    function startOne()  {
     console.log( netInfo.isConnected)

     if(netInfo.isConnected == true){

      var statusServer = false
      console.log( ' WILLIAM - statusserver INICIAL', statusServer)
      
      api.get('projects').then(res => {
        alert('Conectado com sucesso!'),
        statusServer= true
        console.log( ' WILLIAM - statusserver TRUE', statusServer)

          // console.log(res.data)
        }).catch(err => {
        alert('Sem conexão ao banco'),
          console.log(err)})
    
          setTimeout(() => {
            
              if(statusServer == false){
                console.log( ' WILLIAM - statusserver DENTRO DO TIME OUT', statusServer)
                console.log('PEGAR DO ASYNSC SE TIVER')

               

    
              }else if (statusServer == true){
                console.log('WILLIAM - CONECTADO COM EUSCEO%%%!@')
                console.log('PEGAR DO ASYNSC SE TIVER')

                api.get('projects').then(res => {
                  console.log( ' WILLIAM - statusserver TRUE', statusServer)
                    setTheProjects(res.data)
                  }).catch(err => {
                  alert('Sem conexão ao banco'),
                    console.log(err)})



              }
                /*** */
          }, 3000)
    

     }else{
       console.log('PEGAR DO ASYNC SE TIVER TBM JAE!')
     }


  }


  useEffect(() => {
    console.log('INICIADO!')
    

  }, [])



  // useEffect(() => {
  //   getData()
  // }, [])
 

  // useEffect(() => {


   
  // }, [])
  
  
//   useEffect(() => {
    

//     // async function fetchData(){
//     //     const req = await api.get('projects')
//     //     console.log('xxxx')
//     //     console.log(req.data)
//     //     setTheProjects(req.data)
//     //     setLoading(false)
//     //     setConnect(false)
        
    


//     // }
//     // fetchData()
// var teste = false
// console.log('teste here', teste)


//     api.get('projects').then(res => {
//       // teste = true
//       // setLoading(true)
//       // setConnect(true)
//       // console.log('connected 1 ')
//       // console.log('teste :', teste)
//       // console.log(res.data)
//       // setTheProjects(res.data)  

//       if(offNow == true){
//         addOffToServer()
//         setLoading(true)
//         setConnect(true)
//         teste = true
//         console.log('connected 1 ')
//         console.log('teste :', teste)
//         console.log(res.data)
//       }else{
//         setTheProjects(res.data)  
//         setLoading(true)
//         setConnect(true)
//         teste = true
//         console.log('connected 1 ')
//         console.log('teste :', teste)
//         console.log(res.data)

//       }
//     }).catch(error => (
//       console.log(error))
//   )

//     setTimeout(() => {
//       if(teste == false) {
//         console.log('teste here ==', teste)
//         console.log('NAO CONECTADO!')
//         alert('NAO CONECTADO!')

//         setLoading(false)
//         setConnect(false)
//       }else{
//         console.log('CONECTADO COM SUCESSO!')

//       }
      
//     }, 5000);

   

    

//     // api.get('projects').then(res => {
//     // alert('Conectado com sucesso!'),
//     // setConnect(true)

//     //   console.log(res.data)
//     //   setTheProjects(res.data)
//     // }).catch(err => {
//     // alert('Sem conexão ao banco'),
//     // setConnect(false)
      
//     //   console.log(err)})

//   }, [])

  async function theHandleAddProject(){

  

    alert('Projeto adicionado com sucesso!')
    const response = await api.post('projects', {
      title:`Novo Projeto ${Date.now()}`,
      owner:'Williamjj'
    })

    setTimeout(() => {
      setTheProjects([...theProjects, response.data])
      
    }, 1000);
 
   }

    function offHandleAddProject(){
      alert('Projeto adicionado com sucesso!, no agardo apra sincronia')
      console.log('Projeto adicionado com sucesso!, no agardo apra sincronia')
    
      setTheProjects([...theProjects, {
        id:Date.now(), 
        owner:'Williamjj',
        title:`Novo Projeto ${Date.now()}`,
      }])

      setOffTheProjects([...theProjects, {
        id:Date.now(), 
        owner:'Williamjj',
        title:`Novo Projeto ${Date.now()}`,
      }])

      setOffNow(true)
      
 
   }

   function addOffToServer(){
     if(offNow == true){

     console.log('rodando o off')

     offTheProjects.forEach(data => {
      
        console.log('Projeto adicionado com sucesso! VINDO DO OFF')
           api.post('projects', {
          title:data.title,
          owner:data.owner,
        })
       
     })
     console.log('finaliado foreach')
     handleRefreshData()
     setOffTheProjects([])
     setOffNow(false)

    }






    // gettado.forEach(e => {
    //     e.id != theProjects.id ? console.log('diferente') : console.log('igual  = ', e.id)
    // })
   }

    function handleAddProject(){

    var teste = false 
    console.log('teste here', teste)
    
    
        api.get('projects').then(res => {
          if(offNow == false){
            theHandleAddProject()
            setLoading(true)
          setConnect(true)
          teste = true
          console.log('connected 1 ')
          console.log('teste :', teste)
          console.log(res.data)
          }else{

          addOffToServer()


          setLoading(true)
          setConnect(true)
          teste = true
          console.log('connected 1 ')
          console.log('teste :', teste)
          console.log(res.data)
        }

        }).catch(error => (
          console.log(error))
      )
    
        setTimeout(() => {
          if(teste == false) {
            console.log('teste here ==', teste)
            console.log('NAO CONECTADO!')
            alert('NAO CONECTADO!')

            offHandleAddProject()
    
            setLoading(false)
            setConnect(false)
          }else{
            console.log('CONECTADO COM SUCESSO!')
            console.log('teste here ==', teste)
    
    
          }
          
        }, 5000);

    
    

   

    


   

  

  }

  

    function handleRefreshData(){


      var teste = false
console.log('teste here', teste)


    api.get('projects').then(res => {
      if(offNow == true){
        addOffToServer()
        setLoading(true)
        setConnect(true)
        teste = true
        console.log('connected 1 ')
        console.log('teste :', teste)
        console.log(res.data)
      }else{
        setTheProjects(res.data)  
        setLoading(true)
        setConnect(true)
        teste = true
        console.log('connected 1 ')
        console.log('teste :', teste)
        console.log(res.data)

      }

    }).catch(error => (
      console.log(error))
  )

    setTimeout(() => {
      if(teste == false) {
        console.log('teste here ==', teste)
        console.log('NAO CONECTADO!')
        alert('NAO CONECTADO!')

        setLoading(false)
        setConnect(false)
      }else{
        console.log('CONECTADO COM SUCESSO!')
        console.log('teste here ==', teste)


      }
      
    }, 5000);
   
    // alert('Atualizado!!'),

    //   api.get('projects').then(res => {
    //   setLoading(false)
    //   setConnect(false)


    //   alert('Conectado com sucesso!'),
  
    //     console.log(res.data)
    //     setTheProjects(res.data)
    //   }).catch(err => {
    //     console.log(err)
    //   alert('Sem conexão ao banco'),
    //   setLoading(true)
    //   setConnect(true)

    //   })

    //   setTimeout(() => {
    //     alert('NAO CONECTADO')
    //     setLoading(true)
    //     setConnect(true)
        
    //   }, 3000);
  
      
       
  }

  function verifyDatabase(){
    var statusServer = false
    console.log( 'statusserver INICIAL', statusServer)

    
    api.get('projects').then(res => {
      alert('Conectado com sucesso!'),
      statusServer= true
      // setVerifyData(true)
      console.log( 'statusserver TRUE', statusServer)

        console.log(res.data)
      }).catch(err => {
      alert('Sem conexão ao banco'),
        console.log(err)})
  
        setTimeout(() => {
          statusServer= false
            if(statusServer == false){
              console.log( 'statusserver DENTRO DO TIME OUT', statusServer)
              console.log('STATUS NAO CONNECTED')
      // setVerifyData(false)

  
            }else if (statusServer == true){
              console.log('CONECTADO COM EUSCEO%%%!@')
            }
        }, 2000);
  }

  function getData(){
    var statusServer = false
    console.log( 'statusserver INICIAL', statusServer)

        api.get('projects').then(res => {
    alert('Conectado com sucesso!'),
    statusServer= true
    console.log( 'statusserver TRUE', statusServer)

    // setConnect(true)

      console.log(res.data)
      setTheProjects(res.data)
    }).catch(err => {
    alert('Sem conexão ao banco'),
    // setConnect(false)
      
      console.log(err)})

      setTimeout(() => {
    // statusServer= false

          if(statusServer == false){
            console.log( 'statusserver DENTRO DO TIME OUT', statusServer)
            console.log('STATUS NAO CONNECTED')

          }else if (statusServer == true){
            console.log('CONECTADO COM EUSCEO%%%!@')
          }
      }, 5000);
  }

  async function handleAddProjectWithPost(){
    console.log('handlefunction post')
    const response = await api.post('projects', {
      title:`Novo Projeto ${Date.now()}`,
      owner:'Williamjj'
    })
 
    setTheProjects([...theProjects, response.data])
   }

  function handleAddProject30(){
    var status = netInfo.isConnected
    console.log('status: ',status)

    if(status == true){
      console.log('status TRUE: ',status)

//-----------
      var statusServer = false
      console.log( ' WILLIAM - statusserver INICIAL', statusServer)
  
      
      api.get('projects').then(res => {
        alert('Conectado com sucesso!'),
        statusServer= true
        console.log( ' WILLIAM - statusserver TRUE', statusServer)

        
  
          console.log(res.data)
        }).catch(err => {
        alert('Sem conexão ao banco'),
          console.log(err)})
    
          setTimeout(() => {
            
              if(statusServer == false){
                console.log( ' WILLIAM - statusserver DENTRO DO TIME OUT', statusServer)
                console.log(' WILLIAM - STATUS NAO CONNECTED')

                console.log('status FALSE: ',status)

                setTheProjects([...theProjects, {
                  id:Date.now(), 
                  owner:'Williamjj',
                  title:`Novo Projeto ${Date.now()}`,
                }])
          
                setOffTheProjects([...theProjects, {
                  id:Date.now(), 
                  owner:'Williamjj',
                  title:`Novo Projeto ${Date.now()}`,
                }])
                
  
    
              }else if (statusServer == true){
                console.log('WILLIAM - CONECTADO COM EUSCEO%%%!@')

                /***** */
                if(statusServer == true){setTimeout(() => {

                  if(offTheProjects.length > 0){
          
               offTheProjects.forEach(data => {
                
                console.log('Projeto adicionado com sucesso! VINDO DO OFF')
                   api.post('projects', {
                  title:data.title,
                  owner:data.owner,
                })
               
             })
             console.log('finaliado foreach')
             setOffTheProjects([])
             getData()
            }else{
              handleAddProjectWithPost()
              console.log('vazio')
              console.log('array: ', offTheProjects.length)
          
            }
          
                  
                }, 500);}
          
                /*** */
              }
          }, 3000)
    

    //----------------


     


//------------------------------------------------------
    } else if(status == false){
      console.log('status FALSE: ',status)

      setTheProjects([...theProjects, {
        id:Date.now(), 
        owner:'Williamjj',
        title:`Novo Projeto ${Date.now()}`,
      }])

      setOffTheProjects([...theProjects, {
        id:Date.now(), 
        owner:'Williamjj',
        title:`Novo Projeto ${Date.now()}`,
      }])

    }

  }
  //------------------

  function handleAddProjectCERTO(){
    Add1Project() //PARTE 1 ADD NO OFF E NA LISTA AO VIVO
    Ver2Project() //PARTE 2 VERIFICAR SE O BANCO ESTA OK


  }

  function Add1Project(){
    // setTheProjects([...theProjects, {
    //   id:Date.now(), 
    //   owner:'Williamjj',
    //   title:`Novo Projeto ${Date.now()}`,
    // }])

    console.log('PARTE 1 adicionado!', )
  }

  function Ver2Project(){

    //-----------
          var statusServer = false
          console.log( ' WILLIAM - statusserver INICIAL', statusServer)
          
          api.get('projects').then(res => {
            alert('Conectado com sucesso!'),
            statusServer= true
            console.log( ' WILLIAM - statusserver TRUE', statusServer)
    
              // console.log(res.data)
            }).catch(err => {
            alert('Sem conexão ao banco'),
              console.log(err)})
        
              setTimeout(() => {
                
                  if(statusServer == false){
                    console.log( ' WILLIAM - statusserver DENTRO DO TIME OUT', statusServer)
                    console.log(' WILLIAM - STATUS NAO CONNECTED')
                    add3Offs()
        
                  }else if (statusServer == true){
                    console.log('WILLIAM - CONECTADO COM EUSCEO%%%!@')
                    add4Online()

                  }
                    /*** */
              }, 3000)
        
  }

    function add3Offs(){
      const meuid = Date.now();
      const meuOwner = 'OFFWILL';
      const meuTitle = `OFFNovo Projeto ${Date.now()}`;

      setTheProjects([...theProjects, {
      id:meuid, 
      owner:meuOwner,
      title:meuTitle,
    }])

    setOffTheProjects([...offTheProjects, {
      id:meuid, 
      owner:meuOwner,
      title:meuTitle,
    }])
    console.log(offTheProjects)


    //   offTheProjects.forEach(data => {
                
    //     console.log('Projeto adicionado com sucesso! VINDO DO OFF')
    //         api.post('projects', {
    //       title:data.title,
    //       owner:data.owner,
    //     })
       
    //  })
    //   console.log('passado pro banco')
  
    // setOffTheProjects([])
  }

  async function passador(passing){
    await api.post('projects', {
      title: passing.title,
      owner: passing.owner
    })
  }

  async function passadorOnline(){
    const res = await api.post('projects', {
      owner:'Williamjj',
      title:`Novo Projeto ${Date.now()}`,
    })

   
    setTheProjects([...theProjects, res.data])
  }

   function add4Online(){

    if(offTheProjects.length > 0){
      offTheProjects.forEach(data => {
                
        console.log('Projeto adicionado com sucesso! VINDO DO OFF')
        passador(data)
        //     api.post('projects', {
        //   title:data.title,
        //   owner:data.owner,
        // })
       
     })
      console.log('passado pro banco')
      setOffTheProjects([])

      console.log('estamos online, adicionando')
    passadorOnline()

      // const res =  api.post('projects', {
      //   owner:'Williamjj',
      //   title:`Novo Projeto ${Date.now()}`,
      // })
  
     
      // setTheProjects([...theProjects, res.data])

    }else{


    console.log('estamos online, adicionando')
    passadorOnline()
  }

  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

<SafeAreaView style={styles.container} >
  <TouchableOpacity onPress={add4Online} >

  <Text style={{ fontSize:28, color: connect ?  'green' : 'red', textAlign:'center', paddingVertical:16, fontWeight:'700', backgroundColor:'white' }}  >{`${connect ? 'ONLINE' : 'OFFLINE'}`}</Text>
  </TouchableOpacity>
  {/* <Text>Type: {netInfo.type.toString()}</Text> */}
      <Text>Is Connected? { netInfo.isConnected != null ? netInfo.isConnected.toString() : 'null'}</Text>
    {/* {
      loading == true 
      ? */}

    <FlatList
    
    data={theProjects}
    keyExtractor={proj => proj.id}
    renderItem={({ item}) => (
      <Text style={styles.title} >{item.title}</Text>
    )}
    />
    {/* : 
    <Text>Carregando.....</Text>
  } */}

<TouchableOpacity onPress={startOne} activeOpacity={0.6} style={styles.button} >
        <Text style={styles.buttonText} >APP OK</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddProjectCERTO} activeOpacity={0.6} style={styles.button} >
        <Text style={styles.buttonText} >Add Projeto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRefreshData} activeOpacity={0.6} style={styles.button} >
        <Text style={styles.buttonText} >REFRESH</Text>
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
  statusCon:{
    fontSize:28,
    textAlign:'center'
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

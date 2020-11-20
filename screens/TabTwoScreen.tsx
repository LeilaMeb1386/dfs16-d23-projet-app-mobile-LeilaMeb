import React, {useState} from 'react';
import { StyleSheet, Button, FlatList, Alert, Linking, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {

  const [types, setTypes] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loaded, setLoaded] = useState(false);


  fetch('https://download.data.grandlyon.com/ws/rdata/sit_sitra.sittourisme/type.json')
  .then((response) => response.json())
  .then((responseJson) => setTypes(responseJson.values))
  .catch((error) => {
    console.error(error);
  });

  const handleClick = () => {
    Alert.alert('Check me!!')
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherche</Text>

      
      
      { types.map((item) => {
        return (
          <View style={{
            flex: 1,
            flexDirection: 'row',
            }}>
            <View style={styles.buttonContainer} >
              <Button key={item} title={item} onPress={() => 
                fetch(`https://download.data.grandlyon.com/ws/rdata/sit_sitra.sittourisme/all.json?field=type&value=${item}&maxfeatures=10`)
                .then((response) => response.json())
                .then((responseJson) => setDatas(responseJson.values))
                .catch((error) => {
                  console.error(error);
                })
                .finally(() => setLoaded(true))
              } color="red" />
            </View>
          </View>
        )
      })}
      {loaded ? 
      <FlatList
      data={datas}
      renderItem={({item}) => (
          <View style={styles.card}>
              <View style={[styles.cardBody, styles.backgroundColorwhite]}>
                  <Text style={[styles.cardName, styles.blackColor]}>{item.nom}</Text>
                  <View style={[styles.row, styles.backgroundColorwhite]}>
                      <Image
                          style={[styles.icon, styles.backgroundColorwhite]}
                          source={require('../assets/images/location.png')}
                      />
                      { item.commune == '' ? (
                        <Text style={[styles.backgroundColorwhite, styles.blackColor]}>Commune non renseignée</Text>   
                          ) : (
                            <Text style={[styles.cardCommune, styles.blackColor, styles.backgroundColorwhite]}>{item.commune} {item.codepostal}</Text>
                          )
                      }
                  </View>
                  <View style={[styles.row, styles.backgroundColorwhite]}>
                      <Image
                          style={[styles.icon, styles.backgroundColorwhite]}
                          source={require('../assets/images/location.png')}
                      />
                      {
                          item.addresse == '' ? (
                            <Text style={[styles.backgroundColorwhite, styles.blackColor]}>Adresse non renseignée</Text>
                          ) : (
                            <Text style={[styles.cardAdresse, styles.blackColor, styles.backgroundColorwhite]}>{item.adresse}</Text>
                          )
                      }
                  </View>
                  <View>
                    {
                        item.type_detail == '' ? (
                          <Text style={[styles.backgroundColorwhite, styles.blackColor]}>Type non
                          renseigné</Text>

                        ) : (
                          <Text
                                style={[styles.backgroundColorwhite, styles.blackColor]}>{item.type_detail}</Text>
                            
                        )
                    }
                  </View>
              </View>
              <View style={[styles.cardFooter, styles.backgroundColorwhite]}>
                  <View>
                      {
                          item.siteweb == '' ? (
                            <Text style={[styles.backgroundColorwhite, styles.blackColor]}>Site web non
                            renseigné</Text>
                          ) : (
                            <Text style={[styles.cardLink, styles.backgroundColorwhite]}
                                    onPress={() => Linking.openURL(`${item.siteweb}`)}>
                                  Lien site vers le site
                              </Text>
                              
                          )
                      }
                  </View>
                  <Text style={[styles.cardPhone, styles.blackColor]}>{item.telephone}</Text>
              </View>
          </View>
      )}
  />
      : null }
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      color: 'black',
  },
  separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
  },

  blackColor: {
      color: 'black',
  },

  card: {
      marginBottom: 20,
      backgroundColor: '#F2F2F2',
      padding: 10,
      borderRadius: 5,
  },

  cardBody: {
      marginBottom: 5,
  },

  cardName: {
      fontWeight: 'bold',
      marginBottom: 5,
  },

  backgroundColorwhite: {
      backgroundColor: 'white',
  },

  cardFooter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },

  cardLink: {
      color: '#F7B538',
  },

  icon: {
    width: 15,
    height: 15,
    marginRight:5,
  },

  buttonContainer: {
    width: '40%', 
    alignItems: 'center',
    marginVertical: 5,

},
  butt: {
    fontSize: 10,
    backgroundColor: 'red',
  },

  row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
  }
})
;
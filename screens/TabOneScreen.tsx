import React, {useState} from 'react';
import {Linking, Image, FlatList, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';

export default function TabOneScreen() {
    const [data, setData] = useState([]);
    fetch('https://download.data.grandlyon.com/ws/rdata/sit_sitra.sittourisme/all.json?field=type&value=RESTAURATION')
        .then((response) => response.json())
        .then((responseJson) => setData(responseJson.values))
        .catch((error) => {
            console.error(error);
        });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accueil</Text>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <View style={[styles.cardBody, styles.backgroundColorWhite]}>
                            <Text style={[styles.cardName, styles.textColor]}>{item.nom}</Text>
                            <View style={[styles.row, styles.backgroundColorWhite]}>
                                <Image
                                    style={[styles.icon, styles.backgroundColorWhite]}
                                    source={require('../assets/images/location.png')}
                                />
                                {
                                    item.commune ? (
                                        <Text
                                            style={[styles.cardCommune, styles.textColor, styles.backgroundColorWhite]}>{item.commune} {item.codepostal}</Text>

                                    ) : (
                                        <Text style={[styles.backgroundColorWhite, styles.textColor]}>Commune non
                                            renseignée</Text>
                                    )
                                }
                            </View>
                            <View style={[styles.row, styles.backgroundColorWhite]}>
                                <Image
                                    style={[styles.icon, styles.backgroundColorWhite]}
                                    source={require('../assets/images/location.png')}
                                />
                                {
                                    item.addresse ? (
                                        <Text
                                            style={[styles.cardAdresse, styles.textColor, styles.backgroundColorWhite]}>{item.adresse}</Text>

                                    ) : (
                                        <Text style={[styles.backgroundColorWhite, styles.textColor]}>Adresse non
                                            renseignée</Text>
                                    )
                                }
                            </View>
                            <View>
                                {
                                    item.type_detail ? (
                                        <Text
                                            style={[styles.backgroundColorWhite, styles.textColor]}>{item.type_detail}</Text>

                                    ) : (
                                        <Text style={[styles.backgroundColorWhite, styles.textColor]}>Type non
                                            renseigné</Text>
                                    )
                                }
                            </View>
                        </View>
                        <View style={[styles.cardFooter, styles.backgroundColorWhite]}>
                            <View>
                                {
                                    item.siteweb ? (
                                        <Text style={[styles.cardLink, styles.backgroundColorWhite]}
                                              onPress={() => Linking.openURL(`${item.siteweb}`)}>
                                            Lien site vers le site
                                        </Text>
                                    ) : (
                                        <Text style={[styles.backgroundColorWhite, styles.textColor]}>Site web non
                                            renseigné</Text>
                                    )
                                }
                            </View>
                            <Text style={[styles.cardPhone, styles.textColor]}>{item.telephone}</Text>
                        </View>
                    </View>
                )}
            />
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

        textColor: {
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

        backgroundColorWhite: {
            backgroundColor: 'white',
        },

        cardFooter: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        cardLink: {
            color: 'red',
        },

        icon: {
          width: 15,
          height: 15,
          marginRight:5,
        },

        row: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }
    })
;

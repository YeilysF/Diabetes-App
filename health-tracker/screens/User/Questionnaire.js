import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import axios from 'axios';
import baseURL from "../../assets/common/baseURL";

const Questionnaire = (props) => {

    //hooks for user input
    const fullname = props.route.params.fullname
    const email = props.route.params.email 
    const password = props.route.params.password
    const [diabetesType, setDiabetesType] = React.useState("")
    const [weight, setWeight] = React.useState("")
    const [country, setCountry] = React.useState("")

    const { colors } = useTheme();

    const register = () => {
        if (email === "" || fullname === "" || password === "") {
          setError("These fields cannot be left in blank");
        }
    
        let user = {
            fullname: fullname,
            email: email,
            password: password, 
            image: "", 
            diabetesType: diabetesType, 
            weight: weight, 
            country: country, 
            isAdmin: false,
        };
        
        axios
          .post(`${baseURL}Users/register`, user)
          .then((res) => {
            if (res.status == 200) {
              console.log("Success")
              setTimeout(() => {
                props.navigation.navigate("Login");
              }, 500);
            }
          })
          .catch((error) => {
            alert("Something went wrong. Please try again!");
          });
      };

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          <LinearGradient colors={['#87cefa', '#4169e1']} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.header}>
              <Text style={styles.text_header}>Questionnaire</Text>
          </View>
          <Animatable.View 
            animation="fadeInUpBig" 
            style={[styles.footer, {backgroundColor: colors.background}]}
          >
              <Text style={[styles.text_footer, {color: colors.text}]}>Diabetes type</Text>
              
              <View style={styles.action}>
                  <FontAwesome name="medkit" color={colors.text} size={20} />
                  <TextInput 
                      onChangeText={(e)=> setDiabetesType(e)}
                      placeholder="Diabetes Type" 
                    //  secureTextEntry={data.secureTextEntry ? true : false}
                      style={[styles.textInput, {color: colors.text}]}
                      autoCapitalize="none"
                  />
                  
              </View>

              <Text style={[styles.text_footer, {
                  color: colors.text,
                  marginTop: 35
              }]}>Weight</Text>
              <View style={styles.action}>
                <FontAwesome name="dashboard" color={colors.text} size={20} />
                  <TextInput 
                      onChangeText={(e)=> setWeight(e)}
                      placeholder="Weight"
                      //secureTextEntry={data.secureTextEntry ? true : false}
                      style={[styles.textInput, {color: colors.text}]}
                      autoCapitalize="none"
                  />
              </View>

              <Text style={[styles.text_footer, {
                  color: colors.text,
                  marginTop: 35
              }]}>Country</Text>
              <View style={styles.action}>
                <FontAwesome name="globe" color={colors.text} size={20} /> 
                  <TextInput 
                      onChangeText={(e)=> setCountry(e)}
                      placeholder="Country"
                     // secureTextEntry={data.secureTextEntry ? true : false}
                      style={[styles.textInput, {color: colors.text}]}
                      autoCapitalize="none"
                  />
              </View>
              <View style={styles.button}>
                  
                  <TouchableOpacity 
                    onPress={() => register()}
                    style={[styles.logIn, {borderColor: '#4169e1',borderWidth: 1,marginTop: 15}]}
                  >
                    <LinearGradient colors={['#87cefa', '#4169e1']} style={styles.logIn}>
                        <Text style={[styles.textSign, {color:'#fff'}]}>Sign Up</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => props.navigation.goBack()}
                    style={[styles.logIn, {borderColor: '#4169e1',borderWidth: 1,marginTop: 15}]}
                  >
                      <Text style={[styles.textSign, {color: '#4169e1'}]}>Back</Text>
                  </TouchableOpacity>
                  
              </View>
          </Animatable.View>
        </LinearGradient>
      </View>
    );
};

export default Questionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
},
text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
},
image: {
    flex: 1,
    height: undefined,
    width: undefined
},
titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
},
subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
},
profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
},
dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
},
active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
},
add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
},
infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
},
statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
},
statsBox: {
    alignItems: "center",
    flex: 1
},
mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
},
mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
},
recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
},
recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
},
status: {
  flex: 1,
  alignItems: "center",
},
activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
},
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 10
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 20
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  logIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },

  });
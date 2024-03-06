import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, TextInput } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {auth,createUserWithEmailAndPassword} from "../firebase"
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
 // const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const { height, width } = Dimensions.get("window");

  let validateAndSet = (value,setValue) => {
   setValue(value)
}


  async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('required filled missing')
    : ''
    
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setDoc(doc(db, "users",auth.currentUser.email),{
            email: email,
               password:password
       
      });
    alert("Welcome to Hydration");
    navigation.navigate('HomeScreen');
    setEmail=="";
    setName=="";
    setPassword=="";
    //setConfirmPassword="";
     
    }).catch ((error) =>{
      setValidationMessage(error.message);
      
    });
  }
  return (
    <KeyboardAwareScrollView>
    <ImageBackground source={require('../assets/2.png')} style={{width:width,height:height,justifyContent:'center'}} resizeMode="cover">
         <Image source={require('../assets/boyDrink.png')} style={{height:300,width:300,alignSelf:'center'}}></Image>
       <View style={{borderRadius:50,justifyContent:'center',alignContent:'center',alignItems:'center',width:width-30,alignSelf:'center'}}> 
      {/* <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'rgba(45,85,255,0.3)' ,alignSelf:'flex-start'}}>SIGNUP</Text> */}
 
        <Input
          placeholder='Email'
          placeholderTextColor={'black'}
          containerStyle={{margin: 10}}
          value={email}
          onChangeText={(text) => setEmail(text)}
         
          leftIcon={<MaterialCommunityIcons name="email-outline" size={16} color="black" />}
          
            />
        <Input
          placeholder='Password'
          containerStyle={{margin:10}}
          placeholderTextColor={'black'}
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry
          
         // rightIcon={<Icon name={rightIcon} size={16} color="black" onPress={handlePasswordVisibility}/>}
          leftIcon={<Icon name='key' size={16} color="black"/>}
          
          

            />
       
            {<Text style={styles.error}>{validationMessage}</Text>}
      
        <View style={styles.formButton}>
            <Pressable onPress={createAccount}>
              <Text style={styles.buttonText}>
               SIGNUP
              </Text>
            </Pressable>
            </View>
            </View>
          
         </ImageBackground> 
         </KeyboardAwareScrollView>
      

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginButton: {
      backgroundColor: '#4287f5',
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      borderRadius: 50,
      margin: 10,
      marginTop:20,
    },
    inputStyle: {
      height: 50,
      fontSize: 15,
      fontWeight: 'bold',
      padding: 5,
      borderBottomWidth: 3,
      borderColor: '#c4c4c4',
      margin: 5,
      color: '#4287f5',
      flex: 1,
      outline: 'none',
    },
    signUpButton:{
      marginTop:20,
      
    },
    formButton: {
        backgroundColor: 'rgba(45,85,255,0.3)',
        height: 55,
        width:200,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5
      },
      error: {
        alignSelf:'center',
        margin:5,
        //marginTop: 5,
        color: 'red',
      }
  });
   
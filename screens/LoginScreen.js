import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, TextInput } from 'react-native-elements';
import {signInWithEmailAndPassword,auth,sendPasswordResetEmail,createUserWithEmailAndPassword} from "../firebase"
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {


  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const { height, width } = Dimensions.get("window");

  let validateAndSet = (value,setValue) => {
   setValue(value)
}


  const forgotPassword=()=>{
if(email!=""){
  sendPasswordResetEmail(email)
  .then(() => {
    alert('Email sent to the specified mail-id');
  })

  .catch((error) => {
   // var errorCode = error.code;
    var errorMessage = error.message;
    setValidationMessage(errorMessage);
    // ..
  });
}
else{
    setValidationMessage('Please enter the email-id');
}
  }

  async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('required filled missing')
    : ''
    
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
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
   
    <ImageBackground source={require('../assets/1.png')} style={{width:width,height:height,alignSelf:'center',justifyContent:'center'}} resizeMode="cover">
       <View style={{borderRadius:50,justifyContent:'center',margin:20,alignContent:'center',alignItems:'center',width:width-30,alignSelf:'center'}}> 
      {/* <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '10%', marginTop: '5%', color: '#FFCC00' }}>LOGIN</Text> */}
  
        
        
        
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
        {/* <Button title="Sign up" buttonStyle={{marginTop:10}} onPress={createAccount} /> */}
        <Pressable onPress={forgotPassword} style={{alignSelf:'center',margin:5}}>
            <Text style={{fontSize:14}}>Forgot Password?</Text>
            
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('SignUpScreen')} style={{alignSelf:'center',margin:15}}>
            <Text style={{fontSize:14,color:'#1338BE'}}>New User? Click here</Text>
            
        </Pressable>
        <View style={styles.formButton}>
            <Pressable onPress={createAccount}>
              <Text style={styles.buttonText}>
               LOGIN
              </Text>
            </Pressable>
            </View>
            </View>
          
         </ImageBackground> 
      

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
  
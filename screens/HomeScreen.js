import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { AddRemoveButton } from "../components/AddRemoveButton";
import { AntDesign ,Foundation} from '@expo/vector-icons';
import * as Device from 'expo-device';
import {signOut,auth} from "../firebase"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const amounts = [250, 500, 1000, 1500];


const renderConfetti = () => {
  return <ConfettiCannon count={200} origin={{ x: -10, y: 10 }} fadeOut={true} />;
};

// Notifications

async function scheduleNotification(expoPushToken) {
  await Notifications.requestPermissionsAsync().then((permission) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 Water Reminder",
        subtitle: "Your body needs water!",
      },
      trigger: { hour: 7,minute:0,repeats:true },
    });
  });
}
// async function registerForPushNotificationsAsync() {
//     let token;
//     if (Device.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!  ','Permission not granted!!');
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log('token- ', token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
  
//     if (Platform.OS === 'android') {
//       Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }
  
//     return token;
//   }
export default function HomeScreen({navigation})  {
  const [fillingPercentage, setFillingPercentage] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3000);
  const [waterDrank, setWaterDrank] = useState(0);
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { height, width } = Dimensions.get("window");
  const [modalVisible,setmodalVisible]=useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  // Progress Bar Animation
  const barHeight = useRef(new Animated.Value(0)).current;
  const progressPercent = barHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });


  useEffect(() => {
    Animated.timing(barHeight, {
      duration: 1000,
      toValue: fillingPercentage / 3,
      useNativeDriver: false,
    }).start();
  }, [fillingPercentage]);

 

  useEffect(() => {
    // percentage = waterDrank * 100 / waterGoal
    let percentage = (waterDrank * 100) / waterGoal;
    let fillingP = (percentage * 300) / 100;
    setFillingPercentage(fillingP > 300 ? 300 : fillingP);
  }, [waterGoal, setFillingPercentage, waterDrank]);

  useEffect(() => {
    if (waterDrank >= waterGoal && isGoalAchieved === false) {
      setIsGoalAchieved(true);
    }
    if (waterDrank < waterGoal && isGoalAchieved === true) {
      setIsGoalAchieved(false);
    }

    if (showConfetti === false && isGoalAchieved === true) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [waterDrank, isGoalAchieved, waterGoal]);

  const setModalVisible=(visible)=> {
    setmodalVisible(visible);
  }
  const handleCancel=()=>{
    Notifications.cancelAllScheduledNotificationsAsync()
    alert("You have sucessfully unsubscribed")
  } 

  useEffect(() => {
    //registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
 
  }, [navigation])

  const logout=()=>{
   
signOut(auth).then(() => {
 alert('You have been succesfully logged out!');
 navigation.navigate('LoginScreen');
}).catch((error) => {
    alert('Something went wrong! Please try again!');
});
  }

  return (
   
    <SafeAreaView style={styles.container}>
       {showConfetti && renderConfetti()}
      {/* Water Goal */}
        <ScrollView >
            <View style={{width:width,height:height,alignSelf:'center',justifyContent:'center'}}>
      {/* <ImageBackground source={require('../assets/2.png')} style={{width:width,height:height,alignSelf:'center',justifyContent:'center'}} resizeMode="cover"> */}
      <View style={{ marginTop:'15%',alignContent:'center',flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{ color:'#0F52BA', fontSize:25,alignSelf:'center',fontWeight:'bold'}}>DRINK WATER REMINDER</Text>
      <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => logout()} >
        <AntDesign name="logout" size={24} color="#0F52BA" />
        </TouchableOpacity>
        
        </View>
        <View style={{flexDirection:"row",justifyContent:'flex-end',margin:10}} >
        <TouchableOpacity onPress={async () => {
              await scheduleNotification(expoPushToken);}}>
              <Ionicons name="md-notifications-circle-sharp" size={30} color="blue" />
            </TouchableOpacity>
        <TouchableOpacity onPress={() => {handleCancel();}}>
              <Ionicons name="notifications-off-circle" size={30} color="blue" />
            </TouchableOpacity>

        </View>
     
        <View  style={{margin:10,flexDirection: 'row',alignContent:'center',alignSelf:'center'}}>
         
          
         <Image source={require('../assets/droppyHome.png')} style={{height:70,width:70}}></Image>
         <View style={{maxWidth: 300,
      paddingTop:10,
          paddingLeft:10,
          borderBottomLeftRadius:25,
          borderBottomRightRadius:25,
          borderBottomEndRadius:10,
          backgroundColor:'#ADD8E6',
          }}>
             <Text style={{paddingTop: 5, color:'#4287f5',fontWeight:'bold'}}>Hold the water in your mouth for a while before swollowing!</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Foundation name="lightbulb" size={50} color="#ffef00" style={{marginLeft:'2%'}} />
          </TouchableOpacity>
         </View>
        
      <View style={styles.waterGoalContainer}>
        <Text style={[styles.blueText, { fontSize: 22 }]}>Your Goal</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.grayText, { fontSize: 26 }]}>
            {waterGoal} mL{" "}
          </Text>
          {/* Add Goal */}
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => setWaterGoal(waterGoal + 250)}
          >
            <Ionicons name="add-circle" size={26} color="#2389da" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => setWaterGoal(waterGoal - 250)}
          >
            <Ionicons name="remove-circle" size={26} color="#2389da" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-around",
        }}
      >
        {/* Water You've Drunk Label */}
        <View style={{ justifyContent: "center" }}>
          <Text style={[styles.grayText, { fontSize: 28 }]}>You've drunk</Text>
          <Text style={[styles.blueText, { fontSize: 42 }]}>
            {waterDrank} mL
          </Text>
          <Text style={[styles.grayText, { fontSize: 28 }]}>of water.</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={{
              height: progressPercent,
              backgroundColor: "#5abcd8",
             
              borderRadius: 40,
            }}
          />
        </View>
      </View>

      {/* Add Water */}
      <View style={styles.waterButtonsContainer}>
        {amounts.map((amount) => {
          return (
            <AddRemoveButton
              key={"add" + amount}
              amount={amount}
              value={waterDrank}
              setValue={setWaterDrank}
              operation="add"
            />
          );
        })}
      </View>

      {/* Remove Water */}
      <View style={styles.waterButtonsContainer}>
        {amounts.map((amount) => {
          return (
            <AddRemoveButton
              key={"remove" + amount}
              amount={amount}
              value={waterDrank}
              setValue={setWaterDrank}
              operation="remove"
            />
          );
        })}
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setmodalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>How to drink water correctly?</Text>
              <View style={{flexDirection:'row',backgroundColor:'#ADD8E6',borderRadius:15,paddingLeft:'2%',paddingRight:'3%',paddingTop:'2%',height:50}}>
              <Image source={require('../assets/boyDrink.png')} style={{height:50,width:50}}></Image>
              <Text style={styles.modalText}>Drink small sips and slowly</Text>
              </View>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
       {/* <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: "#74ccf4",
            },
          ]}
          onPress={() => scheduleNotification()}
        >
          <Text style={styles.notificationText}>Schedule Notification</Text>
        </TouchableOpacity> */}
        {/* </ImageBackground> */}
        </View>
        </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressBarContainer: {
    borderRadius: 40,
    borderWidth: 1,
    width: 40,
    height: 300,
    justifyContent: "flex-end",
   
  },
  waterButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    width: "90%",
    justifyContent: "space-between",
    margin:10
  },
  waterGoalContainer: {
    padding:1,
    alignItems: "center",
    justifyContent:'center',
  },
  blueText: {
    color: "#1ca3ec",
    fontWeight: "600",
  },
  grayText: { color: "#323033", fontWeight: "600" },
  notificationButton: {
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    padding: 7,
  },
  notificationText: { color: "white", fontWeight: "500", fontSize: 16 },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight:'bold',
    fontSize:15
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonClose: {
    backgroundColor: "#2196F3", 
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:'3%'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
});

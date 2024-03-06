import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const AddRemoveButton = ({
  amount,
  value,
  setValue,
  operation = 'add',
}) => {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', padding: 10 }}
      onPress={() => {
        operation == 'add' 
          ? setValue(value + amount) 
          : value - amount <0?setValue(0):setValue(value-amount)
      }}>
      <View  style={{ alignItems: 'center', justifyContent:"center" }}>
        <Animated.View>
          <MaterialCommunityIcons name="bottle-soda" 
          size={24}
          color={operation=="add"?"blue":"green"}
          />
        </Animated.View>
      </View>
      <Text style={{color:"black" , fontWeight:"800"}}>{amount} ml</Text>
      </TouchableOpacity>
  );
};

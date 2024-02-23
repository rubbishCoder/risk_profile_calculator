import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Home = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <Text testID='INTRO_TEXT' style={styles.text}>
        Click the below button in order to take the assessment to find your 'Risk Profile Score'.
      </Text>
      <TouchableOpacity testID={'START_BUTTON'} style={styles.buttonContainer} activeOpacity={1}
        onPress={() => { navigation.dispatch(StackActions.replace('Assessment')); }}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home;

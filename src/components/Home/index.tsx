import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import RV from '../../common/utils/RV';

const Home = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text testID='INTRO_TEXT' style={styles.text}>
          Click the below button in order to take the assessment to find your 'Risk Profile Score'.
        </Text>
        <TouchableOpacity testID={'START_BUTTON'} style={styles.buttonContainer} activeOpacity={1}
          onPress={() => { navigation.dispatch(StackActions.replace('Assessment')); }}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View >
    </SafeAreaView >
  )
}

export default Home;

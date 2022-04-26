import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Info from '../../assets/images/tmdb.png';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.creator}>Simple App by Alianto</Text>
      <Image source={Info} style={styles.img} />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creator: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp('2.6%'),
  },
  img: {
    width: wp('90%'),
    resizeMode: 'contain',
  },
});

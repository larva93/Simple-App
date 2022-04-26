import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = ({value, placeholder, onChangeText, onSubmitEditing}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#D9D7F1'}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
        />
        <Ionicons name="search" style={styles.icon} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2.4%'),
  },
  textInputContainer: {
    height: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FFFFFF',
  },
  textInput: {
    width: wp('75%'),
    fontFamily: 'Roboto-Regular',
    fontSize: hp('2.4%'),
    color: '#FFFFFF',
  },
  icon: {
    fontSize: hp('3.5%'),
    color: '#FFFFFF',
  },
});

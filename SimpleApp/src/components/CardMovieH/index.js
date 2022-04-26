import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AirbnbRating} from 'react-native-ratings';
import {getGenres} from '../../helpers/genre';
import moment from 'moment';

const CardMovie = ({data, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.push('MovieDetail', {id: data.id})}>
        <ImageBackground
          source={{uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`}}
          style={styles.poster}>
          <View style={styles.genreView}>
            <Text style={styles.genre} adjustsFontSizeToFit>
              {getGenres(data.genre_ids[0])}
            </Text>
          </View>
          <AirbnbRating
            showRating={false}
            isDisabled={true}
            size={12}
            defaultRating={data.vote_average}
            count={10}
            selectedColor="#6EBF8B"
            starContainerStyle={{alignSelf: 'flex-start'}}
          />
        </ImageBackground>
        <View style={styles.titleView}>
          <Text style={styles.title}>{`${data.title} (${moment(
            data.release_date,
          ).format('YYYY, MMM ')})`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardMovie;

const styles = StyleSheet.create({
  container: {
    width: wp('92%'),
    height: hp('38%'),
    borderRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    marginHorizontal: wp('4%'),
    marginVertical: hp('2%'),
  },
  poster: {
    width: wp('92%'),
    height: hp('30%'),
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    paddingLeft: wp('4%'),
    paddingVertical: hp('1%'),
  },
  titleView: {
    height: hp('8%'),
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: hp('2.6%'),
    fontFamily: 'Roboto-Bold',
    color: '#000000',
    textAlign: 'center',
  },
  genreView: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 239, 253, 0.1)',
    marginBottom: 5,
  },
  genre: {
    fontSize: hp('2%'),
    fontFamily: 'Roboto-Regular',
    color: '#0FEFFD',
    paddingHorizontal: wp('1.8%'),
    paddingVertical: hp('0.5%'),
  },
});

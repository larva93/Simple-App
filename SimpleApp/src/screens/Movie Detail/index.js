import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {AirbnbRating} from 'react-native-ratings';
import moment from 'moment';
import CardMovie from '../../components/CardMovie';
import {connect} from 'react-redux';

const MovieDetails = props => {
  const [cast, setCast] = useState('');

  const handleGetCast = cast => {
    let tempCast = '';
    for (let i = 0; i < cast.length; i++) {
      let e = `${cast[i].name}, `;
      tempCast += e;
    }
    return tempCast;
  };

  useEffect(() => {
    props.getMovieDetails(props.route.params.id);
    props.getSimilarMovie(props.route.params.id, 1);
    props.getCast(props.route.params.id);
  }, []);

  useEffect(() => {
    if (props.dataCast) {
      setCast(handleGetCast(props.dataCast));
    }
  }, [props.dataCast]);

  if (props.loading === true) {
    return (
      <View style={styles.loading}>
        <Text style={styles.textLoading}>
          Loading... Please wait a while...
        </Text>
        <ActivityIndicator size="large" color="#1D94A8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.dataMovieDetails.backdrop_path}`,
          }}
          style={styles.poster}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <Ionicons name="chevron-back" style={styles.backButton} />
          </TouchableOpacity>
          <View style={styles.contentPoster}>
            <View style={styles.genreView}>
              <Text style={styles.genre} adjustsFontSizeToFit>
                {props.genre.name}
              </Text>
            </View>
            <View style={styles.rating}>
              <AirbnbRating
                showRating={false}
                isDisabled={true}
                size={12}
                defaultRating={props.dataMovieDetails.vote_average}
                count={10}
                selectedColor="#6EBF8B"
                starContainerStyle={{alignSelf: 'flex-start'}}
              />
              <Entypo name="dot-single" style={styles.icon} />
              <Text style={styles.releaseYear}>
                {`Release Year : ${moment(
                  props.dataMovieDetails.release_date,
                ).format('YYYY')}`}
              </Text>
            </View>
            <Text style={styles.title}>{props.dataMovieDetails.title}</Text>
          </View>
        </ImageBackground>
        <View style={styles.synopsis}>
          <Text style={styles.contentTitle}>Synopsis</Text>
          <Text style={styles.overview}>{props.dataMovieDetails.overview}</Text>
          <Text style={styles.cast}>Cast :</Text>
          <Text style={styles.castText}>
            {cast.length > 40 ? `${cast.substring(0, 90)}...` : cast}
          </Text>
        </View>
        <Text style={styles.similar}>Similar Movies</Text>
        <FlatList
          data={props.dataSimilar}
          horizontal={true}
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          renderItem={data => (
            <View>
              <CardMovie data={data.item} navigation={props.navigation} />
            </View>
          )}
          keyExtractor={(item, i) => i}
          initialNumToRender={4}
          maxToRenderPerBatch={10}
        />
      </ScrollView>
    </View>
  );
};

const reduxState = state => ({
  dataMovieDetails: state.movieReducer.dataMovieDetails,
  genre: state.movieReducer.genre,
  dataSimilar: state.movieReducer.dataSimilar,
  dataCast: state.movieReducer.dataCast,
  loading: state.movieReducer.isLoading,
});

const reduxDispatch = dispatch => ({
  getMovieDetails: a => dispatch({type: 'GET_MOVIE_DETAILS', id: a}),
  getSimilarMovie: (b, c) =>
    dispatch({type: 'GET_SIMILAR_MOVIE', id: b, page: c}),
  getCast: d => dispatch({type: 'GET_CAST', id: d}),
});

export default connect(reduxState, reduxDispatch)(MovieDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  poster: {
    width: wp('100%'),
    height: hp('35%'),
    resizeMode: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: hp('2.5%'),
    paddingLeft: wp('4%'),
  },
  contentPoster: {
    justifyContent: 'center',
  },
  title: {
    fontSize: hp('3.2%'),
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
  },
  genreView: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 239, 253, 0.1)',
  },
  genre: {
    fontSize: hp('2%'),
    fontFamily: 'Roboto-Regular',
    color: '#0FEFFD',
    paddingHorizontal: wp('1.8%'),
    paddingVertical: hp('0.5%'),
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: hp('3.5%'),
    color: '#FFFFFF',
  },
  icon: {
    fontSize: hp('4%'),
    color: '#FFFFFF',
  },
  releaseYear: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp('2%'),
    color: '#FFE61B',
  },
  synopsis: {
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  contentTitle: {
    fontSize: hp('2.6%'),
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  overview: {
    backgroundColor: '#242424',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    fontSize: hp('2.2%'),
    fontFamily: 'Roboto-Regular',
    color: '#FFFFFF',
    textAlignVertical: 'center',
    marginHorizontal: wp('4%'),
    opacity: 0.6,
  },
  cast: {
    fontSize: hp('2.6%'),
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    marginHorizontal: wp('4%'),
    marginVertical: hp('2%'),
  },
  castText: {
    fontSize: hp('2.2%'),
    fontFamily: 'Roboto-Regular',
    color: '#E9EFC0',
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  similar: {
    fontSize: hp('2.8%'),
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    color: '#000000',
    fontSize: hp('2.4%'),
    fontFamily: 'Roboto-Bold',
  },
});

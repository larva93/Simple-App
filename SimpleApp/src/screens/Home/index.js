import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
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
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardMovie from '../../components/CardMovie';
import Logo from '../../assets/images/Logo.jpeg';
import {getGenres} from '../../helpers/genre';
import {connect} from 'react-redux';

const Home = props => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  useEffect(() => {
    props.getNowPlaying(1);
    props.getPopular(1);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}
        style={styles.slideImg}>
        <Image source={Logo} style={styles.logo} />
        <View style={styles.genreView}>
          <Text style={styles.genre} adjustsFontSizeToFit>
            {getGenres(item.genre_ids[0])}
          </Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Pagination
          dotsLength={props.dataCarousel.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
          tappableDots={true}
        />
      </ImageBackground>
    );
  };

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
        <Carousel
          layout="stack"
          ref={isCarousel}
          data={props.dataCarousel}
          renderItem={renderItem}
          sliderWidth={wp('100%')}
          itemWidth={wp('100%')}
          onSnapToItem={index => setIndex(index)}
          useScrollView={true}
          lockScrollWhileSnapping={true}
          autoplay={true}
          autoplayInterval={8000}
          loop={true}
        />
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryName}>Now Playing</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Explore', {data: 'now_playing'});
            }}>
            <Text style={styles.more}>See All</Text>
            <Ionicons name="chevron-forward" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={props.dataNowPlaying}
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
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryName}>Popular</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Explore', {data: 'popular'});
            }}>
            <Text style={styles.more}>See All</Text>
            <Ionicons name="chevron-forward" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={props.dataPopular}
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
  dataNowPlaying: state.movieReducer.dataNowPlaying,
  dataPopular: state.movieReducer.dataPopular,
  dataCarousel: state.movieReducer.dataCarousel,
  loading: state.movieReducer.isLoading,
});

const reduxDispatch = dispatch => ({
  getNowPlaying: a => dispatch({type: 'GET_MOVIE_NOW_PLAYING', page: a}),
  getPopular: b => dispatch({type: 'GET_MOVIE_POPULAR', page: b}),
});

export default connect(reduxState, reduxDispatch)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
  },
  categoryName: {
    fontSize: hp('2.8%'),
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  more: {
    fontSize: hp('2.2%'),
    fontFamily: 'Roboto-Bold',
    color: '#FFE922',
  },
  icon: {
    fontSize: hp('2.6%'),
    color: '#FFE922',
    marginLeft: wp('1%'),
  },
  slideImg: {
    width: wp('100%'),
    height: hp('35%'),
    resizeMode: 'stretch',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: hp('3.5%'),
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    marginLeft: wp('4%'),
  },
  logo: {
    width: wp('9%'),
    height: hp('5%'),
    resizeMode: 'cover',
    marginLeft: wp('2%'),
    borderRadius: 30,
  },
  genreView: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 239, 253, 0.1)',
    marginLeft: wp('4%'),
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  genre: {
    fontSize: hp('2%'),
    fontFamily: 'Roboto-Regular',
    color: '#0FEFFD',
    paddingHorizontal: wp('1.8%'),
    paddingVertical: hp('0.5%'),
  },
  dotStyle: {
    width: wp('2%'),
    height: hp('1.2%'),
    borderRadius: 100,
    marginHorizontal: -5,
    backgroundColor: '#FFFFFF',
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

import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Search from '../../components/Search';
import CardMovieH from '../../components/CardMovieH';
import {connect} from 'react-redux';

const Explore = props => {
  const [valSearch, setValSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [pagination, setPagination] = useState(1);
  const flatListRef = useRef();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setValSearch('');
      setPagination(1);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    setDataSearch(props.dataSearch);
  }, [props.dataSearch]);

  useEffect(() => {
    if (props.route.params?.data == 'now_playing') {
      setDataSearch(props.dataNowPlaying);
    } else if (props.route.params?.data == 'popular') {
      setDataSearch(props.dataPopular);
    }
  }, [props.route.params?.data]);

  return (
    <View style={styles.container}>
      <Search
        value={valSearch}
        placeholder="Search"
        onChangeText={value => setValSearch(value)}
        onSubmitEditing={() => {
          props.searchMovie(valSearch, 1);
        }}
      />
      {props.loading == true && pagination == 1 ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.textLoading}>
            Loading... Please wait a while...
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={dataSearch}
          horizontal={false}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={data => (
            <View>
              <CardMovieH data={data.item} navigation={props.navigation} />
            </View>
          )}
          keyExtractor={(item, i) => i}
          initialNumToRender={4}
          maxToRenderPerBatch={10}
          onEndReached={() => {
            if (valSearch) {
              setPagination(prev => prev + 1);
              props.searchMovie(valSearch, pagination);
              flatListRef.current?.scrollToOffset({
                animated: true,
                y: 0,
              });
            }
          }}
        />
      )}
    </View>
  );
};

const reduxState = state => ({
  dataSearch: state.movieReducer.dataSearch,
  dataNowPlaying: state.movieReducer.dataNowPlaying,
  dataPopular: state.movieReducer.dataPopular,
  loading: state.movieReducer.isLoading,
});

const reduxDispatch = dispatch => ({
  searchMovie: (a, b) => dispatch({type: 'SEARCH_MOVIE', value: a, page: b}),
  getNowPlaying: a => dispatch({type: 'GET_MOVIE_NOW_PLAYING', page: a}),
  getPopular: b => dispatch({type: 'GET_MOVIE_POPULAR', page: b}),
});

export default connect(reduxState, reduxDispatch)(Explore);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp('2.4%'),
    color: '#71DFE7',
  },
});

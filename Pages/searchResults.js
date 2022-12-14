import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, clearSearchResult } from '../redux/actions/movies'
import Button from '../custom componet/Button'
import styles from '../custom componet/Styles'

const SearchResults = ({ navigation, moviesState, addToSearchResult, addToHistory, clearSearchResult, route }) => {
  const { searchtext, user } = route.params;
  const url = "https://www.omdbapi.com/?s=" + searchtext + "&page=1-100&apikey=ee42d47b"
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.Response == "False") {
          return
        }
        json.Search.map(movie => {
          addToSearchResult(movie)
        });
        setLoading(false)
      });
  }, []);

  const renderSearchResults = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.movieCard}>
        <Image source={{ uri: item.Poster, width: 100, height: 100 }} />
        <Text style={styles.text}>{item.Title}</Text>
      </View>
      <Button title="Details" onPress={() => {
        addToHistory(item)
        navigation.navigate("Movie Details", { id: item.imdbID, searchtext: searchtext, user: user })
      }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Showing Results For: {searchtext}</Text>
      {
        loading ? (<View> <ActivityIndicator size={50} color='orange' /> </View>) :
          <FlatList data={moviesState.searchResult} renderItem={renderSearchResults} />
      }
      <Button title="Back" onPress={() => {
        clearSearchResult()
        navigation.navigate("Home")
      }} />
    </View>
  )
}

const mapStateToProps = (moviesState) => (moviesState)
const mapDispatchToProps = { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, clearSearchResult }

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
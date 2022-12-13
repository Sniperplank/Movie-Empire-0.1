import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, clearSearchResult } from '../redux/actions/movies'
import Button from '../custom componet/Button'

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
    <SafeAreaView>
      <View>
        <Text>{item.Title}</Text>
        <Button title="Details" onPress={() => {
          addToHistory(item)
          navigation.navigate("Movie Details", { id: item.imdbID, searchtext: searchtext, user: user })
        }} />
      </View>
    </SafeAreaView>
  );

  return (
    <View>
      <Text>Showing Results For: {searchtext}</Text>
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
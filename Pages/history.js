import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, clearSearchResult } from '../redux/actions/movies'
import Button from '../custom componet/Button';
import styles from '../custom componet/Styles';

const renderHistory = ({ item }) => (
  <View style={styles.movieCard}>
    <Image source={{ uri: item.Poster, width: 100, height: 100 }} />
    <Text style={styles.text}>{item.Title}</Text>
  </View>
);

const History = ({ navigation, moviesState }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>History</Text>
      <FlatList data={moviesState.history} renderItem={renderHistory} />
      <Button title="Back" onPress={() => {
        clearSearchResult()
        navigation.navigate("Home")
      }} />
    </View>
  )
}


const mapStateToProps = (moviesState) => (moviesState)
const mapDispatchToProps = { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, clearSearchResult }

export default connect(mapStateToProps, mapDispatchToProps)(History)


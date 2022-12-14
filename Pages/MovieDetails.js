import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, addReview } from '../redux/actions/movies'
import Button from '../custom componet/Button'
import styles from '../custom componet/Styles';

const MovieDetails = ({ navigation, moviesState, addToFavourites, addToWatchLater, addReview, route }) => {
    const { id, searchText, user } = route.params
    const [movie, setMovie] = useState()
    const [review, setReview] = useState('')
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState('')
    const [avgRating, setAvgRating] = useState('')
    const [movieLoading, setMovieLoading] = useState(true)
    const [reviewloading, setreviewLoading] = useState(true)

    useEffect(() => {
        const reviewsList = []
        let totalRating = 0
        for (let i = 0; i < moviesState.searchResult.length; i++) {
            const movie = moviesState.searchResult[i];
            if (movie.imdbID === id) {
                setMovie(movie)
                setMovieLoading(false)
                break
            }
        }
        for (let i = 0; i < moviesState.reviews.length; i++) {
            const review = moviesState.reviews[i];
            totalRating += review.rating
            if (review.movieId === id) {
                reviewsList.push(review)
            }
        }
        setAvgRating((totalRating / moviesState.reviews.length))
        setReviews(reviewsList)
        setreviewLoading(false)
    }, [moviesState])

    const handleReviewSubmit = () => {
        addReview({ movieId: id, review: review, rating: rating, postedBy: user.name })
    }

    const onCheckRating = (value) => {
        const parsedValue = Number.parseInt(value)
        if (Number.isNaN(parsedValue)) {
            setRating(0)
        } else if (parsedValue > 10) {
            setRating(10)
        } else {
            setRating(parsedValue)
        }
    }

    const renderReviews = ({ item }) => (
        <View style={{ backgroundColor: '#ff8c00', margin: 5, padding: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={styles.text}>Posted by: {item.postedBy}</Text>
                <Text style={styles.text}>Rating: {item.rating}</Text>
            </View>
            <Text style={styles.text}> {item.review}</Text>
        </View>
    );

    return (
        <View style={styles.container} >
            <View style={styles.detailsCard}>
                {
                    movieLoading ? (<View> <ActivityIndicator size={50} color="orange" /> </View>) :
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.header}>{movie?.Title} - {Number.isNaN(avgRating) ? 'No rating yet!' : avgRating}</Text>
                            <Text style={styles.text}>Year: {movie?.Year}</Text>
                            <Text style={styles.text}>imdbID: {movie?.imdbID}</Text>
                            {
                                user === "No user" ? <Text style={styles.header}>Sign in to add a review!</Text> :
                                    <View style={{ backgroundColor: '#ff8c00', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput style={styles.input} placeholder="Write a review..." onChangeText={setReview} />
                                        <TextInput style={styles.input} placeholder="Rating: /10" value={rating} onChangeText={onCheckRating} />
                                        <Button title='Submit Review' onPress={handleReviewSubmit} />
                                    </View>
                            }
                        </View>
                }
                <Text style={styles.header}>Reviews:</Text>
                {
                    reviewloading ? (<View><ActivityIndicator size={50} color="orange" /></View>) :
                        <FlatList data={reviews} renderItem={renderReviews} />
                }
            </View>
            <View style={styles.buttonsContainer}>
                <Button title='Save to Watch Later' onPress={() => {
                    addToWatchLater(movie)
                    Alert.alert('Saved!', 'Saved to watch later!', [
                        { text: 'Ok', onPress: () => { } }
                    ]);
                }} />
                <Button title='Add to Favourites' onPress={() => { 
                    addToFavourites(movie) 
                    Alert.alert('Added!', 'Added to favourites!', [
                        { text: 'Ok', onPress: () => { } }
                    ]);
                }} />
                <Button title="Back" onPress={() => { navigation.navigate("Search Result", { searchText: searchText }) }} />
            </View>
        </View>
    )
}

const mapStateToProps = (moviesState) => (moviesState)
const mapDispatchToProps = { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, addReview }

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
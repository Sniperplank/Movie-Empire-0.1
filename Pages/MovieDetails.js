import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, addReview } from '../redux/actions/movies'
import Button from '../custom componet/Button'

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
        setAvgRating(totalRating / moviesState.reviews.length)
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
        <View>
            <Text>Posted by: {item.postedBy}</Text>
            <Text>{item.review}</Text>
            <Text>Rating: {item.rating}</Text>
        </View>
    );

    return (
        <View style={styles.container} >
            {movieLoading ? (<View> <ActivityIndicator size={50} color="orange" /> </View>) :
                <View>
                    <Text>{movie?.Title} - {Number.isNaN(avgRating) ? 'No rating yet!' : avgRating} / 10</Text>
                    <Button title='Save to Watch Later' onPress={() => { addToWatchLater(movie) }} />
                    <Button title='Add to Favourites' onPress={() => { addToFavourites(movie) }} />
                    {user !== "Sign in to add review!" && <View>
                        <TextInput style={styles.reviewInput} placeholder="Write a review..." onChangeText={setReview} />
                        <TextInput style={styles.reviewInput} placeholder="Rating: /10" value={rating} onChangeText={onCheckRating} />
                        <Button title='Submit Review' onPress={handleReviewSubmit} />
                    </View>}
                </View>}
            <Text>Reviews:</Text>
            {reviewloading ? (<View><ActivityIndicator size={50} color="orange" /></View>) :
                <FlatList data={reviews} renderItem={renderReviews} />}
            <Button title="Back" onPress={() => {
                navigation.navigate("Search Result", { searchText: searchText })
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    reviewInput: { margin: 15, width: "50%", height: 30, alignItems: 'left', borderWidth: 2 },
});

const mapStateToProps = (moviesState) => (moviesState)
const mapDispatchToProps = { addToWatchLater, addToFavourites, addToHistory, addToSearchResult, addReview }

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
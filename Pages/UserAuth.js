import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signin, signup } from '../auth/actions'
import { connect } from 'react-redux'
import { login, logout, signup_ } from '../redux/actions/users'
import Button from '../custom componet/Button'
import styles from '../custom componet/Styles'

const UserAuth = ({ navigation, userState, login, logout, signup_ }) => {
    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (errors) {
            setLoading(false)
        }
    }, [errors])

    const switchMode = () => {
        setIsSignup((prev) => !prev)
        setLoading(false)
        setErrors('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (isSignup) {
            signup({ name, email, password, confirmPassword: confirmPassword }, login, navigation, setErrors)
        } else {
            signin({ name, email, password, confirmPassword: confirmPassword }, signup_, navigation, setErrors)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.pageTitle}>{isSignup ? 'Sign up' : 'Sign In'}</Text>
                <View>
                    {
                        isSignup && (
                            <View>
                                <TextInput style={styles.input} placeholder='Name' onChangeText={setName} />
                            </View>
                        )
                    }
                    <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail} type='email' />
                    <TextInput style={styles.input} placeholder='Password' onChangeText={setPassword} type='password' secureTextEntry={true} />
                    {isSignup && <TextInput style={styles.input} placeholder='Confirm Password' onChangeText={setConfirmPassword} type='password' secureTextEntry={true} />}
                    {loading ?
                        <ActivityIndicator size={50} color='orange' />
                        : <Text style={styles.errors}>{errors}</Text>
                    }
                    <View style={styles.buttonsContainer}>
                        <Button onPress={handleSubmit} title={isSignup ? 'Sign Up' : 'Sign In'} />
                        <Button title="Back" onPress={() => navigation.navigate("Home")} />
                    </View>
                    <Text onPress={switchMode} style={{ color: 'orange', fontWeight: 'bold', fontSize: 14, borderBottomWidth: 1, borderBottomColor: 'orange' }}>{isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}</Text>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (userState) => (userState)
const mapDispatchToProps = { login, logout, signup_ }

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)
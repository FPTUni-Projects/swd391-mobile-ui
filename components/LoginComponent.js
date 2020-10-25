import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscriber = null;
        this.state = {
            isAuthenticated: false,
            typedEmail: '',
            typedPassword: '',
            user: null,
        }
    }
    componentDidMount() {
        this.unsubscriber = auth().onAuthStateChanged((changedUser) =>{
            this.setState({user : changedUser})
        });
        GoogleSignin.configure({
            webClientId: '176304902015-nr5jca1qv2fp921bs38irn5l132m8ifi.apps.googleusercontent.com'
        });
    }
    componentWillUnmount(){
        if(this.unsubscriber){
            this.unsubscriber();
        }
    }
    onAnonymousLogin = () => {
        auth().signInAnonymously()
            .then(() => {
                console.log('Login successfully')
                this.setState({
                    isAuthenticated: true
                })
            }).catch((error) => {
                console.log(`Login failed. error = ${error}`);
            })
    }
    onLogin = () => {
        auth().signInWithEmailAndPassword(this.state.typedEmail,this.state.typedPassword)
        .then((loggedInUser) =>{        
            console.log(`Login with user : ${JSON.stringify(loggedInUser)}`);
        }).catch((error) =>{
            console.log(`Login fail with error : ${error}`);
        })
    }
    onRegister = () => {
        auth().createUserWithEmailAndPassword(this.state.typedEmail,this.state.typedPassword)
        .then((loggedInUser) =>{
            this.setState({
                user : loggedInUser
            })
            console.log(`Register with user : ${JSON.stringify(loggedInUser)}`);
        }).catch((error) =>{
            console.log(`Register fail with error : ${error}`);
        })
    }
    onLoginGoogle = () =>{
        GoogleSignin.signIn() // login 
        .then((data) =>{ // login gg 
            //create a new firebase credential with token
            const credential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            // login with credential 
            console.log(`Credental : ${JSON.stringify(credential)}`)
            return auth().signInWithCredential(credential);
        })
        .then((currentUser) => { // login firebase 
            console.log(`Google Login with user  : ${JSON.stringify(currentUser)}`)
        })
        .catch((error) => {
            // console.log(`Login failed with error : ${error}`)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                console.log('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                console.log('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated');
            } else {
                console.log('Something went wrong', error.toString());               
            }
        })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 40 }}>
                    Login With FireBase
                </Text>
                <TouchableOpacity style={{ padding: 10, borderRadius: 4, backgroundColor: 'blue' }}
                    onPress={this.onAnonymousLogin}>
                    <Text style={{ fontSize: 18, color: 'white' }}>
                        Login anonymous
                    </Text>
                </TouchableOpacity>
                <Text style={{ margin: 20, fontSize: 15 }}>
                    {this.state.isAuthenticated == true ? 'Logged is anonymous ' : undefined}
                </Text>
                <TextInput style={{ height: 40, width: 200, margin: 10, padding: 10, borderColor: 'gray', borderWidth: 1, color: 'black' }}
                    keyboardType='email-address'
                    placeholder='Enter your email'
                    autoCapitalize='none'
                    onChangeText={
                        (text) => {
                            this.setState({ typedEmail: text })
                        }
                    }>

                </TextInput>
                <TextInput style={{ height: 40, width: 200, margin: 10, padding: 10, borderColor: 'gray', borderWidth: 1, color: 'black' }}
                    keyboardType='default'
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    onChangeText={
                        (text) => {
                            this.setState({ typedPassword: text })
                        }
                    }>

                </TextInput>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ padding: 10, borderRadius: 4, backgroundColor: 'blue', margin: 10 }}
                        onPress={this.onRegister}>
                        <Text style={{ fontSize: 18, color: 'white' }}>
                            Register
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10, borderRadius: 4, backgroundColor: 'blue', margin: 10 }}
                        onPress={this.onLogin}>
                        <Text style={{ fontSize: 18, color: 'white' }}>
                            Login
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ padding: 10, borderRadius: 4, backgroundColor: 'blue', margin: 10 }}
                        onPress={this.onLoginGoogle}>
                        <Text style={{ fontSize: 18, color: 'white' }}>
                            Login GG
                    </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>

        );
    }
}
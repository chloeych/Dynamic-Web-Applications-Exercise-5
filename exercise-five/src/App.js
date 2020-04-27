import React, { useEffect, useState } from 'react';

import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
// import '*' = import 'everything

//import pages 
import Login from './containers/Login'; 
import UserProfile from './containers/UserProfile';
import CreateAccount from './containers/CreateAccount';
import Header from './components/Header';

//styles
import './App.css';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Don't want to display information before it's ready to be displayed
  const [userInformation, setUserInformation] = useState({});

  const firebaseConfig = {
    apiKey: "AIzaSyD8eNF9EUAQPQt1Lr-Hm9-bFcvisZdMAS0",
    authDomain: "exercise-five-dce0d.firebaseapp.com",
    databaseURL: "https://exercise-five-dce0d.firebaseio.com",
    projectId: "exercise-five-dce0d",
    storageBucket: "exercise-five-dce0d.appspot.com",
    messagingSenderId: "988396686908",
    appId: "1:988396686908:web:2496c108c2d158e0e37d39"
  };

    //1. Ensure app is initialized when it is ready to be
  useEffect(()=>{
     //2. Ensure app is not initialize more than that once 
     // is firebase already initialized
     if(!firebase.apps.length){
       //Initialize Firebase 
      firebase.initializeApp(firebaseConfig);
    }
    //Setting auth to be persistent in SESSION storage 
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .catch(function(e) {
      console.log("AUTH ERROR",e);
    });
  }, [firebaseConfig]);

  // Check to see if user is logged in 
  // User loads page, check their status 
  // Set state accordingly
  useEffect(()=> {
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        setUserInformation(user);
        setLoggedIn(true); 
      }
      else{
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []); // Leaving bracket empty = it will only run one time 

  // Login 

  function LoginFunction(e){
    e.preventDefault(); 
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;

    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then(function(response){
      console.log("LOGIN RESPONSE", response); 
      setLoggedIn(true); 
    })
    .catch(function(error){
      console.log("LOGIN ERROR", error)
    });
  }

  // Logout 

  function LogoutFunction(){
    firebase
    .auth()
    .signOut()
    .then(function(){
      setLoggedIn(false)
    })
    .catch(function(error){
      console.log(" LOGOUT ERROR", error);
    });
  }

  // Create Account 

  function CreateAccountFunction(e){
  e.preventDefault(); // Prevents form from submitting as a default form 
  console.log("form payload", e);  
  // Default values for testing
  let email = e.currentTarget.createEmail.value; 
  let password = e.currentTarget.createPassword.value;
  // e = value of the form payload

  console.log('email', email); 
  console.log("password", password);
  
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(response){
      console.log("VALID ACCOUNT CREATE", response);
      setLoggedIn(true);
     })
    .catch(function(e){
      console.log("CREATE ACCOUNT ERROR", e);
     });
  }




  return (
    <div className="App">
     <Header LogoutFunction={LogoutFunction} isLoggedIn={loggedIn}/>
     <Router>
       <Route exact path="/">
         {!loggedIn ? <Redirect to="/login"/> : <UserProfile userInformation={userInformation}/>}
       </Route>

       <Route exact path="/login">
       {!loggedIn ? (<Login LoginFunction={LoginFunction}/>) : (<Redirect to="/"/>)}
       </Route>

       <Route exact path="/create-account">
       {!loggedIn ? (<CreateAccount CreateAccountFunction={CreateAccountFunction}/>) : (<Redirect to="/"/>)}
       </Route>
     </Router>
    </div>
  );
}

export default App;

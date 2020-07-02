import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const signOut = () => firebase.auth.signOut().then(function() {
    // Sign-out successful.
    console.log("logout")
  }).catch(function(error) {
    // An error happened.
  });

const Home = () => {
    const [currentUser, setCurrentUser] = useState("")
    const history = useHistory();

    useEffect(() => {
        firebase.auth.onAuthStateChanged(function(user) {
            if (user) {
              setCurrentUser((user.displayName)!)
              console.log(currentUser)
            } else {
              // No user is signed in.
              console.log("not logged in")
              history.push("/")
            }
          });
    })

    return (
        <div className="App">
            <h1>{"home"}</h1>
            <h1>{currentUser}</h1>
            <button onClick={() => signOut()}>{"Sair"}</button>
        </div>
    );
};

export default Home;

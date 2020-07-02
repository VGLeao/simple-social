import React from "react";
import firebase from "../../firebase";
import Link from "@material-ui/core/Link";

const Home = () => {
    return (
        <div className="App">
            <h1>{"Home"}</h1>
            <Link href="/login" variant="body2">
                {"Entrar"}
            </Link>
            <Link href="/signup" variant="body2">
                {"Registrar"}
            </Link>
        </div>
    );
};

export default Home;

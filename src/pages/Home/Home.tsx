import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Navbar from "../../Components/Navbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    postRoot: {
        textAlign: "left"
    },
    postsContent: {
        textAlign: "left",
        marginBottom: "20px",
        marginTop: "20px",
        borderBottom: "1px solid rgba(100, 100, 100, 0.3)",
    },
    postsOwner: {
        fontWeight: "bold"
    },
    welcomeMessage: {
        margin: "30px"
    },
    textField: {
        // maxWidth: "500px",
        marginBottom: "40px"

    }
}));

class Post {
    postContent: String;
    postOwner: String;
    postOwnerName: String;
    postDate: Date;

    constructor(postContent: String, postOwner: String, postOwnerName: String, postDate: Date) {
        this.postContent = postContent;
        this.postOwner = postOwner;
        this.postOwnerName = postOwnerName;
        this.postDate = postDate
    }
}

const PostFeed = ({ posts }) => {
    const classes = useStyles();
    return (
        <div className={classes.postRoot}>
            {posts.map((post, i) => {
                const postDate = new Date(post.postDate.seconds*1000)
                return (
                    <div>
                        <Typography className={classes.postsOwner} variant="body1">
                            {post.postOwnerName}
                        </Typography>
                        <Typography variant="caption">
                            em {postDate.toLocaleString()}
                        </Typography>
                        <Typography key={i} className={classes.postsContent} variant="body2">
                            {post.postContent}
                        </Typography>
                    </div>
                );
            })}
        </div>
    );
};

const Home = () => {
    const classes = useStyles()

    const [currentUserName, setCurrentUserName] = useState(String);
    const [userID, setUserID] = useState(String);
    const [postContent, setPostContent] = useState(String);
    const [posts, setPosts] = useState(new Array<Post>());
    const history = useHistory();

    useEffect(() => {
        firebase.auth.onAuthStateChanged(function (user) {
            if (user) {
                setCurrentUserName(user.displayName!);
                setUserID(user.uid);
            } else {
                // No user is signed in.
                history.push("/");
            }
        });
    }, [currentUserName, history]);

    useEffect(() => {
        firebase.db
            .collection("posts")
            .get()
            .then(function (querySnapshot) {
                let postsCollection: Post[] = [];
                querySnapshot.forEach(function (doc) {
                    const { postOwner, postContent, postOwnerName, postDate } = doc.data();
                    const post: Post = new Post(postContent, postOwner, postOwnerName, postDate);
                    // console.log(doc.data())
                    postsCollection.push(post);
                    postsCollection.sort(function(a,b){
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return b.postDate.valueOf() - a.postDate.valueOf();
                      });
                    // doc.data() is never undefined for query doc snapshots
                });
                setPosts(postsCollection);
            });
    }, []);

    const createPost = (postContent, userID, postOwnerName) => {
        if (postContent) {
            let postDate = new Date()
            firebase.db
                .collection("posts")
                .add({
                    postContent: postContent,
                    postOwner: userID,
                    postOwnerName: postOwnerName,
                    postDate: postDate
                })
                .then(() => {
                    setPostContent("");
                })
                .then(() => window.location.reload(false))
        }
    };
    
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <Typography className={classes.welcomeMessage} variant="h4">{`Seja bem-vindo, ${currentUserName}`}</Typography>
                <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    multiline
                    rows={5}
                    fullWidth
                    placeholder={"Escreva sua postagem aqui"}
                    variant="outlined"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />

                <Button
                    onClick={() => createPost(postContent, userID, currentUserName)}
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: "30px" }}
                >
                    {"Postar"}
                </Button>
                <PostFeed posts={posts}></PostFeed>
            </Container>
        </div>
    );
};

export default Home;

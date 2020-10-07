import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import FileUpload from "./FileUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  //create state variable and use useState hook react
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); //User who's signed in

  useEffect(() => {
    //frontend event listeners.
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //keeps user logged in on the page refresh also..(backend event listener)
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          //don't update  username
        } else {
          //if we just created someone...
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //user has logged out
        setUser(null);
      }
    });

    return () => {
      //To cleanup
      unsubscribe();
    };
  }, [user, username]);

  //useEffect runs a piece of code based on specific condition
  useEffect(() => {
    //this is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //onsnapshot => Every time a new post is added this code runs
        setPosts(
          snapshot.docs.map((doc) => ({
            //maps through each of the doc
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []); //If [] is blank means it will run once, when the main App component loads and if [posts] is passesd it will run everytime the variable posts changes.

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="App">
      <Modal
        open={open} //Sign up modal
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              {" "}
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn} //Sign In modal
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              {" "}
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {/* Checks if user is logged in or not */}
        {user ? (
          <Button onClick={() => auth.signOut()}> Log out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}> Login </Button>
            <Button onClick={() => setOpen(true)}> Sign Up</Button>
          </div>
        )}
      </div>

      <h1 className="app__posts">Let's build Instagram Clone!</h1>
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id} //The unique id of post will render the post with particular id, and not re-render the already rendered post.
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/Zw9o4/"
            maxwidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {/* Checks if user is logged in or not */}
      {user?.displayName ? (
        <FileUpload username={user.displayName} />
      ) : (
        <h3 className="app__posts">Please login for file upload</h3>
      )}
      {/* Header */}
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;

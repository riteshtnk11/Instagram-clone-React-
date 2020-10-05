import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";

function App() {
  //useState hook react
  const [posts, setPosts] = useState([]);

  //useEffect runs a piece of code based on specific condition
  useEffect(() => {
    //this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      //onsnapshot => Every time a new post is added this code runs
      setPosts(snapshot.docs.map((doc) => doc.data())); //maps through each of the doc
    });
  }, []); //If [] is blank means it will run once, when the main App component loads and if [posts] is passesd it will run everytime the variable posts changes.

  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <h1>Let's build Instagram Clone!</h1>

      {posts.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
      {/* Header */}
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;

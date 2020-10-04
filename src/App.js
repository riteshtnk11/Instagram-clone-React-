import React, { useState } from "react";
import "./App.css";
import Post from "./Post";
function App() {
  const [posts, setPosts] = useState([
    {
      username: "ritesh_insta1",
      caption: "WOW it works",
      imageUrl: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    },
    {
      username: "ritesh_insta2",
      caption: "WOW it works",
      imageUrl: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    }
  ]);

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

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      {/* Header */}
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;

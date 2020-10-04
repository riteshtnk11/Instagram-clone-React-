/*use rfce as a shortcut for creating base structure for this file.  */
import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      {/* header part*/}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Ritesh"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/* Image */}
      <img className="post__image" src={imageUrl} alt=""></img>

      {/* username and caption */}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
}
export default Post;

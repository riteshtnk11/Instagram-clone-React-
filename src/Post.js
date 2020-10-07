/*use rfce as a shortcut for creating base structure for this file.  */
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";

function Post({ postId, username, user, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments") //Going inside of the postID's comments collection and activating snapshot listener for each event.
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment(""); //To keep the add comment blank after comment is added
  };

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

      {/*All Comments on the post*/}
      <div className="post__comments">
        {comments.map((comment) => (
          <div>
            <strong>{comment.username}</strong> {comment.text}
          </div>
        ))}
      </div>
      {/*Add comment section */}
      {/* Checks if user is logged in or not */}
      {user ? (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            {" "}
            Post
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
export default Post;

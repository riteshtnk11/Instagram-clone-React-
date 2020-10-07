import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./FileUpload.css";

function FileUpload({ username }) {
  //All useState hooks
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  //All change and click events
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // If Error occurs
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...To get the download link
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            //reset everything once file upload is done
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  //Main return
  return (
    <div className="imageupload">
      {/* I want to have */}
      {/* Caption Input  */}
      {/* File picker */}
      {/* Post button */}

      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={setCaption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default FileUpload;

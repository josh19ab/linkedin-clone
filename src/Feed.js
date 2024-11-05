import React, { useEffect, useRef, useState } from "react";
import "./Feed.css";
import EditIcon from "@mui/icons-material/Edit";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import SendIcon from "@mui/icons-material/Send";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import Post from "./Post";
import FlipMove from "react-flip-move";
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import db from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    // Trigger the hidden file input click
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "disasterInfo"); // Replace with your upload preset

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/djtzzg12a/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setMediaUrl(data.secure_url);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Upload canceled");
        } else {
          console.error("Error uploading image:", error);
        }
      } finally {
        setLoading(false); // Reset loading status after upload completes
      }
    }
  };

  const removeMedia = () => {
    setMediaUrl(""); // Clear the media URL
  };

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) =>
          setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const sendPost = async (e) => {
    e.preventDefault();

    const collectionRef = collection(db, "posts");
    const payload = {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      mediaUrl: mediaUrl || "",
      timestamp: serverTimestamp(),
    };

    await addDoc(collectionRef, payload);

    setInput("");
    setMediaUrl("");
  };

  // Function to format text for display
  const formatText = (text) => {
    return text.split(" ").map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} style={{ color: "#0096FF" }}>
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed_input">
          <EditIcon />
          <form onSubmit={sendPost}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            {loading ? (
              <CancelScheduleSendIcon />
            ) : (
              <SendIcon type="submit" />
            )}
          </form>
        </div>
        {loading && (
          <div className="loading">
            <p>Uploading image...</p>
          </div>
        )}
        {mediaUrl && (
          <div className="media-preview">
            <img
              src={mediaUrl}
              alt="Uploaded Media"
              className="uploaded-media"
            />
            <button onClick={removeMedia} className="close-button">
              X
            </button>
          </div>
        )}
        <div className="feed__inputOptions">
          <InputOption
            Icon={ImageIcon}
            title="Photo"
            color="#70B5F9"
            onClick={handlePhotoClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange} // Handle file selection
          />

          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            name={post.name}
            description={post.description}
            message={<span>{formatText(post.message)}</span>}
            photoUrl={post.photoUrl}
            mediaUrl={post.mediaUrl} // Pass media URL to Post component
            timestamp={post.timestamp}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;

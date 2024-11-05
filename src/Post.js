import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InputOption from "./InputOption";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";

const Post = forwardRef(
  ({ name, description, message, photoUrl, mediaUrl }, ref) => {
    return (
      <div ref={ref} className="post">
        <div className="post__header">
          <Avatar src={photoUrl}>{description[0]}</Avatar>
          <div className="post__info">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="post__body">
          {mediaUrl && (
            <img src={mediaUrl} alt="Post Media" className="post__media" />
          )}
          <p>{message}</p>
        </div>

        <div className="post__buttons">
          <InputOption Icon={ThumbUpOffAltIcon} title="Like" color="gray" />
          <InputOption
            Icon={ChatBubbleOutlineIcon}
            title="Comment"
            color="gray"
          />
          <InputOption Icon={ShareIcon} title="Share" color="gray" />
          <InputOption Icon={SendIcon} title="Send" color="gray" />
        </div>
      </div>
    );
  }
);

export default Post;

import React, { useState } from 'react'
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';

function ImageUrlOption({ onImageUrlChange }) {
    const [imageUrl, setImageUrl] = useState("");

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
      };
    const handleImageUrlSubmit = (event) => {
        event.preventDefault();
        onImageUrlChange(imageUrl);
        setImageUrl("");
      };
    
    return (
        <InputOption
          Icon={ImageIcon}
          title="Photo"
          color="#70B5F9"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter image URL";
            input.value = imageUrl;
            input.onchange = handleImageUrlChange;
            input.onkeydown = (event) => {
              if (event.key === "Enter") {
                handleImageUrlSubmit(event);
              }
            };
            input.click();
          }}
        />
      );
    }

export default ImageUrlOption
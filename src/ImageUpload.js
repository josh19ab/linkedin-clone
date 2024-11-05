import React, { useState } from "react";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "disasterInfo"); // Replace with your upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/djtzzg12a/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url); // Get the secure URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e.target.files)} />
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />
      )}
    </div>
  );
};

export default ImageUpload;

import React, { useRef } from "react";

const UploadWidget = ({ onUpload }) => {
  const widgetRef = useRef();

  const openWidget = () => {
    widgetRef.current.open();
  };

  React.useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "djtzzg12a", // Replace with your Cloudinary cloud name
        uploadPreset: "disasterInfo", // Replace with your upload preset
        sources: ["local", "url", "camera"], // Specify sources if needed
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onUpload(result.info.secure_url); // Pass the uploaded image URL to parent
        }
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      onClick={openWidget}
      style={{
        backgroundColor: "#70B5F9",
        color: "white",
        border: "none",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      Upload Media
    </button>
  );
};

export default UploadWidget;

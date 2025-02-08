import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crea una URL temporal
      setImage(imageUrl);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <h3>Vista Previa:</h3>
          <img src={image} alt="Preview" style={{ width: "300px", marginTop: "10px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

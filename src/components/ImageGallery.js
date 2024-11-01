// src/components/ImageGallery.js
import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardMedia, CardContent, Typography } from '@mui/material';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const key ='Exr2Q4Wdr_TMuNbQ0__csPQqNMNorw5CFXXzZD6RP8k';

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=9&client_id=${key};` 
      );
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      {images.map((image) => (
        <Grid2 item xs={12} sm={6} md={4} key={image.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={image.urls.regular} // URL de la imagen
              alt={image.alt_description}
            />
            <CardContent>
              <Typography variant="subtitle1">{image.user.name}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ImageGallery;

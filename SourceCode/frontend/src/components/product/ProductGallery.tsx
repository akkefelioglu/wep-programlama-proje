import { useState } from 'react';
import { Box } from '@mui/material';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Box>
      {/* Main Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          pt: '85%',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(20,20,35,0.6) 0%, rgba(10,10,18,0.8) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={images[selectedImage]}
          alt={productName}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '75%',
            height: '75%',
            objectFit: 'contain',
            transition: 'all 0.5s ease',
          }}
        />

        {/* Decorative glow */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '30%',
            background: 'radial-gradient(ellipse, rgba(108,99,255,0.15) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setSelectedImage(index)}
              sx={{
                width: 72,
                height: 72,
                borderRadius: '14px',
                background: 'rgba(14, 14, 22, 0.8)',
                border: '2px solid',
                borderColor: selectedImage === index
                  ? '#6C63FF'
                  : 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0.5,
                '&:hover': {
                  borderColor: selectedImage === index ? '#6C63FF' : 'rgba(108,99,255,0.3)',
                },
              }}
            >
              <Box
                component="img"
                src={img}
                alt={`${productName} - ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductGallery;

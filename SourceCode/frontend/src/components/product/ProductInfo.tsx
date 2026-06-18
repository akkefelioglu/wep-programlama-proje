import { useState } from 'react';
import { Box, Typography, Button, Rating, Chip, IconButton, Divider, Snackbar, Alert } from '@mui/material';
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  LocalShipping,
  Shield,
  Replay,
  CheckCircle,
} from '@mui/icons-material';
import type { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, product.colors?.[selectedColor]);
    setSnackbarOpen(true);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Box>
      {/* Category */}
      <Typography
        variant="caption"
        sx={{
          color: '#6C63FF',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.8rem',
        }}
      >
        {product.category}
      </Typography>

      {/* Name */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mt: 1,
          mb: 2,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          lineHeight: 1.2,
        }}
      >
        {product.name}
      </Typography>

      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Rating value={product.rating} precision={0.1} readOnly />
        <Typography sx={{ color: '#FFB800', fontWeight: 700 }}>
          {product.rating}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
          ({product.reviewCount} değerlendirme)
        </Typography>
        {product.inStock && (
          <Chip
            icon={<CheckCircle sx={{ fontSize: 14, color: '#00E676 !important' }} />}
            label="Stokta"
            size="small"
            sx={{
              background: 'rgba(0, 230, 118, 0.1)',
              border: '1px solid rgba(0, 230, 118, 0.2)',
              color: '#00E676',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        )}
      </Box>

      {/* Price */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 0%, #ddd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {product.price.toLocaleString('tr-TR')} ₺
          </Typography>
          {product.oldPrice && (
            <>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'line-through',
                  fontWeight: 400,
                }}
              >
                {product.oldPrice.toLocaleString('tr-TR')} ₺
              </Typography>
              <Chip
                label={`%${discount} İndirim`}
                size="small"
                sx={{
                  background: 'rgba(255, 77, 106, 0.15)',
                  color: '#FF4D6A',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              />
            </>
          )}
        </Box>
        {product.oldPrice && (
          <Typography variant="body2" sx={{ color: '#00E676', mt: 0.5, fontWeight: 500 }}>
            {(product.oldPrice - product.price).toLocaleString('tr-TR')} ₺ tasarruf edin
          </Typography>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

      {/* Description */}
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, mb: 3 }}>
        {product.description}
      </Typography>

      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Renk: <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>{product.colors[selectedColor]}</span>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {product.colors.map((color, index) => (
              <Chip
                key={color}
                label={color}
                onClick={() => setSelectedColor(index)}
                sx={{
                  border: '1px solid',
                  borderColor: selectedColor === index ? '#6C63FF' : 'rgba(255,255,255,0.1)',
                  background: selectedColor === index ? 'rgba(108,99,255,0.1)' : 'transparent',
                  color: selectedColor === index ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontWeight: selectedColor === index ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(108,99,255,0.5)',
                    background: 'rgba(108,99,255,0.05)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Quantity */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
          Adet
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            p: 0.5,
          }}
        >
          <IconButton
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            size="small"
            sx={{
              color: '#fff',
              borderRadius: '10px',
              '&:hover': { background: 'rgba(108,99,255,0.1)' },
            }}
          >
            <Remove fontSize="small" />
          </IconButton>
          <Typography sx={{ px: 2, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>
            {quantity}
          </Typography>
          <IconButton
            onClick={() => setQuantity(quantity + 1)}
            size="small"
            sx={{
              color: '#fff',
              borderRadius: '10px',
              '&:hover': { background: 'rgba(108,99,255,0.1)' },
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleAddToCart}
          startIcon={<ShoppingCart />}
          sx={{
            flex: 1,
            minWidth: 200,
            py: 1.5,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
            '&:hover': {
              boxShadow: '0 12px 48px rgba(108,99,255,0.5)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Sepete Ekle
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ borderRadius: '12px' }}>
            {product.name} sepete eklendi!
          </Alert>
        </Snackbar>
        <IconButton
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#FF4D6A',
            '&:hover': { borderColor: '#FF4D6A', background: 'rgba(255,77,106,0.08)' },
          }}
        >
          <FavoriteBorder />
        </IconButton>
        <IconButton
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
            '&:hover': { borderColor: '#6C63FF', background: 'rgba(108,99,255,0.08)' },
          }}
        >
          <Share />
        </IconButton>
      </Box>

      {/* Info Cards */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {[
          { icon: <LocalShipping sx={{ fontSize: 20 }} />, title: 'Ücretsiz Kargo', desc: 'İngiltere\'den 3-5 iş günü' },
          { icon: <Shield sx={{ fontSize: 20 }} />, title: '2 Yıl Garanti', desc: 'Resmi distribütör garantisi' },
          { icon: <Replay sx={{ fontSize: 20 }} />, title: '30 Gün İade', desc: 'Koşulsuz iade hakkı' },
        ].map((info) => (
          <Box
            key={info.title}
            sx={{
              flex: '1 1 150px',
              p: 2,
              borderRadius: '14px',
              background: 'rgba(14, 14, 22, 0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
            }}
          >
            <Box sx={{ color: '#6C63FF', mt: 0.3 }}>{info.icon}</Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                {info.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {info.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductInfo;

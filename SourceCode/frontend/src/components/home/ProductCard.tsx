import { Link } from 'react-router-dom';
import { Box, Typography, Rating, Chip, IconButton } from '@mui/material';
import { FavoriteBorder, ShoppingCartOutlined, Visibility } from '@mui/icons-material';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Çok Satan':
      case 'En Popüler':
        return { background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' };
      case 'Yeni':
        return { background: 'linear-gradient(135deg, #43E97B, #38F9D7)', color: '#000' };
      case 'İndirimde':
        return { background: 'linear-gradient(135deg, #FF4D6A, #FF6B8A)' };
      case 'Editörün Seçimi':
        return { background: 'linear-gradient(135deg, #6C63FF, #00D9FF)' };
      case 'Sağlık Odaklı':
        return { background: 'linear-gradient(135deg, #43E97B, #38F9D7)', color: '#000' };
      case 'Profesyonel':
        return { background: 'linear-gradient(135deg, #FFB800, #FF8E53)', color: '#000' };
      case 'Yaratıcılar İçin':
        return { background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', color: '#000' };
      default:
        return { background: 'linear-gradient(135deg, #6C63FF, #00D9FF)' };
    }
  };

  return (
    <Link to={`/urun/${product.slug}`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '20px',
          background: 'rgba(14, 14, 22, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            border: '1px solid rgba(108,99,255,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(108,99,255,0.1)',
          },
          '&:hover .product-actions': {
            opacity: 1,
            transform: 'translateX(0)',
          },
          '&:hover .product-image': {
            transform: 'scale(1.05)',
          },
        }}
      >
        {/* Image Area */}
        <Box
          sx={{
            position: 'relative',
            pt: '85%',
            background: 'linear-gradient(180deg, rgba(20,20,35,0.5) 0%, rgba(10,10,18,0.8) 100%)',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            className="product-image"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          {/* Badges */}
          <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {product.badge && (
              <Chip
                label={product.badge}
                size="small"
                sx={{
                  ...getBadgeStyle(product.badge),
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            )}
            {discount > 0 && (
              <Chip
                label={`-${discount}%`}
                size="small"
                sx={{
                  background: 'rgba(255, 77, 106, 0.9)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            )}
          </Box>

          {/* Hover Actions */}
          <Box
            className="product-actions"
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              opacity: 0,
              transform: 'translateX(20px)',
              transition: 'all 0.4s ease',
            }}
          >
            {[
              { icon: <FavoriteBorder sx={{ fontSize: 18 }} />, title: 'Favorilere ekle' },
              { icon: <ShoppingCartOutlined sx={{ fontSize: 18 }} />, title: 'Sepete ekle' },
              { icon: <Visibility sx={{ fontSize: 18 }} />, title: 'Hızlı bakış' },
            ].map((action) => (
              <IconButton
                key={action.title}
                title={action.title}
                onClick={(e) => e.preventDefault()}
                sx={{
                  width: 36,
                  height: 36,
                  background: 'rgba(14, 14, 22, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  borderRadius: '10px',
                  '&:hover': {
                    background: '#6C63FF',
                    border: '1px solid #6C63FF',
                  },
                }}
              >
                {action.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Info Area */}
        <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="caption"
            sx={{
              color: '#6C63FF',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.7rem',
              mb: 0.5,
            }}
          >
            {product.category}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.3,
              mb: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.95rem',
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.8rem',
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.shortDescription}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
              ({product.reviewCount})
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#fff',
                fontSize: '1.25rem',
              }}
            >
              {product.price.toLocaleString('tr-TR')} ₺
            </Typography>
            {product.oldPrice && (
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'line-through',
                  fontSize: '0.85rem',
                }}
              >
                {product.oldPrice.toLocaleString('tr-TR')} ₺
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;

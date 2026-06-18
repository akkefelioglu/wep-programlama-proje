import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Box className="page-enter" sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 80, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Sepetiniz Boş
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>
            Henüz sepetinize ürün eklemediniz.
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                fontWeight: 700,
                px: 4,
                py: 1.2,
              }}
            >
              Alışverişe Başla
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="page-enter" sx={{ py: 4, minHeight: '70vh' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          Alışveriş{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sepetim
          </Box>
          <Typography component="span" sx={{ color: 'rgba(255,255,255,0.4)', ml: 2, fontWeight: 400, fontSize: '1rem' }}>
            ({totalItems} ürün)
          </Typography>
        </Typography>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map((item) => (
                <Box
                  key={item.product.id}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 3,
                    borderRadius: '20px',
                    background: 'rgba(14, 14, 22, 0.6)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(108,99,255,0.15)',
                    },
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      width: { xs: '100%', sm: 120 },
                      height: 120,
                      borderRadius: '14px',
                      background: 'rgba(255,255,255,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={item.product.image}
                      alt={item.product.name}
                      sx={{
                        maxWidth: '80%',
                        maxHeight: '80%',
                        objectFit: 'contain',
                      }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/urun/${item.product.slug}`}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, '&:hover': { color: '#6C63FF' } }}>
                        {item.product.name}
                      </Typography>
                    </Link>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1 }}>
                      {item.product.category}
                      {item.selectedColor && ` • ${item.selectedColor}`}
                    </Typography>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          overflow: 'hidden',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          sx={{ color: '#fff', borderRadius: 0, '&:hover': { background: 'rgba(108,99,255,0.1)' } }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, fontWeight: 700, minWidth: 32, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          sx={{ color: '#fff', borderRadius: 0, '&:hover': { background: 'rgba(108,99,255,0.1)' } }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>

                      <IconButton
                        onClick={() => removeFromCart(item.product.id)}
                        sx={{
                          color: 'rgba(255,255,255,0.3)',
                          '&:hover': { color: '#FF4D6A', background: 'rgba(255,77,106,0.08)' },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Price */}
                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                    </Typography>
                    {item.quantity > 1 && (
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                        Birim: {item.product.price.toLocaleString('tr-TR')} ₺
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: 'sticky',
                top: 100,
                p: 4,
                borderRadius: '24px',
                background: 'rgba(14, 14, 22, 0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                Sipariş Özeti
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Ara Toplam ({totalItems} ürün)
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {totalPrice.toLocaleString('tr-TR')} ₺
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Kargo
                </Typography>
                <Typography variant="body2" sx={{ color: '#00E676', fontWeight: 600 }}>
                  Ücretsiz
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Toplam
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #fff 0%, #ddd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {totalPrice.toLocaleString('tr-TR')} ₺
                </Typography>
              </Box>

              <Link to="/odeme">
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
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
                  Ödemeye Geç
                </Button>
              </Link>

              <Link to="/">
                <Button
                  fullWidth
                  sx={{
                    mt: 1.5,
                    py: 1.2,
                    borderRadius: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    '&:hover': { color: '#6C63FF', background: 'rgba(108,99,255,0.05)' },
                  }}
                >
                  Alışverişe Devam Et
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;

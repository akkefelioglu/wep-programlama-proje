import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CreditCard,
  Lock,
  CheckCircle,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { processPayment } from '../config/api';

interface OrderRecord {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: string;
  cardLast4: string;
  shippingAddress: string;
}

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) return v.substring(0, 2) + '/' + v.substring(2, 4);
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Ödeme yapabilmek için giriş yapmanız gerekmektedir.');
      return;
    }

    if (items.length === 0) {
      setError('Sepetiniz boş.');
      return;
    }

    setLoading(true);

    try {
      // Backend'e Stripe ödeme isteği gönder
      const paymentResult = await processPayment(
        {
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate,
          cvv,
          cardName,
          shippingAddress: `${address}, ${city}`,
          amount: totalPrice,
          items: items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.image,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
        user.email || 'guest@britmart.co.uk',
        user.displayName || 'Misafir'
      );

      if (!paymentResult.success) {
        setError('Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
        setLoading(false);
        return;
      }

      // Sipariş kaydını localStorage'a da kaydet (frontend fallback)
      const order: OrderRecord = {
        id: paymentResult.orderId,
        date: new Date().toISOString(),
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })),
        total: totalPrice,
        status: 'Onaylandı',
        cardLast4: cardNumber.replace(/\s/g, '').slice(-4),
        shippingAddress: `${address}, ${city}`,
      };

      const existingOrders: OrderRecord[] = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.unshift(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      setSuccess(true);
      setLoading(false);
      clearCart();

      // 3 saniye sonra siparişlerim sayfasına yönlendir
      setTimeout(() => {
        navigate('/siparislerim');
      }, 3000);
    } catch {
      setError('Ödeme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.03)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.3)' },
      '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& input': { color: '#fff' },
  };

  if (success) {
    return (
      <Box
        className="page-enter"
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 100, color: '#00E676', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Ödeme Başarılı!
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>
            Siparişiniz onaylanmıştır. Kısa süre içinde kargoya verilecektir.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)' }}>
            Sipariş geçmişi sayfasına yönlendiriliyorsunuz...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="page-enter" sx={{ py: 4, minHeight: '70vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          <Lock sx={{ mr: 1, verticalAlign: 'middle', color: '#00E676' }} />
          Güvenli{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ödeme
          </Box>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
            {error}
          </Alert>
        )}

        {!user && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: '12px' }}>
            Ödeme yapabilmek için lütfen{' '}
            <strong
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/giris')}
            >
              giriş yapın
            </strong>
            .
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Payment Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                borderRadius: '24px',
                background: 'rgba(14, 14, 22, 0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Shipping Info */}
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                📦 Teslimat Bilgileri
              </Typography>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Adres"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    multiline
                    rows={2}
                    sx={{
                      ...inputSx,
                      '& textarea': { color: '#fff' },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Şehir"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    sx={inputSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    sx={inputSx}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

              {/* Card Info */}
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                <CreditCard sx={{ mr: 1, verticalAlign: 'middle' }} />
                Kart Bilgileri
              </Typography>

              <Alert severity="info" sx={{ mb: 3, borderRadius: '12px' }}>
                <strong>Stripe Test Modu:</strong> Test kartı olarak{' '}
                <strong>4242 4242 4242 4242</strong> kullanabilirsiniz.
              </Alert>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Kart Üzerindeki İsim"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    sx={inputSx}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Kart Numarası"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    required
                    inputProps={{ maxLength: 19 }}
                    placeholder="4242 4242 4242 4242"
                    sx={inputSx}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="Son Kullanma"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                    required
                    inputProps={{ maxLength: 5 }}
                    placeholder="MM/YY"
                    sx={inputSx}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    required
                    inputProps={{ maxLength: 3 }}
                    type="password"
                    placeholder="•••"
                    sx={inputSx}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !user}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #00E676 0%, #00D9FF 100%)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 32px rgba(0,230,118,0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 48px rgba(0,230,118,0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `${totalPrice.toLocaleString('tr-TR')} ₺ Öde`
                )}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
                <Lock sx={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                  256-bit SSL ile güvenli ödeme • Stripe altyapısı
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 5 }}>
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

              {items.map((item) => (
                <Box
                  key={item.product.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.product.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                      x{item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Kargo
                </Typography>
                <Typography variant="body2" sx={{ color: '#00E676', fontWeight: 600 }}>
                  Ücretsiz
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Toplam
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {totalPrice.toLocaleString('tr-TR')} ₺
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  Receipt,
  LocalShipping,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getOrdersByUser, type OrderDTO } from '../config/api';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface LocalOrder {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  cardLast4: string;
  shippingAddress: string;
}

// Birleştirilmiş sipariş tipi
interface DisplayOrder {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number; image: string }[];
  total: number;
  status: string;
  cardLast4: string;
  shippingAddress: string;
}

const statusConfig: Record<string, { color: string; icon: React.ReactNode; bg: string }> = {
  'Onaylandı': {
    color: '#00E676',
    icon: <CheckCircle sx={{ fontSize: 16 }} />,
    bg: 'rgba(0,230,118,0.1)',
  },
  'Kargoda': {
    color: '#00D9FF',
    icon: <LocalShipping sx={{ fontSize: 16 }} />,
    bg: 'rgba(0,217,255,0.1)',
  },
  'Hazırlanıyor': {
    color: '#FFB800',
    icon: <Schedule sx={{ fontSize: 16 }} />,
    bg: 'rgba(255,184,0,0.1)',
  },
  'Teslim Edildi': {
    color: '#6C63FF',
    icon: <CheckCircle sx={{ fontSize: 16 }} />,
    bg: 'rgba(108,99,255,0.1)',
  },
};

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<DisplayOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        // Backend'den siparişleri çek
        const backendOrders = await getOrdersByUser(user.email);

        if (backendOrders.length > 0 && 'orderNumber' in backendOrders[0]) {
          // Backend'den gelen siparişleri dönüştür
          const mapped: DisplayOrder[] = (backendOrders as OrderDTO[]).map((o) => ({
            id: o.orderNumber,
            date: o.createdAt,
            items: o.items.map((item) => ({
              name: item.productName,
              quantity: item.quantity,
              price: typeof item.price === 'number' ? item.price : parseFloat(String(item.price)),
              image: item.productImage || '/images/smartphone.png',
            })),
            total: typeof o.total === 'number' ? o.total : parseFloat(String(o.total)),
            status: o.status,
            cardLast4: o.cardLast4 || '****',
            shippingAddress: o.shippingAddress || '',
          }));
          setOrders(mapped);
          return;
        }
      }

      // Fallback: localStorage'dan oku
      const savedOrders: LocalOrder[] = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    };

    fetchOrders();
  }, [user]);

  if (orders.length === 0) {
    return (
      <Box
        className="page-enter"
        sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Receipt sx={{ fontSize: 80, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Henüz Siparişiniz Yok
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
            İlk siparişinizi verdikten sonra burada görünecektir.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="page-enter" sx={{ py: 4, minHeight: '70vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Sipariş{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Geçmişim
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 4 }}>
          Toplam {orders.length} sipariş
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig['Onaylandı'];
            return (
              <Accordion
                key={order.id}
                sx={{
                  borderRadius: '20px !important',
                  background: 'rgba(14, 14, 22, 0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  '&:before': { display: 'none' },
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(108,99,255,0.15)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: 'rgba(255,255,255,0.5)' }} />}
                  sx={{ px: 3, py: 1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {order.id}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                        {new Date(order.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>

                    <Chip
                      icon={status.icon as React.ReactElement}
                      label={order.status}
                      size="small"
                      sx={{
                        background: status.bg,
                        color: status.color,
                        fontWeight: 600,
                        border: `1px solid ${status.color}30`,
                        '& .MuiChip-icon': { color: status.color },
                      }}
                    />

                    <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {order.total.toLocaleString('tr-TR')} ₺
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                        {order.items.length} ürün
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />

                  {/* Order Items */}
                  {order.items.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.5,
                        borderBottom: idx < order.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.03)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                            x{item.quantity} • Birim: {item.price.toLocaleString('tr-TR')} ₺
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                      </Typography>
                    </Box>
                  ))}

                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 2 }} />

                  {/* Order Details */}
                  <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block' }}>
                        Teslimat Adresi
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.shippingAddress}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block' }}>
                        Ödeme Yöntemi
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        •••• •••• •••• {order.cardLast4}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default OrderHistoryPage;

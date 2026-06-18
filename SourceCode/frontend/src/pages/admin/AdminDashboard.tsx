import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  Inventory2,
  QuestionAnswer,
  Star,
} from '@mui/icons-material';
import { products } from '../../data/products';

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  change?: string;
}

const AdminDashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const questions = JSON.parse(localStorage.getItem('productQuestions') || '[]');
    const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
    setOrderCount(orders.length);
    setQuestionCount(questions.length);
    setReviewCount(reviews.length);
  }, []);

  const stats: StatCard[] = [
    {
      title: 'Toplam Ürün',
      value: products.length,
      icon: <Inventory2 />,
      gradient: 'linear-gradient(135deg, #6C63FF, #8B83FF)',
      change: '+2 bu hafta',
    },
    {
      title: 'Toplam Sipariş',
      value: orderCount,
      icon: <ShoppingCart />,
      gradient: 'linear-gradient(135deg, #00D9FF, #33E0FF)',
      change: `${orderCount} adet`,
    },
    {
      title: 'Kullanıcı Soruları',
      value: questionCount,
      icon: <QuestionAnswer />,
      gradient: 'linear-gradient(135deg, #FFB800, #FF8E53)',
    },
    {
      title: 'Toplam Yorum',
      value: products.reduce((sum, p) => sum + p.reviews.length, 0) + reviewCount,
      icon: <Star />,
      gradient: 'linear-gradient(135deg, #00E676, #38F9D7)',
    },
    {
      title: 'Gelir',
      value: '₺' + (orderCount * 15000).toLocaleString('tr-TR'),
      icon: <TrendingUp />,
      gradient: 'linear-gradient(135deg, #FF4D6A, #FF6B8A)',
    },
    {
      title: 'Aktif Kullanıcılar',
      value: Math.max(1, orderCount + questionCount),
      icon: <People />,
      gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    },
  ];

  return (
    <Box className="page-enter">
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        Hoş Geldiniz,{' '}
        <Box
          component="span"
          sx={{
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Admin
        </Box>
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 4 }}>
        BritMart e-ticaret yönetim paneline hoş geldiniz
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '20px',
                background: 'rgba(14, 14, 22, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(108,99,255,0.2)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900 }}>
                    {stat.value}
                  </Typography>
                  {stat.change && (
                    <Typography variant="caption" sx={{ color: '#00E676', fontWeight: 500 }}>
                      {stat.change}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '14px',
                    background: stat.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Son Aktiviteler
        </Typography>
        <Paper
          sx={{
            p: 3,
            borderRadius: '20px',
            background: 'rgba(14, 14, 22, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', py: 3 }}>
            {orderCount > 0 || questionCount > 0
              ? `${orderCount} sipariş ve ${questionCount} kullanıcı sorusu bulunuyor.`
              : 'Henüz aktivite bulunmuyor. Sipariş ve sorular burada görünecektir.'}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

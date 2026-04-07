import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: { xs: '6rem', md: '10rem' },
            fontWeight: 900,
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Sayfa Bulunamadı
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.5)', mb: 4, maxWidth: 400, mx: 'auto' }}
        >
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek alışverişe devam edebilirsiniz.
        </Typography>
        <Link to="/">
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              fontWeight: 700,
            }}
          >
            Ana Sayfaya Dön
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFoundPage;

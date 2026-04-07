import { Box, Container, Typography, Grid, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, rgba(6,6,11,0) 0%, rgba(14,14,22,1) 20%)',
        pt: 10,
        pb: 4,
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  color: '#fff',
                }}
              >
                B
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>
                BritMart
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, mb: 2, maxWidth: 350 }}>
              İngiltere merkezli online perakende mağazamızda en son teknoloji ürünleri uygun fiyatlarla keşfedin.
              Güvenli ödeme, hızlı teslimat ve 30 gün iade garantisi ile alışverişin keyfini çıkarın.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[Facebook, Instagram, Twitter, YouTube].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#6C63FF',
                      borderColor: 'rgba(108,99,255,0.3)',
                      background: 'rgba(108,99,255,0.1)',
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
              Hızlı Bağlantılar
            </Typography>
            {['Ana Sayfa', 'Ürünler', 'Kampanyalar', 'Yeni Gelenler', 'Çok Satanlar'].map((item) => (
              <Link key={item} to="/">
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    mb: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { color: '#6C63FF', transform: 'translateX(4px)', display: 'inline-block' },
                  }}
                >
                  {item}
                </Typography>
              </Link>
            ))}
          </Grid>

          {/* Categories */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
              Kategoriler
            </Typography>
            {['Akıllı Telefonlar', 'Laptoplar', 'Kulaklıklar', 'Akıllı Saatler', 'Kameralar'].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  mb: 1,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { color: '#00D9FF' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
              İletişim
            </Typography>
            {[
              { icon: <LocationOn fontSize="small" />, text: '42 Oxford Street, London W1D 1BN, United Kingdom' },
              { icon: <Phone fontSize="small" />, text: '+44 20 7946 0958' },
              { icon: <Email fontSize="small" />, text: 'info@britmart.co.uk' },
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'flex-start' }}>
                <Box sx={{ color: '#6C63FF', mt: 0.3 }}>{item.icon}</Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
            {/* Trust Badges */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
              {['🔒 SSL Güvenlik', '🚚 Ücretsiz Kargo', '↩️ 30 Gün İade'].map((badge) => (
                <Box
                  key={badge}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {badge}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2026 BritMart Ltd. Tüm hakları saklıdır. İngiltere ve Galler'de tescillidir.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Gizlilik Politikası', 'Kullanım Şartları', 'Çerez Politikası'].map((item) => (
              <Typography
                key={item}
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer', '&:hover': { color: '#6C63FF' } }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

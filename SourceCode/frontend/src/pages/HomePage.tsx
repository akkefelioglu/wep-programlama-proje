import { useState, useMemo } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import HeroBanner from '../components/home/HeroBanner';
import CategorySlider from '../components/home/CategorySlider';
import FeaturedGrid from '../components/home/FeaturedGrid';
import { products, getFeaturedProducts } from '../data/products';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('');

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter((p) => p.categorySlug === activeCategory);
  }, [activeCategory]);

  const featuredProducts = useMemo(() => getFeaturedProducts(), []);

  return (
    <Box className="page-enter">
      <HeroBanner />

      <CategorySlider
        onCategoryClick={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* Featured Products (only when no filter) */}
      {!activeCategory && (
        <FeaturedGrid
          products={featuredProducts.slice(0, 8)}
          title="Öne Çıkan Ürünler"
          subtitle="En çok tercih edilen ve editör seçimi ürünlerimiz"
        />
      )}

      {/* Campaign Banner */}
      {!activeCategory && (
        <Box sx={{ py: 6 }}>
          <Container maxWidth="xl">
            <Box
              sx={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                p: { xs: 4, md: 6 },
                background: 'linear-gradient(135deg, #1a0a30 0%, #0a1a2e 50%, #0d0d1a 100%)',
                border: '1px solid rgba(108,99,255,0.15)',
              }}
            >
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-20%',
                  right: '-5%',
                  width: 400,
                  height: 400,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-30%',
                  left: '10%',
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#00D9FF',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    mb: 1,
                    display: 'block',
                  }}
                >
                  SINIRLI SÜRELİ KAMPANYA
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Bahar İndirimi ile{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(135deg, #FFB800 0%, #FF8E53 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    %30'a Varan
                  </Box>{' '}
                  İndirimler
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, lineHeight: 1.7 }}
                >
                  Seçili kulaklık, akıllı saat ve hoparlör modellerinde kaçırılmayacak fırsatlar.
                  Kampanya 30 Nisan'a kadar geçerlidir.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #FFB800 0%, #FF8E53 100%)',
                    color: '#000',
                    fontWeight: 700,
                    boxShadow: '0 8px 32px rgba(255,184,0,0.3)',
                    '&:hover': {
                      boxShadow: '0 12px 48px rgba(255,184,0,0.5)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Kampanyaları Keşfet
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      )}

      {/* All Products or Filtered */}
      <FeaturedGrid
        products={filteredProducts}
        title={activeCategory ? `${filteredProducts[0]?.category || 'Ürünler'}` : 'Tüm Ürünler'}
        subtitle={
          activeCategory
            ? `${filteredProducts.length} ürün bulundu`
            : 'Tüm ürün yelpazemizi inceleyin'
        }
      />

      {/* Newsletter Section */}
      {!activeCategory && (
        <Box sx={{ py: 8 }}>
          <Container maxWidth="md">
            <Box
              sx={{
                textAlign: 'center',
                p: { xs: 4, md: 6 },
                borderRadius: '24px',
                background: 'rgba(14, 14, 22, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.05) 0%, rgba(0,217,255,0.05) 100%)',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
                  Fırsatları Kaçırmayın!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, maxWidth: 400, mx: 'auto' }}
                >
                  E‑bültenimize abone olun, özel indirimlerden ve yeni ürünlerden ilk siz haberdar olun.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    maxWidth: 450,
                    mx: 'auto',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  }}
                >
                  <Box
                    component="input"
                    placeholder="E-posta adresiniz"
                    sx={{
                      flex: 1,
                      minWidth: 200,
                      px: 2.5,
                      py: 1.5,
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      '&:focus': {
                        borderColor: '#6C63FF',
                      },
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.3)',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      px: 3,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Abone Ol
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;

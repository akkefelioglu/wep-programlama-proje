import { useRef } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, PhoneIphone, Laptop, Headphones, Watch, CameraAlt, Speaker } from '@mui/icons-material';
import { categories } from '../../data/products';

const iconMap: Record<string, React.ReactNode> = {
  PhoneIphone: <PhoneIphone sx={{ fontSize: 32 }} />,
  Laptop: <Laptop sx={{ fontSize: 32 }} />,
  Headphones: <Headphones sx={{ fontSize: 32 }} />,
  Watch: <Watch sx={{ fontSize: 32 }} />,
  CameraAlt: <CameraAlt sx={{ fontSize: 32 }} />,
  Speaker: <Speaker sx={{ fontSize: 32 }} />,
};

interface CategorySliderProps {
  onCategoryClick?: (slug: string) => void;
  activeCategory?: string;
}

const CategorySlider = ({ onCategoryClick, activeCategory }: CategorySliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              Kategoriler
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              İlgilendiğiniz kategoriyi seçin
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => scroll('left')}
              sx={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                '&:hover': { borderColor: '#6C63FF', background: 'rgba(108,99,255,0.1)' },
              }}
            >
              <ArrowBackIos sx={{ fontSize: 16, ml: 0.5 }} />
            </IconButton>
            <IconButton
              onClick={() => scroll('right')}
              sx={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                '&:hover': { borderColor: '#6C63FF', background: 'rgba(108,99,255,0.1)' },
              }}
            >
              <ArrowForwardIos sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>

        <Box
          ref={scrollRef}
          className="hide-scrollbar"
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            scrollSnapType: 'x mandatory',
          }}
        >
          {/* All category */}
          <Box
            onClick={() => onCategoryClick?.('')}
            sx={{
              minWidth: { xs: 150, md: 180 },
              p: 3,
              borderRadius: '20px',
              background: !activeCategory
                ? 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)'
                : 'rgba(14, 14, 22, 0.8)',
              border: '1px solid',
              borderColor: !activeCategory ? 'transparent' : 'rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              scrollSnapAlign: 'start',
              textAlign: 'center',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(108,99,255,0.2)',
              },
            }}
          >
            <Typography sx={{ fontSize: 32, mb: 1 }}>🏷️</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
              Tümü
            </Typography>
            <Typography variant="caption" sx={{ color: !activeCategory ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}>
              Tüm ürünler
            </Typography>
          </Box>

          {categories.map((cat, index) => (
            <Box
              key={cat.id}
              onClick={() => onCategoryClick?.(cat.slug)}
              sx={{
                minWidth: { xs: 150, md: 180 },
                p: 3,
                borderRadius: '20px',
                background: activeCategory === cat.slug
                  ? cat.gradient
                  : 'rgba(14, 14, 22, 0.8)',
                border: '1px solid',
                borderColor: activeCategory === cat.slug ? 'transparent' : 'rgba(255,255,255,0.06)',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                scrollSnapAlign: 'start',
                textAlign: 'center',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  background: activeCategory === cat.slug ? cat.gradient : 'rgba(14, 14, 22, 1)',
                  borderColor: 'rgba(108,99,255,0.3)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                },
              }}
            >
              <Box sx={{ color: activeCategory === cat.slug ? '#fff' : '#6C63FF', mb: 1 }}>
                {iconMap[cat.icon]}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
                {cat.name}
              </Typography>
              <Typography variant="caption" sx={{ color: activeCategory === cat.slug ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}>
                {cat.productCount} ürün
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategorySlider;

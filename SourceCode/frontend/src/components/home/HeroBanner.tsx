import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowForward, LocalShipping, Shield, Replay } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        minHeight: { xs: '70vh', md: '85vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #06060B 0%, #0d0d1a 30%, #120a20 60%, #0a1520 100%)',
      }}
    >
      {/* Animated background orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
          transform: 'translate(var(--mouse-x, 0), var(--mouse-y, 0))',
          transition: 'transform 0.5s ease-out',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      {/* Grid pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: 700 }}>
          {/* Tag */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.8,
              borderRadius: '50px',
              background: 'rgba(108,99,255,0.1)',
              border: '1px solid rgba(108,99,255,0.2)',
              mb: 3,
              animation: 'fadeInUp 0.6s ease-out',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#00E676',
                animation: 'pulse 2s infinite',
              }}
            />
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600, letterSpacing: '0.05em' }}>
              🇬🇧 İngiltere'nin #1 Online Teknoloji Mağazası
            </Typography>
          </Box>

          {/* Main Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 900,
              lineHeight: 1.1,
              mb: 3,
              animation: 'fadeInUp 0.8s ease-out',
            }}
          >
            Geleceğin{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Teknolojisi
            </Box>{' '}
            Bugün Elinizde
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 400,
              lineHeight: 1.7,
              mb: 4,
              maxWidth: 550,
              fontSize: { xs: '1rem', md: '1.15rem' },
              animation: 'fadeInUp 1s ease-out',
            }}
          >
            Premium teknoloji ürünlerini Londra'dan kapınıza kadar güvenle teslim ediyoruz.
            En yeni akıllı telefonlar, laptoplar ve daha fazlası.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              animation: 'fadeInUp 1.2s ease-out',
            }}
          >
            <Link to="/#products">
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                  boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
                  '&:hover': {
                    boxShadow: '0 12px 48px rgba(108,99,255,0.5)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Alışverişe Başla
              </Button>
            </Link>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: '14px',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                '&:hover': {
                  borderColor: 'rgba(108,99,255,0.5)',
                  background: 'rgba(108,99,255,0.08)',
                },
              }}
            >
              Kampanyaları Gör
            </Button>
          </Box>

          {/* Stats */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 3, md: 5 },
              mt: 6,
              animation: 'fadeInUp 1.4s ease-out',
            }}
          >
            {[
              { value: '50K+', label: 'Mutlu Müşteri' },
              { value: '2000+', label: 'Ürün Çeşidi' },
              { value: '4.9', label: 'Mağaza Puanı' },
            ].map((stat) => (
              <Box key={stat.label}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Bottom Features Bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          py: 2,
          background: 'rgba(14, 14, 22, 0.8)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, md: 6 },
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: <LocalShipping sx={{ fontSize: 20 }} />, text: 'Ücretsiz Kargo' },
              { icon: <Shield sx={{ fontSize: 20 }} />, text: '2 Yıl Garanti' },
              { icon: <Replay sx={{ fontSize: 20 }} />, text: '30 Gün İade' },
            ].map((feature) => (
              <Box
                key={feature.text}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <Box sx={{ color: '#6C63FF' }}>{feature.icon}</Box>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                  {feature.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroBanner;

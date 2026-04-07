import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  InputBase,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  Close,
  Home,
  Category,
  FavoriteBorder,
  Person,
  LocalShipping,
} from '@mui/icons-material';
import { categories } from '../../data/products';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [location]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? 'rgba(6, 6, 11, 0.95)'
            : 'rgba(6, 6, 11, 0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(108, 99, 255, 0.15)'
            : '1px solid rgba(255, 255, 255, 0.04)',
          transition: 'all 0.4s ease',
          zIndex: 1300,
        }}
      >
        {/* Top info bar */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #6C63FF 0%, #00D9FF 100%)',
            py: 0.5,
            textAlign: 'center',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.75rem' }}>
            🇬🇧 İngiltere'den Ücretsiz Kargo | 500₺ ve Üzeri Siparişlerde | Hızlı Teslimat
          </Typography>
        </Box>

        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, gap: 2 }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  BritMart
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.15em' }}
                >
                  LONDON EST. 2020
                </Typography>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3, ml: 4 }}>
                {[
                  { label: 'Ana Sayfa', path: '/' },
                  { label: 'Telefonlar', path: '/?category=telefonlar' },
                  { label: 'Laptoplar', path: '/?category=laptoplar' },
                  { label: 'Kulaklıklar', path: '/?category=kulakliklar' },
                  { label: 'Saatler', path: '/?category=saatler' },
                ].map((item) => (
                  <Link key={item.label} to={item.path}>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          color: '#fff',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -4,
                          left: 0,
                          width: 0,
                          height: 2,
                          background: 'linear-gradient(90deg, #6C63FF, #00D9FF)',
                          borderRadius: 1,
                          transition: 'width 0.3s ease',
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* Search */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: searchOpen ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderRadius: '12px',
                border: searchOpen ? '1px solid rgba(108, 99, 255, 0.3)' : '1px solid transparent',
                transition: 'all 0.4s ease',
                overflow: 'hidden',
                width: searchOpen ? { xs: 200, md: 300 } : 40,
              }}
            >
              <IconButton
                onClick={() => setSearchOpen(!searchOpen)}
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {searchOpen ? <Close fontSize="small" /> : <Search />}
              </IconButton>
              {searchOpen && (
                <InputBase
                  placeholder="Ürün ara..."
                  autoFocus
                  sx={{
                    color: '#fff',
                    fontSize: '0.9rem',
                    pr: 2,
                    '& input::placeholder': {
                      color: 'rgba(255,255,255,0.4)',
                    },
                  }}
                />
              )}
            </Box>

            {/* Action Icons */}
            <IconButton sx={{ color: 'rgba(255,255,255,0.7)', display: { xs: 'none', md: 'flex' } }}>
              <FavoriteBorder />
            </IconButton>
            <IconButton sx={{ color: 'rgba(255,255,255,0.7)', display: { xs: 'none', md: 'flex' } }}>
              <Person />
            </IconButton>
            <IconButton sx={{ color: 'rgba(255,255,255,0.7)' }}>
              <Badge
                badgeContent={3}
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                  },
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              background: 'rgba(6, 6, 11, 0.98)',
              backdropFilter: 'blur(30px)',
              width: 280,
              borderRight: '1px solid rgba(108, 99, 255, 0.15)',
            },
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BritMart
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          <Link to="/">
            <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
              <ListItemIcon sx={{ color: '#6C63FF', minWidth: 40 }}><Home /></ListItemIcon>
              <ListItemText primary="Ana Sayfa" sx={{ color: '#fff' }} />
            </ListItem>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} to={`/?category=${cat.slug}`}>
              <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
                <ListItemIcon sx={{ color: '#00D9FF', minWidth: 40 }}><Category /></ListItemIcon>
                <ListItemText primary={cat.name} sx={{ color: '#fff' }} />
              </ListItem>
            </Link>
          ))}
          <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
            <ListItemIcon sx={{ color: '#FF4D6A', minWidth: 40 }}><FavoriteBorder /></ListItemIcon>
            <ListItemText primary="Favorilerim" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
            <ListItemIcon sx={{ color: '#00E676', minWidth: 40 }}><LocalShipping /></ListItemIcon>
            <ListItemText primary="Siparişlerim" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Spacer to push content below fixed navbar */}
      <Box sx={{ height: { xs: 64, md: 90 } }} />
    </>
  );
};

export default Navbar;

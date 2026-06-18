import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Menu,
  MenuItem,
  Divider,
  Avatar,
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
  Login,
  Logout,
  AdminPanelSettings,
  Receipt,
} from '@mui/icons-material';
import { categories } from '../../data/products';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

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
    setAnchorEl(null);
  }, [location]);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleUserMenuClose();
    navigate('/');
  };

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

            {/* Favorites */}
            <IconButton sx={{ color: 'rgba(255,255,255,0.7)', display: { xs: 'none', md: 'flex' } }}>
              <FavoriteBorder />
            </IconButton>

            {/* User Menu */}
            {user ? (
              <>
                <IconButton onClick={handleUserMenuOpen} sx={{ p: 0.5 }}>
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      background: user.isAdmin
                        ? 'linear-gradient(135deg, #00E676, #00D9FF)'
                        : 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleUserMenuClose}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1.5,
                        background: 'rgba(14, 14, 22, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '14px',
                        minWidth: 200,
                      },
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {user.displayName || user.email}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                  <MenuItem
                    onClick={() => { navigate('/siparislerim'); handleUserMenuClose(); }}
                    sx={{ color: 'rgba(255,255,255,0.7)', py: 1.2, '&:hover': { background: 'rgba(108,99,255,0.08)' } }}
                  >
                    <Receipt sx={{ mr: 1.5, fontSize: 20, color: '#6C63FF' }} />
                    Siparişlerim
                  </MenuItem>
                  {user.isAdmin && (
                    <MenuItem
                      onClick={() => { navigate('/admin'); handleUserMenuClose(); }}
                      sx={{ color: 'rgba(255,255,255,0.7)', py: 1.2, '&:hover': { background: 'rgba(108,99,255,0.08)' } }}
                    >
                      <AdminPanelSettings sx={{ mr: 1.5, fontSize: 20, color: '#00E676' }} />
                      Admin Paneli
                    </MenuItem>
                  )}
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                  <MenuItem
                    onClick={handleLogout}
                    sx={{ color: '#FF4D6A', py: 1.2, '&:hover': { background: 'rgba(255,77,106,0.08)' } }}
                  >
                    <Logout sx={{ mr: 1.5, fontSize: 20 }} />
                    Çıkış Yap
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                onClick={() => navigate('/giris')}
                sx={{ color: 'rgba(255,255,255,0.7)', display: { xs: 'none', md: 'flex' } }}
              >
                <Person />
              </IconButton>
            )}

            {/* Cart */}
            <IconButton
              onClick={() => navigate('/sepet')}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <Badge
                badgeContent={totalItems}
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
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1 }} />
          {user ? (
            <>
              <Link to="/siparislerim">
                <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
                  <ListItemIcon sx={{ color: '#6C63FF', minWidth: 40 }}><Receipt /></ListItemIcon>
                  <ListItemText primary="Siparişlerim" sx={{ color: '#fff' }} />
                </ListItem>
              </Link>
              {user.isAdmin && (
                <Link to="/admin">
                  <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
                    <ListItemIcon sx={{ color: '#00E676', minWidth: 40 }}><AdminPanelSettings /></ListItemIcon>
                    <ListItemText primary="Admin Paneli" sx={{ color: '#fff' }} />
                  </ListItem>
                </Link>
              )}
              <ListItem onClick={handleLogout} sx={{ cursor: 'pointer', '&:hover': { background: 'rgba(255,77,106,0.1)' } }}>
                <ListItemIcon sx={{ color: '#FF4D6A', minWidth: 40 }}><Logout /></ListItemIcon>
                <ListItemText primary="Çıkış Yap" sx={{ color: '#FF4D6A' }} />
              </ListItem>
            </>
          ) : (
            <Link to="/giris">
              <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
                <ListItemIcon sx={{ color: '#00E676', minWidth: 40 }}><Login /></ListItemIcon>
                <ListItemText primary="Giriş Yap" sx={{ color: '#fff' }} />
              </ListItem>
            </Link>
          )}
          <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
            <ListItemIcon sx={{ color: '#FF4D6A', minWidth: 40 }}><FavoriteBorder /></ListItemIcon>
            <ListItemText primary="Favorilerim" sx={{ color: '#fff' }} />
          </ListItem>
          <Link to="/sepet">
            <ListItem sx={{ '&:hover': { background: 'rgba(108,99,255,0.1)' } }}>
              <ListItemIcon sx={{ color: '#00E676', minWidth: 40 }}><LocalShipping /></ListItemIcon>
              <ListItemText primary={`Sepetim (${totalItems})`} sx={{ color: '#fff' }} />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      {/* Spacer to push content below fixed navbar */}
      <Box sx={{ height: { xs: 64, md: 90 } }} />
    </>
  );
};

export default Navbar;

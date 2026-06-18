import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  Inventory2,
  QuestionAnswer,
  ArrowBack,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/admin' },
  { label: 'Ürün Yönetimi', icon: <Inventory2 />, path: '/admin/urunler' },
  { label: 'Mesajlar', icon: <QuestionAnswer />, path: '/admin/mesajlar' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '80vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          flexShrink: 0,
          background: 'rgba(14, 14, 22, 0.8)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Admin Header */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <AdminPanelSettings sx={{ color: '#6C63FF', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
              Admin Panel
            </Typography>
          </Box>
          {user && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                borderRadius: '12px',
                background: 'rgba(108,99,255,0.05)',
                border: '1px solid rgba(108,99,255,0.1)',
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {(user.displayName || user.email || 'A').charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
                  {user.displayName || user.email}
                </Typography>
                <Chip
                  label="Admin"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: '0.6rem',
                    background: 'rgba(0,230,118,0.1)',
                    color: '#00E676',
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        {/* Menu */}
        <List sx={{ px: 1.5, py: 2, flex: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <ListItemButton
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  sx={{
                    borderRadius: '12px',
                    mb: 0.5,
                    py: 1.2,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,217,255,0.08) 100%)'
                      : hoveredItem === item.path
                        ? 'rgba(108,99,255,0.05)'
                        : 'transparent',
                    border: isActive ? '1px solid rgba(108,99,255,0.2)' : '1px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? '#6C63FF' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                          fontSize: '0.9rem',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            );
          })}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        {/* Footer Actions */}
        <Box sx={{ p: 1.5 }}>
          <Link to="/">
            <ListItemButton
              sx={{
                borderRadius: '12px',
                mb: 0.5,
                color: 'rgba(255,255,255,0.5)',
                '&:hover': { background: 'rgba(108,99,255,0.05)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255,255,255,0.3)' }}>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText primary="Siteye Dön" slotProps={{ primary: { sx: { fontSize: '0.85rem' } } }} />
            </ListItemButton>
          </Link>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: '12px',
              color: '#FF4D6A',
              '&:hover': { background: 'rgba(255,77,106,0.05)' },
            }}
          >
            <ListItemText primary="Çıkış Yap" slotProps={{ primary: { sx: { fontSize: '0.85rem', fontWeight: 600 } } }} />
          </ListItemButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;

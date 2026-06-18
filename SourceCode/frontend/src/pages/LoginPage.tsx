import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await googleLogin();
      navigate('/');
    } catch {
      setError('Google ile giriş başarısız.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="page-enter"
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '28px',
            background: 'rgba(14, 14, 22, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                fontWeight: 900,
                fontSize: '1.8rem',
                color: '#fff',
              }}
            >
              B
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              Hoş Geldiniz
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              BritMart hesabınıza giriş yapın
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          {/* Demo info */}
          <Alert severity="info" sx={{ mb: 3, borderRadius: '12px' }}>
            <strong>Demo Giriş:</strong> Herhangi bir e-posta/şifre girin. Admin için:{' '}
            <strong>admin@britmart.co.uk</strong>
          </Alert>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-posta Adresi"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.3)' },
                  '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
                '& input': { color: '#fff' },
              }}
            />

            <TextField
              fullWidth
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.3)' },
                  '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
                '& input': { color: '#fff' },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
                '&:hover': {
                  boxShadow: '0 12px 48px rgba(108,99,255,0.5)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
            </Button>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.06)' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', px: 2 }}>
              veya
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{
              py: 1.3,
              borderRadius: '14px',
              borderColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'rgba(108,99,255,0.3)',
                background: 'rgba(108,99,255,0.05)',
              },
            }}
          >
            Google ile Giriş Yap
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Hesabınız yok mu?{' '}
              <Link to="/kayit">
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: '#6C63FF', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                >
                  Kayıt Olun
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;

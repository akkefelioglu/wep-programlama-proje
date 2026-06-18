import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Remove,
  Edit,
  Delete,
  AddCircle,
  Inventory2,
} from '@mui/icons-material';
import { products as initialProducts } from '../../data/products';
import type { Product } from '../../types/product';

const AdminProducts = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStock, setEditingStock] = useState<{ id: number; stock: number } | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    categorySlug: '',
    description: '',
    shortDescription: '',
    image: '/images/smartphone.png',
  });

  useEffect(() => {
    const saved = localStorage.getItem('adminProducts');
    if (saved) {
      setProductList(JSON.parse(saved));
    } else {
      // Initialize with stock data
      const withStock = initialProducts.map((p) => ({ ...p }));
      setProductList(withStock);
      localStorage.setItem('adminProducts', JSON.stringify(withStock));
    }
  }, []);

  const saveProducts = (prods: Product[]) => {
    setProductList(prods);
    localStorage.setItem('adminProducts', JSON.stringify(prods));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) return;

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      price: parseInt(newProduct.price),
      description: newProduct.description || newProduct.name + ' ürün açıklaması.',
      shortDescription: newProduct.shortDescription || newProduct.name,
      category: newProduct.category,
      categorySlug: newProduct.categorySlug || newProduct.category.toLowerCase().replace(/\s+/g, '-'),
      rating: 0,
      reviewCount: 0,
      image: newProduct.image,
      images: [newProduct.image],
      specs: {},
      reviews: [],
      inStock: true,
    };

    const updated = [...productList, product];
    saveProducts(updated);
    setOpenDialog(false);
    setNewProduct({
      name: '',
      price: '',
      category: '',
      categorySlug: '',
      description: '',
      shortDescription: '',
      image: '/images/smartphone.png',
    });
    setSnackbar({ open: true, message: 'Ürün başarıyla eklendi!' });
  };

  const handleStockChange = (id: number, delta: number) => {
    // Stock simulation - toggle inStock
    const updated = productList.map((p) => {
      if (p.id === id) {
        const currentStock = (p as Product & { stock?: number }).stock ?? 10;
        const newStock = Math.max(0, currentStock + delta);
        return { ...p, stock: newStock, inStock: newStock > 0 } as Product & { stock: number };
      }
      return p;
    });
    saveProducts(updated as Product[]);
  };

  const handleDeleteProduct = (id: number) => {
    const updated = productList.filter((p) => p.id !== id);
    saveProducts(updated);
    setSnackbar({ open: true, message: 'Ürün silindi.' });
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.03)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.3)' },
      '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& input, & textarea': { color: '#fff' },
  };

  return (
    <Box className="page-enter">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            <Inventory2 sx={{ mr: 1, verticalAlign: 'middle' }} />
            Ürün{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Yönetimi
            </Box>
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            {productList.length} ürün kayıtlı
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            fontWeight: 700,
            px: 3,
          }}
        >
          Yeni Ürün Ekle
        </Button>
      </Box>

      {/* Products Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '20px',
          background: 'rgba(14, 14, 22, 0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Ürün
              </TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Kategori
              </TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Fiyat
              </TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Stok
              </TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Durum
              </TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => {
              const stock = (product as Product & { stock?: number }).stock ?? 10;
              return (
                <TableRow
                  key={product.id}
                  sx={{
                    '&:hover': { background: 'rgba(108,99,255,0.03)' },
                    '& td': { borderBottom: '1px solid rgba(255,255,255,0.04)' },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.03)',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.name}
                          sx={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff' }}>
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      {product.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>
                      {product.price.toLocaleString('tr-TR')} ₺
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleStockChange(product.id, -1)}
                        sx={{ color: '#FF4D6A', '&:hover': { background: 'rgba(255,77,106,0.1)' } }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, minWidth: 24, textAlign: 'center', color: '#fff' }}
                      >
                        {stock}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleStockChange(product.id, 1)}
                        sx={{ color: '#00E676', '&:hover': { background: 'rgba(0,230,118,0.1)' } }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.inStock ? 'Stokta' : 'Tükendi'}
                      size="small"
                      sx={{
                        background: product.inStock ? 'rgba(0,230,118,0.1)' : 'rgba(255,77,106,0.1)',
                        color: product.inStock ? '#00E676' : '#FF4D6A',
                        fontWeight: 600,
                        border: `1px solid ${product.inStock ? 'rgba(0,230,118,0.2)' : 'rgba(255,77,106,0.2)'}`,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => setEditingStock({ id: product.id, stock })}
                      sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#6C63FF' } }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteProduct(product.id)}
                      sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#FF4D6A' } }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Product Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '24px',
              background: 'rgba(14, 14, 22, 0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          <AddCircle sx={{ mr: 1, verticalAlign: 'middle', color: '#6C63FF' }} />
          Yeni Ürün Ekle
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Ürün Adı"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Fiyat (₺)"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Kategori"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Kısa Açıklama"
                value={newProduct.shortDescription}
                onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Detaylı Açıklama"
                multiline
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ borderRadius: '12px', color: 'rgba(255,255,255,0.5)' }}
          >
            İptal
          </Button>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            sx={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              fontWeight: 700,
            }}
          >
            Ürün Ekle
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Stock Dialog */}
      <Dialog
        open={!!editingStock}
        onClose={() => setEditingStock(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '24px',
              background: 'rgba(14, 14, 22, 0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              minWidth: 300,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Stok Adedi Güncelle</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Stok Adedi"
            value={editingStock?.stock || 0}
            onChange={(e) =>
              editingStock && setEditingStock({ ...editingStock, stock: parseInt(e.target.value) || 0 })
            }
            sx={{ ...inputSx, mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditingStock(null)} sx={{ borderRadius: '12px' }}>
            İptal
          </Button>
          <Button
            onClick={() => {
              if (editingStock) {
                const updated = productList.map((p) => {
                  if (p.id === editingStock.id) {
                    return {
                      ...p,
                      stock: editingStock.stock,
                      inStock: editingStock.stock > 0,
                    } as Product & { stock: number };
                  }
                  return p;
                });
                saveProducts(updated as Product[]);
                setEditingStock(null);
                setSnackbar({ open: true, message: 'Stok güncellendi!' });
              }
            }}
            variant="contained"
            sx={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              fontWeight: 700,
            }}
          >
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{ borderRadius: '12px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminProducts;

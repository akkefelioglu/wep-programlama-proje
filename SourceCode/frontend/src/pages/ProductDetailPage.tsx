import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Breadcrumbs, Divider } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductSpecs from '../components/product/ProductSpecs';
import ProductReviews from '../components/product/ProductReviews';
import ProductCard from '../components/home/ProductCard';
import { getProductBySlug, getRelatedProducts } from '../data/products';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: '4rem' }}>
            😔
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Ürün Bulunamadı
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>
            Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
          </Typography>
          <Link to="/">
            <Typography
              sx={{
                color: '#6C63FF',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              ← Ana Sayfaya Dön
            </Typography>
          </Link>
        </Box>
      </Box>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <Box className="page-enter" sx={{ pb: 8 }}>
      {/* Breadcrumb */}
      <Box
        sx={{
          py: 2,
          background: 'rgba(14, 14, 22, 0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <Container maxWidth="xl">
          <Breadcrumbs
            separator={<NavigateNext sx={{ fontSize: 16, color: 'rgba(255,255,255,0.3)' }} />}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Home sx={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#6C63FF' } }}>
                Ana Sayfa
              </Typography>
            </Link>
            <Link to={`/?category=${product.categorySlug}`}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#6C63FF' } }}>
                {product.category}
              </Typography>
            </Link>
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
              {product.name}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Product Main Section */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={6}>
          {/* Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <ProductGallery images={product.images} productName={product.name} />
            </Box>
          </Grid>

          {/* Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>

        {/* Specs & Reviews */}
        <Box sx={{ mt: 8 }}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProductSpecs specs={product.specs} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProductReviews
                reviews={product.reviews}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 6 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, textAlign: 'center' }}>
              Benzer{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ürünler
              </Box>
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((rp, index) => (
                <Grid key={rp.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ProductCard product={rp} index={index} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetailPage;

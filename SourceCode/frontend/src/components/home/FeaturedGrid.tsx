import { Box, Container, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import type { Product } from '../../types/product';

interface FeaturedGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const FeaturedGrid = ({ products, title = 'Öne Çıkan Ürünler', subtitle = 'En çok tercih edilen ürünlerimizi keşfedin' }: FeaturedGridProps) => {
  return (
    <Box id="products" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
            }}
          >
            {title.split(' ').map((word, i) =>
              i === title.split(' ').length - 1 ? (
                <Box
                  key={i}
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {word}
                </Box>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, mx: 'auto' }}>
            {subtitle}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedGrid;

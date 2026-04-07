import { Box, Typography, Rating, LinearProgress, Avatar, Button } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import type { Review } from '../../types/product';

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

const ProductReviews = ({ reviews, rating, reviewCount }: ProductReviewsProps) => {
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
        Müşteri{' '}
        <Box
          component="span"
          sx={{
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Değerlendirmeleri
        </Box>
      </Typography>

      {/* Rating Summary */}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          mb: 4,
          p: 3,
          borderRadius: '20px',
          background: 'rgba(14, 14, 22, 0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
          flexWrap: 'wrap',
        }}
      >
        {/* Overall Rating */}
        <Box sx={{ textAlign: 'center', minWidth: 120 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFB800 0%, #FF8E53 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {rating}
          </Typography>
          <Rating value={rating} precision={0.1} readOnly sx={{ mb: 0.5 }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            {reviewCount} değerlendirme
          </Typography>
        </Box>

        {/* Distribution */}
        <Box sx={{ flex: 1, minWidth: 250 }}>
          {ratingDistribution.map(({ star, count, percentage }) => (
            <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.5)', minWidth: 24, textAlign: 'right' }}
              >
                {star}★
              </Typography>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.06)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #FFB800, #FF8E53)',
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.3)', minWidth: 24 }}
              >
                {count}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Reviews List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {reviews.map((review) => (
          <Box
            key={review.id}
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'rgba(14, 14, 22, 0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(108,99,255,0.15)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {review.userName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {review.userName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                    {new Date(review.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>
              <Rating value={review.rating} size="small" readOnly />
            </Box>

            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, mb: 1.5 }}
            >
              {review.comment}
            </Typography>

            <Button
              size="small"
              startIcon={<ThumbUp sx={{ fontSize: 14 }} />}
              sx={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
                textTransform: 'none',
                '&:hover': { color: '#6C63FF', background: 'rgba(108,99,255,0.08)' },
              }}
            >
              Faydalı ({review.helpful})
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductReviews;

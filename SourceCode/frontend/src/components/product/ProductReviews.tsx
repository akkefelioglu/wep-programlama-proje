import { useState, useEffect } from 'react';
import { Box, Typography, Rating, LinearProgress, Avatar, Button, TextField, Alert } from '@mui/material';
import { ThumbUp, RateReview } from '@mui/icons-material';
import type { Review } from '../../types/product';
import { useAuth } from '../../contexts/AuthContext';

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  productId: number;
}

interface StoredReview {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

const ProductReviews = ({ reviews, rating, reviewCount, productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState<number | null>(0);
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load user-added reviews from localStorage
  useEffect(() => {
    const stored: StoredReview[] = JSON.parse(localStorage.getItem('productReviews') || '[]');
    const productReviews = stored
      .filter((r) => r.productId === productId)
      .map((r) => ({
        id: r.id,
        userName: r.userName,
        rating: r.rating,
        date: r.date,
        comment: r.comment,
        helpful: r.helpful,
      }));
    setUserReviews(productReviews);
  }, [productId]);

  const allReviews = [...reviews, ...userReviews];

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = allReviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, percentage: allReviews.length > 0 ? (count / allReviews.length) * 100 : 0 };
  });

  const avgRating = allReviews.length > 0
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    : rating;

  const handleSubmitReview = () => {
    if (!newRating || !newComment.trim() || !user) return;

    const review: StoredReview = {
      id: Date.now(),
      productId,
      userName: user.displayName || user.email || 'Anonim',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment.trim(),
      helpful: 0,
    };

    const stored: StoredReview[] = JSON.parse(localStorage.getItem('productReviews') || '[]');
    stored.push(review);
    localStorage.setItem('productReviews', JSON.stringify(stored));

    setUserReviews((prev) => [
      ...prev,
      {
        id: review.id,
        userName: review.userName,
        rating: review.rating,
        date: review.date,
        comment: review.comment,
        helpful: 0,
      },
    ]);

    setNewRating(0);
    setNewComment('');
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
            {avgRating.toFixed(1)}
          </Typography>
          <Rating value={avgRating} precision={0.1} readOnly sx={{ mb: 0.5 }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            {reviewCount + userReviews.length} değerlendirme
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

      {/* Add Review Button / Form */}
      {submitted && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
          Değerlendirmeniz başarıyla eklendi! Teşekkür ederiz.
        </Alert>
      )}

      {user ? (
        <Box sx={{ mb: 4 }}>
          {!showForm ? (
            <Button
              variant="outlined"
              startIcon={<RateReview />}
              onClick={() => setShowForm(true)}
              sx={{
                borderRadius: '14px',
                borderColor: 'rgba(108,99,255,0.3)',
                color: '#6C63FF',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#6C63FF',
                  background: 'rgba(108,99,255,0.05)',
                },
              }}
            >
              Yorum Yaz
            </Button>
          ) : (
            <Box
              sx={{
                p: 3,
                borderRadius: '20px',
                background: 'rgba(14, 14, 22, 0.6)',
                border: '1px solid rgba(108,99,255,0.15)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Değerlendirmeniz
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Puanınız:
                </Typography>
                <Rating
                  value={newRating}
                  onChange={(_, value) => setNewRating(value)}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': { color: '#FFB800' },
                    '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.12)' },
                  }}
                />
                {newRating ? (
                  <Typography variant="body2" sx={{ color: '#FFB800', fontWeight: 600 }}>
                    {newRating}/5
                  </Typography>
                ) : null}
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Ürün hakkındaki düşüncelerinizi paylaşın..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.03)',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
                  },
                  '& textarea': { color: '#fff' },
                }}
              />

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmitReview}
                  disabled={!newRating || !newComment.trim()}
                  sx={{
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                    fontWeight: 700,
                  }}
                >
                  Gönder
                </Button>
                <Button
                  onClick={() => {
                    setShowForm(false);
                    setNewRating(0);
                    setNewComment('');
                  }}
                  sx={{ borderRadius: '12px', color: 'rgba(255,255,255,0.4)' }}
                >
                  İptal
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            mb: 4,
            p: 2.5,
            borderRadius: '14px',
            background: 'rgba(108,99,255,0.05)',
            border: '1px solid rgba(108,99,255,0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Yorum yazmak için lütfen{' '}
            <Typography component="a" href="/giris" variant="body2" sx={{ color: '#6C63FF', fontWeight: 600 }}>
              giriş yapın
            </Typography>
          </Typography>
        </Box>
      )}

      {/* Reviews List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {allReviews.map((review) => (
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

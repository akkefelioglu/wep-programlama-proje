import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  QuestionAnswer,
  Send,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import {
  getQuestionsByProduct,
  askQuestion as apiAskQuestion,
  type QuestionDTO,
} from '../../config/api';

interface Question {
  id: string;
  productId: number;
  userName: string;
  userEmail: string;
  question: string;
  date: string;
  answer?: string;
  answeredBy?: string;
  answeredDate?: string;
}

interface ProductQAProps {
  productId: number;
  productName: string;
}

const ProductQA = ({ productId, productName }: ProductQAProps) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      // Backend'den soruları çek
      const data = await getQuestionsByProduct(productId);
      if (data.length > 0) {
        setQuestions(
          data.map((q: QuestionDTO) => ({
            id: String(q.id || 'Q-' + Date.now()),
            productId: q.productId,
            userName: q.userName,
            userEmail: q.userEmail,
            question: q.question,
            date: q.questionDate || new Date().toISOString(),
            answer: q.answer,
            answeredBy: q.answeredBy,
            answeredDate: q.answerDate,
          }))
        );
      } else {
        // localStorage fallback
        const allQuestions: Question[] = JSON.parse(localStorage.getItem('productQuestions') || '[]');
        setQuestions(allQuestions.filter((q) => q.productId === productId));
      }
    };

    fetchQuestions();
  }, [productId]);

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim() || !user) return;

    const questionData: QuestionDTO = {
      productId,
      userName: user.displayName || user.email || 'Anonim',
      userEmail: user.email || '',
      question: newQuestion.trim(),
    };

    // Backend'e gönder
    const result = await apiAskQuestion(questionData);

    const question: Question = {
      id: result?.id ? String(result.id) : 'Q-' + Date.now(),
      productId,
      userName: questionData.userName,
      userEmail: questionData.userEmail,
      question: questionData.question,
      date: new Date().toISOString(),
    };

    // localStorage'a da kaydet (fallback & admin panel)
    const allQuestions: Question[] = JSON.parse(localStorage.getItem('productQuestions') || '[]');
    allQuestions.push(question);
    localStorage.setItem('productQuestions', JSON.stringify(allQuestions));

    setQuestions((prev) => [...prev, question]);
    setNewQuestion('');
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
        <QuestionAnswer sx={{ mr: 1, verticalAlign: 'middle' }} />
        Soru &{' '}
        <Box
          component="span"
          sx={{
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cevap
        </Box>
      </Typography>

      {/* Ask Question Form */}
      {user ? (
        <Box
          sx={{
            mb: 4,
            p: 3,
            borderRadius: '20px',
            background: 'rgba(14, 14, 22, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
            {productName} hakkında sorunuzu sorun
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Ürün hakkında merak ettiğiniz soruyu yazın..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.3)' },
                  '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
                },
                '& textarea': { color: '#fff' },
                '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.3)' },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmitQuestion}
              disabled={!newQuestion.trim()}
              sx={{
                borderRadius: '14px',
                minWidth: 56,
                background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
                alignSelf: 'flex-end',
              }}
            >
              <Send />
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 4,
            p: 3,
            borderRadius: '16px',
            background: 'rgba(108,99,255,0.05)',
            border: '1px solid rgba(108,99,255,0.15)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Soru sormak için lütfen{' '}
            <Typography component="a" href="/giris" variant="body2" sx={{ color: '#6C63FF', fontWeight: 600 }}>
              giriş yapın
            </Typography>
          </Typography>
        </Box>
      )}

      {/* Questions List */}
      {questions.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)' }}>
            Henüz bu ürün hakkında soru sorulmamış. İlk soruyu siz sorun!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {questions.map((q) => (
            <Box
              key={q.id}
              sx={{
                p: 3,
                borderRadius: '16px',
                background: 'rgba(14, 14, 22, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: 'rgba(108,99,255,0.15)' },
              }}
            >
              {/* Question */}
              <Box sx={{ display: 'flex', gap: 2, mb: q.answer ? 2 : 0 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {q.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {q.userName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                      {new Date(q.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    {q.question}
                  </Typography>
                </Box>
              </Box>

              {/* Answer */}
              {q.answer && (
                <>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 2 }} />
                  <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        background: 'linear-gradient(135deg, #00E676, #00D9FF)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                      }}
                    >
                      <AdminPanelSettings sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#00E676' }}>
                          {q.answeredBy || 'BritMart'}
                        </Typography>
                        <Chip
                          label="Satıcı"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            background: 'rgba(0,230,118,0.1)',
                            color: '#00E676',
                            fontWeight: 700,
                          }}
                        />
                        {q.answeredDate && (
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                            {new Date(q.answeredDate).toLocaleDateString('tr-TR')}
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                        {q.answer}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}

              {!q.answer && (
                <Box sx={{ mt: 1.5, pl: 6.5 }}>
                  <Chip
                    label="Cevap bekleniyor"
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      background: 'rgba(255,184,0,0.1)',
                      color: '#FFB800',
                      fontWeight: 600,
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductQA;

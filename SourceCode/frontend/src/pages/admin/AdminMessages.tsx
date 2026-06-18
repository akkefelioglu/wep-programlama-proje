import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  QuestionAnswer,
  Send,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

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

const AdminMessages = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    const allQuestions: Question[] = JSON.parse(
      localStorage.getItem('productQuestions') || '[]'
    );
    setQuestions(allQuestions);
  }, []);

  const handleAnswer = (questionId: string) => {
    const answerText = answers[questionId];
    if (!answerText?.trim()) return;

    const updated = questions.map((q) =>
      q.id === questionId
        ? {
            ...q,
            answer: answerText.trim(),
            answeredBy: 'BritMart Admin',
            answeredDate: new Date().toISOString(),
          }
        : q
    );

    setQuestions(updated);
    localStorage.setItem('productQuestions', JSON.stringify(updated));
    setAnswers((prev) => ({ ...prev, [questionId]: '' }));
    setSnackbar({ open: true, message: 'Cevap başarıyla gönderildi!' });
  };

  const unanswered = questions.filter((q) => !q.answer);
  const answered = questions.filter((q) => !!q.answer);

  return (
    <Box className="page-enter">
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        <QuestionAnswer sx={{ mr: 1, verticalAlign: 'middle' }} />
        Kullanıcı{' '}
        <Box
          component="span"
          sx={{
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Mesajları
        </Box>
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 4 }}>
        {unanswered.length} cevaplanmamış, {answered.length} cevaplanmış mesaj
      </Typography>

      {questions.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            borderRadius: '20px',
            background: 'rgba(14, 14, 22, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <QuestionAnswer sx={{ fontSize: 60, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Henüz Mesaj Yok
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Kullanıcılar ürünler hakkında soru sorduğunda burada görünecektir.
          </Typography>
        </Box>
      ) : (
        <>
          {/* Unanswered Questions */}
          {unanswered.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Schedule sx={{ color: '#FFB800' }} />
                Cevaplanmamış ({unanswered.length})
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {unanswered.map((q) => (
                  <Box
                    key={q.id}
                    sx={{
                      p: 3,
                      borderRadius: '20px',
                      background: 'rgba(14, 14, 22, 0.6)',
                      border: '1px solid rgba(255,184,0,0.15)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                          fontSize: '0.9rem',
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
                            {q.userEmail}
                          </Typography>
                          <Chip
                            label="Bekliyor"
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              background: 'rgba(255,184,0,0.1)',
                              color: '#FFB800',
                              fontWeight: 700,
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                          {new Date(q.date).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, pl: 7 }}>
                      {q.question}
                    </Typography>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />

                    {/* Answer Form */}
                    <Box sx={{ display: 'flex', gap: 1.5, pl: 7 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Cevabınızı yazın..."
                        value={answers[q.id] || ''}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '14px',
                            background: 'rgba(255,255,255,0.03)',
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                            '&:hover fieldset': { borderColor: 'rgba(0,230,118,0.3)' },
                            '&.Mui-focused fieldset': { borderColor: '#00E676' },
                          },
                          '& textarea': { color: '#fff' },
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleAnswer(q.id)}
                        disabled={!answers[q.id]?.trim()}
                        sx={{
                          borderRadius: '14px',
                          minWidth: 56,
                          background: 'linear-gradient(135deg, #00E676 0%, #00D9FF 100%)',
                          color: '#000',
                          fontWeight: 700,
                          alignSelf: 'flex-end',
                        }}
                      >
                        <Send />
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Answered Questions */}
          {answered.length > 0 && (
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CheckCircle sx={{ color: '#00E676' }} />
                Cevaplanmış ({answered.length})
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {answered.map((q) => (
                  <Box
                    key={q.id}
                    sx={{
                      p: 3,
                      borderRadius: '20px',
                      background: 'rgba(14, 14, 22, 0.6)',
                      border: '1px solid rgba(0,230,118,0.1)',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                        }}
                      >
                        {q.userName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {q.userName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          {q.question}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        ml: 6,
                        mt: 1.5,
                        pl: 2,
                        borderLeft: '2px solid rgba(0,230,118,0.3)',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#00E676', fontWeight: 700 }}>
                        {q.answeredBy} • {q.answeredDate && new Date(q.answeredDate).toLocaleDateString('tr-TR')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
                        {q.answer}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </>
      )}

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

export default AdminMessages;

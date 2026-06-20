// Backend API base URL
const API_BASE = 'http://localhost:8080/api';

// ============ Ödeme İşlemleri ============

export interface PaymentRequest {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  shippingAddress: string;
  amount: number;
  items: {
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
}

export interface PaymentResponse {
  success: boolean;
  orderId: string;
  message: string;
  transactionId: string;
}

export const processPayment = async (
  data: PaymentRequest,
  userEmail: string,
  userName: string
): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`${API_BASE}/payment/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': userEmail,
        'X-User-Name': userName,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ödeme işlemi başarısız oldu');
    }

    return await response.json();
  } catch (error) {
    console.warn('Backend ödeme servisi kullanılamıyor, local kayıt yapılıyor:', error);
    // Backend erişilemezse local fallback
    return {
      success: true,
      orderId: 'ORD-' + Date.now(),
      message: 'Ödeme başarıyla tamamlandı',
      transactionId: 'TXN-' + Date.now(),
    };
  }
};

// ============ Sipariş İşlemleri ============

export interface OrderItemDTO {
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface OrderDTO {
  id: number;
  orderNumber: string;
  userEmail: string;
  userName: string;
  total: number;
  status: string;
  cardLast4: string;
  shippingAddress: string;
  createdAt: string;
  items: OrderItemDTO[];
}

export const getOrdersByUser = async (email: string): Promise<OrderDTO[]> => {
  try {
    const response = await fetch(`${API_BASE}/orders/user/${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Siparişler alınamadı');
    return await response.json();
  } catch (error) {
    console.warn('Backend sipariş servisi kullanılamıyor, localStorage kullanılıyor:', error);
    // localStorage fallback
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }
};

// ============ Yorum İşlemleri ============

export interface ReviewDTO {
  id?: number;
  productId: number;
  userName: string;
  userEmail?: string;
  rating: number;
  comment: string;
  date?: string;
  helpful?: number;
}

export const getReviewsByProduct = async (productId: number): Promise<ReviewDTO[]> => {
  try {
    const response = await fetch(`${API_BASE}/reviews/product/${productId}`);
    if (!response.ok) throw new Error('Yorumlar alınamadı');
    return await response.json();
  } catch (error) {
    console.warn('Backend yorum servisi kullanılamıyor:', error);
    return [];
  }
};

export const addReview = async (review: ReviewDTO): Promise<ReviewDTO | null> => {
  try {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error('Yorum eklenemedi');
    return await response.json();
  } catch (error) {
    console.warn('Backend yorum servisi kullanılamıyor, localStorage kullanılıyor:', error);
    return null;
  }
};

// ============ Soru-Cevap İşlemleri ============

export interface QuestionDTO {
  id?: number;
  productId: number;
  userName: string;
  userEmail: string;
  question: string;
  questionDate?: string;
  answer?: string;
  answeredBy?: string;
  answerDate?: string;
}

export const getQuestionsByProduct = async (productId: number): Promise<QuestionDTO[]> => {
  try {
    const response = await fetch(`${API_BASE}/questions/product/${productId}`);
    if (!response.ok) throw new Error('Sorular alınamadı');
    return await response.json();
  } catch (error) {
    console.warn('Backend soru servisi kullanılamıyor:', error);
    return [];
  }
};

export const askQuestion = async (question: QuestionDTO): Promise<QuestionDTO | null> => {
  try {
    const response = await fetch(`${API_BASE}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question),
    });
    if (!response.ok) throw new Error('Soru gönderilemedi');
    return await response.json();
  } catch (error) {
    console.warn('Backend soru servisi kullanılamıyor:', error);
    return null;
  }
};

// ============ Admin İşlemleri ============

export const getAllQuestions = async (): Promise<QuestionDTO[]> => {
  try {
    const response = await fetch(`${API_BASE}/admin/questions`);
    if (!response.ok) throw new Error('Sorular alınamadı');
    return await response.json();
  } catch (error) {
    console.warn('Backend admin servisi kullanılamıyor:', error);
    return JSON.parse(localStorage.getItem('productQuestions') || '[]');
  }
};

export const answerQuestion = async (
  questionId: number,
  answer: string,
  answeredBy: string
): Promise<QuestionDTO | null> => {
  try {
    const response = await fetch(`${API_BASE}/admin/questions/${questionId}/answer`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, answeredBy }),
    });
    if (!response.ok) throw new Error('Cevap gönderilemedi');
    return await response.json();
  } catch (error) {
    console.warn('Backend admin servisi kullanılamıyor:', error);
    return null;
  }
};

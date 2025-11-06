import type { Question, Category, TimeWindowOption } from './types';

// 시간 범위 옵션
export const timeWindowOptions: TimeWindowOption[] = [
  { value: '30min', label: '최근 30분', minutes: 30 },
  { value: '1hour', label: '최근 1시간', minutes: 60 },
  { value: '2hours', label: '최근 2시간', minutes: 120 },
  { value: '24hours', label: '최근 24시간', minutes: 1440 },
];

// 카테고리 목 데이터
export const mockCategories: Category[] = [
  { id: '1', name: '청바지', color: '#c8bdff' },
  { id: '2', name: '이벤트 B', color: '#562efd' },
  { id: '3', name: '블랙프라이데이', color: '#152840' },
  { id: '4', name: '배송문의', color: '#ff6b6b' },
  { id: '5', name: '취소/환불', color: '#4ecdc4' },
];

// 질문 목 데이터
export const mockQuestions: Question[] = [
  {
    id: '1',
    content: '청바지 A의 기장은 몇 cm인가요?',
    count: 8,
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15분 전
    category: '청바지',
    answers: [
      {
        id: 'a1',
        agentName: '상담원 김지훈',
        content: '청바지 A 모델은 26인치 기준 기장 95cm, 28인치 기준 97cm입니다. (FAQ 링크 첨부)',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
      },
      {
        id: 'a2',
        agentName: '상담원 이서연',
        content: '현재 A제품의 기장 정보는 사이즈별로 다릅니다. 95cm와 97cm로 확인되시며, 고객님 사이즈에 맞춰 상세 안내해 드렸습니다.',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
      },
      {
        id: 'a3',
        agentName: '상담원 박민수',
        content: 'A 모델은 26인치 기준 95-96cm, 28인치 기준 97cm 입니다.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
    ],
  },
  {
    id: '2',
    content: '혹시 신규 이벤트 B에 쿠폰 C가 적용가능할까요?',
    count: 7,
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20분 전
    category: '이벤트 B',
    answers: [
      {
        id: 'a4',
        agentName: '상담원 최하늘',
        content: '네, 이벤트 B와 쿠폰 C는 중복 적용 가능합니다. 다만 최대 할인 한도는 30,000원까지입니다.',
        timestamp: new Date(Date.now() - 18 * 60 * 1000),
      },
      {
        id: 'a5',
        agentName: '상담원 정예림',
        content: '쿠폰 C는 이벤트 B와 함께 사용하실 수 있으며, 추가로 5% 할인이 적용됩니다.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
      },
    ],
  },
  {
    id: '3',
    content: '연말 블랙 프라이데이 이벤트는 올해 언제 진행되나요?',
    count: 6,
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25분 전
    category: '블랙프라이데이',
    answers: [
      {
        id: 'a6',
        agentName: '상담원 송민지',
        content: '올해 블랙프라이데이 이벤트는 11월 24일부터 27일까지 4일간 진행됩니다.',
        timestamp: new Date(Date.now() - 22 * 60 * 1000),
      },
      {
        id: 'a7',
        agentName: '상담원 강태현',
        content: '11월 24일 오전 10시부터 시작되며, 최대 70% 할인 혜택이 제공됩니다.',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
      },
    ],
  },
  {
    id: '4',
    content: '청바지 A 재고는 언제 들어오나요?',
    count: 5,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
    category: '청바지',
    answers: [
      {
        id: 'a8',
        agentName: '상담원 윤서아',
        content: '청바지 A는 다음 주 수요일에 재입고 예정입니다. 알림 신청 도와드릴까요?',
        timestamp: new Date(Date.now() - 28 * 60 * 1000),
      },
    ],
  },
  {
    id: '5',
    content: '배송은 얼마나 걸리나요?',
    count: 4,
    timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35분 전
    category: '배송문의',
    answers: [
      {
        id: 'a9',
        agentName: '상담원 한도윤',
        content: '서울/경기 지역은 1-2일, 그 외 지역은 2-3일 소요됩니다.',
        timestamp: new Date(Date.now() - 33 * 60 * 1000),
      },
      {
        id: 'a10',
        agentName: '상담원 임지우',
        content: '평균 배송 기간은 영업일 기준 2-3일이며, 제주/도서 지역은 추가 1-2일 소요됩니다.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
    ],
  },
  {
    id: '6',
    content: '취소는 어떻게 하나요?',
    count: 4,
    timestamp: new Date(Date.now() - 40 * 60 * 1000), // 40분 전
    category: '취소/환불',
    answers: [
      {
        id: 'a11',
        agentName: '상담원 오채원',
        content: '마이페이지 > 주문내역에서 취소 가능하며, 배송 전이라면 전액 환불됩니다.',
        timestamp: new Date(Date.now() - 38 * 60 * 1000),
      },
    ],
  },
  {
    id: '7',
    content: '이벤트 B는 언제까지 진행되나요?',
    count: 3,
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45분 전
    category: '이벤트 B',
    answers: [
      {
        id: 'a12',
        agentName: '상담원 서준혁',
        content: '이벤트 B는 이번 달 말일(31일) 자정까지 진행됩니다.',
        timestamp: new Date(Date.now() - 43 * 60 * 1000),
      },
    ],
  },
  {
    id: '8',
    content: '청바지 사이즈 교환 가능한가요?',
    count: 3,
    timestamp: new Date(Date.now() - 50 * 60 * 1000), // 50분 전
    category: '청바지',
    answers: [
      {
        id: 'a13',
        agentName: '상담원 김나연',
        content: '네, 상품 수령 후 7일 이내 교환 가능합니다. 단, 착용 흔적이 없어야 합니다.',
        timestamp: new Date(Date.now() - 48 * 60 * 1000),
      },
    ],
  },
];

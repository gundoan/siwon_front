// 답변 타입
export interface Answer {
  id: string;
  agentName: string;
  content: string;
  timestamp: Date;
}

// 질문 타입
export interface Question {
  id: string;
  content: string;
  count: number;
  timestamp: Date;
  category?: string;
  answers: Answer[];
}

// 카테고리 타입
export interface Category {
  id: string;
  name: string;
  color: string;
}

// 시간 범위 타입
export type TimeWindow = '30min' | '1hour' | '2hours' | '24hours';

// 시간 범위 옵션
export interface TimeWindowOption {
  value: TimeWindow;
  label: string;
  minutes: number;
}

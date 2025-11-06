import React, { useState, useMemo } from 'react';
import type { TimeWindow, Question } from '../types';
import { mockQuestions, mockCategories, timeWindowOptions } from '../mockData';
import TimeWindowSelector from './TimeWindowSelector';
import QuestionList from './QuestionList';
import CategoryManager from './CategoryManager';
import AnswerReferencePanel from './AnswerReferencePanel';

const Dashboard: React.FC = () => {
  const [selectedTimeWindow, setSelectedTimeWindow] =
    useState<TimeWindow>('1hour');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  // 선택된 시간 범위에 따라 질문 필터링
  const filteredQuestions = useMemo(() => {
    const now = Date.now();
    const selectedOption = timeWindowOptions.find(
      (opt) => opt.value === selectedTimeWindow
    );
    if (!selectedOption) return mockQuestions;

    const timeWindowMs = selectedOption.minutes * 60 * 1000;

    return mockQuestions
      .filter((question) => {
        const questionTime = new Date(question.timestamp).getTime();
        return now - questionTime <= timeWindowMs;
      })
      .sort((a, b) => b.count - a.count); // 카운트 높은 순으로 정렬
  }, [selectedTimeWindow]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                채널톡 상담원 대시보드
              </h1>
              <p className="text-gray-600 mt-1">
                실시간 핫 이슈를 파악하고 효율적으로 대응하세요
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">실시간 업데이트 중</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 시간 범위 선택 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            집계 시간 범위
          </h3>
          <TimeWindowSelector
            selectedWindow={selectedTimeWindow}
            onWindowChange={setSelectedTimeWindow}
          />
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 문의</p>
                <p className="text-3xl font-bold text-channel-purple mt-1">
                  {filteredQuestions.reduce((sum, q) => sum + q.count, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-channel-purple-light rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">질문 유형</p>
                <p className="text-3xl font-bold text-channel-purple mt-1">
                  {filteredQuestions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-channel-purple-light rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 문의/질문</p>
                <p className="text-3xl font-bold text-channel-purple mt-1">
                  {filteredQuestions.length > 0
                    ? (
                        filteredQuestions.reduce((sum, q) => sum + q.count, 0) /
                        filteredQuestions.length
                      ).toFixed(1)
                    : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-channel-purple-light rounded-full flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* 질문 리스트 */}
        <div className="mb-8">
          <QuestionList
            questions={filteredQuestions}
            onQuestionClick={setSelectedQuestion}
            selectedQuestionId={selectedQuestion?.id}
          />
        </div>

        {/* 카테고리 매니저 */}
        <div>
          <CategoryManager
            categories={mockCategories}
            questions={filteredQuestions}
          />
        </div>
      </main>

      {/* 답변 참고 패널 */}
      <AnswerReferencePanel
        question={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
      />
    </div>
  );
};

export default Dashboard;

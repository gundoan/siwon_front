import React, { useState } from 'react';
import type { Question } from '../types';

interface AnswerReferencePanelProps {
  question: Question | null;
  onClose: () => void;
}

const AnswerReferencePanel: React.FC<AnswerReferencePanelProps> = ({
  question,
  onClose,
}) => {
  const [showToast, setShowToast] = useState(false);

  if (!question) return null;

  // AI가 추천하는 핵심 답변 (실제로는 LLM으로 생성)
  const getRecommendedAnswer = () => {
    if (question.answers.length === 0) return null;

    // 간단한 로직: 가장 짧은 답변을 추천 (실제로는 LLM 사용)
    return question.answers.reduce((shortest, current) =>
      current.content.length < shortest.content.length ? current : shortest
    );
  };

  const recommendedAnswer = getRecommendedAnswer();

  const handleCopy = () => {
    if (recommendedAnswer) {
      navigator.clipboard.writeText(recommendedAnswer.content);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-channel-purple text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">동료 상담원 답변 참고</h2>
              <p className="text-channel-purple-light">{question.content}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 동료 상담원 답변들 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              동료 상담원들은 아래와 같이 답변하였습니다
            </h3>
            <div className="space-y-4">
              {question.answers.map((answer) => (
                <div
                  key={answer.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-channel-purple transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-channel-purple-light rounded-full flex items-center justify-center text-channel-purple font-bold">
                      {answer.agentName.charAt(answer.agentName.length - 1)}
                    </div>
                    <span className="font-semibold text-gray-800">
                      {answer.agentName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(answer.timestamp).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed ml-10">
                    {answer.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI 추천 답변 */}
          {recommendedAnswer && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border-2 border-channel-purple">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-channel-purple text-white px-3 py-1 rounded-full text-sm font-bold">
                  AI 추천
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  추천 핵심 답변
                </h3>
              </div>
              <p className="text-gray-800 leading-relaxed font-medium">
                {recommendedAnswer.content}
              </p>
              <div className="mt-4 text-sm text-gray-600">
                이 답변은 동료 상담원들의 답변을 분석하여 AI가 추천한 답변입니다.
              </div>
            </div>
          )}

          {question.answers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              아직 답변 내역이 없습니다.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            닫기
          </button>
          <button
            className="px-6 py-2 bg-channel-purple text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            onClick={handleCopy}
          >
            추천 답변 복사
          </button>
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">답변이 복사되었습니다</span>
        </div>
      )}
    </div>
  );
};

export default AnswerReferencePanel;

import React from 'react';
import type { Question } from '../types';

interface QuestionListProps {
  questions: Question[];
  onQuestionClick: (question: Question) => void;
  selectedQuestionId?: string;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onQuestionClick,
  selectedQuestionId,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        최근 가장 많이 나온 질문들
      </h2>
      <div className="space-y-3">
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            해당 시간대에 질문이 없습니다.
          </p>
        ) : (
          questions.map((question, index) => (
            <div
              key={question.id}
              onClick={() => onQuestionClick(question)}
              className={`
                p-4 rounded-lg cursor-pointer transition-all duration-200
                ${
                  selectedQuestionId === question.id
                    ? 'bg-channel-purple-light border-2 border-channel-purple'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-channel-purple">
                      {index + 1}.
                    </span>
                    <p className="text-gray-800 font-medium flex-1">
                      {question.content}
                    </p>
                  </div>
                  {question.category && (
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-channel-purple text-white">
                      {question.category}
                    </span>
                  )}
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <div className="bg-channel-purple text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {question.count}
                  </div>
                  <span className="text-xs text-gray-500">명</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionList;

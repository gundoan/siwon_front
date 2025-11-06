import React, { useState } from 'react';
import type { Category, Question } from '../types';

interface CategoryManagerProps {
  categories: Category[];
  questions: Question[];
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  questions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리별 질문 수 계산
  const getCategoryCount = (categoryName: string) => {
    return questions.filter((q) => q.category === categoryName).length;
  };

  // 카테고리별 총 문의 횟수 계산
  const getCategoryTotalCount = (categoryName: string) => {
    return questions
      .filter((q) => q.category === categoryName)
      .reduce((sum, q) => sum + q.count, 0);
  };

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        카테고리별 분석
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        LLM 기반으로 질문들을 카테고리별로 그룹화했습니다
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => {
          const count = getCategoryCount(category.name);
          const totalCount = getCategoryTotalCount(category.name);
          const isSelected = selectedCategory === category.name;

          return (
            <div
              key={category.id}
              onClick={() =>
                setSelectedCategory(isSelected ? null : category.name)
              }
              className={`
                p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                ${
                  isSelected
                    ? 'border-channel-purple shadow-md transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-bold text-gray-800">{category.name}</h3>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-channel-purple">
                  {totalCount}
                </span>
                <span className="text-sm text-gray-500">
                  건 ({count}개 질문)
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCategory && filteredQuestions.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-3">
            "{selectedCategory}" 카테고리 질문 상세
          </h3>
          <div className="space-y-2">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="p-3 bg-white rounded border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">{question.content}</p>
                  <span className="ml-2 px-2 py-1 bg-channel-purple text-white rounded text-sm font-medium">
                    {question.count}명
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;

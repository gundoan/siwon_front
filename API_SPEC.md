# 채널톡 상담원 대시보드 API 명세서

## 기본 정보

- **Base URL**: `https://api.example.com/v1`
- **Content-Type**: `application/json`
- **인증 방식**: Bearer Token (추후 구현)

---

## 1. 질문 목록 조회

실시간 빈출 질문 목록을 시간 범위별로 조회합니다.

### Endpoint
```
GET /questions
```

### Query Parameters

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|---------|------|------|------|------|
| timeWindow | string | Yes | 시간 범위 | `30min`, `1hour`, `2hours`, `24hours` |
| limit | number | No | 최대 결과 개수 (기본값: 10) | `10` |
| categoryId | string | No | 카테고리 필터링 | `category-1` |

### Request Example
```bash
GET /questions?timeWindow=1hour&limit=10
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "q-12345",
        "content": "청바지 A의 기장은 몇 cm인가요?",
        "count": 8,
        "timestamp": "2024-11-07T12:30:00Z",
        "category": "청바지",
        "categoryId": "cat-1",
        "answers": [
          {
            "id": "a-67890",
            "agentName": "상담원 김지훈",
            "content": "청바지 A 모델은 26인치 기준 기장 95cm, 28인치 기준 97cm입니다.",
            "timestamp": "2024-11-07T12:25:00Z"
          }
        ]
      }
    ],
    "totalCount": 15,
    "timeWindow": "1hour"
  }
}
```

### Error Response (400 Bad Request)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TIME_WINDOW",
    "message": "유효하지 않은 시간 범위입니다."
  }
}
```

---

## 2. 카테고리 목록 조회

등록된 카테고리 목록을 조회합니다.

### Endpoint
```
GET /categories
```

### Request Example
```bash
GET /categories
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat-1",
        "name": "청바지",
        "color": "#c8bdff",
        "description": "청바지 관련 문의"
      },
      {
        "id": "cat-2",
        "name": "이벤트 B",
        "color": "#562efd",
        "description": "이벤트 B 관련 문의"
      },
      {
        "id": "cat-3",
        "name": "블랙프라이데이",
        "color": "#152840",
        "description": "블랙프라이데이 이벤트 문의"
      },
      {
        "id": "cat-4",
        "name": "배송문의",
        "color": "#ff6b6b",
        "description": "배송 관련 문의"
      },
      {
        "id": "cat-5",
        "name": "취소/환불",
        "color": "#4ecdc4",
        "description": "취소 및 환불 관련 문의"
      }
    ]
  }
}
```

---

## 3. 특정 질문 상세 조회

특정 질문의 상세 정보와 답변 목록을 조회합니다.

### Endpoint
```
GET /questions/{questionId}
```

### Path Parameters

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| questionId | string | 질문 ID |

### Request Example
```bash
GET /questions/q-12345
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "q-12345",
    "content": "청바지 A의 기장은 몇 cm인가요?",
    "count": 8,
    "timestamp": "2024-11-07T12:30:00Z",
    "category": "청바지",
    "categoryId": "cat-1",
    "answers": [
      {
        "id": "a-67890",
        "agentName": "상담원 김지훈",
        "agentId": "agent-001",
        "content": "청바지 A 모델은 26인치 기준 기장 95cm, 28인치 기준 97cm입니다. (FAQ 링크 첨부)",
        "timestamp": "2024-11-07T12:25:00Z"
      },
      {
        "id": "a-67891",
        "agentName": "상담원 이서연",
        "agentId": "agent-002",
        "content": "현재 A제품의 기장 정보는 사이즈별로 다릅니다. 95cm와 97cm로 확인되시며, 고객님 사이즈에 맞춰 상세 안내해 드렸습니다.",
        "timestamp": "2024-11-07T12:28:00Z"
      }
    ],
    "recommendedAnswer": {
      "content": "26인치 기준 95-96cm, 28인치 기준 97cm 입니다.",
      "confidence": 0.95
    }
  }
}
```

### Error Response (404 Not Found)

```json
{
  "success": false,
  "error": {
    "code": "QUESTION_NOT_FOUND",
    "message": "질문을 찾을 수 없습니다."
  }
}
```

---

## 4. 카테고리별 통계 조회

카테고리별 질문 통계를 조회합니다.

### Endpoint
```
GET /statistics/categories
```

### Query Parameters

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|---------|------|------|------|------|
| timeWindow | string | Yes | 시간 범위 | `30min`, `1hour`, `2hours`, `24hours` |

### Request Example
```bash
GET /statistics/categories?timeWindow=1hour
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "timeWindow": "1hour",
    "statistics": [
      {
        "categoryId": "cat-1",
        "categoryName": "청바지",
        "questionCount": 3,
        "totalInquiries": 16,
        "averageInquiriesPerQuestion": 5.3
      },
      {
        "categoryId": "cat-2",
        "categoryName": "이벤트 B",
        "questionCount": 2,
        "totalInquiries": 11,
        "averageInquiriesPerQuestion": 5.5
      }
    ],
    "totalQuestions": 8,
    "totalInquiries": 45
  }
}
```

---

## 5. 전체 대시보드 통계 조회

대시보드 전체 통계를 조회합니다.

### Endpoint
```
GET /statistics/dashboard
```

### Query Parameters

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|---------|------|------|------|------|
| timeWindow | string | Yes | 시간 범위 | `30min`, `1hour`, `2hours`, `24hours` |

### Request Example
```bash
GET /statistics/dashboard?timeWindow=1hour
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "timeWindow": "1hour",
    "totalInquiries": 45,
    "totalQuestions": 8,
    "averageInquiriesPerQuestion": 5.6,
    "topCategories": [
      {
        "categoryId": "cat-1",
        "categoryName": "청바지",
        "count": 16
      },
      {
        "categoryId": "cat-2",
        "categoryName": "이벤트 B",
        "count": 11
      }
    ],
    "topQuestions": [
      {
        "id": "q-12345",
        "content": "청바지 A의 기장은 몇 cm인가요?",
        "count": 8
      }
    ]
  }
}
```

---

## 6. AI 추천 답변 생성 (선택적)

LLM을 사용하여 질문에 대한 추천 답변을 생성합니다.

### Endpoint
```
POST /ai/recommend-answer
```

### Request Body

```json
{
  "questionId": "q-12345",
  "answers": [
    {
      "id": "a-67890",
      "content": "청바지 A 모델은 26인치 기준 기장 95cm, 28인치 기준 97cm입니다."
    }
  ]
}
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "recommendedAnswer": "26인치 기준 95-96cm, 28인치 기준 97cm 입니다.",
    "confidence": 0.95,
    "reasoning": "여러 상담원의 답변을 종합하여 가장 정확하고 간결한 답변을 생성했습니다."
  }
}
```

---

## 에러 코드

| 코드 | 설명 |
|------|------|
| `INVALID_TIME_WINDOW` | 유효하지 않은 시간 범위 |
| `INVALID_PARAMETERS` | 잘못된 파라미터 |
| `QUESTION_NOT_FOUND` | 질문을 찾을 수 없음 |
| `CATEGORY_NOT_FOUND` | 카테고리를 찾을 수 없음 |
| `INTERNAL_SERVER_ERROR` | 서버 내부 오류 |
| `UNAUTHORIZED` | 인증 실패 |
| `FORBIDDEN` | 권한 없음 |

---

## 공통 Response 형식

### 성공 응답
```json
{
  "success": true,
  "data": { ... }
}
```

### 실패 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "오류 메시지",
    "details": { ... }
  }
}
```

---

## 추가 기능 (Phase 2)

### 7. 카테고리 생성/수정/삭제
```
POST   /categories
PUT    /categories/{categoryId}
DELETE /categories/{categoryId}
```

### 8. 질문 수동 분류
```
PUT /questions/{questionId}/category
```

### 9. 답변 평가 (유용한 답변 표시)
```
POST /answers/{answerId}/rating
```

### 10. 실시간 알림 (WebSocket)
```
WS /ws/notifications
```

---

## 버전 히스토리

- **v1.0** (2024-11-07): 초기 API 명세서 작성
  - 질문 목록 조회
  - 카테고리 관리
  - 통계 조회
  - AI 추천 답변

---

## 개발 노트

1. **인증**: 현재는 구현되지 않았으나, 추후 JWT 기반 인증 추가 예정
2. **페이지네이션**: 대량 데이터 처리를 위해 추후 페이지네이션 추가 예정
3. **Rate Limiting**: API 남용 방지를 위한 rate limiting 추가 예정
4. **WebSocket**: 실시간 업데이트를 위한 WebSocket 연결 지원 예정

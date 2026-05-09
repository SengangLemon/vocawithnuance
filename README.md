# VocaWithNuance — 배포 가이드

## 프로젝트 구조

```
vocawithnuance/
├── index.html          ← 메인 앱 (PWA)
├── manifest.json       ← PWA 매니페스트
├── sw.js              ← 서비스 워커 (오프라인 지원)
├── app_icon.png       ← 앱 아이콘
├── data/
│   ├── voca_t1.db.gz  ← Tier 1 (5.8MB)
│   ├── voca_t2.db.gz  ← Tier 2 (8.0MB)
│   ├── voca_t3.db.gz  ← Tier 3 (10.4MB)
│   ├── voca_t4.db.gz  ← Tier 4 (13.2MB)
│   └── voca_t5.db.gz  ← Tier 5 (91.7MB) ← 선택적
└── README.md
```

## 무료 배포 방법

### 방법 1: GitHub Pages (추천)

1. **GitHub 계정 생성** (없다면): https://github.com
2. **새 리포지토리 생성**: `vocawithnuance` 이름으로
3. **파일 업로드**: 
   - `/home/claude/vocawithnuance/` 폴더의 모든 파일을 업로드
   - data 폴더에 .db.gz 파일들을 업로드
4. **GitHub Pages 활성화**:
   - Settings → Pages → Source: Deploy from a branch → main → /(root) → Save
5. **URL 공유**: `https://[username].github.io/vocawithnuance/`

> **주의**: GitHub 리포지토리 크기 제한은 1GB입니다. 
> Tier 5 (91.7MB)를 제외하면 ~38MB로 충분합니다.
> Tier 5를 포함하려면 GitHub LFS를 사용하세요.

### 방법 2: Cloudflare Pages (대용량 파일에 적합)

1. https://pages.cloudflare.com 에서 무료 계정 생성
2. GitHub 리포 연결 또는 직접 업로드
3. 자동 배포, 무료 SSL, 무제한 대역폭

### 방법 3: Vercel (가장 간단)

1. https://vercel.com 에서 GitHub 로그인
2. 리포지토리 Import
3. 자동 배포

## 비공개 접근 제한 방법

몇몇 사람만 쓸 수 있게 하려면:

1. **URL만 공유**: GitHub Pages URL을 아는 사람만 접근 가능 (검색 엔진에 노출될 수 있음)
2. **비밀번호 보호**: index.html에 간단한 비밀번호 체크 추가 (이미 포함됨)
3. **Private 리포**: GitHub Pro에서 Private 리포의 Pages 지원

## 기술 스택

- **sql.js**: SQLite를 WebAssembly로 브라우저에서 실행
- **IndexedDB**: 다운로드한 DB 파일을 로컬에 캐싱
- **PWA**: 오프라인 사용 지원, 홈 화면에 추가 가능
- **순수 HTML/CSS/JS**: 프레임워크 없이 경량 구현

## 데이터 로딩 방식

1. 사용자가 Tier를 선택하면 해당 .db.gz 파일을 다운로드
2. 브라우저에서 gzip 압축 해제
3. sql.js로 SQLite DB를 메모리에 로드
4. IndexedDB에 캐싱 (다음 방문 시 재다운로드 불필요)
5. 북마크와 학습 진행도는 IndexedDB에 별도 저장

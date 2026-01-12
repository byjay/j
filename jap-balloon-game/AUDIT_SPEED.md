# AUDIT_SPEED.md: AssetManager 및 Spline iframe 부하 분석 보고서

## 1. 개요
본 보고서는 `jap-balloon-game` 프로젝트의 `AssetManager.ts`와 `App.tsx` 내 Spline iframe 연동 구조를 분석하여, 모바일 환경에서의 로딩 지연 가능성과 메모리 누수 요인을 진단하고 개선안을 제시합니다.

## 2. 현황 분석

### 2.1. AssetManager.ts (분석 결과)
- **상태**: 현재 `AssetManager.ts` 파일은 비어있거나 거의 내용이 없는 상태로 확인되었습니다.
- **리스크**: 중앙 집중식 자산 관리 로직이 부재하여, 각 컴포넌트에서 개별적으로 자산을 로드할 경우 중복 로딩 및 메모리 파편화가 발생할 가능성이 매우 높습니다.

### 2.2. Spline iframe 연동 (`App.tsx`)
- **코드 패턴**:
  ```tsx
  <iframe
      src="https://my.spline.design/toonpinballjoaobaltieri-3nKY9m0Mk9NNJOrsA7VOlEpD/"
      frameBorder="0"
      width="100%"
      height="100%"
  ></iframe>
  ```
- **문제점**:
    - **네트워크 부하**: 매번 iframe을 통해 외부 URL을 호출하므로 초기 로딩 속도(LCP)에 악영향을 미칩니다.
    - **메모리 누수**: React의 Life Cycle에 따라 컴포넌트가 언마운트될 때 iframe 내의 WebGL 컨텍스트가 명시적으로 해제되지 않으면 GPU 메모리 점유가 지속될 수 있습니다.
    - **모바일 제약**: 저사양 기기에서 iframe 내부의 3D 씬 연산과 메인 스레드 UI 연산이 충돌하여 프레임 드랍이 발생할 가능성이 큽니다.

## 3. 주요 위험 요인 (Audit Findings)

| 항목 | 위험도 | 상세 내용 |
| :--- | :--- | :--- |
| **초기 로딩 지연** | High | Spline 런타임 및 모델 데이터를 외부 서버에서 매번 다운로드함. 모바일 환경에서 3~5초 이상의 지연 예상. |
| **GPU 메모리 누수** | Medium | 게임 오버 후 재시작 시 `window.location.reload()`를 사용함. 이는 브라우저가 자원을 해제하게 하지만, SPA 관점에서는 비효율적이며 누적된 캐시가 문제를 일으킬 수 있음. |
| **이벤트 처리 병목** | Low | `onChange`를 통한 텍스트 입력 처리와 3D 배경 렌더링이 동일 기기 자원을 공유함. |
| **자산 관리 부재** | High | `AssetManager`가 역할을 하지 못해 폰트, 효과음 등 추가 자산 로드 시 최적화 계획이 없음. |

## 4. 개선 제안 (Recommendations)

### 4.1. Spline Runtime 사용 권장
- **iframe 제거**: `@splinetool/runtime` 패키지를 사용하여 iframe 대신 직접 캔버스에 렌더링할 것을 권장합니다.
- **장점**: 씬 오브젝트에 직접 접근하여 게임 로직과 상호작용이 가능하며, 메모리 관리가 용이합니다.

### 4.2. AssetManager 고도화 (구현 가이드)
- **싱글톤 패턴**: `AssetManager`를 싱글톤으로 구성하여 중복 로딩 방지.
- **자원 해제 로직**: `dispose()` 메서드를 구현하여 컴포넌트 언마운트 시 WebGL 컨텍스트 및 오디오 버퍼를 명시적으로 해제.

### 4.3. 모바일 최적화 전략
- **Low-poly 모델**: 모바일 감지 시 더 낮은 폴리곤의 Spline 씬으로 교체 유도.
- **Lazy Loading**: `React.lazy` 및 `Suspense`를 활용하여 3D 씬이 로드될 때까지 UI 플레이스홀더 노출.

## 5. 결론
현재의 iframe 방식은 프로토타이핑에는 적합하나, 실제 서비스 수준의 모바일 게임 성능을 보장하기 어렵습니다. `@splinetool/runtime` 도입과 `AssetManager`의 실질적인 구현이 시급합니다.

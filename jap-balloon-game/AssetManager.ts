import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { extend } from '@react-three/fiber';

extend({ TextGeometry });

// 폰트 데이터 URL (Google Fonts: M PLUS Rounded 1c - Bold를 typeface로 변환한 샘플)
// 실제로는 로컬이나 신뢰할 수 있는 CDN에서 가져와야 함.
// 여기서는 Three.js 기본 폰트(helvetiker)를 예시로 사용하되, 향후 교체 가능하도록 구조화.
export const FontURL = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';

# 프로젝트 파일 구조 점검 및 정리 리포트
**생성일:** 2026-01-09 09:37:46

## 1. 정리 대상 후보 (삭제/이동 권장)
| 상태 | 파일 경로 | 설명/이유 | 삭제 스크립트 포함 여부 |
|---|---|---|---|

## 2. 전체 파일 구조 및 역할 정의
| 경로 | 역할 | 참조 횟수 |
|---|---|---|
| `.claude/settings.local.json` | 기타/일반 파일 | 1 |
| `.dockerignore` | 기타/일반 파일 | 2 |
| `.github/workflows/daily_sync.yml` | 기타/일반 파일 | 2 |
| `.gitignore` | 기타/일반 파일 | 2 |
| `CONVENTIONS.md` | 문서/가이드 | 1 |
| `Dockerfile` | 기타/일반 파일 | 2 |
| `ERROR_REPORT.md` | 문서/가이드 | 1 |
| `FINAL_REPORT.md` | 문서/가이드 | 1 |
| `REF/참조.mp4` | 기타/일반 파일 | 2 |
| `ads.txt` | 기타/일반 파일 | 2 |
| `analyze_ui.py` | Python 스크립트/유틸리티 | 2 |
| `auto_deploy.py` | Python 스크립트/유틸리티 | 2 |
| `backend/.env.example` | 백엔드/API 서버 코드 | 2 |
| `backend/character_system.py` | 백엔드/API 서버 코드 | 2 |
| `backend/comprehensive_word.py` | 백엔드/API 서버 코드 | 2 |
| `backend/config.py` | 백엔드/API 서버 코드 | 2 |
| `backend/data/characters.json` | 백엔드/API 서버 코드 | 3 |
| `backend/data/collected_words.json` | 백엔드/API 서버 코드 | 3 |
| `backend/data/comprehensive_words.json` | 백엔드/API 서버 코드 | 3 |
| `backend/data/conversations.json` | 백엔드/API 서버 코드 | 4 |
| `backend/data/grammar_data.json` | 백엔드/API 서버 코드 | 3 |
| `backend/data/kanji_data.json` | 백엔드/API 서버 코드 | 3 |
| `backend/data/user_mom.json` | 백엔드/API 서버 코드 | 2 |
| `backend/data/user_sieun.json` | 백엔드/API 서버 코드 | 2 |
| `backend/data/verb_conjugations.json` | 백엔드/API 서버 코드 | 3 |
| `backend/data/words.json` | 백엔드/API 서버 코드 | 6 |
| `backend/grammar_collector.py` | 백엔드/API 서버 코드 | 2 |
| `backend/kanji_collector.py` | 백엔드/API 서버 코드 | 2 |
| `backend/main.py` | **백엔드/API 서버 코드** | 4 |
| `backend/requirements.txt` | 백엔드/API 서버 코드 | 2 |
| `backend/routers/scraper.py` | 백엔드/API 서버 코드 | 2 |
| `backend/verb_conjugator.py` | 백엔드/API 서버 코드 | 2 |
| `backend/word_collector.py` | 백엔드/API 서버 코드 | 2 |
| `blog.html` | 기타/일반 파일 | 2 |
| `claude_review.md` | 문서/가이드 | 5 |
| `clean_files.py` | Python 스크립트/유틸리티 | 5 |
| `cleanup_report.md` | 문서/가이드 | 2 |
| `cpp/audit_core.cpp` | 기타/일반 파일 | 3 |
| `css/styles.css` | 스타일시트 | 4 |
| `data/fukuoka_poi_data.js` | 정적 데이터 (JSON) | 8 |
| `data/guest_avatars.json` | 정적 데이터 (JSON) | 4 |
| `deep_dependency_analyzer.py` | Python 스크립트/유틸리티 | 2 |
| `dependency_report.md` | 문서/가이드 | 2 |
| `deploy_manual.html` | 기타/일반 파일 | 2 |
| `docker-compose.yml` | 기타/일반 파일 | 2 |
| `docs/DEPLOYMENT_ENV_SETUP.md` | 문서/가이드 | 2 |
| `docs/ENV_SETUP_EXPLAINED.md` | 문서/가이드 | 2 |
| `docs/RAILWAY_SETUP_GUIDE.md` | 문서/가이드 | 2 |
| `docs/RAILWAY_SETUP_STEP_BY_STEP.md` | 문서/가이드 | 2 |
| `docs/RAILWAY_VARIABLES_SETUP.md` | 문서/가이드 | 2 |
| `docs/README_API_SETUP.md` | 문서/가이드 | 2 |
| `docs/TEACHING_METHODOLOGY.md` | 문서/가이드 | 2 |
| `elementary/grade_1.js` | 초등학교 모듈 (구조 개선 필요) | 5 |
| `elementary/grade_1_enhanced.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_2.js` | 초등학교 모듈 (구조 개선 필요) | 5 |
| `elementary/grade_2_enhanced.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_3.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_3_enhanced.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_4.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_4_enhanced.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_5.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_5_enhanced.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_6.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `elementary/grade_6_enhanced.js` | 초등학교 모듈 (구조 개선 필요) | 4 |
| `fukuoka_itinerary.html` | 기타/일반 파일 | 5 |
| `god_mode.sh` | 기타/일반 파일 | 1 |
| `images/BACK.png` | 이미지 자산 | 5 |
| `images/app_icon.png` | 이미지 자산 | 8 |
| `images/avatars/avatar_1.png` | 이미지 자산 | 4 |
| `images/avatars/avatar_10.png` | 이미지 자산 | 2 |
| `images/avatars/avatar_11.png` | 이미지 자산 | 2 |
| `images/avatars/avatar_12.png` | 이미지 자산 | 2 |
| `images/avatars/avatar_2.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_3.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_4.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_5.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_6.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_7.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_8.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_9.png` | 이미지 자산 | 3 |
| `images/avatars/avatar_p_1.png` | 이미지 자산 | 4 |
| `images/avatars/avatar_p_2.png` | 이미지 자산 | 4 |
| `images/avatars/avatar_p_3.png` | 이미지 자산 | 4 |
| `images/avatars/avatar_p_4.png` | 이미지 자산 | 4 |
| `images/avatars/avatar_p_5.png` | 이미지 자산 | 4 |
| `images/avatars/avatar_p_6.png` | 이미지 자산 | 4 |
| `images/blog/app_demo.webp` | 이미지 자산 | 3 |
| `images/blog/hiragana_grid.png` | 이미지 자산 | 3 |
| `images/blog/home_screen.png` | 이미지 자산 | 3 |
| `images/blog/login_screen.png` | 이미지 자산 | 3 |
| `images/blog/writing_practice.png` | 이미지 자산 | 3 |
| `images/dad.png` | 이미지 자산 | 6 |
| `images/dad_dancing.png` | 이미지 자산 | 3 |
| `images/guest.png` | 이미지 자산 | 2 |
| `images/harong.png` | 이미지 자산 | 6 |
| `images/harong_dancing.png` | 이미지 자산 | 3 |
| `images/mom_dancing.png` | 이미지 자산 | 3 |
| `images/mom_orig.png` | 이미지 자산 | 6 |
| `images/sieun.png` | 이미지 자산 | 6 |
| `images/sieun_dancing.png` | 이미지 자산 | 4 |
| `images/squirrel.png` | 이미지 자산 | 3 |
| `images/travel/bus_display.png` | 이미지 자산 | 2 |
| `images/travel/bus_ticket.png` | 이미지 자산 | 2 |
| `images/travel/canal_city.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/amu_plaza.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/cafe_del_sol.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/canal_city.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/canal_city_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/daimyo_street.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/dazaifu_tenmangu_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/don_quijote.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/donki_nakasu_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/fuk_airport.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/fukuoka_airport_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/fukuoka_airport_anime.png` | 이미지 자산 | 1 |
| `images/travel/fukuoka/fukuoka_tower_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/hakata_bento.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/hakata_issou.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/hakata_issou_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/hakata_issou_anime.png` | 이미지 자산 | 1 |
| `images/travel/fukuoka/hakata_station.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/ichiran_head.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/ichiran_hq.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/ichiran_ramen_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/kamado_jigoku_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/kinrin_lake.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/kinrin_lake_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/kushida_shrine.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/momochi_beach_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/montan_hakata_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/montan_hakata_anime.png` | 이미지 자산 | 1 |
| `images/travel/fukuoka/motsunabe_rakutenchi.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/nakasu_river.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/nakasu_yatai.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/nakasu_yatai_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/nakasu_yatai_anime.png` | 이미지 자산 | 1 |
| `images/travel/fukuoka/ohori_park.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/ohori_park_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/shinshin_ramen.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/sumiyoshi_shrine.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/tanya_hakata.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/tenjin_underground_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/udon_taira.jpg` | 이미지 자산 | 3 |
| `images/travel/fukuoka/yatai_nakasu.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/yufuin_onsen.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/yufuin_village_8k.png` | 이미지 자산 | 2 |
| `images/travel/fukuoka/yufuin_yunotsubo.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/yufumabushi_shin.jpg` | 이미지 자산 | 2 |
| `images/travel/fukuoka/yunohana_8k.png` | 이미지 자산 | 2 |
| `images/travel/hakone/hakone_3.jpg` | 이미지 자산 | 2 |
| `images/travel/hakone/hakone_4.jpg` | 이미지 자산 | 2 |
| `images/travel/hiroshima/hiroshima_1.jpg` | 이미지 자산 | 2 |
| `images/travel/hiroshima/hiroshima_2.jpg` | 이미지 자산 | 2 |
| `images/travel/hiroshima/hiroshima_3.jpg` | 이미지 자산 | 2 |
| `images/travel/hiroshima/hiroshima_4.jpg` | 이미지 자산 | 2 |
| `images/travel/kanazawa/kanazawa_4.jpg` | 이미지 자산 | 2 |
| `images/travel/kyoto/kyoto_1.jpg` | 이미지 자산 | 2 |
| `images/travel/kyoto/kyoto_2.jpg` | 이미지 자산 | 2 |
| `images/travel/kyoto/kyoto_3.jpg` | 이미지 자산 | 2 |
| `images/travel/kyoto/kyoto_4.jpg` | 이미지 자산 | 2 |
| `images/travel/kyoto/kyoto_5.jpg` | 이미지 자산 | 2 |
| `images/travel/kyoto/kyoto_7.jpg` | 이미지 자산 | 2 |
| `images/travel/montan_hakata.png` | 이미지 자산 | 2 |
| `images/travel/nagasaki/nagasaki_5.jpg` | 이미지 자산 | 2 |
| `images/travel/nakasu_yatai.png` | 이미지 자산 | 2 |
| `images/travel/nikko/nikko_1.jpg` | 이미지 자산 | 2 |
| `images/travel/nikko/nikko_4.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_10.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_11.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_12.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_13.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_15.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_17.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_18.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_2.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_20.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_22.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_24.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_26.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_27.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_31.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_36.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_37.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_39.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_4.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_43.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_46.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_47.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_48.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_5.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_52.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_56.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_57.jpg` | 이미지 자산 | 2 |
| `images/travel/okinawa/okinawa_59.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_10.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_13.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_14.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_16.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_17.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_18.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_19.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_21.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_24.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_27.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_28.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_30.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_32.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_33.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_34.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_35.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_39.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_42.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_44.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_47.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_48.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_51.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_53.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_54.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_56.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_58.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_59.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_62.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_64.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_65.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_68.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_7.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_72.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_73.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_74.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_76.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_78.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_79.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_8.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_81.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_82.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_84.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_85.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_86.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_88.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_89.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_9.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_91.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_93.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_94.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_95.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_96.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_98.jpg` | 이미지 자산 | 2 |
| `images/travel/sapporo/sapporo_99.jpg` | 이미지 자산 | 2 |
| `images/travel/sendai/sendai_1.jpg` | 이미지 자산 | 2 |
| `images/travel/sendai/sendai_2.jpg` | 이미지 자산 | 2 |
| `images/travel/yokohama/yokohama_1.jpg` | 이미지 자산 | 2 |
| `images/travel/yokohama/yokohama_4.jpg` | 이미지 자산 | 2 |
| `index.html` | **메인 엔트리 포인트 (핵심)** | 16 |
| `js/api_client.js` | 기타/일반 파일 | 5 |
| `js/app_core.js` | 기타/일반 파일 | 1 |
| `js/audit.js` | 기타/일반 파일 | 2 |
| `js/audit_bridge.js` | 기타/일반 파일 | 2 |
| `js/auth.js` | 기타/일반 파일 | 6 |
| `js/commercial.js` | 기타/일반 파일 | 3 |
| `js/game_launcher.js` | 기타/일반 파일 | 4 |
| `js/games/neon_syntax.js` | 게임 로직 | 5 |
| `js/games/silent_archive.js` | 게임 로직 | 4 |
| `js/games/verbum_alchimia.js` | 게임 로직 | 4 |
| `js/gamification.js` | 기타/일반 파일 | 4 |
| `js/learning/characters.js` | 학습/교육 모듈 | 4 |
| `js/learning/conversation.js` | 학습/교육 모듈 | 4 |
| `js/learning/elementary.js` | 학습/교육 모듈 | 3 |
| `js/learning/elementary_school.js` | 학습/교육 모듈 | 6 |
| `js/learning/grammar.js` | 학습/교육 모듈 | 3 |
| `js/learning/learning_tracker.js` | 학습/교육 모듈 | 4 |
| `js/learning/progress.js` | 학습/교육 모듈 | 3 |
| `js/learning/stroke_animation.js` | 학습/교육 모듈 | 3 |
| `js/learning/study.js` | 학습/교육 모듈 | 5 |
| `js/learning/vocabulary.js` | 학습/교육 모듈 | 3 |
| `js/learning/word_study.js` | 학습/교육 모듈 | 4 |
| `js/learning/words_data.js` | 학습/교육 모듈 | 4 |
| `js/logging_service.js` | 기타/일반 파일 | 7 |
| `js/manual.js` | 기타/일반 파일 | 5 |
| `js/section_loader.js` | 기타/일반 파일 | 1 |
| `js/shopping/donki.js` | 쇼핑 정보 로직 | 3 |
| `js/shopping/drugstore.js` | 쇼핑 정보 로직 | 3 |
| `js/sushi_survival.js` | 기타/일반 파일 | 5 |
| `js/travel/TravelModule.js` | 여행 관련 로직 | 7 |
| `js/travel/fukuoka.js` | 여행 관련 로직 | 9 |
| `js/travel/fukuoka_poi_data.bak.js` | 여행 관련 로직 | 2 |
| `js/travel/fukuoka_poi_data.js` | 여행 관련 로직 | 8 |
| `js/travel/hakone.js` | 여행 관련 로직 | 4 |
| `js/travel/hiroshima.js` | 여행 관련 로직 | 4 |
| `js/travel/img/fukuoka/fukoaka_Ohori_Park_1.png` | 여행 관련 로직 | 1 |
| `js/travel/japan_travel.js` | 여행 관련 로직 | 8 |
| `js/travel/kanazawa.js` | 여행 관련 로직 | 4 |
| `js/travel/kobe.js` | 여행 관련 로직 | 4 |
| `js/travel/kyoto.js` | 여행 관련 로직 | 5 |
| `js/travel/leaflet_map.js` | 여행 관련 로직 | 4 |
| `js/travel/nagasaki.js` | 여행 관련 로직 | 4 |
| `js/travel/nagoya.js` | 여행 관련 로직 | 4 |
| `js/travel/nara.js` | 여행 관련 로직 | 4 |
| `js/travel/nikko.js` | 여행 관련 로직 | 4 |
| `js/travel/okinawa.js` | 여행 관련 로직 | 4 |
| `js/travel/osaka.js` | 여행 관련 로직 | 6 |
| `js/travel/osaka_poi_data.js` | 여행 관련 로직 | 3 |
| `js/travel/route_helper.js` | 여행 관련 로직 | 5 |
| `js/travel/sapporo.js` | 여행 관련 로직 | 4 |
| `js/travel/sendai.js` | 여행 관련 로직 | 4 |
| `js/travel/tokyo.js` | 여행 관련 로직 | 6 |
| `js/travel/transportation.js` | 여행 관련 로직 | 3 |
| `js/travel/yokohama.js` | 여행 관련 로직 | 4 |
| `js/travel/사진수집.zip` | 여행 관련 로직 | 1 |
| `js/ui.js` | 기타/일반 파일 | 5 |
| `manifest.json` | 기타/일반 파일 | 3 |
| `migrate_data.py` | Python 스크립트/유틸리티 | 2 |
| `netlify.toml` | 기타/일반 파일 | 2 |
| `path/to/filename.js` | 기타/일반 파일 | 1 |
| `project_cleanup_audit.py` | Python 스크립트/유틸리티 | 3 |
| `railway.toml` | 기타/일반 파일 | 2 |
| `run_test.bat` | 기타/일반 파일 | 2 |
| `sections/ai_conversation.html` | 기타/일반 파일 | 1 |
| `sections/ai_sentence.html` | 기타/일반 파일 | 1 |
| `sections/arcade.html` | 기타/일반 파일 | 2 |
| `sections/bottom_nav.html` | 기타/일반 파일 | 2 |
| `sections/characters.html` | 기타/일반 파일 | 2 |
| `sections/conversation.html` | 기타/일반 파일 | 2 |
| `sections/elementary.html` | 기타/일반 파일 | 3 |
| `sections/fukuoka_iframe.html` | 기타/일반 파일 | 1 |
| `sections/help.html` | 기타/일반 파일 | 2 |
| `sections/home.html` | 기타/일반 파일 | 2 |
| `sections/login.html` | 기타/일반 파일 | 2 |
| `sections/manual.html` | 기타/일반 파일 | 3 |
| `sections/progress.html` | 기타/일반 파일 | 2 |
| `sections/travel.html` | 기타/일반 파일 | 2 |
| `sections/vocabulary.html` | 기타/일반 파일 | 2 |
| `setup_antigravity.py` | Python 스크립트/유틸리티 | 3 |
| `split_avatars.py` | Python 스크립트/유틸리티 | 2 |
| `start_app.bat` | 기타/일반 파일 | 2 |
| `start_watches.bat` | 기타/일반 파일 | 1 |
| `sw.js` | PWA 서비스 워커 | 7 |
| `sync_claude.py` | Python 스크립트/유틸리티 | 3 |
| `tools/poi_generator.py` | Python 스크립트/유틸리티 | 2 |
| `verify_events.py` | Python 스크립트/유틸리티 | 1 |
| `verify_project_integrity.py` | Python 스크립트/유틸리티 | 3 |
| `watch.ps1` | 기타/일반 파일 | 1 |
| `watch_review.py` | Python 스크립트/유틸리티 | 1 |
| `게임.md` | 문서/가이드 | 1 |
| `로그아웃_및_로깅시스템.md` | 문서/가이드 | 1 |
| `파일정리_보고서.md` | 문서/가이드 | 1 |
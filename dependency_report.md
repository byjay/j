# 100% 무결점 의존성 분석 리포트

이 리포트는 단순 파일명 매칭이 아닌, 실제 코드(HTML, JS, CSS) 내의 호출 관계를 분석한 결과입니다.

## 🚨 미사용 파일 (참조 0회): 220개
| 파일 경로 | 유형 | 비고 |
|---|---|---|
| `.dockerignore` |  | 안전 삭제 가능 |
| `.github/workflows/daily_sync.yml` | .yml | 안전 삭제 가능 |
| `.gitignore` |  | 안전 삭제 가능 |
| `Dockerfile` |  | 안전 삭제 가능 |
| `REF/참조.mp4` | .mp4 | 안전 삭제 가능 |
| `ads.txt` | .txt | 안전 삭제 가능 |
| `analyze_ui.py` | .py | 독립 실행 스크립트 |
| `backend/.env` |  | 백엔드 파일 (독립 실행 가능성) |
| `backend/.env.example` | .example | 백엔드 파일 (독립 실행 가능성) |
| `backend/character_system.py` | .py | 독립 실행 스크립트 |
| `backend/comprehensive_word.py` | .py | 독립 실행 스크립트 |
| `backend/config.py` | .py | 독립 실행 스크립트 |
| `backend/data/characters.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/collected_words.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/comprehensive_words.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/conversations.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/grammar_data.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/kanji_data.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/user_mom.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/user_sieun.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/verb_conjugations.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/data/words.json` | .json | 백엔드 파일 (독립 실행 가능성) |
| `backend/grammar_collector.py` | .py | 독립 실행 스크립트 |
| `backend/kanji_collector.py` | .py | 독립 실행 스크립트 |
| `backend/main.py` | .py | **진입점/핵심파일 (예외)** |
| `backend/requirements.txt` | .txt | 백엔드 파일 (독립 실행 가능성) |
| `backend/routers/scraper.py` | .py | 독립 실행 스크립트 |
| `backend/verb_conjugator.py` | .py | 독립 실행 스크립트 |
| `backend/word_collector.py` | .py | 독립 실행 스크립트 |
| `blog.html` | .html | 안전 삭제 가능 |
| `clean_files.py` | .py | 독립 실행 스크립트 |
| `cleanup_report.md` | .md | 안전 삭제 가능 |
| `cpp/audit_core.cpp` | .cpp | 안전 삭제 가능 |
| `data/fukuoka_poi_data.js` | .js | 안전 삭제 가능 |
| `deep_dependency_analyzer.py` | .py | 독립 실행 스크립트 |
| `deploy_manual.html` | .html | 안전 삭제 가능 |
| `docker-compose.yml` | .yml | 안전 삭제 가능 |
| `docs/DEPLOYMENT_ENV_SETUP.md` | .md | 안전 삭제 가능 |
| `docs/ENV_SETUP_EXPLAINED.md` | .md | 안전 삭제 가능 |
| `docs/RAILWAY_SETUP_GUIDE.md` | .md | 안전 삭제 가능 |
| `docs/RAILWAY_SETUP_STEP_BY_STEP.md` | .md | 안전 삭제 가능 |
| `docs/RAILWAY_VARIABLES_SETUP.md` | .md | 안전 삭제 가능 |
| `docs/README_API_SETUP.md` | .md | 안전 삭제 가능 |
| `docs/TEACHING_METHODOLOGY.md` | .md | 안전 삭제 가능 |
| `download_all_travel_images.py` | .py | 독립 실행 스크립트 |
| `download_fukuoka_images_final.py` | .py | 독립 실행 스크립트 |
| `images/avatars/avatar_1.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_10.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_11.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_12.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_2.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_3.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_4.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_5.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_6.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_7.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_8.png` | .png | 안전 삭제 가능 |
| `images/avatars/avatar_9.png` | .png | 안전 삭제 가능 |
| `images/blog/app_demo.webp` | .webp | 안전 삭제 가능 |
| `images/blog/hiragana_grid.png` | .png | 안전 삭제 가능 |
| `images/blog/home_screen.png` | .png | 안전 삭제 가능 |
| `images/blog/login_screen.png` | .png | 안전 삭제 가능 |
| `images/blog/writing_practice.png` | .png | 안전 삭제 가능 |
| `images/guest.png` | .png | 안전 삭제 가능 |
| `images/travel/bus_display.png` | .png | 안전 삭제 가능 |
| `images/travel/bus_ticket.png` | .png | 안전 삭제 가능 |
| `images/travel/canal_city.png` | .png | 안전 삭제 가능 |
| `images/travel/fukuoka/amu_plaza.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/cafe_del_sol.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/canal_city.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/daimyo_street.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/don_quijote.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/fuk_airport.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/hakata_bento.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/hakata_issou.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/hakata_station.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/ichiran_head.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/ichiran_hq.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/kinrin_lake.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/kushida_shrine.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/motsunabe_rakutenchi.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/nakasu_river.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/nakasu_yatai.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/shinshin_ramen.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/sumiyoshi_shrine.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/tanya_hakata.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/udon_taira.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/yatai_nakasu.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/yufuin_onsen.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/yufuin_yunotsubo.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/fukuoka/yufumabushi_shin.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/hakone/hakone_3.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/hakone/hakone_4.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/hiroshima/hiroshima_1.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/hiroshima/hiroshima_2.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/hiroshima/hiroshima_3.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/hiroshima/hiroshima_4.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/kanazawa/kanazawa_4.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/kyoto/kyoto_1.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/kyoto/kyoto_2.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/kyoto/kyoto_3.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/kyoto/kyoto_4.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/kyoto/kyoto_5.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/kyoto/kyoto_7.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/montan_hakata.png` | .png | 안전 삭제 가능 |
| `images/travel/nagasaki/nagasaki_5.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/nakasu_yatai.png` | .png | 안전 삭제 가능 |
| `images/travel/nikko/nikko_1.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/nikko/nikko_4.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_10.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_11.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_12.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_13.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_15.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_17.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_18.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_2.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_20.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_22.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_24.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_26.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_27.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_31.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_36.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_37.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_39.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_4.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_43.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_46.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_47.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_48.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_5.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_52.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_56.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_57.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/okinawa/okinawa_59.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_10.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_13.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_14.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_16.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_17.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_18.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_19.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_21.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_24.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_27.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_28.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_30.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_32.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_33.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_34.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_35.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_39.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_42.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_44.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_47.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_48.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_51.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_53.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_54.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_56.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_58.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_59.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_62.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_64.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_65.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_68.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_7.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_72.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_73.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_74.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_76.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_78.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_79.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_8.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_81.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_82.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_84.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_85.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_86.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_88.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_89.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_9.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_91.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_93.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_94.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_95.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_96.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_98.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sapporo/sapporo_99.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sendai/sendai_1.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/sendai/sendai_2.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/yokohama/yokohama_1.jpg` | .jpg | 안전 삭제 가능 |
| `images/travel/yokohama/yokohama_4.jpg` | .jpg | 안전 삭제 가능 |
| `js/audit.js` | .js | 안전 삭제 가능 |
| `js/audit_bridge.js` | .js | 안전 삭제 가능 |
| `js/learning/characters_backup.js` | .js | 안전 삭제 가능 |
| `js/learning/elementary.js` | .js | 안전 삭제 가능 |
| `js/ref js/SystemCore.js` | .js | 안전 삭제 가능 |
| `js/travel/backup_old/fukuoka.js` | .js | 안전 삭제 가능 |
| `js/travel/backup_old/kyoto.js` | .js | 안전 삭제 가능 |
| `js/travel/backup_old/okinawa.js` | .js | 안전 삭제 가능 |
| `js/travel/backup_old/osaka.js` | .js | 안전 삭제 가능 |
| `js/travel/backup_old/sapporo.js` | .js | 안전 삭제 가능 |
| `js/travel/backup_old/tokyo.js` | .js | 안전 삭제 가능 |
| `js/travel/leaflet_map.js` | .js | 안전 삭제 가능 |
| `js/travel/osaka_poi_data.js` | .js | 안전 삭제 가능 |
| `migrate_data.py` | .py | 독립 실행 스크립트 |
| `netlify.toml` | .toml | 안전 삭제 가능 |
| `project_cleanup_audit.py` | .py | 독립 실행 스크립트 |
| `railway.toml` | .toml | 안전 삭제 가능 |
| `run_test.bat` | .bat | 안전 삭제 가능 |
| `split_avatars.py` | .py | 독립 실행 스크립트 |
| `split_avatars_v2.py` | .py | 독립 실행 스크립트 |
| `start_app.bat` | .bat | 안전 삭제 가능 |
| `test_backend_local.py` | .py | 독립 실행 스크립트 |
| `tools/download_images.py` | .py | 독립 실행 스크립트 |
| `tools/google_image_downloader.py` | .py | 독립 실행 스크립트 |
| `tools/poi_generator.py` | .py | 독립 실행 스크립트 |
| `verify_project_integrity.py` | .py | 독립 실행 스크립트 |


## ✅ 사용 중인 파일 (세부 내역)
| 파일 경로 | 참조 횟수 | 참조한 파일 (예시) |
|---|---|---|
| `css/styles.css` | 3 | index.html, sw.js ... |
| `data/guest_avatars.json` | 1 | index.html ... |
| `elementary/grade_1.js` | 1 | index.html ... |
| `elementary/grade_1_enhanced.js` | 2 | index.html ... |
| `elementary/grade_2.js` | 1 | index.html ... |
| `elementary/grade_2_enhanced.js` | 2 | index.html ... |
| `elementary/grade_3.js` | 1 | index.html ... |
| `elementary/grade_3_enhanced.js` | 2 | index.html ... |
| `elementary/grade_4.js` | 1 | index.html ... |
| `elementary/grade_4_enhanced.js` | 2 | index.html ... |
| `elementary/grade_5.js` | 1 | index.html ... |
| `elementary/grade_5_enhanced.js` | 2 | index.html ... |
| `elementary/grade_6.js` | 1 | index.html ... |
| `elementary/grade_6_enhanced.js` | 2 | index.html ... |
| `fukuoka_itinerary.html` | 2 | js/ui.js, js/travel/fukuoka.js ... |
| `images/BACK.png` | 3 | index.html, js/auth.js ... |
| `images/app_icon.png` | 6 | index.html, js/auth.js ... |
| `images/avatars/avatar_p_1.png` | 1 | index.html ... |
| `images/avatars/avatar_p_2.png` | 1 | index.html ... |
| `images/avatars/avatar_p_3.png` | 1 | index.html ... |
| `images/avatars/avatar_p_4.png` | 1 | index.html ... |
| `images/avatars/avatar_p_5.png` | 1 | index.html ... |
| `images/avatars/avatar_p_6.png` | 1 | index.html ... |
| `images/dad.png` | 6 | index.html, sw.js, js/auth.js ... |
| `images/dad_dancing.png` | 1 | js/learning/characters.js ... |
| `images/harong.png` | 4 | index.html, js/auth.js, js/templates.js ... |
| `images/harong_dancing.png` | 1 | js/learning/characters.js ... |
| `images/mom_dancing.png` | 1 | js/learning/characters.js ... |
| `images/mom_orig.png` | 5 | index.html, js/auth.js, js/manual.js ... |
| `images/sieun.png` | 4 | index.html, js/auth.js, js/templates.js ... |
| `images/sieun_dancing.png` | 2 | js/auth.js, js/learning/characters.js ... |
| `images/squirrel.png` | 1 | js/learning/characters.js ... |
| `images/travel/fukuoka/ohori_park.jpg` | 1 | data/fukuoka_poi_data.js ... |
| `images/travel/fukuoka/placeholder.jpg` | 2 | data/fukuoka_poi_data.js, js/travel/fukuoka.js ... |
| `index.html` | 4 | sw.js, js/learning/vocabulary.js, js/travel/backup_old/fukuoka.js ... |
| `js/api_client.js` | 1 | index.html ... |
| `js/auth.js` | 2 | index.html, sw.js ... |
| `js/commercial.js` | 2 | index.html, sw.js ... |
| `js/game_launcher.js` | 2 | index.html ... |
| `js/games/neon_syntax.js` | 3 | index.html, js/game_launcher.js ... |
| `js/games/silent_archive.js` | 3 | index.html, js/game_launcher.js ... |
| `js/games/verbum_alchimia.js` | 3 | index.html, js/game_launcher.js ... |
| `js/gamification.js` | 2 | index.html, sw.js ... |
| `js/learning/characters.js` | 2 | index.html, sw.js ... |
| `js/learning/conversation.js` | 2 | index.html, sw.js ... |
| `js/learning/elementary_school.js` | 2 | index.html ... |
| `js/learning/grammar.js` | 1 | index.html ... |
| `js/learning/learning_tracker.js` | 1 | index.html ... |
| `js/learning/progress.js` | 2 | index.html, sw.js ... |
| `js/learning/stroke_animation.js` | 3 | index.html, sw.js ... |
| `js/learning/study.js` | 1 | index.html ... |
| `js/learning/vocabulary.js` | 2 | index.html, sw.js ... |
| `js/learning/word_study.js` | 3 | index.html, sw.js ... |
| `js/learning/words_data.js` | 1 | index.html ... |
| `js/logging_service.js` | 1 | index.html ... |
| `js/manual.js` | 2 | index.html ... |
| `js/shopping/donki.js` | 1 | js/travel/japan_travel.js ... |
| `js/shopping/drugstore.js` | 1 | js/travel/japan_travel.js ... |
| `js/sushi_survival.js` | 3 | index.html, js/game_launcher.js ... |
| `js/templates.js` | 1 | index.html ... |
| `js/travel/fukuoka.js` | 3 | index.html, sw.js, js/travel/japan_travel.js ... |
| `js/travel/fukuoka_poi_data.js` | 1 | index.html ... |
| `js/travel/hakone.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/hiroshima.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/japan_travel.js` | 2 | index.html, sw.js ... |
| `js/travel/kanazawa.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/kobe.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/kyoto.js` | 2 | sw.js, js/travel/japan_travel.js ... |
| `js/travel/nagasaki.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/nagoya.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/nara.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/nikko.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/okinawa.js` | 2 | sw.js, js/travel/japan_travel.js ... |
| `js/travel/osaka.js` | 2 | sw.js, js/travel/japan_travel.js ... |
| `js/travel/route_helper.js` | 2 | index.html, js/travel/japan_travel.js ... |
| `js/travel/sapporo.js` | 2 | sw.js, js/travel/japan_travel.js ... |
| `js/travel/sendai.js` | 1 | js/travel/japan_travel.js ... |
| `js/travel/tokyo.js` | 3 | sw.js, js/commercial.js, js/travel/japan_travel.js ... |
| `js/travel/transportation.js` | 2 | index.html, sw.js ... |
| `js/travel/yokohama.js` | 1 | js/travel/japan_travel.js ... |
| `js/ui.js` | 2 | index.html, sw.js ... |
| `manifest.json` | 3 | index.html, sw.js ... |
| `sw.js` | 1 | index.html ... |

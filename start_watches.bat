@echo off
:: SDMS 자동 감시 시작 스크립트
:: Windows 시작 시 자동 실행하려면:
:: 1. Win+R → shell:startup
:: 2. 이 파일의 바로가기를 거기에 넣기

cd /d F:\genmini\sdms

:: watch.ps1 실행 (Claude Code 감시)
start powershell -NoExit -Command ".\watch.ps1"

:: watch_review.py 실행 (리뷰 파일 감시)  
start powershell -NoExit -Command "python watch_review.py"

echo 감시 스크립트 시작됨!

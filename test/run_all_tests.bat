@echo off
setlocal enabledelayedexpansion

set PASSED_TESTS=0
set TOTAL_TESTS=4
set HAS_ERRORS=0

echo ===================================================
echo     STUDY FLOW - AUTOMATED TESTING SUITE
echo ===================================================

echo.
echo Installing testing dependencies...
call npm install >nul 2>&1

:: Remove stale junction if exists
if exist "..\node_modules" (
    rmdir "..\node_modules" >nul 2>&1
)

echo.
echo [1/4] Running Unit Tests (with Coverage)...
call npm run test:unit
if errorlevel 1 (
    set HAS_ERRORS=1
    echo [ERROR] Unit Tests FAILED!
) else (
    set /a PASSED_TESTS+=1
)

echo.
echo [2/4] Running Integration Tests (with Coverage)...
call npm run test:integration
if errorlevel 1 (
    set HAS_ERRORS=1
    echo [ERROR] Integration Tests FAILED!
) else (
    set /a PASSED_TESTS+=1
)

echo.
echo [3/4] Running End-to-End (E2E) Tests...
call npm run test:e2e
if errorlevel 1 (
    set HAS_ERRORS=1
    echo [ERROR] E2E Tests FAILED!
) else (
    set /a PASSED_TESTS+=1
)

echo.
echo [4/4] Running Non-functional (Performance/A11y) Tests...
call npm run test:non-functional
if errorlevel 1 (
    set HAS_ERRORS=1
    echo [ERROR] Non-functional Tests FAILED!
) else (
    set /a PASSED_TESTS+=1
)

echo.
echo ===================================================
echo TEST SUMMARY: !PASSED_TESTS! / !TOTAL_TESTS! SUITES PASSED
echo ===================================================

if !HAS_ERRORS! EQU 1 (
    echo [WARNING] Some tests failed. Please scroll up to see the detailed error logs.
    exit /b 1
) else (
    echo [SUCCESS] All tests passed perfectly!
    exit /b 0
)

@echo off
setlocal EnableExtensions EnableDelayedExpansion
title SerPro Technology — Publicar landing a internet
color 0B
cd /d "%~dp0"

echo.
echo  =============================================
echo   PUBLICAR CAMBIOS AL SERVIDOR
echo   serprotechno.com (GitHub + servidor)
echo  =============================================
echo.

if not exist "%~dp0deploy.local.bat" (
  copy "%~dp0deploy.local.example.bat" "%~dp0deploy.local.bat" >nul
  echo  [AVISO] Se creo deploy.local.bat
  echo  Edite SERVER_HOST / SERVER_PASS y vuelva a publicar.
  pause
  exit /b 1
)
call "%~dp0deploy.local.bat"

if not defined GIT_BRANCH set "GIT_BRANCH=main"

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo  [ERROR] No hay repositorio GitHub. Cree el remote origin primero.
  pause
  exit /b 1
)

git config user.name "%GIT_NAME%" >nul 2>&1
git config user.email "%GIT_EMAIL%" >nul 2>&1

REM ── [1/3] GitHub ───────────────────────────────────────────────────────────
echo  [1/3] Subiendo codigo a GitHub...
git add -A
git diff --cached --quiet
if !errorlevel! equ 0 (
  echo        Sin archivos nuevos para commit.
) else (
  for /f "usebackq delims=" %%T in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm'"`) do set "STAMP=%%T"
  git commit -m "Actualizacion web !STAMP!"
  if !errorlevel! neq 0 (
    echo  [ERROR] git commit fallo.
    pause
    exit /b 1
  )
  echo        Commit creado.
)

git fetch origin 2>&1
set AHEAD=0
for /f %%A in ('git rev-list --count origin/%GIT_BRANCH%..HEAD 2^>nul') do set AHEAD=%%A
echo        Commits locales sin subir: !AHEAD!

if !AHEAD! gtr 0 (
  git push origin %GIT_BRANCH%
  if !errorlevel! neq 0 (
    echo  [ERROR] git push fallo. Revise credenciales de GitHub.
    pause
    exit /b 1
  )
  echo        GitHub actualizado.
) else (
  echo        GitHub ya esta al dia.
)

REM ── [2/3]+[3/3] Servidor ───────────────────────────────────────────────────
echo  [2/3] Actualizando servidor %SERVER_HOST%...
set "REMOTE=cd %SERVER_PATH% && git fetch origin && git reset --hard origin/%GIT_BRANCH% && sed -i 's/\r$//' scripts/*.sh 2>/dev/null; bash scripts/update.sh"

call :RunRemote "!REMOTE!"
if !errorlevel! neq 0 goto SSH_FAIL

echo.
echo  [3/3] Verificando sitio...
call :RunRemote "curl -sf http://127.0.0.1:3000/ >/dev/null && echo OK || echo FAIL"

echo.
echo  =============================================
echo   LISTO - Publicado en %SITE_URL%
echo   (Ctrl+F5 en el navegador si no ve cambios)
echo  =============================================
echo.
pause
endlocal
exit /b 0

:RunRemote
set "CMD=%~1"
set "SSH_KEY="
if exist "%USERPROFILE%\.ssh\id_serpro_panel" set "SSH_KEY=%USERPROFILE%\.ssh\id_serpro_panel"
if not defined SSH_KEY if exist "%USERPROFILE%\.ssh\id_serpro_abarroteria" set "SSH_KEY=%USERPROFILE%\.ssh\id_serpro_abarroteria"
set "PLINK=%ProgramFiles%\PuTTY\plink.exe"

if defined SSH_KEY (
  ssh -i "!SSH_KEY!" -o BatchMode=yes -o StrictHostKeyChecking=no %SERVER_USER%@%SERVER_HOST% "!CMD!"
  exit /b !errorlevel!
)
if exist "%PLINK%" (
  if defined SERVER_PASS (
    "%PLINK%" -batch -ssh %SERVER_USER%@%SERVER_HOST% -pw %SERVER_PASS% "!CMD!"
    exit /b !errorlevel!
  )
)
ssh -o StrictHostKeyChecking=no %SERVER_USER%@%SERVER_HOST% "!CMD!"
exit /b !errorlevel!

:SSH_FAIL
echo.
echo  [ERROR] Fallo la conexion o actualizacion en el servidor.
echo  Ejecute configurar-acceso.bat (una sola vez) y vuelva a publicar.
echo.
pause
endlocal
exit /b 1

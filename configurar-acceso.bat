@echo off
setlocal EnableExtensions
title SerPro — Configurar acceso SSH (landing web)
color 0E
cd /d "%~dp0"

echo.
echo  =============================================
echo   CONFIGURAR ACCESO AUTOMATICO AL SERVIDOR
echo  =============================================
echo.

if not exist "%~dp0deploy.local.bat" (
  copy "%~dp0deploy.local.example.bat" "%~dp0deploy.local.bat" >nul
  echo  Se creo deploy.local.bat — revisalo despues.
  echo.
)
call "%~dp0deploy.local.bat"

REM Reutiliza la misma llave del panel si ya existe
set "SSH_KEY=%USERPROFILE%\.ssh\id_serpro_panel"
if not exist "%SSH_KEY%" set "SSH_KEY=%USERPROFILE%\.ssh\id_serpro_web"
set "PLINK=%ProgramFiles%\PuTTY\plink.exe"

if not exist "%USERPROFILE%\.ssh" mkdir "%USERPROFILE%\.ssh"

if not exist "%SSH_KEY%" (
  echo  Creando llave SSH...
  ssh-keygen -t ed25519 -f "%SSH_KEY%" -N "" -C "serpro-web-pc"
  if errorlevel 1 (
    echo  [ERROR] No se pudo crear la llave SSH.
    pause
    exit /b 1
  )
) else (
  echo  Usando llave existente: %SSH_KEY%
)

echo.
echo  Escribe la contraseña SSH de %SERVER_USER%@%SERVER_HOST%
set /p SERVER_PASS_INPUT=Contraseña SSH: 

echo.
echo  Instalando llave en el servidor...

if exist "%PLINK%" (
  type "%SSH_KEY%.pub" | "%PLINK%" -batch -ssh %SERVER_USER%@%SERVER_HOST% -pw "%SERVER_PASS_INPUT%" "umask 077; mkdir -p ~/.ssh; cat >> ~/.ssh/authorized_keys; chmod 700 ~/.ssh; chmod 600 ~/.ssh/authorized_keys; echo LLAVE_INSTALADA"
) else (
  echo  Copia manualmente esta llave al servidor:
  type "%SSH_KEY%.pub"
  pause
  exit /b 0
)

if errorlevel 1 (
  echo  [ERROR] Contraseña incorrecta o servidor no alcanzable.
  pause
  exit /b 1
)

echo.
echo  Probando conexion...
ssh -i "%SSH_KEY%" -o BatchMode=yes -o StrictHostKeyChecking=no %SERVER_USER%@%SERVER_HOST% "echo CONEXION_OK"
echo.
echo  Listo. Ya puede usar publicar.bat
pause
endlocal
exit /b 0

@echo off     
echo *******�ļ�����������*******   
echo.
echo.
 
 
set /p filename=�������ļ���ǰ׺:
::IF "%filename%"=="" set "filename=%%~ni"
 
set /p suffix=�������ļ�����:
IF "%suffix%"==""   echo.�ļ����Ͳ���Ϊ�� &goto error
IF NOT EXIST *.%suffix% echo.�����ڸø�ʽ�ļ� &goto error
 
setlocal ENABLEDELAYEDEXPANSION
for /r %%i in (.) do (
        set n=0
        for /f "delims=" %%a in (' dir /b "%%i\*.%suffix%" 2^>nul ') do (
                set /a n+=1
                ren "%%i\%%a" "%filename%"!n!%%~xa
        )
)
 
echo. &pause
exit
 
:error
echo. &pause
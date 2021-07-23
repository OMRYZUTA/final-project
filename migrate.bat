@echo off
title migrations batch file
cd mysite
manage.py makemigrations
manage.py migrate
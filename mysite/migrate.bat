@echo off
title migrations batch file
manage.py makemigrations
manage.py migrate
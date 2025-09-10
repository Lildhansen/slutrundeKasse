.PHONY: setup start run

setup:
	set PYTHONPATH=$(CURDIR) && py setupHelper/hackySetup.py

start:
	set PYTHONPATH=$(CURDIR) && py main/start/start.py
run:
	set PYTHONPATH=$(CURDIR) && py main/update/update.py

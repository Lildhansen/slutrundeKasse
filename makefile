.PHONY: setup start run

setup:
	py setupHelper/hackySetup.py

start:
	PYTHONPATH=$(CURDIR) py main/start/start.py

run:
	PYTHONPATH=$(CURDIR) py main/update/update.py
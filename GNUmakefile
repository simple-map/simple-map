.DEFAULT_GOAL := all
BEM := ./node_modules/.bin/bem

all:
	npm install
	$(BEM) server

rebuild:
	$(BEM) make

.PHONY: clean
clean::
	$(BEM) make -m clean

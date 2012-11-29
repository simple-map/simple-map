.DEFAULT_GOAL := all
BEM := ./tools/node_modules/.bin/bem

all:
	cd tools; npm install; cd -
	$(BEM) server

rebuild:
	$(BEM) make

.PHONY: clean
clean::
	$(BEM) make -m clean

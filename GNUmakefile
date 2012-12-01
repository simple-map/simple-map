BEM := ./tools/node_modules/bem/bin/bem

JSHINT := ./tools/node_modules/jshint/bin/hint
JSLINT_DIRS = source

all: config deps server

deps:
	cd tools; npm install; cd -

server:
	$(BEM) server

rebuild:
	$(BEM) make

jshint:
	@$(JSHINT) source --config tools/jshint/jshintrc --reporter tools/jshint/reporter.js

config:
	@if [ -d .git ]; then \
		for hook in pre-commit ; do \
			ln -sf ./../../tools/git/hooks/$$hook .git/hooks/$$hook; \
		done \
	fi

clean:
	$(BEM) make -m clean

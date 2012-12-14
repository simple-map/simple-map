BEM := ./node_modules/bem/bin/bem

JSHINT := ./node_modules/jshint/bin/hint
JSHINT_DIRS = core geoapi

TEST_DIRS := core geoapi
PHANTOMJS := ./node_modules/phantomjs/bin/phantomjs

JASMINE_VERSION = 1.3.0
JASMINE_ARCHIEVE = jasmine-standalone-$(JASMINE_VERSION).zip
JASMINE_ARCHIVE_URL = https://github.com/downloads/pivotal/jasmine/$(JASMINE_ARCHIEVE)
JASMINE_DIR = tests/unit/jasmine

all: config node_modules jasmine server

node_modules:
	@[ ! -d "node_modules" ] && npm install;

jasmine:
	@if [ ! -f "$(JASMINE_DIR)/jasmine.js" ]; then \
		wget $(JASMINE_ARCHIVE_URL); \
		unzip -o $(JASMINE_ARCHIEVE) -d tmp; \
		mv tmp/lib/jasmine-$(JASMINE_VERSION)/* $(JASMINE_DIR); \
		rm -rf tmp $(JASMINE_ARCHIEVE); \
	fi

server:
	$(BEM) server

rebuild:
	$(BEM) make

jshint:
	@$(JSHINT) --reporter tools/jshint/reporter.js $(JSHINT_DIRS)

test:
	@if [ "$(shell ls -1R ${TEST_DIRS} | grep --color=none '\.test\.js')" ]; then \
		$(BEM) create block -T ./tests/.bem/techs/bemdecl.test.js "$(TEST_DIRS)"; \
		$(BEM) make tests; \
		echo; \
		$(PHANTOMJS) ./tools/phantom/phantom.js ./tests/unit/unit.html; \
	fi

config:
	@if [ -d .git ]; then \
		for hook in pre-commit ; do \
			ln -sf ./../../tools/git/hooks/$$hook .git/hooks/$$hook; \
		done \
	fi

clean:
	$(BEM) make -m clean

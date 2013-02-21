NPM_BIN = $(CURDIR)/node_modules/.bin/
BEM := $(NPM_BIN)bem

JSHINT := $(NPM_BIN)jshint
JSHINT_DIRS := source

TEST_BLOCKS := source
PHANTOMJS := $(NPM_BIN)phantomjs

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
	@echo Lint js files...
	@$(JSHINT) $(JSHINT_DIRS)
	@echo done

test:
	@if [ "$(shell ls -1R ${TEST_BLOCKS} | grep --color=none '\.test\.js')" ]; then \
		echo Create test page...; \
		$(BEM) create block -T ./tests/.bem/techs/bemdecl.test.js "$(TEST_BLOCKS)" || exit 1; \
		echo done; \
		echo Build test page...; \
		$(BEM) make tests; \
		echo done; \
		$(PHANTOMJS) ./tests/unit/phantom.js ./tests/unit/unit.html; \
	fi

config:
	@if [ -d .git ]; then \
		for hook in pre-commit ; do \
			ln -sf ./../../.githooks/$$hook .git/hooks/$$hook; \
		done \
	fi

clean:
	$(BEM) make -m clean

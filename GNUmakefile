NPM_BIN = $(CURDIR)/node_modules/.bin/
BEM := $(NPM_BIN)bem

JSHINT := $(NPM_BIN)jshint
JSHINT_DIRS := src

TEST_BLOCKS := src
TEST_DIR = tests/unit
PHANTOMJS := $(NPM_BIN)phantomjs --disk-cache=false

CACHE_FOLDER = tests/unit/cache

JASMINE_VERSION = 1.3.1
JASMINE_ARCHIEVE = jasmine-standalone-$(JASMINE_VERSION).zip
JASMINE_ARCHIVE_URL = https://github.com/downloads/pivotal/jasmine/$(JASMINE_ARCHIEVE)
JASMINE_DIR = $(CACHE_FOLDER)/jasmine

YANDEX_API_FOLDER = $(CACHE_FOLDER)/yandex
YANDEX_REPLACER = s/project\.PATH \+ \'combine\.xml/\'cache\/yandex\/combine.js/g;s/window\.console/window\.consoleFake/g
USER_AGENT = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.152 Safari/537.2

JQUERY_VERSION = 1.9.1

all: config node_modules cache.folder cache.yandex-api jasmine jquery.download server

node_modules:
	@[ ! -d "node_modules" ] && npm install;

jasmine:
	@if [ ! -f "$(JASMINE_DIR)/jasmine.js" ]; then \
		wget $(JASMINE_ARCHIVE_URL); \
		unzip -o $(JASMINE_ARCHIEVE) -d tmp; \
		mv tmp/lib/jasmine-$(JASMINE_VERSION)/* $(JASMINE_DIR); \
		rm -rf tmp $(JASMINE_ARCHIEVE); \
	fi

cache.folder:
	@mkdir -p $(CACHE_FOLDER)

cache.yandex-api:
	@if [ ! -f "$(YANDEX_API_FOLDER)/api2.js" ]; then \
		@mkdir -p $(YANDEX_API_FOLDER); \
		wget \
			-O $(YANDEX_API_FOLDER)/api.js \
			--user-agent='$(USER_AGENT)' \
			'http://api-maps.yandex.ru/2.0/?load=package.full,DomEvent&lang=ru-RU&mode=debug'; \
		sed "$(YANDEX_REPLACER)" $(YANDEX_API_FOLDER)/api.js > $(YANDEX_API_FOLDER)/api.js_; \
		mv $(YANDEX_API_FOLDER)/api.js_ $(YANDEX_API_FOLDER)/api.js; \
		wget \
			-O $(YANDEX_API_FOLDER)/combine.js \
			--user-agent='$(USER_AGENT)' \
			'http://clck.ru/8bB79'; \
	fi

jquery.download:
	@if [ ! -f "$(CACHE_FOLDER)/jquery.js" ]; then \
		wget http://code.jquery.com/jquery-$(JQUERY_VERSION).js;\
		mv jquery-$(JQUERY_VERSION).js $(CACHE_FOLDER)/jquery.js; \
	fi

server:
	$(BEM) server

rebuild:
	$(BEM) make

jshint:
	@$(JSHINT) $(JSHINT_DIRS)

test:
	@if [ "$(shell ls -1R ${TEST_BLOCKS} | grep --color=none '\.test\.js')" ]; then \
		echo Create test page...; \
		$(BEM) create block -T ./tests/.bem/techs/bemdecl.test.js "$(TEST_BLOCKS)" || exit 1; \
		echo done; \
		echo Build test page...; \
		$(BEM) make tests; \
		echo done; \
		$(PHANTOMJS) $(TEST_DIR)/phantom.js $(TEST_DIR)/unit.html; \
	fi

config:
	@if [ -d .git ]; then \
		for hook in pre-commit ; do \
			ln -sf ./../../.githooks/$$hook .git/hooks/$$hook; \
		done \
	fi

clean:
	$(BEM) make -m clean

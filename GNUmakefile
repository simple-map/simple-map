NPM_BIN = $(CURDIR)/node_modules/.bin/
BEM := $(NPM_BIN)bem

JSHINT := $(NPM_BIN)jshint
JSHINT_DIRS := source

TEST_BLOCKS := source
TEST_DIR = tests/unit/cache
PHANTOMJS := $(NPM_BIN)phantomjs --disk-cache=false

JASMINE_VERSION = 1.3.0
JASMINE_ARCHIEVE = jasmine-standalone-$(JASMINE_VERSION).zip
JASMINE_ARCHIVE_URL = https://github.com/downloads/pivotal/jasmine/$(JASMINE_ARCHIEVE)
JASMINE_DIR = $(TEST_DIR)/jasmine

CACHE_FOLDER = tests/unit/cache

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
	@mkdir -p $(CACHE_FOLDER)/yandex
	wget \
		-O $(CACHE_FOLDER)/yandex/api.js \
		--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.152 Safari/537.2" \
		'http://api-maps.yandex.ru/2.0/?load=package.full,DomEvent&lang=ru-RU&mode=debug'
	sed "s/project\.PATH \+ \'combine\.xml/\'cache\/yandex\/combine.js/g;s/window\.console/window\.consoleFake/g" $(CACHE_FOLDER)/yandex/api.js > $(CACHE_FOLDER)/yandex/api.js_
	mv $(CACHE_FOLDER)/yandex/api.js_ $(CACHE_FOLDER)/yandex/api.js
	wget \
		-O $(CACHE_FOLDER)/yandex/combine.js \
		--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.152 Safari/537.2" \
		'http://api-maps.yandex.ru/2.0.25/release/combine.xml?modules=gEfjd1n2kddZepgGd3eIecd6ehnAoVnznpntnwfffxgcf8igpgexnxipisiqkGgsm3m4lglelilLjPkNkynRkEkDf9lPkxkCf4nKnOnNkvd7ijgtgNjBjFjEjAjCjDjvjzjujwjyjTjOjQjRhDhAhChBhThQhPhShRhOhKhJhNhLfHfIfMjZfLnbm6m5m7nam8fgfziEiDn7hYeui6eFoYmxmwmzmyeHfulzhkoWnsocoeogpQpPpRp6pNpLpqpMpYeEnFfOo0oUnBnqnuo8oQoPgkgwgnghkUkSkTgrkZglgfgmnSgHnXoanVgLgqgegigvgugpnQktgYg2lOedlMd5eKfRgbhbeOkHkFkIkKkLkJg1oieqhthuhqhrd0eyg9jkjmfGfPi1etihfseae7fdiifmfcnyl3irmeiyilmgiBikl7mdiwingRgZgjgofilRjUjWgUgVgSdYlag6lfhjd4k9gTgWe6ldeelQjMoGoHjSkQkAkugdeUf6elhniZi5kqkRnJkpkMnHkskPkBnMkrkOkznLhIhFhEhGhHeDeAeGnWh7gMgKlTjrjqfZjIjGjHjLm0m1m2oImWoFmZi3kmjKmSmXjJmUe8mTi8erhXeshWhVhUeklWlZhMjYd9lNjVf3effvfpemejjxjXfKm9jah4iCfreVennDo1o3o2o6o5oZoXoNoMoOfEeQodofohp8p9qnqoqxqwqyqjqkqiqhqFquqtqvqJqHqmqIqzqGpZprp7pVcaeinIo4nCpopIpJpKpppnnroLo7lSlDlFeSeTeRf2egeJd2fklwlvltlslqlplllulnlrlkk0kXfeggkWkVnTgFfhobfFfyeZe2k8lAlxlyhli0jphhj1fBfwkgfQlBf7f5khkkkfg0fng7eomGhvlVjshsewevqcp5p4pHpFqepGoSpuoTpvnvoRptpsl6mjmcmqmumol0mlmrmvl2ioimivmhixmsgXhohplbljg4lhhmhdhfhehilUlJlGlCd8lEiWjti7oqjNhglXfWfSfUeCeziXeBotoworouosovidfqmVmYj2kliOjdj6lYj0f1fNe5mEmFnEhagQpXpTpUjlmPmQdFcxbebUdaa1ebbZaPg5qEdwdTchpWaLdrddcVdKbApjoJeYpCp3pfpbpzpypxpco9pDpepdpakonjePfXfYgOgJn9eLlmlog3kYmMjfe1iKiSk7g8eXjne9gakwkikjkefomImBdub5cZabbgapcwbOaGcgcIdymmoDoAitl9ozoxoyiziAl1l5l4maiIlchcollHi9iVe3fTkciMe0jcjblKfJfCmKmHmCnGqaqsqqmOmRc5axcQcPakaicWc6c9dgdLa5aNaValamqKcoc7aUdobqcDaTbxaZeWpBpEaycObNdEdxdHbwpwbcaRbTn3f0n5lIjgiQhzbXdmqdaYdDoCoEmkmpiumtmbmie4nffVj9cAc3cRaOb9qAqCqDqBqfbdaEcbatbRc8aab4dPa7bGdnbnaXdQbubKbzaHaragbBahcsdWa3p2pAacbiflftgDjiajbjdOawmnoBonkandj3dbdzcTbbcSbYb7dvdIcYdBbacecqcNjjj8bJbmdVcCaBdkdlaScBaocKb3j4mLmDi2&jsonp_prefix=ymaps2_0_25'

jquery.download:
	@if [ ! -f "$(TEST_DIR)/jquery.js" ]; then \
		wget http://code.jquery.com/jquery-$(JQUERY_VERSION).js;\
		mv jquery-$(JQUERY_VERSION).js $(TEST_DIR)/jquery.js; \
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

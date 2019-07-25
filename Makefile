default:
	@ cat ./Makefile

# Convenience wrappers.
#
# make server (npm-install must be done first)
# make test (npm-install must be done first)
# make npm-install

npm-install:
	make app-cmd cmd="npm install && npm prune"

npm-outdated:
	make app-cmd cmd="npm outdated"

npm-prune:
	make app-cmd cmd="npm prune"

server:
	make app-cmd-with-ports cmd=./bin/server

build:
	make app-cmd-with-ports cmd=./bin/build

pretty:
	make app-cmd cmd=./bin/pretty

lint:
	make app-cmd cmd=./bin/lint

test:
	make app-cmd cmd=./bin/test

watch:
	make app-cmd cmd=./bin/watch

coverage:
	make app-cmd cmd=./bin/coverage

open-coverage:
	open ./app/coverage/lcov-report/index.html

# Application tooling.
#
# make app-cmd cmd=./bin/build
# make app-cmd-with-ports cmd=./bin/server
# make app-cmd cmd="npm outdated"

IMAGE_TAG_APP=ray-tracer-app

app-cmd: app-docker-build
	docker run --interactive --tty --rm \
		--mount type="bind",source="$(PWD)/app",target="/workdir",consistency="delegated" \
		$(IMAGE_TAG_APP) \
		bash -c "$(cmd)"

app-cmd-with-ports: app-docker-build
	docker run --interactive --tty --rm \
		--mount type="bind",source="$(PWD)/app",target="/workdir",consistency="delegated" \
		--publish 1234:1234 \
		--publish 4321:4321 \
		$(IMAGE_TAG_APP) \
		bash -c "$(cmd)"

app-docker-build:
	docker build \
		--tag $(IMAGE_TAG_APP) \
		./app

app-clean-all:
	rm -rf ./app/.nyc_output/
	rm -rf ./app/build/
	rm -rf ./app/coverage/
	rm -rf ./app/node_modules/
	rm -rf ./app/package-lock.json

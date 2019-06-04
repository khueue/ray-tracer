default:
	@ cat ./Makefile

# Convenience wrappers.
#
# make server (npm-install must be done first)
# make test (npm-install must be done first)
# make npm-install

server:
	make app-cmd-with-ports cmd=./bin/server

test:
	make app-cmd cmd=./bin/prettify
	make app-cmd cmd=./bin/test

npm-install:
	make app-cmd cmd="npm install"

# Application tooling.
#
# make app-cmd cmd=./bin/build
# make app-cmd-with-ports cmd=./bin/server
# make app-cmd cmd="npm outdated"

IMAGE_TAG_APP=ray-tracer-app

app-cmd: app-docker-build
	docker run --interactive --tty --rm \
		--mount type="bind",source="$(PWD)/app",target="/workdir" \
		$(IMAGE_TAG_APP) \
		bash -c "$(cmd)"

app-cmd-with-ports: app-docker-build
	docker run --interactive --tty --rm \
		--mount type="bind",source="$(PWD)/app",target="/workdir" \
		--publish 1234:1234 \
		--publish 4321:4321 \
		$(IMAGE_TAG_APP) \
		bash -c "$(cmd)"

app-docker-build:
	docker build \
		--tag $(IMAGE_TAG_APP) \
		./app

app-clean-all:
	rm -rf ./app/_build/*
	rm -rf ./app/node_modules
	rm -rf ./app/package-lock.json

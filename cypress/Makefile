default:
	@ cat ./Makefile

npm-install:
	docker run --interactive --tty --rm \
		--mount type="bind",source="$(PWD)",target="/workdir",consistency="delegated" \
		--entrypoint bash \
		$(IMAGE_TAG_APP) \
		-c "npm install"

IMAGE_TAG_APP=ray-tracer-app-cypress

run-headless: app-docker-build
	docker run --interactive --tty --rm \
		--mount type="bind",source="$(PWD)",target="/workdir",consistency="delegated" \
		$(IMAGE_TAG_APP) \
		run --browser electron

run-chrome: app-docker-build
	docker run --interactive --tty --rm \
		--mount type="bind",source="$(PWD)",target="/workdir",consistency="delegated" \
		$(IMAGE_TAG_APP) \
		run --browser chrome

app-docker-build:
	docker build \
		--tag $(IMAGE_TAG_APP) \
		./

FROM node:12.3.1-alpine

WORKDIR /workdir

# For running commands.
RUN apk add --no-cache \
	bash

# For NPM (node-gyp).
RUN apk add --no-cache \
	build-base \
	python

# For Parcel.
RUN apk add --no-cache \
	util-linux

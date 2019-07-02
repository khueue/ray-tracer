FROM node:12.5.0-alpine

WORKDIR /workdir

# For running commands.
RUN apk add --no-cache \
	bash

# For NPM (node-gyp).
RUN apk add --no-cache \
	build-base

# For Parcel.
RUN apk add --no-cache \
	util-linux

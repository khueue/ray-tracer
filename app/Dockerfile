FROM node:12.10.0-alpine

WORKDIR /workdir

# For running commands and file watching.
RUN apk add --no-cache \
	bash \
	inotify-tools

# For NPM (node-gyp).
RUN apk add --no-cache \
	build-base

# For Parcel.
RUN apk add --no-cache \
	util-linux

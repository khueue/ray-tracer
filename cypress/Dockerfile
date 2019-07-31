FROM cypress/browsers:node12.6.0-chrome75

WORKDIR /workdir

COPY ./package.json ./
RUN npm install

ENTRYPOINT [ "./node_modules/.bin/cypress" ]

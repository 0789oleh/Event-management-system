# Event Manager App Backend

![CI](https://github.com/0789oleh/event-management-system/actions/workflows/ci.yml/badge.svg)

## Description

Backend API for event management. 

**Requirements**:

* Node.js;
* NPM;
* Docker + Docker compose


## Project setup

Clone or download this repository. After that navigate to the folder.

```bash
$ cd ./Event-management-system
```

## Compile and run the project

```bash
# development
$ docker compose --profile dev up --build
```


```bash
# production 
$ docker compose --profile prod up --build
```

```bash
# test
$ npm run tests
```

### Blog API

This is an API for a blog CRUD application.

## How to run

- Clone the repository
- Update environment variables
- Load database (Create table & load initial contents.)

```bash
nvm use 18
yarn
yarn dev
```

or via docker,

```sh
docker build -t blogapi .
docker run -p 4000:4000 -d blogapi
```

or

```sh
docker-compose up
``

## Tools Used

- NodeJS 18
- Swagger : API Documentation
- Typescript

* Express
* Jest
* Zod for api validation
* Docker

## Todos

- Prepare boilerplate
- Dockerize
- Add other loaders
- Add article service
- CRUD articles
- Redis cache
- Swagger docs

##

## Folder structure

| Folder      | Purpose                                           |
| ----------- | ------------------------------------------------- |
| src/        | Source code entrypoint                            |
| config      | Configuration File                                |
| controllers | API Controllers                                   |
| services    | Services used in an ap                            |
| routes      | Routes used in an app                             |
| interfaces  | Some interfaces used throughout an app            |
| loaders     | Loaders for initial loading of different services |
| middlewares | Different middleware modules                      |
| models      | Models for database/other data related tasks      |
| types       | Types used in a project                           |
| validators  | Some of the route validators                      |

## How to add new feature

- Add new route
- Add new controller
- Add new service
- Add new repository (if needed)
- Add docs to the swagger

## DB

Table Name: BlogArticles
Partition Key: id (String)
Sort Key: createdAt (Number)

GSI1 Partition Key: userId (String), Sort Key: createdAt (Number)
GSI2 Partition Key: category (String), Sort Key: createdAt (Number)

## Assignment

#### Create a Restful API for CRUD application using expressJs framework and ReactJS with hooks that has following features.

- Logged in users can create, delete and update their article.

* Public user can read the article.

It should show the following implementation:

- ~~Run in multi thread of CPU.~~
- ~~Dockerize the api such that it can be run in services like fargate or kubernetes~~
- API should have unit tests
- Caching and cache invalidation using Redis.
- Implement Github oAuth.
- Use local dynamodb.
- Use ES6 and async await.
- Share postman collection
- Should handle errors like network error, etc
- Implement gsi or lsi while listing all articles
- Create frontend using React with own design
- Use redux-toolkit and redux-saga
- Write unit tests for utils

- Notes:
  - Should share code in github with proper commits history.
  - Should have a readme.md file with instruction to run in other computer.
```

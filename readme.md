### Blog API

This is an API for a blog CRUD application.

## How to run

- Clone the repository
- Update environment variables

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

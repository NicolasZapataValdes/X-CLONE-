# X-CLONE

This is a copy of X

## How to use the App?

1. clone the project.
2. cd to the cloned directory.
3. npm install.
4. npm run dev.

## Technologies

1. [Node.js](https://nodejs.org/en)
2. [Express.js](https://expressjs.com/)
3. [Express-validator](https://express-validator.github.io/docs)

## Team members

1. [Thomas Aguirre Gonzalez](https://github.com/Thomas-Parker24)
2. [Nicolas Augusto Zapata Valdes](https://github.com/NicolasZapataValdes)
3. [Juan David Ceballos Lopez](https://github.com/JuanDCeballos)

## API Endpoints

> [!NOTE]
> All our endpoints start with /api/v1
> Example: /api/v1/LogInWithEmailAndPassWord

### Login related

- (POST) /LogInWithEmailAndPassWord
  > This Endpoint allows you to logIn with email and password
- (POST) /LogInWithUserNameAndPassWord
  > This Endpoint allows you to logIn with user name and password
- (POST) /LogOutWithEmailAndPassWord
  > This Endpoint allows you to logOut with email and password
- (POST) /LogOutWithUserNameAndPassWord
  > This Endpoint allows you to logOut with user name and password

### Users related

### Post related

- (GET) /posts
  > This Endpoint allows you to get all posts
- (GET) /posts/:id
  > This Endpoint allows you to get a post by
- (POST) /posts
  > This Endpoint allows you to create a post
- (PATCH) posts/:id
  > This Endpoint allows you to ONLY update the content property
- (PATCH) /posts/delete/:id
  > This Endpoint allows you to ONLY update the deleted property
- (PATCH) /posts/restore/:id
  > This Endpoint allows you to ONLY update the deleted property

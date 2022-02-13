# Node, Express, MongoDB and Mongoose Embedded Documents Relationships (Denormalization)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Overview

This is an easy, basic and raw example of **HOW to** implement Embedded Documents Relationships (Denormalization) with Mongoose.

For a dryer approach, check [Generic Controllers](../node-express-mongo-db-controllers/src/utils/crud.js).

## Requirements

- Node 12+
- NPM
- MongoDB
- Mongoose ODM
- Optional: MongoDB account

## Install dependencies

<!--
https://github.com/typicode/husky/issues/866
To avoid issues with `husky`, first enable `git hooks` (and add our hook):

```shell
npx husky install

npx husky add .husky/pre-commit
```

Then, install the dependencies as usual:
-->

```
npm install
```

## Running the server

### Development

```
npm run dev
```

### Production

```
npm run build

npm start
```

## API endpoints

### GET /api/artists

- Returns an object with the key data containing an array of objects with `40 records` (max).
- Supports query string:
  - ?limit=integer
  - ?offset=integer

#### Request:

```
curl http://127.0.0.1:3000/api/artists
```

#### Sample response:

```json
{
  "data": [
    {
      "_id": "6206ad6f6dcc7026ff2a19cd",
      "name": "Guns N' Roses",
      "__v": 0
    }
  ]
}
```

### POST /api/artists

- Returns the newly created object (aka, artist).
- The server only accepts a payload with the property `name`.

#### Request:

```
curl -X POST http://127.0.0.1:3000/api/artists -d '{"name":"Green Day"}' -H "Content-Type: application/json"
```

#### Sample response:

```json
{
  "_id": "6206e65c3d571063b00e9b22",
  "name": "Green Day",
  "__v": 0
}
```

### GET /api/songs

- Returns an object with the key data containing an array of objects with `40 records` (max).
- Supports query string:
  - ?limit=integer
  - ?offset=integer

#### Request:

```
curl http://127.0.0.1:3000/api/songs
```

#### Sample response:

```json
{
  "data": [
    {
      "_id": "6206e7f58a567a65fc1553d1",
      "name": "Basket Case",
      "artist": {
        "_id": "6206e65c3d571063b00e9b22",
        "name": "Green Day"
      },
      "__v": 0
    }
  ]
}
```

### POST /api/songs

- Returns the newly created object (aka, song).
- The server only accepts a payload with the properties `name` and `artist`.

**IMPORTANT:** You have to pass a valid MongoDB ObjectId which should be the \_id of an existent artist.

#### Request:

```
curl -X POST http://127.0.0.1:3000/api/songs -d '{"name":"Basket Case", "artist": "6206e65c3d571063b00e9b22"}' -H "Content-Type: application/json"
```

#### Sample response:

```json
{
  "_id": "6206e8ec8a567a65fc1553dd",
  "name": "Holiday",
  "artist": {
    "_id": "6206e65c3d571063b00e9b22",
    "name": "Green Day"
  },
  "__v": 0
}
```

### GET everything else

- Any other endpoint will retrieve an object

#### Request:

```
curl http://127.0.0.1:3000/
```

#### Response:

```json
{
  "message": "Node.js, Express, MongoDB and Mongoose Denormalization!"
}
```

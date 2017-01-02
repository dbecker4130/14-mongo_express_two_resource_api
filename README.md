# Mongo Express Two Resource API

This two resource RESTful API uses Express.js to handle server routing, and Mongodb to serve as the database.

### Set-Up

In your Terminal

```sh
$ git clone <repository url>
$ cd 14-mongo_express_two_resource_api
$ npm i
```
This will install the proper dependencies. You should receive the following in your package.json file:

```sh
"dependencies": {
  "bluebird": "^3.4.7",
  "body-parser": "^1.15.2",
  "cors": "^2.8.1",
  "debug": "^2.6.0",
  "express": "^4.14.0",
  "mongoose": "^4.7.5",
  "morgan": "^1.7.0"
  "chai": "^3.5.0",
  "mocha": "^3.2.0",
  "superagent": "^3.3.1"
}
```

### Use

You will need to have 3 terminal shells open to use this application.

* In one shell, run `mongod` to start the database.
* In another shell, run `npm run start`. You will receive a response of 'server live on PORT: `<PORT>`'
* The last shell will be used to make GET, POST, PUT, and DELETE requests


Making a POST request
* Run `http POST localhost:<PORT>/api/artist name='<name>' genre='<genre>'`
* This will update the Artist object to show `name:` `genre:` and `id:`
* You will also receive a status code of 200.

Example:
```sh
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 79
Content-Type: application/json; charset=utf-8
Date: Wed, 21 Dec 2016 01:42:55 GMT
ETag: W/"4f-XrtcY5ELsfZ6vIlKoUtB+Q"
X-Powered-By: Express

{
    "genre": "Punk",
    "id": "cb000020-c71e-11e6-b55a-156f3ac3297a",
    "name": "Blink-182"
}
```
To access the additional resource, you can run `http POST localhost:<PORT>/api/library name='<name>'`
* This will update the Library object to show `name:` `genre:` and `id:`
* You will also receive a status code of 200.

Making a GET request
* Run `http localhost:<PORT>/api/artist<id>`
* You must copy and paste the id from the post request.
* You will also receive a status code of 200.

Example:
```sh
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 40
Content-Type: application/json; charset=utf-8
Date: Wed, 21 Dec 2016 01:43:28 GMT
ETag: W/"28-ivjiv1YIQTFvK7z9Yn5eIA"
X-Powered-By: Express

[
    "cb000020-c71e-11e6-b55a-156f3ac3297a"
]
```
To access the additional resource, you can run `http localhost:<PORT>/api/library/<libraryID>`
* This will update the Library object to show `name:` `genre:` and `id:`
* You will also receive a status code of 200.

Making a DELETE request
* Run `http DELETE localhost:<PORT>/api/artist<id>`
* You must copy and paste the id from the post request.
* You will also receive a status code of 204.

Example:
```sh
HTTP/1.1 204 NO CONTENT
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 40
Content-Type: application/json; charset=utf-8
Date: Wed, 21 Dec 2016 01:43:28 GMT
ETag: W/"28-ivjiv1YIQTFvK7z9Yn5eIA"
X-Powered-By: Express
```
To access the additional resource, you can run `http DELETE localhost:<PORT>/api/library/<libraryID>`
* This will update the Library object to show <libraryID> deleted.

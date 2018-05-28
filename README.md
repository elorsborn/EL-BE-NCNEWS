## Northcoders News API

Project for Northcoders where an API is built using MongoDB. The database is built up of topics, users, articles and comments to replicate that of a news site/forum. The API is then hosted on [Heroku via MLab](https://elliot-ncnews.herokuapp.com/).

**Getting Started**

Fork and clone the following repository on GitHub:

```http
git clone https://github.com/:username/BE-FT-northcoders-news.git
```

Install [node](https://nodejs.org/en/download/package-manager/) and [MongoDB](https://docs.mongodb.com/manual/installation/).

Then cd into the repo and run `npm i` in your terminal to install the following dependencies:

* Express
* MongoDB
* Mongoose
* Mocha
* Chai
* Supertest

**Seeding**

The API takes three databases:

1.  The test database, which is seeded using `npm test`. This enables the testing of a smaller database to check if endpoints are operating correctly and the database is seeding.

2.  The development database, which is seeded with `npm run seed:dev`.

3.  The production databse, which can seeded with `npm run seed:prod`.

The server is run using `npm run dev` and can be accessed via your browser or via [Postman](https://www.getpostman.com/) at http://localhost:9090/api.

**Hosting**

Sign up to accounts on both [MLab](https://mlab.com/) and [Heroku](https://www.heroku.com/) and follow the instructions.

Don't forget to change your config set up!

```
heroku config:set MONGO_URI=[mlab-url]
```

**Author and Acknowledgements**

This API was created by Elliot Orsborn with the guidance and tutorship of the Northcoders staff and residents.

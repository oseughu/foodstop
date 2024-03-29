# Foodstop Order/Delivery API

This api provides food order and delivery services. It is a RESTful API built with typescript, node, express, mongoose, and redis. Tests were written with mocha, chai and supertest.

## Steps to run this project

1. Run `git clone https://github.com/oseughu/foodstop.git` to clone this repository to your local machine.
2. Run `npm i` command to install all dependencies.
3. Run `npm test` command to run the tests.
4. Add your own Redis and MongoDB connection URI to your `.env` file (REDIS_URI and MONGO_URI).
5. Run `npm run dev` command to start the server

## To Do

- [ ] Implement a realtime notification system (a message queue (currently on it))
- [ ] Add authentication
- [ ] Improve caching system
- [ ] Add vendor and inventory api (link both with user api maybe?)
- [ ] Learn and apply load and performance testing

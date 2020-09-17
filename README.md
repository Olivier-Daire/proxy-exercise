# proxy exercise

The goal of this exercise is to see if you're confortable with JavaScript and/or TypeScript and are used to writing functional, well **tested** and **documented** API endpoints and are confortable with taking design .

We'll be working on a proxy which will be the entry point to our back-end infra (a dummy server in our case). It will be responsible to check auth tokens, insert different auth tokens before forwarding the request to our back-end server.
We want to keep audit logs of all the requests going through the proxy. We'll use sqlite in this exercise as it requires no setup to store the proxy's logs.
We'll be using JWT as auth tokens for both the proxy & the back-end server using different private keys/issuers/audiences.

The exercise is divided in steps. Each step will be reviewed independently using pull requests.

## Setup

1. Fork the repo
2. Clone the repo on your computer
3. Install the dependencies

## Description

1. Create the Logs table

```
Logs
- logId PRIMARY KEY
- ip
- path
- subject
- createdAt
- updatedAt
...anyOtherRelevantInformation
```

2. Setup the proxy & the dummy server.
3. Add the authentication layer in both the proxy & the dummy server.
4. Insert audit logs on every request
5. Create an endpoint on the proxy to query the logs
6. Create an endpoint to update the logs

## Requisites

- All endpoints must be tested
- All endpoints must be documented
- All endpoints should validate their inputs

## How to use sqlite3/sqlite

`sqlite3` is a wrapper around SQLite but doesn't provide a promise based API. Therefore, we use another wrapper which is `sqlite` which offers a Promise API around `sqlite3`.

- Run mutations

```
// INSERT, CREATE TABLE, UPDATE etc.
await db.run(sqlMutation)
```

- Run queries

```
// Get one item
await db.get(sqlQuery)
// Get several items
await db.all(sqlQuery)
```

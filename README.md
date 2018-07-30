# Boomtown 🏙
Project Boomtown is all about sharing. together we can share fun and interesting things to make the World a more entertaining place to live!

## Getting Started
To get started first you must clone this repository. after cloning it please refer below to the `installation instructions`. You will also need to refer to the `database instructions` to set up a backend for the project to run in development mode.

## Prerequisites
`FrontEnd`
* [Node](https://nodejs.org/en/) - Runtime Server
* [NPM](https://docs.npmjs.com/) - Package Manager
* [React](https://reactjs.org/docs/hello-world.html) - UI design
* [Redux](https://redux.js.org/introduction) - Data flow and state management
* [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQl API over Rest API

`BackEnd`
* [Postgresql](https://www.postgresql.org/) - Database
* [PostgreSQL client](https://www.npmjs.com/package/pg) - Non-blocking PostgreSQL client for Node.js
* [Apollo Server](https://www.apollographql.com/server) - A production-ready GraphQL layer over any backend
# Installation

## Server

Commands must be run from the `server` directory:

`npm install`

### Run

`npm run start:dev`

## Client

Commands must be run from the `client` directory:

### Installation

`npm install`

### Run

`npm start`

### Build

`npm run build`

# Database Setup
The database will have to be constructed before you can launch the project. You will have to navigate to the `/server/config/application.js` and update the following fields with your database info:
* app.set('PG_HOST', process.env.PG_HOST || 'localhost')
* app.set('PG_USER', process.env.PG_USER || `YOUR USER NAME`)
* app.set('PG_PASSWORD', process.env.PG_PASSWORD || `YOUR PASSWORD`)
* app.set('PG_DB', process.env.PG_DB || `YOUR DB NAME`)

## The database consists of `5` tables:
* users
    * id -- `primary key, serial`
    * fullname -- `not null`
    * email -- `unique, not null`
    * bio
    * password -- `not null`
* items 
    * id -- `primary key, serial`
    * title -- `not null`
    * description -- `not null`
    * created -- `not null`
    * ownerid -- `not null, foreign key = users.id`
    * borrowerid -- `borrowerid <> ownerid, foreign key = users.id`
* itemtags - `linked list`
    * tagid -- `foreign key = tags.id`
    * itemid -- `foreign key = items.id`
* tags
    * id -- `primary key, serial`
    * title -- `not null, unique`
* uploads
    * id -- `primary key, serial`
    * filename -- `not null`
    * mimetype -- `not null`
    * encoding -- `not null`
    * data -- `not null`
    * itemid -- `foreign key = items.id`
    
# Authors
## Cody Rathor - <codyrathor@gmail.com>

# Acknowledgments
`Thanks RED Academy for the boilerplate!`

# Project Photos
## Landing Page:
![Landing Page](/screenshots/Login.png?raw=true)
## Items Page:
![Items Page](/screenshots/Items.png?raw=true)
## Share Page:
![Share Page](/screenshots/Share.png?raw=true)
## Profile Page:
![Profile Page](/screenshots/Profile.png?raw=true)
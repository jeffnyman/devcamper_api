# DevCamper

This project is based on the [DevCamper API](https://github.com/bradtraversy/devcamper-api) created by Brad Traversy.

The goal of this project is to provide a functioning API that serves as the backend for an application that displays developer bootcamp information. My goal in providing this project, based on a well-known example, is to incorporate a testing challenge into it. There is currently no active frontend for this application, so the focus is entirely on building and testing an API.

## Running the API

In order to run the development version of the API, you must have a Mongo database setup, either locally or in the cloud. You then need to provide a `mongodb.env` file in the `config` directory. This file should contain the following environment variable:

```
MONGO_URI = mongodb+srv://<username>:<password>@devcamper-wisqb.mongodb.net/devcamper?retryWrites=true&w=majority
```

Here you have to replace `<username>` and `<password>` with your own credentials. Note that this file is ignored by Git and thus is not checked in as part of the versioning process.

It is also necessary to provide a `geocoder.env` file in the `config` directory that has the following:

```
GEOCODER_API_KEY=<your consumer key>
```

Here you have to enter your consumer key from the MapQuest developer setup. This file, too, is not checked in as part of the versioning.

For development purposes, you can start the server with this command:

```
npm run dev
```

You can see the database with the following command:

```
node seeder -i
```

You can also delete the seeded data with the following command:

```
node seeder -d
```

## Testing the API

If you want to run tests, do the following from the project root:

```
npm test
```

As a note on the tests, in order to have them run correctly with the geocoder, you need to create a file called `jestVars.js` in the `config` directory. In that file you will need the following:

```
process.env.GEOCODER_PROVIDER = "mapquest";
process.env.GEOCODER_API_KEY = "<your consumer key>";
```

Here you have to enter your consumer key from the MapQuest developer setup. This is required due to how Jest deals with the `process.env` setting. Note that this file will not be included as part of the versioning.

## Resource Routes

The resource route structure of the application will be as follows:

- /api/v1/bootcamps
- /api/v1/courses
- /api/v1/reviews
- /api/v1/auth
- /api/v1/users

Right now only the "bootcamps" portion is in place.

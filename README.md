
# heroku-deno-postgres-example

## Buildpack

https://github.com/chibat/heroku-buildpack-deno

## Running Locally
Make sure you have [Deno](https://deno.land/) and the [Heroku CLI](https://cli.heroku.com/) installed.
```
$ git clone https://github.com/chibat/heroku-deno-postgres-example.git
$ cd heroku-deno-postgres-example
$ export DATABASE_URL=${YOUR_HEROKU_DATABASE_URL}
$ ./app.ts
```

```
$ curl -i http://localhost:8080
HTTP/1.1 200 OK
content-type: application/json
content-length: 13
date: Wed, 11 Aug 2021 11:42:53 GMT

[["pg_type"]]
```

## Deploying to Heroku

...

<!--
```
$ heroku create --buildpack https://github.com/chibat/heroku-buildpack-deno.git
$ git push heroku master
$ heroku open
```
-->




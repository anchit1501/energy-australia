## Problem Statement
Use Nestjs and Typescript to solve the problem 

The Problem
Your team is tasked with listing out music festival data in a particular manner: at the top level, it should show the band record label, below that it should list out all bands under their management, and below that it should display which festivals they've attended, if any. All entries should be sorted alphabetically.
For example:

Record Label 1
Band X
Omega Festival
Band Y
Record Label 2
Band A
Alpha Festival
Beta Festival
The data is provided to you via an API by another team; they assure you all the data is available but it's in a different format and provide you with the Swagger documentation needed to get started.
Use this API as is to output the format specified above in any medium you desire; let it be a website, terminal, file or morse code if that's what you want to do - we just want to see the result somehow.

## Running the Solution

```bash
# build docker image
$ docker build -t nest-cloud-run .

# run the app
$ docker run -p 3000:3000 nest-cloud-run
```

```bash
# run using npm
$ npm run start:prod
```

After running the app go to http://localhost:3000/record-label/ to acess the result

## Shortcoming
One use case throws error for  data[key][sub_key].map. Looking into teh error will exceed the alotted time limit.
# Kollide

  Custom IDE built on Eclipse Theia with a Memgraph-powered backend.

[![Built with Eclipse Theia](https://img.shields.io/badge/Built%20with-Eclipse%20Theia-0052CC?logo=eclipseide&logoColor=white)](https://theia-ide.org/)
[![Database: Memgraph](https://img.shields.io/badge/Database-Memgraph-00C2A8?logo=memgraph&logoColor=white)](https://memgraph.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Status 
The project is currently work in progress. 

## Syphor
The `syphor` extension demonstrates how to implement a simple extension with a basic Theia backend and frontend. At the frontend,
there is a simple widget that takes arbitrary Cypher queries which a dedicated backend service forwards to a local memgraph server.
It also demonstrates how to use the settings/preferences UI, how to register command contributions and menu contributions.

## Getting started

Please install all necessary [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).
Run the following at the monorepo root:

```sh
npm install
```

On the first run, also use Lerna to run the `prepare` scripts:

```sh
npm run prepare
```

## Building app and extensions

*Build the relevant extension*

```sh
npm run build:syphor
```

*Build the browser* 

```sh
npm run build:browser
```

*Start the application*

```sh
npm run start:browser
```

*Access the application*

Navigate to: `localhost:3000`

## Running the tests

```sh
  npm test
```

*or* run the tests of a specific package with

```sh
    cd syphor
    npm test
```

## Developing with the browser example

Start watching all packages, including `browser-app`, of your application with

```sh
  npm run watch:browser
```

*or* watch only specific packages with

```sh
  cd widget
  npm run watch
```

and the browser example.

```sh
  cd browser-app
  npm run watch
```

## Developing with the Electron example

Start watching all packages, including `electron-app`, of your application with

```sh
  npm run watch:electron
```

*or* watch only specific packages with

```sh
  cd syphor
  npm run watch
```

and the Electron example:

```sh
  cd electron-app
  npm run watch
```

## Publishing an extension

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

```sh
  npm login
```

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

```sh
  npx lerna publish
```

---

- https://img.shields.io/badge/kollide-theia-blue

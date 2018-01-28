# Node HTTP Authorization Header Parser and Generator

[![Dependency Status](https://david-dm.org/MitMaro/http-authorization-header.svg)][1]
[![Build Status](https://travis-ci.org/MitMaro/http-authorization-header.svg?branch=master)][2]
[![Coverage Status](https://coveralls.io/repos/github/MitMaro/http-authorization-header/badge.svg?branch=master)][3]
[![NPM version](https://img.shields.io/npm/v/@mitmaro/http-authorization-header.svg)][4]
[![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)][5]

Parses and generates HTTP Authorization and Proxy-Authorization headers strictly following [RFC-7235][6]. Supports
legacy style auth-schemes (Basic, Digest, Bearer) as well as the more modern key-value auth params.

## Install

```bash
npm install --save @mitmaro/http-authorization-header
```

## Documentation

* [API Documentation][10]

## Usage

### Parse Header

```javascript
const http = require('http');
const {parse} = require('@mitmaro/http-authorization-header');

const httpServer = http.createServer((req, res) => {
    const authHeader = req.getHeader('Authorization');
    // authHeader => 'myscheme foo=bar, baz=foobar, buzz="quoted \"value!\""
    
    const authData = parse(authHeader);
    
    console.log(authData);
    /*
    {
        scheme: 'myscheme',
        values: [
            ['foo', 'bar'],
            ['baz', 'foobar],
            ['buzz', 'quotes "value!"']
        ]
    }
    */
}).listen();
```

### Create Header

```javascript
const {create, createToken68} = require('@mitmaro/http-authorization-header');

// legacy header value support (Basic, Digest, Bearer)
const basicAuthHeader = createToken68('Basic', Buffer.from('username:password').toString('base64'));
// Basic dXNlcm5hbWU6cGFzc3dvcmQ=

// modern form
const rfc7235Header = create('Custom', [['foo', 'bar'], ['foo', 'fuzz'], ['buzz', 'quoted "value!"']]);
// Custom foo=bar,foo=fuzz,buzz="quoted \"value!\""
```

### All exports

```javascript
const {
	create,
	createUnsafe,
	createToken68,
	createToken68Unsafe,
	parse,
	InvalidHeaderError,
	InvalidInputError,
} = require('@mitmaro/http-authorization-header');
```

## Contributing

If the library is not in compliance with RFC-7235 then create an issue explaining the issue with sample data, or even
better create a pull request that adds a test that fails.

## Development

Development is done using Node 8 and NPM 5, and tested against both Node 6 and Node 8. To get started

* Install Node 8 from [NodeJS.org][7] or using [nvm]
* Clone the repository using `git clone git@github.com:MitMaro/http-authorization-header.git`
* `cd http-authorization-header`
* Install the dependencies `npm install`
* Make changes, add tests, etc.
* Run linting and test suite using `npm run test`

## License

Based on [auth-header][8] which was licensed under [CC0-1.0][9]. This project is released under the
[ISC license](LICENSE).

[1]:https://david-dm.org/MitMaro/http-authorization-header
[2]:https://travis-ci.org/MitMaro/http-authorization-header
[3]:https://coveralls.io/github/MitMaro/http-authorization-header?branch=master
[4]:https://www.npmjs.com/package/@mitmaro/http-authorization-header
[5]:https://raw.githubusercontent.com/MitMaro/http-authorization-header/master/LICENSE
[6]:https://tools.ietf.org/html/rfc7235
[7]:https://nodejs.org/en/download/
[8]:https://github.com/izaakschroeder/auth-header
[9]:https://creativecommons.org/publicdomain/zero/1.0/
[10]:http://www.mitmaro.ca/http-authorization-header/
[nvm]:https://github.com/creationix/nvm#installation

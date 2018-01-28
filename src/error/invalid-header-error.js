'use strict';

const {RuntimeError} = require('@mitmaro/errors');

module.exports = class InvalidHeaderError extends RuntimeError {};

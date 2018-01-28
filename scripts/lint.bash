#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")" && source "./common.bash"

info "Running ESLint"
eslint "$@" .

info "Running TSLint"
tslint --format verbose --config tslint.json "$@" 'src/**/*.ts'

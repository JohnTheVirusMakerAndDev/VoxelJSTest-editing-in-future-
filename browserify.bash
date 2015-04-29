#!/bin/bash

DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# to install browserify: npm install browserify -g
# to install uglifyjs: npm install uglify-js -g

browserify "$DIR/assets/editor.debug.js" | uglifyjs -o "$DIR/assets/editor.js"
browserify "$DIR/assets/index.debug.js" | uglifyjs -o "$DIR/assets/index.js"
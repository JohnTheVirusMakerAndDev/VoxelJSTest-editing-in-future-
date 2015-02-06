:: to install browserify: npm install browserify -g
:: to install uglifyjs: npm install uglify-js -g

browserify ./assets/editor.debug.js | uglifyjs -o ./assets/editor.js
browserify ./assets/index.debug.js | uglifyjs -o ./assets/index.js
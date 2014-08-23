:: to install browserify: npm install browserify -g
:: to install uglifyify: npm install uglifyify -g

start cmd /k browserify -t uglifyify ./assets/editor.debug.js -o ./assets/editor.js
start cmd /k browserify -t uglifyify ./assets/index.debug.js -o ./assets/index.js
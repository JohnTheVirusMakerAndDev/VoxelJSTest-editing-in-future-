#voxel-warriors
this project aims to develop a game voxel based graphics and a gameplay similar to capture the flag.

##play game
since this game is purely multiplayer based, it is required to join a server. in order to find a list of active servers, simply navigate to `www.voxel-warriors.com`. it is also possible to setup a new server, what is further described below.

![ThumbScreenshot](http://dhiont4yb3hlc.cloudfront.net/VoxRect/ThumbScreenshot.png)

##server setup
make sure to have `node` and `npm` installed. navigate to `nodejs.org` otherwise, in order to download the latest binaries.

a prebuilt version of `VoxRect-52` can then be obtained through the associated [link](http://dhiont4yb3hlc.cloudfront.net/VoxRect/VoxRect-52.zip). after unpacking it, go ahead and navigate to the root folder of the archive. before `node` is being used to start the server, the dependencies can then be installed by calling `npm` within a console.

```
npm install
```

```
node VoxRect.js
```

several preferences of the game can furthermore be changed within `VoxConf.js`. to change the port on which the server is listening, open `NodeConf.js` and change the following line appropriately.

```javascript
process.env.intExpressPort = 15897;
```

to keep the server up and running, using `forever` is recommended. it can globally be installed through `npm` within a console and then simply be utilized to start the server and keep it running. it is therefore no longer necessary to call `node` directly.

```
npm install forever -g
```

```
forever VoxRect.js
```

##development guide
make sure to be able to start a server as described in the previous section. since there is no actual compilation step, this is also everything that is required in order to develop the server.

in order to apply changes of the client and the editor, the code has to be combined with `browserify` and `uglifyify` however. these packages can globally be installed through `npm` within a console.

```
npm install browserify -g
```

```
npm install uglifyify -g
```

after `browserify` and `uglifyify` are available, the batch files can be used in order to perform the required combination.

##architecture outline
in order to gain a quick overview of the architecture, the following diagram can be consulted. since it is only a sketch, it does not follow a specific format.

![Architecture](http://dhiont4yb3hlc.cloudfront.net/VoxRect/Architecture.png)

`NoteGen.js` is a basic library that is also being used in other projects. it is therefore quite generic and developers can probably just ignore it.

`VoxRect.js` is the webserver, that handles all the communication between the clients. in order to appear in the list of active servers, it furthermore frequently reports to the master server.

`index.debug.js` is the client, which is being delivered when accessing the server. the connection to the server is continually kept alive, in order to keep the state of the game up to date.

`editor.debug.js` is a very basic editor, which is being used to create the maps. it is necessary to access this component via the server, since the images are otherwise linked incorrectly.

##related dependencies
since the project consists of several components and each component has individual dependencies, they are being listed separately.

###`VoxRect.js`
* `node` / `npm`
* `socket.io`
* `express`

###`index.debug.js`
* `node` / `npm`
* `socket.io`
* `voxel-engine` / `voxel-highlight` / `minecraft-skin`
* `browserify` / `uglifyify`
* `jquery` / `jquery.ui` / `moment`

###`editor.debug.js`
* `node` / `npm`
* `voxel-engine` / `voxel-highlight` / `minecraft-skin`
* `browserify` / `uglifyify`
* `jquery` / `jquery.ui` / `moment`

##image credits
* [joedeluxe](http://www.minecraftforum.net/forums/mapping-and-modding/resource-packs/1244027-64x-1-7-2-traditional-beauty/)
* [mrtomcinns](http://www.minecraftskins.com/skin/3371575/slime-warrior/)

##applied license
please refer to the appropriate file within the repository.
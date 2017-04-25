# cubx-bde-opener

## install
Install the npm package:

    npm install cubx-bde-opener
    
## Run from bash
### The command    

    cubx-bde-opener <path to webpackage> -p <port of the running http server> -u <url to bde>
     
    Example: 
    cubx-bde-opener ../test/webpackages/my-package/ -p 8282 -u https://cubbles.world/bde/bde@2.1.0/bde/index.html 

### Prerequisite 
    
A locale server is running on a port wich is identical to given '-p' parameter.

## Use in code
## Example
    const BdeOpener = require('cubx-bde-opener');
    ...
    var port = 8282;
    var bdeUrl = 'https://cubbles.world/bde/bde/bde@2.1.0/bde/index.html';
    path = path.join('test','webpackages','my-package');
    var bdeOpener = new BdeOpener( (port, bdeUrl, path)
    bdeOpener.process();
    
### Prerequisite 
    
A locale server is running on a port wich is identical to given '-p' parameter.

# @fknop/http2-server

Simple http2 server written with HapiJS. Not many features, just created this for my use case.

## Install

```
$ npm install -g @fknop/http2-server
```


## Options

* port (--port): The port on which the server will be running. Default to `9090`.
* path (--path): The path to the directory to be served. Default to current directory.
* index (--index): The index file name. Default to `index.html`.
* listing (--listing): If no index can be found, list the files in the directory. Default to true.
* open (--open): If present, will open the url in a browser. If no browser is specified, it will open with chrome.
    + `http2-server --open`: Open with chrome
    + `http2-server --open firefox`: Open with firefox

## Notes

Don't forget to add the `https` before the localhost in the url.

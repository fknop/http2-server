'use strict';

const args = require('args');

const defaultPort = 9090;

args
    .option('port', 'The port on which the server will be running',
            defaultPort, function (value) { 
                
                const port = parseInt(value);
                if (isNaN(port)) {
                    return defaultPort;
                }

                return port;
            })
    .option('path', 'The path where to serve the files', '.')
    .option('index', 'The name of the index file to look for. Default to index.html.', 'index.html')
    .option('redirectToIndex', 'If this option is present, when a file is not found, the index will be returned.', true)
    .option('listing', 'If no index can be found, list the files in the directory. Default to true.', true)
    .option('open', 'If present, will open in a browser')



const flags = args.parse(process.argv);

require('./server')(flags);

'use strict';

const args = require('args');

args
    .option('port', 'The port on which the server will be running',
            8080, function (value) { 
                
                const port = parseInt(value);
                if (isNaN(port)) {
                    return 8080;
                }

                return port;
            })
    .option('path', 'The path where to serve the files', '.')
    .option('index', 'The name of the index file to look for. Default to index.html.', 'index.html')
    .option('redirectToIndex', 'If this option is present, when a file is not found, the index will be returned.', true)
    .option('listing', 'If no index can be found, list the files in the directory. Default to true.', true)


const flags = args.parse(process.argv);

require('./server')(flags);

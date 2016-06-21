'use strict';

const Glue = require('glue');
const Open = require('open');
const getManifest = require('./manifest');


module.exports = function (options) {

    getManifest(options, (err, manifest) => {

        if (err) {
            throw err;
        }

        Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {

            if (err) {
                throw err;
            }

            server.start((err) => {

                if (err) {
                    throw err;
                }

                console.log('Server running on', server.info.uri);
                if (options.open) {
                    Open(server.info.uri, typeof options.open === 'string' ? options.open : 'chrome');
                }
            });
        });
    });
};

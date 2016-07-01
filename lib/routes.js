'use strict';

exports.register = function (server, options, next) {

    if (options.redirectToIndex) {

        server.ext('onPostHandler', function (request, reply) {
            
            const response = request.response;
            if (response.isBoom &&
                response.output.statusCode === 404) {

                return reply.file(options.index || 'index.html').code(200);
            }

            return reply.continue();
        });
    }

    server.route({
        path: '/{param*}',
        method: 'GET',
        handler: {
            directory: {
                path: '.',
                index: options.index || 'index.html',
                listing: options.listing
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'routes',
    version: require('../package.json').version
};
const Path = require('path');
const Http2 = require('http2');
const Pem = require('pem');

module.exports = function (options, callback) {

    Pem.createCertificate({ selfSigned: true }, (err, keys) => {
        
        if (err) {
            return callback(err, null);
        }

        console.log('Generating self signed certificate ...');

        const manifest = {
            connections: [
                {
                    host: 'localhost',
                    port: options.port,
                    listener: Http2.createServer({ key: keys.serviceKey, cert: keys.certificate }),
                    tls: true,
                    routes: {
                        files: {
                            relativeTo: Path.resolve(process.cwd(), options.path)
                        }
                    }
                }
            ],
            registrations: [
                {
                    plugin: {
                        register: 'inert'
                    }
                },
                {
                    plugin: {
                        register: './routes',
                        options: options
                    }
                }
            ]
        };

        return callback(null, manifest);
    });

}
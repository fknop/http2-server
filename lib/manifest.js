const Path = require('path');
const Http2 = require('http2');
const Pem = require('pem');

module.exports = function (options, callback) {

    console.log('Generating self signed certificate ...');
    Pem.createCertificate({ selfSigned: true }, (err, keys) => {
        
        let ssl = true;

        if (err) {
            console.log('No OpenSSL found, falling back to HTTP1');
            ssl = false;
        }


        const manifest = {
            connections: [
                {
                    host: 'localhost',
                    port: options.port,
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

        if (ssl) {
            manifest.connections[0].listener = Http2.createServer({ key: keys.serviceKey, cert: keys.certificate });
            manifest.connections[0].tls = true;
        }

        return callback(null, manifest);
    });

}
const Hapi = require('hapi');
const Path = require('path');
const server = new Hapi.Server();

server.connection({
    host:  '0.0.0.0',
    port: (process.env.PORT || 3000)
});

const giphy = require('./giphy');
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            giphy.getAnyGif( (err, res) => {
                if( err ) throw err;
                let data = JSON.parse( res );
                console.log(data.data);
                return reply.view('home', { image: data.data.fixed_width_downsampled_url });
            } );

        }
    }
    ,{
        method: 'GET',
        path: '/public/{path*}',
        handler: {
            directory:{
                path: Path.join(__dirname, 'public')
                ,listing: false
                ,index: false
            }
        }
    }
]

server.register( [require('vision'), require('inert')], (err) => {
    if( err ) throw err;

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views'
    });

    server.route( routes );
})



server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});

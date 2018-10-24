const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port : 8000,host:'localhost'});

server.route({
    method: 'GET',
    path: '/en',
    handler: function(request,reply){
        reply('hello');
    }
});

const plugin = function(server,options,next){
    server.route({
        method : 'GET',
        path : '/cn',
        handler : function(request,reply){
            reply('ni hao!');
        }
    });
    next();
};

plugin.attributes = {
    name : 'My plugin'
};

server.register(plugin,(err)=>{
    if(err){
        throw err;
    }

    server.start((err)=>{
        if(err){
            throw err;            
        }
        console.log('server running at:',server.info.uri);
    });
});
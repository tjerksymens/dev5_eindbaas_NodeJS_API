module.exports.go = (server) => {
    const Primus = require('primus');
    const primus = new Primus(server, {
        /* options */
    });

    primus.on('connection', (spark) => {
        console.log('connected to primus 🐥');

        spark.on('data', (data) => {
            console.log("data received from client:👱🏻‍♂️", data);

            if(data.action === 'order') {
                primus.write({
                    action: 'order',
                    data: data.data
                });
            }

            if(data.action === 'orderCountUpdate') {
                primus.write({
                    action: 'orderCountUpdate',
                    data: data.data
                });
            }

            if(data.action === 'cancel') {
                primus.write({
                    action: 'cancel',
                    data: data.data
                });
            }

            if(data.action === 'orderStatus') {
                primus.write({
                    action: 'orderStatus',
                    data: data.data
                });
            }
        });
    });
}
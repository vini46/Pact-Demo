let pact = require('@pact-foundation/pact-node');
const path = require('path');


var opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],            
    pactBroker: 'http://localhost',
    consumerVersion: '2.0.0',           
    providerBaseUrl: 'http://localhost'
};

pact.publishPacts(opts).then(function () {
    console.log('Pacts published to broker');
});

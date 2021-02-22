let db;

async function createDb() {
    addRxPlugin(require('pouchdb-adapter-idb'));
    const createRxDatabase = require('rxdb');

    addRxPlugin(require('pouchdb-adapter-idb'));

    db = await createRxDatabase({
        name: 'sda-hymns',           // <- name
        adapter: 'idb',          // <- storage-adapter
        password: 'QL8FMV76JCXD',     // <- password (optional)
        multiInstance: true,         // <- multiInstance (optional, default: true)
        eventReduce: false // <- eventReduce (optional, default: true)
    });
}

createDb();
console.log(db);

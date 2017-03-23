﻿var DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;

module.exports =  {
    test: function(){
        console.log('*** DocumentDB Node.js Promises SDK databases demo ***')
        var endpoint = process.env.DOCUMENTDB_URL;
        var authKey = process.env.DOCuMENTDB_KEY;
        var client = new DocumentClient(endpoint, { masterKey: authKey });

        var databaseDefinition = { id: "MyDatabase" };
        var database;

        // Create a new database
        console.log();
        console.log("Creating database: " + databaseDefinition.id);
        client.createDatabaseAsync(databaseDefinition).then(function (createDatabaseResponse) {
            database = createDatabaseResponse.resource;
            console.log("Database created successfully");
            console.log(database);
            
            // Query existing databases    
            return client.queryDatabases("SELECT * FROM c").toArrayAsync();

        }).then(function (queryDatabasesResponse) {
            console.log();
            console.log("Current databases:");
            for (var i = 0; i < queryDatabasesResponse.feed.length; i++) {
                var db = queryDatabasesResponse.feed[i];
                console.log(' ' + db.id + " (" + db._rid + ")");
            }
            
            //Delete the new database
            console.log();
            console.log("Deleting database: " + database.id);
            return client.deleteDatabaseAsync(database._self)

        }).then(function (deleteDatabaseResponse) {
            console.log("Database deleted successfully");
            console.log();
            
            // End of promise chain
            console.log('Done. Press Enter to continue...');
            process.stdin.on('data', process.exit.bind(process, 0));

        }).fail(function (error) {
            console.log("An error occurred");
            console.log(error);
        });
    }
}

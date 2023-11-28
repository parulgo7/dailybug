// // voter microservice 

// // npm install express


// const express = require('express')
// const app = express(); 

// const {Mongoclient} = require("mongodb")
// const uri = "mongodb://localhost:27017"

// let port = 3002 
// app.listen(port, ()=> console.log('listening and shit'))

// app.get('/', (request, response) => {

//     // load voter data - read 

//     try {
//         await client.connect()
//         await client.db('voting').collection('voters')
//         .find()
//         .toArray()
//         .then (results => {
//             response.send(results)
//         })
//         .catch (error => console.error(error))
//     } catch (error) {
//         console.error(error)
//     } finally {
//         client.close()
//     }

// }
// )

// app.post('/', async (request, response) => {
//     const submittedVoterName = request.body.name; 

//     // create an object to match our voter object in mongo 

//     const voterData = { 'name': submittedVoterName, 'ballot': null}

//     // write to mongo 
//     try {
//         await client.connect()
//         await client.db('voting').collection('voters')
//         .insertOne(voterData)
//         .then (results => {
//             response.send(results)
//         })
//         .catch (error => console.error(error))
//     } catch (error) {
//         console.error(error)
//     } finally {
//         client.close()
//     }

// })

// //UPDATE, PUT 
// app.put('/', async ( request, response) => {
//     //expecting JSON variables to help us record a vote
//     //key for the voter: name 
//     //key for ballot 
//     const submission = request.body.candidate; //voter
//     const voterFilter = { "name": request.body.voter}; //person voting 
//     const updateDocument = { $set: { "ballot": {"name": submission } }} 

//     try {
//         await client.connect(); 
//         await client.db('voting').collection('voters')
//         .updateOne(voterFilter, updateDocument)
//         .then(results=> response.send(results))
//         .catch(error => console.error(error))
//     } catch (error) {
//         console.error(error)
//     }
//     finally {
//         client.close()
//     }

// })


// //DELET, DELETE 
// app.delete('/', async (request, response) => {
//     const voterFilter = { 'name': request.body.name}
//     try {
//         await client.connect()
//         await client.db('voting').collection('voters')
//         .deleteOne(voterFilter)
//         .then( results => response.send(results))
//         .catch (error => console.error(error))
//     } catch (error) {
//         console.error(error)
//     } finally {
//         client.close()
//     }

// })

// voter microservice
const express = require('express');
const app = express();

const { MongoClient } = require ("mongodb");
const uri="mongodb://localhost:27017";
const client = new MongoClient(uri);

let port = 3004;

app.use(express.json());

app.listen(port, ()=> console.log(`listening on port ${port}`));
// CREATE
app.post('/', async (request, response)=> {

    console.log('YOU ARE IN POST OF ADS'); 

    const submittedUserID = request.body.submittedUserID; //sending name --> _id to connect to user. 
    const ad_id = request.body.ad_id;

    
    datecreated = request.body.datecreated; 
    userip = "127.0.0.1"
    user_agent = "chrome"
    eventtype = "click"

    // create an object to match our voter object in mongo
    const userData = {"ad_id": ad_id, "datecreated": datecreated, "userip": userip, "user_agent": user_agent, "event_type": eventtype, "user_id": submittedUserID, "article_id": "12344" };
    // write to mongo
    try {
        await client.connect();
        await client.db('dailybugle').collection('adevents')
        .insertOne(userData)
        .then( results => response.send(results))
        .catch( error=> console.error(error));
        console.log(`DID YOU GET TO ADEVENT`); 
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }

});
// READ
app.get('/', async (request, response) => {
    // load voter data - READ
    try {
        await client.connect();
        await client.db('dailybugle').collection('ads')
        .find()
        .toArray()
        .then ( results => {
            response.send( results);
        })
        .catch( error=> console.error(error));
        console.log(`DID YOU GET TO ADS`); 
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
});


// UPDATE, PUT
app.put('/', async ( request, response) => {
    
    // expecting JSON variables to help us record a vote
    // key for the voter: name
    // key for the ballot
    const submission = request.body.candidate; // ??
    const voterFilter = { "name":request.body.voter }; // person voting
    const updateDocument = { $set: { "ballot": { "name":submission} } };
    console.log(voterFilter);
    console.log(updateDocument);
    try {
        await client.connect();
        await client.db('voting').collection('voters')
        .updateOne(voterFilter, updateDocument)
        .then( results=> response.send(results))
        .catch( error=> console.error(error));
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
})

// DELETE, DELETE

app.delete('/', async (request,response) => {
    const voterFilter = { "name": request.body.name };
    try {
        await client.connect();
        await client.db('voting').collection('voters')
        .deleteOne(voterFilter)
        .then( results=> response.send(results))
        .catch( error=>console.error(error));
    } catch(error) {
        console.error(error);
    } finally {
        client.close();
    }

})




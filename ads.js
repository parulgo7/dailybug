// voter microservice
const express = require('express');
const useragent = require('express-useragent');

const app = express();

const { MongoClient } = require ("mongodb");
const uri="mongodb://localhost:27017";
const client = new MongoClient(uri);

let port = 3004;

app.use(express.json());
app.use(useragent.express());
app.set('trust proxy', true);

app.listen(port, ()=> console.log(`listening on port ${port}`));
// CREATE
app.post('/', async (request, response)=> {

    user_agent = "chrome"; 
    
    const userAgent = request.useragent;
    user_agent = userAgent; 
    console.log(userAgent);
      
    console.log('YOU ARE IN POST OF ADS'); 

    const submittedUserID = request.body.submittedUserID; //sending name --> _id to connect to user. 
    const ad_id = request.body.ad_id;

    const userip = request.ip; 
    console.log(userip); 

    //const userAgent = navigator.userAgent;
    //console.log(userAgent);

    datecreated = request.body.datecreated; 
    //userip = request.body.userip;  
    
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




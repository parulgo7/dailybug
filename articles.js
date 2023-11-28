// candidate microservice
const http = require ('http');
const url = require('url')

const { MongoClient } = require ('mongodb');

const mongoURI = "mongodb://localhost:27017";

const client = new MongoClient(mongoURI);

const hostname = "127.0.0.1";
const port = 3003;
const server = http.createServer();

server.on('request', async ( request, response) => {
    // check the path, and invoke one function or another
    let q = url.parse(request.url,true);
    let returnCandidates = []; // for holding candidates to return
    console.log(q.pathname);
   switch (q.pathname) {
        case "/articles":
            returnCandidates = await getCandidates();
            break;
        case "/articles/comments":
            returnCandidates = await getComments();
            break;
        case "/candidates/ballots":
            returnCandidates = await getCandidatesWithBallots();
            break;
        case "/articles/comments/submit":
            returnCandidates = await submitComments(); 
            break; 
    }
    // gotten our data to return, we'll send a response
    response.writeHead(200, { 'Content-type':'text/JSON'});
    response.end( JSON.stringify( returnCandidates));
})
server.on('error', error=>console.error(error.stack));

server.listen(port, hostname, () => console.log(`server running at http://${hostname}:${port}`));




async function getCandidates() { //get your articles
    let values = [];
    console.log('getCandidates');   
    const database = client.db('dailybugle'); 
    const candidates = database.collection('articles');
    const cursor = candidates.find({}).sort({ title: 1}); 
    while ( await cursor.hasNext()) {
        values.push( await cursor.next());
    }
    //console.log()
    return values;
}

// async function getComments() { //get your articles
//     let values = [];
//     console.log('getComments');   
//     const database = client.db('dailybugle'); 
//     const candidates = database.collection('articles');
//     const comments = database.collection('comments');
//     const cursor = candidates.find({}).sort({ title: 1}); 
//     while ( await cursor.hasNext()) {
//         let thisCandidate = await cursor.next();
//         const query = { "comments.comment":thisCandidate.comment };
//         const matchingVotes = await comments.countDocuments( query );
//          values.push( { "_id":thisCandidate._id, "comments": thisCandidate.title + ' '+ matchingVotes, "comment": matchingVotes});
//     }
//     console.log("did you get to get comments"); 
//     return values;
// }

async function getComments() {
    let values = [];
    console.log('getComments');

    const database = client.db('dailybugle');
    const articles = database.collection('comments');

    const cursor = articles.find({}).sort({ comment: 1 });

    while (await cursor.hasNext()) {
        let thisArticle = await cursor.next();

        // Assuming comments is an array within the articles collection
        let commentsArray = {}
        // for (const c of thisArticle.comments) {
        //     commentsArray.push(c); 
        // }
        values.push(thisArticle); 
        // values.push({
        //     "_id": thisArticle._id,
        //     "title": thisArticle.title,
        //     "comments": commentsArray
        // });
    }

    console.log("did you get to get comments");
    return values;
}

async function submitComments(){



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
}



async function getCandidatesWithBallots() { //get articles with comments

    let values = []; //STUB: write me

    const database = client.db('dailybugle');
    const candidates = database.collection('articles');
    const ballots = database.collection('comments');
    const cursor = candidates.find({}).sort( { title: 1});
    while ( await cursor.hasNext()) {
        let thisCandidate = await cursor.next();
        const query = { "comments.comment":thisCandidate.comment };
        const matchingVotes = await ballots.countDocuments( query );
         values.push( { "_id":thisCandidate._id, "name": thisCandidate.title + ' '+ matchingVotes, "ballots": matchingVotes});
    }
    const query2 ={ "comment": null};
    const matchingVotes = await ballots.countDocuments(query2);
    values.push( { "_id":0, "name":"not voted", "ballots": matchingVotes });
    return values;
}
// voter microservice
const express = require('express');
const app = express();

const { MongoClient } = require ("mongodb");
const uri="mongodb://localhost:27017";
const client = new MongoClient(uri);

let port = 3005;

app.use(express.json());

app.listen(port, ()=> console.log(`listening on port ${port}`));
// CREATE
app.get('/', async (request, response)=> { //used to be post 
    console.log(`INSIDE AUTH GET REQUEST`); 
        try {
            await client.connect();
            await client.db('dailybugle').collection('users')
            .find()
            .toArray()
            .then ( results => {
                //console.log(results); 
                response.send(results);
                })
                .catch( error=> console.error(error));
                console.log(`DID YOU GET TO USERS`); 
            } catch (error) {
                console.error(error);
            } finally {
                client.close();
            }
});

app.post('/', async (request, response) => {
    const { username, password } = request.body;

    try {
        await client.connect();

        const user = await client
            .db('dailybugle')
            .collection('users')
            .findOne({ username, password });

        if (user) {
            // Username and password match, authentication successful
            response.json({ success: true, role: user.author ? 'author' : 'commenter' });
        } else {
            // Username and/or password do not match
            response.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        response.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
        client.close();
    }
});


// // READ
// app.get('/', async (request, response) => { //hitting endpoint is a get request 
//     // load voter data - READ
//     try {
//         await client.connect();
//         await client.db('dailybugle').collection('users')
//         .find()
//         .toArray()
//         .then ( results => {
//             response.send( results);
//         })
//         .catch( error=> console.error(error));
//         console.log(`DID YOU GET TO USERS`); 
//     } catch (error) {
//         console.error(error);
//     } finally {
//         client.close();
//     }
// });




// const express = require('express');
// const app = express();

// const http = require ('http');
// const url = require('url')

// const { MongoClient } = require ('mongodb');

// const mongoURI = "mongodb://localhost:27017";

// const client = new MongoClient(mongoURI);

// const hostname = "127.0.0.1";
// const port = 3005;
// const server = http.createServer();
// collectionName = "users"; 
// dbName = "dailybugle"

// const endpoint = {};

// endpoint['auth'] = 'http://127.0.0.1:8080/api/users';


// app.use(bodyParser.json());

// // Connect to MongoDB
// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

//     console.log('Connected to MongoDB');

//     const db = client.db(dbName);
//     const usersCollection = db.collection(collectionName);

//     // Route for user authentication
//     app.post('/authenticate', async (req, res) => {
//         const { username, password } = req.body;

//         try {
//             // Find user by username
//             const user = await usersCollection.findOne({ username });

//             // If user not found
//             if (!user) {
//                 return res.status(401).json({ message: 'Authentication failed. User not found.' });
//             }

//             // Compare the entered password with the hashed password in the database
//             const passwordMatch = await bcrypt.compare(password, user.password);

//             if (passwordMatch) {
//                 return res.status(200).json({ message: 'Authentication successful!' });
//             } else {
//                 return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
//             }
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'Internal server error.' });
//         }
//     });

//     // Start the server
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// });


// async function getUser() { //get your articles
//     let values = [];
//     console.log('getUsers');   
//     const database = client.db('dailybugle'); 
//     const candidates = database.collection('users');
//     const cursor = candidates.find({}).sort({ username: 1}); 
//     while ( await cursor.hasNext()) {
//         values.push( await cursor.next());
//     }
//     console.log()
//     return values;
// }


// function openModal() {
//     document.getElementById('myModal').style.display = 'block';
// }

// function closeModal() {
//     document.getElementById('myModal').style.display = 'none';
// }

// function authenticateUser() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Perform authentication logic here
//     // For demonstration purposes, a simple check is performed here
//     if (username === 'demo' && password === 'password') {
//         alert('Authentication successful!');
//         closeModal(); // Close the modal after successful authentication
//         return false; // Prevent form submission (since it's just for demo)
//     } else {
//         alert('Authentication failed. Please check your username and password.');
//         return false; // Prevent form submission
//     }
// }

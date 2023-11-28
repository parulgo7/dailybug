// // write a list of candidates to the page 

// // .catch(error => {
// //     let errorMessage = "error message something"; 
// //     console.log()
// // })

// // 

// function loadContent(){

// }

// // whne you clcik on a button it will open a modal window and you save the name then! 


// function loadVoters() {
//     let voterNames = fetch(endpoint['voter'])
//     voterNames.then( res => res.json())
//     .then( result => {
//         const potentialBallots = []
//         const completedBallots = []
//         for (item of result) {
//             if (item.ballot === null) {
//                 potentialBallots.push(item);
//             }
//             else{
//                 completedBallots.push(item)
//             }

//         }
//         makeAList('potentialBallots', potentialBallots)
//         makeAList('completedBallots', completedBallots)

//     })
// }

// function submitAddUser(){
//     let newName = document.getElementById('useName').value;
//     saveVoter(newName); //post to the api
//     closeSpan.onclick(); 
//     // I've added a voter, need to reload the voter list 
//     loadVoters();
//     return false; 
// }

// function saveVoter(voter){
//     const dataToSend = {"name": voter}
//     let addVoter = fetch(endpoint ['voters'], 
//     {
//         method: 'POST',
//         headers: {'Accept':'application/JSON', 
//         'Content-type': 'application/json'}, 
//         body: JSON.stringify(dataToSend)
//     })
//     addVoter.then( response=> response.json() )
//     .then( (result)=> {
//         statusMessage("result"); 
//     })
//     .catch(error => { let errorMessage = "error saving voter"; 
//         console.log})
//     console.log(errorMessage)
//     // STUB: maybe write the rror on the page somewhere 
// }

// function statusMessage(message){
//     document.getElementById("messages").innerHTML=message; 
// }

// front end JS for voter app
const endpoint = {};
endpoint['articles']='http://127.0.0.1:8080/api/articles';
endpoint['comments']='http://127.0.0.1:8080/api/articles/comments'; //change
endpoint['ads']='http://127.0.0.1:8080/api/ads';
endpoint['auth'] = 'http://127.0.0.1:8080/api/users';
// CHANGE LATER.... 


let voterPackage = {}; // global container for holding ballot information

const viewType = {
    reader: 'reader', //home
    commenter: 'commenter', //ballot
    author: 'author' //results
}
function deleteVoter(name) { 
    // STUB: write a function to invoke the voter delete
    //alert('delete voter');
    const voterPackage = { "name":name};
    let deleteVoter = fetch(endpoint['voter'],
    { method: 'DELETE',
    headers: {
        'content-type':'application/json'
    },
    body: JSON.stringify(voterPackage)
    })
    .then (results=>results.json())
    .then ( (result)=> {
        statusMessage(result);
        loadContent(viewType['home']);
    })

}


async function verifyCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(endpoint['auth'], {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
                'Accept':'application/JSON'
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        console.log(result); 

        if (result.success) {
            alert(`Authentication successful. Role: ${result.role}`);
            let result_role = `${result.role}`
            if (result_role == "commenter"){
                document.getElementById('commentForm').style.display = 'block';
            }
            loadContent(viewType[result_role]); 
            console.log("i got past it"); 
            // Redirect or perform other actions based on the role
        } else {
            alert(`Authentication failed: ${result.message}`);
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        alert('An error occurred during authentication. Please try again.');
    }
}

async function fetchAuthUser() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username); 
    console.log(password); 

    let voterNames = await fetch(endpoint['auth']);
    

    voterNames.then( res=>res.json()) 
    .then ( result=> {
        
        //console.log("am i in fetch authorized user");
        //console.log(result); 
        //console.log("timing matters"); 

        for ( var item of result ) {
            console.log(item); 
            if ( item.username === username && item.password == password ) {
                if (item.author == true){
                    console.log("i am an author bitch"); 
                    loadContent(viewType['author']); 
                    return "AUTHOR"; 
                } else {
                    console.log("i am an commenter hoe"); 
                    loadContent(viewType['commenter']); 
                    return "COMMENTER";
                }
            } else {
                return "UNAUTHORIZED"; 
            }
        }
        // makeAList('ads', potentialBallots, "advertisement", showBallot, true);
    })

}


function initPage() {
    document.getElementById('heading').innerHTML = "HEADLINE";
    loadContent(viewType['reader']);

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("addBtn");
    var closeSpan = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    };

    var resultBtn = document.getElementById('login-button');
    resultBtn.onclick = function () {
        modal.style.display = "block";
    };

    resultBtn.onclick = async function () {
        // Call the verifyCredentials function
        //await verifyCredentials();

        // After the credentials are verified, you can perform additional actions if needed
        var username = document.getElementById('username').value;
        var role = "whatever"; //determineUserRole(username);
        loadContent(viewType[role]);

        modal.style.display = 'none';
    };

    closeSpan.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}



// function initPage() {
//     // set up the page
//     // set the title
//     document.getElementById('heading').innerHTML="HEADLINE"; // to change later
//     loadContent(viewType['reader']);
//     //loadVoters();
//     // modal window functions
//     var modal=document.getElementById("myModal");
//     var btn=document.getElementById("addBtn");
//     var closeSpan=document.getElementsByClassName("close")[0];
//     btn.onclick=function() {
//         modal.style.display="block";
//     }
//     var resultBtn=document.getElementById('login-button'); //used to be showResults
//     resultBtn.onclick=function() {
//         console.log("do you get inside here?"); 
//         modal.style.display="block";
//     }
//     console.log("do you get past the resultbt"); 
//     resultBtn.onclick=function() { //used to be resultBtn

//         loadContent(viewType["author"]); 

//         // console.log("do you get into the onclick"); 
//         // //you should only switch to the author role if you logged in correctly and they are an author
//         var returnedUser = document.getElementById('loginForm'); 
        
//         // console.log("commenter view"); 
//         console.log(returnedUser); 

//         if (returnedUser == "AUTHOR"){
//             loadContent(viewType['author']); 
//             console.log("in author mode"); 

//         } if (returnedUser == "COMMENTER") {
//             loadContent(viewType['commenter']); 
//             console.log("commenter view"); 
//         }
//         if (returnedUser == "UNAUTHORIZED") {
//             loadContent(viewType['reader']); 
//             alert("You did not login correctly"); 
//         }

        
//         // document.getElementById('myModal').style.display = 'block';

//         // //if result of js function is author --> loadcontent[author]
//         // //if not author --> commenter --> loadcontent[commenter]

//         // // loadContent(viewType['author']); //was author
//         // document.getElementById('myModal').style.display = 'none';
//     }

//     closeSpan.onclick = function() {
//         modal.style.display="none";
//     }
//     window.onclick=function(event) {
//         if (event.target==modal) {
//             modal.style.display="none";
//         }
//     }
// }

function fetchAndDrawBallot() {
    // show the ballot so the current user can vote
    // STUB: alter the display to make it look like a ballot
    let candidateNames = fetch(endpoint['articles'])
    .then( res=>res.json()) 
    .then (result=> {
        makeAList("candidateList", result, ["title"], recordVoterAndVote);
    })
}
function fetchAndListCandidates(showVotes) {

    let target = 'articles'; //candidates
    if (showVotes) {
            target='ads'; //candidatesWithBallots
    }

    // display a list of candidates
    let candidateNames = fetch(endpoint[target]);
    candidateNames
    .then((result) => result.json())
    .then((result) => {
        console.log(result);
        makeAList('candidateList', result, ["title"]);
    })
    .catch((error) => {
        console.error(error);
        document.getElementById('potentialBallots').append(error);
    });

     // write a list of candidates to the page

}

function fetchStory(showVotes) {

    let target = 'articles'; //candidates
    if (showVotes) {
            target='ads'; //candidatesWithBallots
    }

    // display a list of candidates
    let candidateNames = fetch(endpoint[target]);
    candidateNames
    .then((result) => result.json())
    .then((result) => {
        console.log(result);
        makeAList('storyList', result, ["title", "teaser", "body"]);
        // makeAList('storyList', result, "teaser");
        // makeAList('storyList', result, "body");

    })
    .catch((error) => {
        console.error(error);
        document.getElementById('potentialBallots').append(error);
    });

     // write a list of candidates to the page

}


function fetchComments() {

    // display a list of candidates
    let candidateNames = fetch(endpoint['comments']);
    candidateNames
    .then((result) => result.json())
    .then((result) => {
        console.log(result);
        makeAList('commentList', result, ["comment"]);
    })
    .catch((error) => {
        console.error(error);
        //document.getElementById('potentialBallots').append(error);
    });
}


function fetchAndListVoters() {
    let voterNames = fetch(endpoint['ads']);
    voterNames.then( res=>res.json() ) 
    .then ( result=> {
        const potentialBallots =[];
        const completedBallots = [];
        console.log("am i in fetch and list voters"); 
        console.log(result); 
        // completedBallots.push(result); 
        // potentialBallots.push({"advertisement": "who let the dogs out"}); 
        for ( item of result ) {
            if ( item.advertisement === null ) {
                potentialBallots.push(item);
            } else {
                completedBallots.push(item);
            }
        }
        makeAList('ads', potentialBallots, ["advertisement"], showBallot, true);
        makeAList('ads', completedBallots, ["advertisement"]);
    })

}

function loadContent(view) {

    // reset the view
    const contentAreas=document.getElementsByClassName('displayArea');
    

    for ( area of contentAreas) {
        area.innerHTML=""; // empty the containers for redrawing
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Get the 'ads' element
        const adsElement = document.getElementById('ads');
    
        // Check the user role and hide the ads if the role is not the desired one
        if (viewType['author'] === true) {
            adsElement.style.display = 'none';
        }
    });
    

    switch (view) {

        case viewType['reader']: {
            fetchAndListCandidates(false); // STUB: include argument to show results
            fetchAndListVoters();
            document.getElementById('commentForm').style.visibility = 'hidden';
            //document.getElementById('showResults').style.visibility = 'hidden';
            console.log("Do you get to reader view? "); 
            break;
        }
        case viewType['commenter']: {
            document.getElementById('commentForm').style.display = 'block';
            fetchAndDrawBallot();
            break;
        }
        case viewType['author']: {
            //fetchAndListCandidates(true);
            console.log("HEYYYY I'M AN AUTHOR BABY"); 
            fetchAndListCandidates(false); // STUB: include argument to show results
            fetchAndListVoters();
            document.getElementById('ads').style.visibility = 'hidden';
            break; 
        }
    }
}


// function makeAList( target, data, idField, ocfunction, deleteLink ) {
//         const element = document.getElementById(target);
//         element.innerHTML = "";
      
//         let list = document.createElement('ul');
      
//         for (let i = 0; i < data.length; i++) {
//           let li = document.createElement('li');
//           let span = document.createElement('span');
      
//           // Use the dynamic idField to get the property value
//           let keyValue = data[i][idField];
      
//           span.innerHTML = data[i][idField];
      
//           span.id = keyValue;
      
//           li.append(span);
//           list.appendChild(li);
//         }
      
//         element.append(list);
      
      
// }

function makeAList(target, data, idFields, ocfunction, deleteLink) {
    const element = document.getElementById(target);
    element.innerHTML = "";

    let list = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        let li = document.createElement('li');

        // Create a div for each idField
        idFields.forEach(fieldName => {
            let span = document.createElement('span');
            let keyValue = data[i][fieldName];

            if (fieldName == "teaser"){
                span.innerHTML = `<span style="font-size: 14px; font-style: italic;">${data[i][fieldName]}</span><br>`;
                span.id = keyValue;
                li.appendChild(span);
            }
            if (fieldName == "body"){
                span.innerHTML = `<span style="font-size: 12px;">${data[i][fieldName]}</span><br>`;
                span.id = keyValue;
                li.appendChild(span);
            } 
            else {
                span.innerHTML = `<span style="font-size: 16px;">${data[i][fieldName]}</span><br>`;
                span.id = keyValue;
                li.appendChild(span);
            }
            // Create a line for each field
            
        });

        // Add the list item to the list
        list.appendChild(li);
    }

    // Append the list to the target element
    element.append(list);
}

function recordNewVoter() {
    let newName = document.getElementById('userName').value;
    recordVoter(newName); // post to the API
    closeSpan.onclick();
    // I've added a voter, need to reload the voter list
    fetchAndListVoters();
    return false;
}
function recordVoterAndVote() { //record ad and create ad event? 
     // when a user clicks on a candidate, record a vote
     // for that user and that candidate

     console.log("am i in recordVoterAndVote"); 
     voterPackage.candidate=this.id; 
     let addBallot= fetch(endpoint['ads'],
     { 
        method: 'PUT',
        headers: { 'Content-type':'application/json'},
     
     body: JSON.stringify(voterPackage) }
     )
     .then( res=>res.json()) 
     .then( (result)=> {
        statusMessage(result);
        // clear out the voterPackage
        voterPackage={};
        // redraw the page
        loadContent(viewType['reader']);
     })
     .catch(error=>{
        console.error(error);
        statusMessage(error);
     });
}

async function submitComment() {
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so we add 1
    const day = today.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    submittedUserID = "703220"; 


    const commentText = document.getElementById('commentText').value;

    const dataToSend = {"datecreated": formattedDate, "comment": commentText, "user_id": submittedUserID};

    console.log(dataToSend); 
    let addVoter = await fetch( endpoint['articles'], //post is for adevents, not ads even though in ads
    {
        method:'POST',
        headers: {
            'Accept':'application/JSON',
            'Content-type':'application/json'
        },
        body: JSON.stringify( dataToSend )
    })
    .then( response=>response.json())
    .then( (result)=> {
        statusMessage(result);
        //fetchAndListVoters(); // update the list of voters
    })
    .catch(error=>console.log("error saving voter"));

    // Perform actions with the commentText, such as sending it to a server or updating the UI.

    // Clear the textarea after submission
    document.getElementById('commentText').value = '';

    // Prevent the form from submitting in the traditional way
    return false;
}

async function recordVoter(ad_id) { //let's make this the adevent tracker 


    console.log("inside record voter"); 

    console.log(this.user); 
    console.log(this.ad_id);

    const today = new Date();

    // Get the components of the date
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so we add 1
    const day = today.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;


    submittedUserID = "123456"; 
    ad_id = "ad baby";
    datecreated = formattedDate; 
    user_agent = "chrome";
    eventtype = "click";
    let userip = "123.456.897";

    // Make an HTTP GET request to ipify API
    // fetch('https://api.ipify.org?format=json')
    //     .then(response => response.json())
    //     .then(data => {
    //         // The IP address is available in data.ip
    //         console.log('Your IP address is', data.ip);
    //         userip = data.ip; 
    //     })
    //     .catch(error => console.error('Error fetching IP address:', error));




    const dataToSend = {"ad_id": ad_id, "datecreated": datecreated, "userip": userip, "user_agent": user_agent, "event_type": eventtype, "user_id": submittedUserID, "article_id": "12344" };

    console.log(dataToSend); 
    let addVoter = await fetch( endpoint['ads'], //post is for adevents, not ads even though in ads
    {
        method:'POST',
        headers: {
            'Accept':'application/JSON',
            'Content-type':'application/json'
        },
        body: JSON.stringify( dataToSend )
    })
    .then( response=>response.json())
    .then( (result)=> {
        statusMessage(result);
        //fetchAndListVoters(); // update the list of voters
    })
    .catch(error=>console.log("error saving voter"));

    // STUB: maybe write the error on the page somewhere
}
function showBallot() {
    voterPackage.voter=this.id; 
    //loadContent(viewType['commenter']); // display the ballot view
    //recordVoter(); 
}
function statusMessage(message) {
    document.getElementById("messages").innerHTML=message;
}
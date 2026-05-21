/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/

/***************************************************************
//                       Variables                            //
***************************************************************/
var favoriteFruit;
var fruitQuantity;
var usersName;
var uid;
/***************************************************************/
function fb_authenticate() {
    console.log("Logging in")
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("Logged in")
            console.log(user)
            // User is signed in, see docs for a list of avaliable properties
            // https://firebase.google.com/docs/refrence/js/firebase.User
            uid = user.uid;

            // ...
        } else {
            console.log("Not logged in")
            // User is signed out
            // Using a popup.
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token.
                var token = result.credential.accessToken;
                // The signed in user info.
                var user = result.user;
            });
        }
    });
}



function fb_error() {
    // Don't forget your error handling!
}

//fb_write will not work until i can link to an actual database anmd by exstension neither will google login, thnis means that i will need to:
//link this in my own time
//delete the duplicate firebase miniskills file
//link all my files in one maneuverable location

function fb_write() {
    console.log("writing to database")
    firebase.database().ref('/').set({ message: 'test' })
}

console.log("Running Sal's Strawberries")

function writeForm() {

    // Get the form data
    favoriteFruit = document.getElementById("favoriteFruit").value;
    usersName = document.getElementById("name").value;
    fruitQuantity = document.getElementById("fruitQuantity").value;

    //creates the user table and adds them as a user
    if (usersName == null || favoriteFruit == null || fruitQuantity == null) {
        alert("you must fill out all fields before submitting the form!");
        
        if (usersName == NaN || favoriteFruit == NaN) {
            alert("One or more fields is incorrectly filled with a number!");
            
            
            if (uid == null) {
                alert("you gotta login first fella!");
                
            }
        }
    } else {
        console.log("Hello " + usersName + ". your favourite fruit is " + favoriteFruit + " and you want " + fruitQuantity + " of them.")
        createUserTable()
        
        addUserToTable()
    }

}


//create the initial table to store user data in the database
function createUserTable() {
    Sals_Strawberries = {
        users: {

        }
    }

    //when you create the table try taking a snapshot of the table and make that a string varaiable. Then in the future, when you update it instead add the updates to the varaible and add teh variable to the database
    firebase.database().ref('/').set(Sals_Strawberries)
}

//generate a marketing email
function generateEmail() {
    document.getElementById("marketingEmail").innerHTML = "Hello " + usersName + "!" + "\nPress 'affirm' to receive " + fruitQuantity + " " + favoriteFruit + " by tommorow!";

}

//add a new user to the user table
function addUserToTable() {
    //add the user to the customer database
    //let user = uid;
    firebase.database().ref('/Sals_Strawberries/users/' + uid).set({
        Name: usersName,
        Amount: fruitQuantity,
        Favorite: favoriteFruit,
    });

    //Display the users name once they enter their details
    document.getElementById("displayName").innerHTML = "Hello " + usersName;
}

function affirmPurchase() {
    if (fruitQuantity == null || favoriteFruit == null || usersName == null) {

    } else {
        console.log("purchase complete");
        document.getElementById("statusMessage").innerHTML = "THANK YOU FOR AFFIRMING!";
        document.getElementById("affirmButton").style.display = "none";
    }
}

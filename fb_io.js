/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
function fb_authenticate() {
    console.log("Logging in")
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("Logged in")
            console.log(user)
            // User is signed in, see docs for a list of avaliable properties
            // https://firebase.google.com/docs/refrence/js/firebase.User
            var uid = user.uid;

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
    const favoriteFruit = document.getElementById("favoriteFruit").value;
    const name = document.getElementById("name").value;
    const fruitQuantity = document.getElementById("fruitQuantity").value;
    console.log("Hello " + name + ". your favourite fruit is " + favoriteFruit + " and you want " + fruitQuantity + " of them.")

    //creates the user table and adds them as a user
    createUserTable()

    //add the user to the customer database
    firebase.database().ref('/customers/').set({

        User: {
            Name: name,
            Amount: fruitQuantity,
            Favorite: favoriteFruit,
        },

    });

    //Display the users name once they enter their details
    document.getElementById("displayName").innerHTML = "Hello " + name + "!";

}

//create the initial table to store user data in the database
function createUserTable() {
    customers = {

    }
    firebase.database().ref('/').set(customers)
}

//generate a marketing email
function generateEmail() {
    document.getElementById("marketingEmail").innerHTML = "Hello " + name + "!";
       
}

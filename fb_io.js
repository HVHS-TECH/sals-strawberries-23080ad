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

console.log("Running Sal's Strawberries")

function writeForm() {

    // Get the form data
    favoriteFruit = document.getElementById("favoriteFruit").value;
    usersName = document.getElementById("name").value;
    fruitQuantity = document.getElementById("fruitQuantity").value;
    if (favoriteFruit == null || usersName == null || fruitQuantity == null) { return; }

    //creates the user table and adds them as a user
    if (uid == null) {
        console.log("you must log in");
        alert("you must log in first")
        
        if (fruitQuantity.length > 200) {
            

        }
    } else {
        console.log("fruit quantity value: " + fruitQuantity)
        console.log("users name value: " + usersName)
        console.log("favorite fruit value: " + favoriteFruit)

        console.log("Hello " + usersName + ". your favourite fruit is " + favoriteFruit + " and you want " + fruitQuantity + " of them.")

        addUserToTable();

    }
}

//generate a marketing email
function generateEmail() {
    document.getElementById("marketingEmail").innerHTML = "Hello " + usersName + "!" + "\nPress 'affirm' to receive " + fruitQuantity + " " + favoriteFruit + " by tommorow!";

}

//add a new user to the user table
function addUserToTable() {
    //add the user to the customer database
    console.log("writing to db");
    firebase.database().ref('/Sals_Strawberries/users/' + firebase.auth().currentUser.uid + "/").set({
        Name: usersName,
        Amount: fruitQuantity,
        Favorite: favoriteFruit,

    });

    //Display the users name once they enter their details
    document.getElementById("displayName").innerHTML = "Hello " + usersName;
}

function affirmPurchase() {
    console.log("purchase complete");
    document.getElementById("statusMessage").innerHTML = "THANK YOU FOR AFFIRMING! YOUR FRUIT WILL BE DELIVERED SOMEWHWERE IN 1-2 BUSINESS DAYS.";
    document.getElementById("affirmButton").style.display = "none";
}

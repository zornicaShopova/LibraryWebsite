//Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAlh7mUlDnGzjgAIhxPm2c149GE1m7PzdQ",
    authDomain: "libraryapp-8e6b1.firebaseapp.com",
    databaseURL: "https://libraryapp-8e6b1-default-rtdb.firebaseio.com",
    projectId: "libraryapp-8e6b1",
    storageBucket: "libraryapp-8e6b1.appspot.com",
    messagingSenderId: "513473684719",
    appId: "1:513473684719:web:5b99d637e90932eb5ea71a",
    measurementId: "G-F93920KME5"
  };
  firebase.initializeApp(firebaseConfig);


//Reference admin data collection
var data = firebase.database().ref('adminData');


// Listen for form submit
document.getElementById('form').addEventListener('submit',submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();

    //get values
    var fname = getInputVal('firstName');
    var lname = getInputVal('lastName');
    var email = getInputVal('email');
    var pass = getInputVal('password');

    //Save admin data
    saveAdminData(fname,lname,email,pass);

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert 
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },2000);

    //Clear form
    document.getElementById('form').reset();
}


//function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Function to save the admin data 
function saveAdminData(fname,lname,email,pass){
  var newAdmin = data.push();
  newAdmin.set({
      fname: fname,
      lname: lname,
      email: email,
      pass:  pass
  });
}
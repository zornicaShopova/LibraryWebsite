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


  const auth = firebase.auth();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      
     //Clear form
     document.getElementById('loginForm').reset();
    }else{
           
    }
  });

 //Sign in with email and password
  function signIn(event){
    event.preventDefault();
    
    const email = document.getElementById('emailSignIn').value;
    const password = document.getElementById('passwordSignIn').value;
    
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function (error) {
        console.log("Error signing in!", error.message);
        alert(error.message);
    }).then(function (user) {
       if(user){
         window.location.href="adminPage.html";
         alert("You are now logged in!");
       }  
    });
  }


  // prevent going back 
  function preventBack(){
    window.history.forward();
  }
   preventBack();


 
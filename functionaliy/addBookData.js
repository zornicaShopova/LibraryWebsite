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

  var title,author,barcode,date,image,rate;

  // Reference to Book shelf db
  var database = firebase.database();

  // Listen for form submit
    document.getElementById('submitBook').addEventListener('submit',submitForm);

    //Submit form
function submitForm(e){
    e.preventDefault();

    //get values
    title = getInputVal('bookTitle');
    author = getInputVal('bookAuthor');
    barcode = getInputVal('barcode');
    date = getInputVal('date');
    image = getInputVal('image');
    rate = getInputVal('rate');

    //Save admin data
    addBook(title,author,barcode,date,image,rate);
    console.log("Added Book");

    //Clear form
    document.getElementById('submitBook').reset();

    //reload
    window.location.reload();
}


//function to get fields values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Function to add book
function addBook(title,author,barcode,date,image,rate){
database.ref('BookShelf/' + title).set({
      titleBook : title,
      authorBook : author,
      barcode : barcode,
      publishedDate : date,
      url : image,
      rateBook : rate
  });
}

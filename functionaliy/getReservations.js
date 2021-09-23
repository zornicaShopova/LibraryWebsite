// Get reservations data from firebase
function getReservations(){
    firebase.database().ref('UserReservations').on('value',
    function(AllRecords){
        AllRecords.forEach(
        function(CurrentRecord){
            var author = CurrentRecord.val().authorBook;
            var title = CurrentRecord.val().titleBook;
            var pickUpDate = CurrentRecord.val().pickupDate;
            var returnDate = CurrentRecord.val().returnDate;
            
            setTableReservations(author,title,pickUpDate,returnDate);
            //console.log("Reservations: " + title + " " + author);
        }
       );
    });
    
  }
  
  setTimeout(() => {
    window.onload = getReservations();
},1000)

  // Fill table reservations
  function setTableReservations(author,title,pickDate,retDate){
    var tableBody = document.getElementById('bodyTable');
    var tableRow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    td1.innerHTML = author;
    td2.innerHTML = title;
    td3.innerHTML = pickDate;
    td4.innerHTML = retDate;
   
    tableRow.appendChild(td1);
    tableRow.appendChild(td2);
    tableRow.appendChild(td3);
    tableRow.appendChild(td4);
   
    tableBody.appendChild(tableRow);

    //call the function to set the event to the new row
    setTimeout(() =>{
       selectReservation();
    },1000); 
   

}

//click row
var table2 = document.getElementById("tableReserv");
    function selectReservation(){
     
      for(var i = 1; i < table2.rows.length; i++)
        {
            table2.rows[i].onclick = function(){
                //get the data from the cells
                var tB = this.cells[0].innerHTML;
                var aB = this.cells[1].innerHTML;
                var pickupDate = this.cells[2].innerHTML;
                var returnDate = this.cells[3].innerHTML;
               

                //fill the inputs of the modal
                document.getElementById('tB').value = tB;
                document.getElementById('aB').value = aB;
                document.getElementById('pickupDate').value = pickupDate;
                document.getElementById('returnDate').value = returnDate;


                console.log( "Reservation :" + tB + " " + aB );
            }
        }

        //show the modal
        //when table field is clicked
        document.getElementById('tableReserv').addEventListener('click',function(){
            document.querySelector('.modal2').style.display = 'flex';
        });

    }

    //close the modal 
    document.querySelector('.close2').addEventListener('click',function(){
        document.querySelector('.modal2').style.display = "none";
    });

    //click event 
    // setTimeout(() =>{
    //     document.getElementById('savetBtn').addEventListener('click',saveReservation);
    // },1000);
    
    //document.getElementById('deleteBtn').addEventListener("click",deleteBook); 

    //update resevation
    var title,picDate,retDate;

    function saveReservation(){
    //    console.log("hello");

        title = document.getElementById('tB').value;
        picDate = document.getElementById('pickupDate').value ;
        retDate = document.getElementById('returnDate').value ;

        firebase.database().ref('UserReservations/'+title).update({
            pickupDate : picDate,
            returnDate: retDate
        },(error) => {
            if(error){
                alert("Record was not updated,there was some problem");
            }else{
                alert("Record was updated!");
            }
        });
        window.location.reload();
        
    }

    //delete reservation
    // function deleteBook(){
    //     title = document.getElementById('titleB').value;
    //     firebase.database().ref('BookShelf/' + title).remove().then(
    //         function (){
    //               alert('The book was deleted');
    //               window.location.reload();
    //         }
    //     )
    // }


    // logout
    const logout = document.getElementById('signout');
    const auth = firebase.auth();
    logout.addEventListener('click',(e) => {
        e.preventDefault();
        auth.signOut().then(() =>{
            window.location.href = "home.html";
            alert('user logout');
        });
    });
 


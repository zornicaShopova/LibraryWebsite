
  // Get books data from firebase
  function getBooks(){
    firebase.database().ref('BookShelf').on('value',
    function(AllRecords){
        AllRecords.forEach(
        function(CurrentRecord){
            var title = CurrentRecord.val().titleBook;
            var author = CurrentRecord.val().authorBook;
            var date = CurrentRecord.val().publishedDate;
            var barcode = CurrentRecord.val().barcode;
            var rate = CurrentRecord.val().rateBook;
            addItemsToTable(title,author,date,barcode,rate);
            console.log("Books" + title + " " + date );
            
        }
       );
    });
    
  }
  
  window.onload = getBooks;
  
   
  // Fill the table with books data
  function addItemsToTable(title,author,date,barcode,rate){
      var tbody = document.getElementById('tbody');
      var trow = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var td5 = document.createElement('td');

      td1.innerHTML = title;
      td2.innerHTML = author;
      td3.innerHTML = date;
      td4.innerHTML = barcode;
      td5.innerHTML = rate;

      trow.appendChild(td1);
      trow.appendChild(td2);
      trow.appendChild(td3);
      trow.appendChild(td4);
      trow.appendChild(td5);

      tbody.appendChild(trow);

      //call the function to set the event to the new row 
      selectRow();
      
  }

  //click row
  var rowIndex,table = document.getElementById("bookTable");
    function selectRow(){
     
      for(var i = 1; i < table.rows.length; i++)
        {
            table.rows[i].onclick = function(){
                rowIndex = this.rowIndex-1;
                //get the data from the cells
                var titleB = this.cells[0].innerHTML;
                var authorB = this.cells[1].innerHTML;
                var dateB = this.cells[2].innerHTML;
                var barcodeB = this.cells[3].innerHTML;
                var rateB = this.cells[4].innerHTML;

                //fill the inputs of the modal
                document.getElementById('titleB').value = titleB;
                document.getElementById('authorB').value = authorB;
                document.getElementById('dateB').value = dateB;
                document.getElementById('barcodeB').value = barcodeB;
                document.getElementById('rateB').value = rateB;

                console.log("Book: " + rowIndex + " " + titleB + " " + authorB + " " + dateB + " " + barcodeB + " " + rateB );
            }
        }

        //show the modal
        //when table field is clicked
        document.getElementById('bookTable').addEventListener('click',function(){
            document.querySelector('.modal').style.display = 'flex';
        });

    }  
        //close the modal 
        document.querySelector('.close').addEventListener('click',function(){
            document.querySelector('.modal').style.display = "none";
        });

        //click event 
        document.getElementById('editBtn').addEventListener("click",updateBook);
        document.getElementById('deleteBtn').addEventListener("click",deleteBook); 

        //update book
        var title,author,barcode,date,rate;
        function updateBook(){
           
            title =  document.getElementById('titleB').value;
            author =  document.getElementById('authorB').value;
            barcode = document.getElementById('barcodeB').value;
            date = document.getElementById('dateB').value;
            rate = document.getElementById('rateB').value;

            firebase.database().ref('BookShelf/'+title).update({
                titleBook : title,
                authorBook : author,
                barcode : barcode,
                publishedDate : date,
                rateBook : rate
            },(error) => {
                if(error){
                    alert("Record was not updated,there was some problem");
                }else{
                    alert("Record was updated!");
                }
            });
            window.location.reload();
            
        }

        //delete book 
        function deleteBook(){
            title = document.getElementById('titleB').value;
            firebase.database().ref('BookShelf/' + title).remove().then(
                function (){
                      alert('The book was deleted');
                      window.location.reload();
                }
            )
           
          
        }



   
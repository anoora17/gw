
 // array with inialize value
$(document).ready(function(){

var topics=["dog", "cat","care bears"];
               
        newButton();
     // funstion to hold the value of input and push it to an array

    $('#add-giffy').on('click',function(event){
      event.preventDefault()
     
     var userSearch=$("#uInput").val().trim();
     var stat=$(this).attr('data-state');
     console.log(userSearch)
     topics.push(userSearch);
  
         newButton();
        var queryUrl="http://api.giphy.com/v1/gifs/search?q="+userSearch+"&api_key=dc6zaTOxFJmzC&limit=10";  
  
       $.ajax({url:queryUrl,
        method:"Get"
       }).done(function(response){
            
          console.log(response);

         $("#giffy-display").html(dimages(response));
                 
         
      $('img').mouseover(function(){
                
                
            });
        });
        

    });
//         
    // funstion to display the images 
function dimages(response){
           
      $(".imge-display").html("");

  
  for(i=0;i<=9;i++){ 
$('.imge-display').append($('<img>').attr('src',response.data[i].images.fixed_height_downsampled.url));
$('.r').append("Raiting: "+response.data[i].rating);
   
    
    //loops end
    }         


// function dimages end hear
}

function newButton(){
    $("#buttons-display").html("");
for(i=0;i<topics.length;i++){
  var b=$('<button>');
      b.attr("value",topics[i]); 
      b.text(topics[i]);
      b.addClass("mygiphy")
      $("#buttons-display").append(b)
           

    }
      $(uInput).val('')
   }

       $(document).on('click','.mygiphy',function(){
        var userSearch = $(this).text();

        var queryUrl="http://api.giphy.com/v1/gifs/search?q="+userSearch+"&api_key=dc6zaTOxFJmzC&limit=10";  
  
       $.ajax({url:queryUrl,
        method:"Get"
       }).done(function(response){
            
         $("#giffy-display").html(dimages(response));

          });
                  

})



// end 

    });        
        
    




     
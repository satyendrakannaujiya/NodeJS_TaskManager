var db_operation = require('../DbOperation/connect');

var list;



 

// console.log("satyendr + " + list);

exports.indexPage = 
`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Task Manager</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

</head>
<body>
	

	 <nav class="navbar navbar-light bg-primary">
      <a class="navbar-brand text-light" href="/">Manage Your Task - A NodeJS Application</a>
    </nav> 


    <div class="container mt-5">

            <form action="/create" method="get">
    	   <button class="btn btn-block btn-success" type="submit">Create New Task</button>
    	   </form>

  
            <h3 class="mt-5">List of task </h3>

            
    	  
    </div>

	

    <script>
        
        function action(){

            console.log("within action method ");
               if(confirm('Are you sure to delte task ') == true){

                  console.log("You pressed ok");

               }else{
                console.log("You pressed no");
               }
        }

    </script>
</body>
</html>`
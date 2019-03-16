

var http = require('http');
var url = require('url');
var home = require('./views/index');
var fs = require('fs');
// var create = require('./views/create');

var dbOperation = require('./DbOperation/connect');



var port = 3000;


var server = http.createServer(function(req,res){

           
           if(req.url == '/'){

            

           	res.writeHead(200,{contentType:'text/html'});
           	 res.write(home.indexPage);

           	 dbOperation.getTaskDetails(function(result){
                        
                          var len = result.length;
                          var ct=0;
                          result.forEach(result1=>{

                             ct++;

                              res.write(`
                               <div class="container">
           	 	              <div class="card mt-2">
                              <div class="card-header">
                                      ${result1['title']}
                              </div>
                              <div class="card-body d-flex justify-content-between">
                               ${result1['description']}
                                  <div class="d-flex">
                                      <form action="/delete" method="post">
                                      <input type="text" value='${result1['id']}' name="id" hidden/>
                                     <button class="btn btn-danger" type="submit">Delete</button>
                                     
                                     </form>
                                     <form action="/update" method="post" class="ml-2">
                                      <input type="text" value='${result1['id']}' name="id" hidden/>
                                      <input type="text" value='${result1['title']}' name="id" hidden/>
                                      <input type="text" value='${result1['description']}' name="id" hidden/>
                                     <button class="btn btn-success" type="submit">Update</button>
                                     
                                     </form>
                                 </div>
                              </div>
                              
                               </div>
                               </div>`);

                              if(ct==len){
                              	   res.end();
                              }

                          })



                          res.end('<p class="container">No task to display </p>');

           	 })

           	 
           	//fs.createReadStream("./views/index.html").pipe(res);
	        

           }else if(req.url == '/create'){
                   res.writeHead(200,{contentType:'text/html'});
           	       // res.write(create.create);
           	       fs.createReadStream("./views/create.html").pipe(res);
	              // res.end();

           }else if(req.url === '/submit'){
           	       
           	       var data = "";
           	       req.on('data',function(chunk){
           	       	   data = data + chunk;
           	       });

           	       req.on('end',function(chunk){
           	       	     
                           var data1 = data.split('&');
                           
                           title=data1[0].split('=')[1];
                           desc = data1[1].split('=')[1];
                           
                           finaltitle = title.split('+').join(' ');
                           finaldesc = desc.split('+').join(' ');
                           
                           
                          dbOperation.addTaskDetails(finaltitle,finaldesc);

                          res.writeHead(302,{Location:'/'});
           	       	       res.end();
           	       })
           }else if(req.url == '/delete'){

                     var data1 = "";
                   req.on('data',function(chunk){
                       data1 = data1 + chunk;
                   });

                   req.on('end',function(chunk){

                       // console.log("Delete item id is " + data1);

                       dbOperation.deleteItem(data1.split('=')[1]);
                       res.writeHead(302,{Location:'/'});
                       res.end();
                   })

           }else if(req.url == '/update'){

                  res.end("Update the info ");

           }
           else{

           	    res.writeHead(200,{contentType:'text/html'});
           	    res.write(`<h1 style="margin-top:100px;color:red;">Sorry  Error 404 : Requested resource not found </h1>`);
           	    res.end();
           }

	       
});


  // console.log(server);

server.listen(port,function(){
	   console.log("Server is listen on port " + port);
})
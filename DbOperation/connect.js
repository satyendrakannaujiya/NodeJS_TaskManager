

var sql = require('mysql');

var connection = sql.createConnection({
	 host:'localhost',
	 database: 'task_manager',
	 user: 'root',
	 password: 'mnnit2016'
})

connection.connect(function(err){
	  if(err){
	  	  console.err("Error in connecting "+err);
	  	  return ;
	  }

	  console.log('Connected as id ' + connection.threadId);
})


var getTaskDetails = function(callback){
	    connection.query('Select * from task_details ', (err,result)=>{
	    	   if(err){

	    	   	console.log("Error in get Task details ");

	    	   }
	    	   else{
                      
	    	   	    callback(result);
	    	   }
	    })
}

var addTaskDetails = function(task,description){

connection.query(` insert into task_details (title,description) values('${task}','${description}') `, (err,result)=>{
	    	   if(err){

	    	   	console.log("Error addTaskDetails  ");

	    	   }
	    	   else{

	    	   	    console.log("Task added succss fully");
	    	   }
	    })

}

var deleteItem = function(id){

	  connection.query(`delete from task_details where id = ${id}`,(err,res)=>{
	  	    if(err){
	  	    	  console.log("Error while delete from database ");
	  	    }
	  	    else{
	  	    	  console.log("Deleted successfully ");
	  	    }
	  });
}


module.exports = {

	getTaskDetails,
	addTaskDetails,
	deleteItem
}


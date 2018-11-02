//Load express module with `require` directive
var express = require('express')
var app = express()

const query = require('./queryPM110MP');
//const config = require('./config');

//Define request response in root URL (/)
app.get('/cache/:PNNUM', async function (req, res) {
    var redis = require('redis');
	var client = await redis.createClient();
	var on = await client.on('error', function(err){
		console.log('Something went wrong ', err)
		res.send('error connect redis')
	});
	res.send('connect')
	
	
	getval = await client.get(req.params.PNNUM,async function(err, result) { //check cache
		console.log("cache:"+result); // this is a string
		if(result == ""){
			var q = await query(req.params.PNNUM,res);
			setval = await client.set(req.params.PNNUM, q, redis.print);
			val = await client.get(req.params.PNNUM,async function(err, result2) {
				console.log("set:"+result2); // this is a string
				res.send({message: "set:"+result2})
				//res.status(200).send({message: "set:"+result2});
			});
		}else{
			res.send({message: "cache:"+result})
			//res.status(200).send({message: "cache:"+result});
		}
	});
	
})


//Launch listening server on port 8081
app.listen(8093, function () {
  console.log('app listening on port 8093!');
})
var mongoose = require('mongoose');
var gracefulShutdown;
var dburl= "mongodb+srv://Joel:joel9041@cluster0.e4skw.mongodb.net/zuri?retryWrites=true&w=majority";
try{
   mongoose.connect(
      dburl,
       {
      useUnifiedTopology:true,
      useFindAndModify: false,
      useNewUrlParser: true
   },()=>console.log('mongoose is connected')
   );
} catch(e){
   console.log("could not connect")
}



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Joel:joel9041@cluster0.e4skw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect((err, result) => {
//    if (err){
//    const collection = client.db("zuri").collection("users");
//    // perform actions on the collection object
//    client.close();
//    } else{
//       console.log(result)
//    }
// })
// client.isConnected()




var readLine = require("readline");
if (process.platform === "win32") {
   var rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
   });
   rl.on("SIGINT", function () {
      process.emit("SIGINT");
   });
}

mongoose.connection.on('connected', function(){
   console.log('mongoose has now been connected to '+ dburl);
});
mongoose.connection.on('error', function(err){
   console.log('mongoose connection error '+ err);
});
mongoose.connection.on('disconnected', function(){
   console.log('mongoose disconnected '+ dburl );
});

gracefulShutdown = function (msg, callback) {
   mongoose.connection.close(function () {
      console.log('Mongoose disconnected through ' + msg);
      callback();
   });
};

// For app termination
process.on('SIGINT', function () {
   gracefulShutdown('app termination', function () {
      process.exit(0);
   });
});
// For Heroku app termination
process.on('SIGTERM', function () {
   gracefulShutdown('Heroku app shutdown', function () {
      process.exit(0);
   });
});
require('./schema')

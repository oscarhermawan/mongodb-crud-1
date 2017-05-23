var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/my_books';
var ObjectId = require('mongodb').ObjectId
const methods = {}

methods.insertBook = function(req,res){
  MongoClient.connect(url, function(err,db){
    var collection = db.collection('books')
    collection.insert({
      isbn:req.body.isbn,
      title:req.body.title,
      author:req.body.author,
      category:req.body.category,
      stock:req.body.stock
    }, function(err, result){
      if(!err){
        res.send(result)
      } else {
        res.send(err)
      }
    })
    db.close();
  })
}

methods.getAllBooks = function(req,res){
  MongoClient.connect(url, function(err,db){
    var collection = db.collection('books')
    collection.find({}).toArray(function(err, result){
      if(!err){
        res.send(result)
      } else {
        res.send(err)
      }
    })
    db.close();
  })
}

methods.updateBook = function(req,res){
  MongoClient.connect(url, function(err,db){
    var collection = db.collection('books')
    collection.find({"_id" : ObjectId(req.params.id)}).toArray(function(err, result){
      if(!err){
        console.log(result[0]);
        collection.updateOne({"_id" : ObjectId(req.params.id)}, { $set: {
          isbn:req.body.isbn || result[0].isbn,
          title:req.body.title || result[0].title,
          author:req.body.author || result[0].author,
          category:req.body.category || result[0].category,
          stock:req.body.stock || result[0].stock
        }}, function(error, dataUpdate){
          if(!error){
            res.send(dataUpdate)
            db.close();
          } else {
            res.send(error)
            db.close();
          }
        })
      } else {
        res.send(err)
        db.close();
      }
    })
  })
}

methods.deleteBook = function(req,res){
  MongoClient.connect(url, function(err,db){
    var collection = db.collection('books')
    collection.deleteOne({"_id" : ObjectId(req.params.id)}, function(err, result){
      if(!err){
        res.send("Berhasil Hapus Data")
      } else {
        res.send(err)
      }
    })
    db.close();
  })
}

module.exports = methods

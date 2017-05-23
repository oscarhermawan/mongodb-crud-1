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
    collection.updateOne({"_id" : ObjectId(req.params.id)}, { $set: {
      isbn:req.body.isbn,
      title:req.body.title,
      author:req.body.author,
      category:req.body.category,
      stock:req.body.stock
    }}, function(err, result){
      if(!err){
        res.send(result)
      } else {
        res.send(err)
      }
    })
    db.close();
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

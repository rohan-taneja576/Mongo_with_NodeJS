// -------------------Native connectivity of Node JS with MongoDB--------------------------------------------

//const {MongoClient} = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
//const url = 'mongodb://localhost:27017';
//const client = new MongoClient(url);

// Database Name
//const dbName = 'myProject';

//async function main(){
// Use connect method to connect to the server
  /*  await client.connect();
    console.log('connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('documents')*/

    // const insertResult = collection.insertMany([
    //     {a:1},
    //     {a:2},
    //     {a:3}
    // ])

    // console.log('Inserted documents',insertResult)

   // const findResult = await collection.find({}).toArray()
    //console.log('Found documents =>', findResult)

    //const filteredDocs = await collection.find({a:3}).toArray()
    //console.log('filtered docs',filteredDocs)

    // const updateDocs = await collection.updateOne({a:1},{$set:{a:11}})
    // console.log('update docs',updateDocs)

    // const deleteDocs = await collection.deleteMany({});
    // console.log('deleted docs',deleteDocs)

    // const indexName = collection.createIndex({b:2})
    // console.log('index name',indexName)

  //  return 'done'
//}

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());


// -------------End of Native connectivity of Node JS with MongoDB--------------------------------------------


// ------------------Mongoose connectivity of Node JS with MongoDB--------------------------------------------


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true , useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please check your data entry, no name specified']
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:{
        type:String,
    }
})

const Fruit = new mongoose.model("Fruit",fruitSchema)

const fruit = new Fruit({
    name:'Peaches',
    rating:7,
    review:'Peaches good for health'
})

// fruit.save();


const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favouriteFruit:fruitSchema                 // this is going to embedded the fruit schema with person schema
})

const Person = new mongoose.model('Person',personSchema)

const pineapple = new Fruit({
    name:'PineApple',
    rating:9,
    review:'Great fruit'
})

const graphes = new Fruit({
    name:'Graphes',
    rating:7,
    review:'good for eye sight'
})

//graphes.save();

// const person = new Person({
//     name:'Rohan',
//     age:23,
//     favouriteFruit: pineapple
// })
Person.updateOne({_id:'60fbd05dfe118d3080c3616c'},{favouriteFruit:graphes},(err) => {
    if(err){
        console.log(err)
    }else{
        console.log('updated success!')
    }
})


// person.save();


// const kiwi = new Fruit({
//     name:'Kiwi',
//     rating:10,
//     review:'good for taste'
// })

// const orange = new Fruit({
//     name:'Orange',
//     rating:8,
//     review:'taste sour for me'
// })

// const banana = new Fruit({
//     name:'Banana',
//     rating:10,
//     review:'Good to make you healthy'
// })

// Fruit.insertMany([kiwi,orange,banana], function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log('Inserted elements successfully')
//     }
// })

Fruit.find((err,fruits) => {
    if(err){
        console.log(err)
    }else{
        mongoose.connection.close()
       // console.log(fruits);

        fruits.forEach(fruit => {
            console.log(fruit.name);
        })
    }
})

// Fruit.updateOne({_id:'60fbd1dcd1040e32f480f118'},{rating:9},(err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log('updated successfully')
//     }
// })


// Fruit.deleteMany({name:'Peaches'},(err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log('deleted successfully')
//     }
// })


// ------------------End of Mongoose connectivity of Node JS with MongoDB-----------------------------------

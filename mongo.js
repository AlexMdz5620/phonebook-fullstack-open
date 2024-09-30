const mongoose = require('mongoose');

if(process.argv.length < 3){
    console.log('Give password as argument');
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://ichialex5620:${password}@phonebook.wwrk4.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = mongoose.Schema({
    name: String,
    number: String
})

const Phonebook = mongoose.model('Person', phonebookSchema)

const person = new Phonebook({
    name: process.argv[3],
    number: process.argv[4]
})

if(process.argv.length > 3 && process.argv.length < 6){
    person.save().then(res => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to Phonebook`)
        mongoose.connection.close()
    })
}
else if(process.argv.length === 3){
    Phonebook.find({}).then(result => {
        console.log('Phonebook:');
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

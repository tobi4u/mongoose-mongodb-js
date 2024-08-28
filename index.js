const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();




mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connection successful');
}).catch(err => {
  console.error('Database connection error:', err);
});



// creating a person schema and model

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });
  

  const Person = mongoose.model('Person', personSchema);


// creating a saving a record of a model

const person = new Person({
    name: 'Ayo',
    age: 30,
    favoriteFoods: ['Dodo', 'Bread']
  });

person.save((err, data) => {
    if (err) {
      console.error('Error saving person:', err);
    } else {
      console.log('Person saved successfully:', data);
    }
  });
  

// creating many records with model.create()

const arrayOfPeople = [
    { name: 'Dele', age: 25, favoriteFoods: ['Rice', 'Beans'] },
    { name: 'Bimpe', age: 28, favoriteFoods: ['Semo', 'Eba'] },
    { name: 'Ugo', age: 32, favoriteFoods: ['Bread', 'Fufu'] }
  ];
  

Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      console.error('Error creating people:', err);
    } else {
      console.log('People created successfully:', people);
    }
  });
  

// using model.find() to search database

const name = 'Dele';

Person.find({ name: name }, (err, people) => {
  if (err) {
    console.error('Error finding people:', err);
  } else {
    console.log('People found:', people);
  }
});


//using model findOne() to search database and find single matching document

const food = 'Bread';

Person.findOne({ favoriteFoods: food }, (err, person) => {
  if (err) {
    console.error('Error finding person:', err);
  } else {
    console.log('Person found:', person);
  }
});



// using model.findById() to search database by id

const personIdToSearch = 'the_said_id';

Person.findById(personIdToSearch, (err, person) => {
  if (err) {
    console.error('Error finding person by ID:', err);
  } else {
    console.log('Person found by ID:', person);
  }
});


// performing update by running Find, Edit, then Save

const personIdToUpdate = 'the_said_id';

Person.findById(personIdToUpdate, (err, person) => {
  if (err) {
    console.error('Error finding person by ID:', err);
  } else {
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
      if (err) {
        console.error('Error saving updated person:', err);
      } else {
        console.log('Updated person:', updatedPerson);
      }
    });
  }
});


// performing new updates using model.findOneAndUpdate()

const personName = 'Bimpe';

Person.findOneAndUpdate(
  { name: personName },
  { age: 28 },
  { new: true },
  (err, updatedPerson) => {
    if (err) {
      console.error('Error updating person:', err);
    } else {
      console.log('Updated person:', updatedPerson);
    }
  }
);


// deleting one document using model.findByIdAndRemove()

const personIdToDeleteSingle = 'some_person_id';

Person.findByIdAndRemove(personIdToDeleteSingle, (err, deletedPerson) => {
  if (err) {
    console.error('Error deleting person:', err);
  } else {
    console.log('Deleted person:', deletedPerson);
  }
});


// deleting many documents with model.remove() and by name

const nameToDelete = 'Dele';

Person.remove({ name: nameToDelete }, (err, result) => {
  if (err) {
    console.error('Error deleting people:', err);
  } else {
    console.log('Deleted people result:', result);
  }
});



// using chain search to find people who like burrito

Person.find({ favoriteFoods: 'burritos' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    if (err) {
      console.error('Error querying people:', err);
    } else {
      console.log('Query results:', data);
    }
  });

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //find method gets all the contacts within the loki collection
  var contacts=req.app.get('contactsdb').find();
  res.render('index',{contacts:contacts});
});

//end point to return all available contacts
router.get('/contacts', function(req, res, next) {
  var contacts=req.app.get('contactsdb').find();
  res.status(200).json(contacts);
});

//end point to search contact by id
router.get('/contacts/:id', function(req, res, next) {
  var contacts=req.app.get('contactsdb').find();
  var result= contacts.find(contact => contact.id == req.params.id);
  if(result)
    return res.status(200).json(result);
  res.status(404).send("Sorry, contact not found");
});

//add new contact
router.post('/contacts', function(req, res, next) {
  var contactsdb=req.app.get('contactsdb');
  var contact={
    id: contactsdb.find().length,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    isFavorite: false
  }
  
  var result=contactsdb.insert(contact);
  if(result)
    return res.status(200).json(result);
  res.status(500).send("Sorry, Could not insert the record");

});

//update contact
router.put('/contacts/:id', function(req, res, next) {
  var contactsdb=req.app.get('contactsdb');
  var contacts=contactsdb.find();
  var contact= contacts.find(contact => contact.id == req.params.id);
  contact.isFavorite=true;
  var result=contactsdb.update(contact);
  if(result)
    return res.status(200).json(result);
  res.status(404).send("Sorry, contact not updated!!");
});


//delete contact
router.delete('/contacts/:id', function(req, res, next) {
  var contactsdb=req.app.get('contactsdb');
  var contacts=contactsdb.find();
  var contact= contacts.find(contact => contact.id == req.params.id);
  var result=contactsdb.remove(contact);
  if(result)
    return res.status(200).json(result);
  res.status(500).send("Sorry, Could not delete the contact");
});

/* app health end point. */
router.get('/health', function(req, res, next) {
  return res.status(200).json("I'm Healthy");
});

module.exports = router;

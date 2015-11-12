Meteor.startup(function () {
  if (! Persons.find().count()) {
    Persons.insert({name: 'Adam 1', jobs: [{title: 'CEO'}, {title: 'CTO'}]});
    Persons.insert({name: 'Adam 2', jobs: [{title: 'CEO'}, {title: 'CTO'}]});
    Persons.insert({name: 'Adam 3', jobs: [{title: 'CEO'}, {title: 'CTO'}]});
    Persons.insert({name: 'Adam 4', jobs: [{title: 'CEO'}, {title: 'CTO'}]});
    Persons.insert({name: 'Adam 5', jobs: [{title: 'CEO'}, {title: 'CTO'}]});
  }
});

Meteor.publish('persons', function (searchStr) {
  let selector = {};

  if (searchStr) {

    // This works as expected (updates the client as the searchStr changes):
    //selector['jobs.title'] = new RegExp(searchStr, 'i');

    // This does not update the subscription once the inital data set has been
    // sent:
    selector.jobs = {
      '$elemMatch': {
        title: new RegExp(searchStr, 'i')
      }
    };

  }
  console.log('selector', selector);

  let cursor = Persons.find(selector);
  console.log('count', cursor.count());

  return cursor;
});

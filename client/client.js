Template.Persons.events({
  'keyup input': function (event) {
    let val = $(event.currentTarget).val();
    Session.set('searchStr', val);
  }
});

Template.Persons.onCreated(function () {
  Session.setDefault('searchStr', '');

  let self = this;
  this.autorun(function () {
    self.subscribe('persons', Session.get('searchStr'));
  });
});

Template.Persons.helpers({
  persons: function () {
    return Persons.find();
  }
});

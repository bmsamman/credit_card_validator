import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function(){
    var date = this.model.get(this.property);
    if (!date || Ember.isBlank(date)) {
      this.errors.pushObject("cannot be blank");
      return;
    }
    date = date.toString();
    if( date.match(/^[0-1][0-9]\/[0-9][0-9]$/) ){
      var month = Number(date.split('/')[0]);
      if( month < 13 ){
        var actual_date = new Date();
        actual_date.setMonth(month);
        actual_date.setFullYear("20" + Number(date.split('/')[1]));
        if( actual_date <  new Date() )
        {  this.errors.pushObject("This card is expired."); }
        else { return; }
      }
    }
    this.errors.pushObject("Must use a valid date.  Example: 05/23");
  }
});
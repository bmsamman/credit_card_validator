import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function(){

    var number = this.model.get(this.property);
    if ( !number || Ember.isBlank(number) ) {
      this.errors.pushObject("cannot be blank");
      return;
    }
    this.model.updateCardType(number);
    number = number.replace(/[-|\s]/g, '');
    if( number.length === 16 && number.match(/^[4-6]\d{15}$/) )
    {return;}
    if( number.length === 15 && number.match(/^3\d{14}$/) )
    {return;}

    this.errors.pushObject("Invalid number");
  }


});
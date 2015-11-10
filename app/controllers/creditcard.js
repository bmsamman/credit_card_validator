import Ember from 'ember';
import EmberValidations from 'ember-validations';
import Settings from '../models/settings';

export default Ember.Controller.extend(EmberValidations,{
  settings: Settings.create(),
  cardType: null,
  cardHolder: null,
  cardNumber: null,
  cardExpiry: null,
  cvCode: null,
  updateCardType: function(number){
    var result = 'Unknown';
    if( number ){
      number = number.replace(/[-|\s]/g, '');
      if( number.match(/^\d*$/) ){
        if( number.length === 16 ){
          if      ( number[0] === '4' ) { result = 'Visa'; }
          else if ( number[0] === '5' ) { result = 'MasterCard'; }
          else if ( number[0] === '6' ) { result = 'Discover'; }
        }
        else if( number[0] === '3' && number.length === 15 )
        { result = 'American Express'; }
      }
    }
    this.set('cardType', result);
  },

  validations: {
    cardHolder: { presence: true },
    cardExpiry: { expiration: true },
    cardNumber: { credibility: true },
    cvCode: { presence: true, length: {minimum: 3, maximum: 4} }
  }
});
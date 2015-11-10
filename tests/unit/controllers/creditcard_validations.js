import { moduleFor } from 'ember-qunit';
import {
  testValidPropertyValues,
  testInvalidPropertyValues
} from '../../helpers/validate-properties';

moduleFor('controller:creditcard', {
  needs: ['service:validations',
          'ember-validations@validator:local/presence',
          'ember-validations@validator:local/length',
          'validator:local/expiration',
          'validator:local/credibility'
         ]
});

// Checking CVC validations
testValidPropertyValues('cvCode', ['132', '1235']);
testInvalidPropertyValues('cvCode', ['12323', '', '12', null, undefined]);

//  Checking expiration validations
var invalidDates =  [
                       '123/23', '12/322', '1/22','12323', '13/22', '-1/22',
                       null, undefined, '02/12','09/14'
                    ];
testInvalidPropertyValues('cardExpiry', invalidDates);
testValidPropertyValues('cardExpiry', ["01/22", "12/99"]);

//  Checking card number validations
var badNumbers = [ '123', '12345678901234', '123456789012345', '123456789012345',
              '3123456789012345', '41234567890123456', '51234567890123456',
              '61234567890123456', '7123456789012345', '7123456789012345323432',
              'afdasfasdf', '12321dedrfwdewrweqas4'
            ];
testInvalidPropertyValues('cardNumber', badNumbers);


var generateGoodCards = function(first_number){
  var last_number = "";
  if(first_number !== "3") { last_number = "5"; }

  var array = [ '12345678901234', '123 4567890-1234', '12345 6789012 34',
                '12-345678901-234'];
  return array.map(function(item){ return first_number + item + last_number;});
};
//  Checking valid American Express cards
testValidPropertyValues('cardNumber', generateGoodCards("3"));

//  Checking valid Visa cards
testValidPropertyValues('cardNumber', generateGoodCards("4"));

//  Checking valid Mastercards
testValidPropertyValues('cardNumber', generateGoodCards("5"));

//  Checking valid Discover
testValidPropertyValues('cardNumber', generateGoodCards("6"));

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    validate: function(bool) {
      this.controller.set('disabled', !bool);
    },
    submit: function(){
      var status =  this.controller.get("isValid")  ? "Valid" : "Not Valid";
       this.controller.set('cardStatus', status);
       if(this.controller.get("isValid")){
          this.controller.set("settings.cardType",this.controller.get("cardType"));

       }
    }
  }
});
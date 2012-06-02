/**
 * clearText function used in the activism_appeal.module for Admins when altering the Call to action form.
 * used to clear form fields 
 */
function clearText(field){
    if (field.defaultValue == field.value && field.value == field.title) {
        field.value = '';
    } else if (field.value == '') {
        if(field.defaultValue != field.value) {
            field.value = field.title;
        }
    }

}

/**
 * addClass function - not used in this module???
 * TODO: look into removing this code
 */
function addClass(element, value) {
    if(!element.className) {
        element.className = value;
    } else {
            newClassName = element.className;
            newClassName += " ";
            newClassName += value;
            element.className = newClassName;
    }
}

/**
 * Function handles event behaviors for this module 
 */
Drupal.behaviors.activismAppeal = function () {
    
    var self = this;
    
    //if these fields (comments|firstname|lastname|email) are the focus then clear the value
    $('#edit-activism-signup-comment, #edit-activism-signup-first-name, #edit-activism-signup-last-name, #edit-activism-signup-mail').focus(function() {
        self._clearValue($(this));
    });
    
    //on submit, do a check to clear the value of the comment box if it still has the default message
    $('#edit-submit').click(function(){
        //if this element exists then clear it out before submit
        if($('#edit-activism-signup-comment').length > 0){
           self._clearValue($('#edit-activism-signup-comment')); 
        }
    })
    
};

/**
 * _clearValue function - clears the text/html value of the appeals form field
 */
_clearValue = function(field){
    //gets the default message of the field - there is no function in jquery to handle this
    var defaultValue = field[0].defaultValue;
    
    //gets the value of the readOnly status (required, if the user is logged in & certain fields are not meant to be changed )
    var readOnly = field[0].readOnly;
    
    //if the default value is the same as the current value then clear the field 
    if(field.val() == defaultValue && !readOnly){
        field.val('');
    }
}
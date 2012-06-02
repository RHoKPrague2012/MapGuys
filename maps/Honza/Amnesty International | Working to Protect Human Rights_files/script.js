/**
 * JavaScript for Amnesty.org
 */

// Automatically submit drop-down forms when an item is selected.
// This function is called like so:
//    <select name="country" onchange="submitDropdown(this);">
function submitDropdown(formElement) {
  formElement.form.submit();
}

/**
 * Toolkit JavaScript
 */

// Check jquery is available
// if (typeof jQuery === 'undefined') {
//   console.log('jQuery is NOT available');
// } else {
//   console.log('jQuery is available yay!!!');
// }

/** Using GovUK Frontend Toolkit
 * We've imported what is required by the GovUK elements JS
 * There's functionality and information here: https://github.com/alphagov/govuk_frontend_toolkit/blob/master/docs/javascript.md
*/
import '../../../../govuk_frontend_toolkit/javascripts/govuk/show-hide-content.js';
import '../../../../govuk_frontend_toolkit/javascripts/govuk/shim-links-with-button-role.js';
import '../../../../govuk_frontend_toolkit/javascripts/govuk/details.polyfill.js';

/** Include GovUK elements
 * Dependant on the imported JS from the GovUK Frontend Toolkit above
*/
import '../../../../govuk_elements/assets/javascripts/application.js';


var myDivs = new Array(16, 17, 18, 19);

    function showSelected(sapna) {
        var t = 'showdiv' + sapna,
            r, dv;
        for (var i = 0; i < myDivs.length; i++) {
            r = 'showdiv' + myDivs[i];
            dv = document.getElementById(r);
            if (dv) {
                if (t === r) {
                    dv.style.display = 'block';
                } else {
                    dv.style.display = 'none';
                }
            }
        }
        return false;
    }
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(4);
	
	__webpack_require__(3);
	
	__webpack_require__(2);
	
	__webpack_require__(1);
	
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
	var myDivs = new Array(16, 17, 18, 19);
	
	/** Include GovUK elements
	 * Dependant on the imported JS from the GovUK Frontend Toolkit above
	*/
	
	
	function showSelected(sapna) {
	    var t = 'showdiv' + sapna,
	        r,
	        dv;
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	/* global $ */
	/* global jQuery */
	/* global GOVUK */
	
	$(document).ready(function () {
	  // Turn off jQuery animation
	  jQuery.fx.off = true;
	
	  // Where .multiple-choice uses the data-target attribute
	  // to toggle hidden content
	  var showHideContent = new GOVUK.ShowHideContent();
	  showHideContent.init();
	
	  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
	  // with role="button" when the space key is pressed.
	  GOVUK.shimLinksWithButtonRole.init();
	
	  // Details/summary polyfill from frontend toolkit
	  GOVUK.details.init();
	});
	
	$(window).load(function () {
	  // Only set focus for the error example pages
	  if ($('.js-error-example').length) {
	    // If there is an error summary, set focus to the summary
	    if ($('.error-summary').length) {
	      $('.error-summary').focus();
	      $('.error-summary a').click(function (e) {
	        e.preventDefault();
	        var href = $(this).attr('href');
	        $(href).focus();
	      });
	    } else {
	      // Otherwise, set focus to the field with the error
	      $('.error input:first').focus();
	    }
	  }
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	// <details> polyfill
	// http://caniuse.com/#feat=details
	
	// FF Support for HTML5's <details> and <summary>
	// https://bugzilla.mozilla.org/show_bug.cgi?id=591737
	
	// http://www.sitepoint.com/fixing-the-details-element/
	
	;(function (global) {
	  'use strict';
	
	  var GOVUK = global.GOVUK || {};
	
	  GOVUK.details = {
	    NATIVE_DETAILS: typeof document.createElement('details').open === 'boolean',
	    KEY_ENTER: 13,
	    KEY_SPACE: 32,
	
	    // Create a started flag so we can prevent the initialisation
	    // function firing from both DOMContentLoaded and window.onload
	    started: false,
	
	    // Add event construct for modern browsers or IE
	    // which fires the callback with a pre-converted target reference
	    addEvent: function addEvent(node, type, callback) {
	      if (node.addEventListener) {
	        node.addEventListener(type, function (e) {
	          callback(e, e.target);
	        }, false);
	      } else if (node.attachEvent) {
	        node.attachEvent('on' + type, function (e) {
	          callback(e, e.srcElement);
	        });
	      }
	    },
	
	    removeEvent: function removeEvent(node, type) {
	      if (node.removeEventListener) {
	        node.removeEventListener(type, function (e) {}, false);
	      } else if (node.detachEvent) {
	        node.detachEvent('on' + type, function (e) {});
	      }
	    },
	
	    // Cross-browser character code / key pressed
	    charCode: function charCode(e) {
	      return typeof e.which === 'number' ? e.which : e.keyCode;
	    },
	
	    // Cross-browser preventing default action
	    preventDefault: function preventDefault(e) {
	      if (e.preventDefault) {
	        e.preventDefault();
	      } else {
	        e.returnValue = false;
	      }
	    },
	
	    // Handle cross-modal click events
	    addClickEvent: function addClickEvent(node, callback) {
	      GOVUK.details.addEvent(node, 'keypress', function (e, target) {
	        // When the key gets pressed - check if it is enter or space
	        if (GOVUK.details.charCode(e) === GOVUK.details.KEY_ENTER || GOVUK.details.charCode(e) === GOVUK.details.KEY_SPACE) {
	          if (target.nodeName.toLowerCase() === 'summary') {
	            // Prevent space from scrolling the page
	            // and enter from submitting a form
	            GOVUK.details.preventDefault(e);
	            // Click to let the click event do all the necessary action
	            if (target.click) {
	              target.click();
	            } else {
	              // except Safari 5.1 and under don't support .click() here
	              callback(e, target);
	            }
	          }
	        }
	      });
	
	      // Prevent keyup to prevent clicking twice in Firefox when using space key
	      GOVUK.details.addEvent(node, 'keyup', function (e, target) {
	        if (GOVUK.details.charCode(e) === GOVUK.details.KEY_SPACE) {
	          if (target.nodeName === 'SUMMARY') {
	            GOVUK.details.preventDefault(e);
	          }
	        }
	      });
	
	      GOVUK.details.addEvent(node, 'click', function (e, target) {
	        callback(e, target);
	      });
	    },
	
	    // Get the nearest ancestor element of a node that matches a given tag name
	    getAncestor: function getAncestor(node, match) {
	      do {
	        if (!node || node.nodeName.toLowerCase() === match) {
	          break;
	        }
	        node = node.parentNode;
	      } while (node);
	
	      return node;
	    },
	
	    // Initialisation function
	    addDetailsPolyfill: function addDetailsPolyfill(list, container) {
	      container = container || document.body;
	      // If this has already happened, just return
	      // else set the flag so it doesn't happen again
	      if (GOVUK.details.started) {
	        return;
	      }
	      GOVUK.details.started = true;
	      // Get the collection of details elements, but if that's empty
	      // then we don't need to bother with the rest of the scripting
	      if ((list = container.getElementsByTagName('details')).length === 0) {
	        return;
	      }
	      // else iterate through them to apply their initial state
	      var n = list.length;
	      var i = 0;
	      for (i; i < n; i++) {
	        var details = list[i];
	
	        // Save shortcuts to the inner summary and content elements
	        details.__summary = details.getElementsByTagName('summary').item(0);
	        details.__content = details.getElementsByTagName('div').item(0);
	
	        if (!details.__summary || !details.__content) {
	          return;
	        }
	        // If the content doesn't have an ID, assign it one now
	        // which we'll need for the summary's aria-controls assignment
	        if (!details.__content.id) {
	          details.__content.id = 'details-content-' + i;
	        }
	
	        // Add ARIA role="group" to details
	        details.setAttribute('role', 'group');
	
	        // Add role=button to summary
	        details.__summary.setAttribute('role', 'button');
	
	        // Add aria-controls
	        details.__summary.setAttribute('aria-controls', details.__content.id);
	
	        // Set tabIndex so the summary is keyboard accessible for non-native elements
	        // http://www.saliences.com/browserBugs/tabIndex.html
	        if (!GOVUK.details.NATIVE_DETAILS) {
	          details.__summary.tabIndex = 0;
	        }
	
	        // Detect initial open state
	        var openAttr = details.getAttribute('open') !== null;
	        if (openAttr === true) {
	          details.__summary.setAttribute('aria-expanded', 'true');
	          details.__content.setAttribute('aria-hidden', 'false');
	        } else {
	          details.__summary.setAttribute('aria-expanded', 'false');
	          details.__content.setAttribute('aria-hidden', 'true');
	          if (!GOVUK.details.NATIVE_DETAILS) {
	            details.__content.style.display = 'none';
	          }
	        }
	
	        // Create a circular reference from the summary back to its
	        // parent details element, for convenience in the click handler
	        details.__summary.__details = details;
	
	        // If this is not a native implementation, create an arrow
	        // inside the summary
	        if (!GOVUK.details.NATIVE_DETAILS) {
	          var twisty = document.createElement('i');
	
	          if (openAttr === true) {
	            twisty.className = 'arrow arrow-open';
	            twisty.appendChild(document.createTextNode('\u25BC'));
	          } else {
	            twisty.className = 'arrow arrow-closed';
	            twisty.appendChild(document.createTextNode('\u25BA'));
	          }
	
	          details.__summary.__twisty = details.__summary.insertBefore(twisty, details.__summary.firstChild);
	          details.__summary.__twisty.setAttribute('aria-hidden', 'true');
	        }
	      }
	
	      // Bind a click event to handle summary elements
	      GOVUK.details.addClickEvent(container, function (e, summary) {
	        if (!(summary = GOVUK.details.getAncestor(summary, 'summary'))) {
	          return true;
	        }
	        return GOVUK.details.statechange(summary);
	      });
	    },
	
	    // Define a statechange function that updates aria-expanded and style.display
	    // Also update the arrow position
	    statechange: function statechange(summary) {
	      var expanded = summary.__details.__summary.getAttribute('aria-expanded') === 'true';
	      var hidden = summary.__details.__content.getAttribute('aria-hidden') === 'true';
	
	      summary.__details.__summary.setAttribute('aria-expanded', expanded ? 'false' : 'true');
	      summary.__details.__content.setAttribute('aria-hidden', hidden ? 'false' : 'true');
	
	      if (!GOVUK.details.NATIVE_DETAILS) {
	        summary.__details.__content.style.display = expanded ? 'none' : '';
	
	        var hasOpenAttr = summary.__details.getAttribute('open') !== null;
	        if (!hasOpenAttr) {
	          summary.__details.setAttribute('open', 'open');
	        } else {
	          summary.__details.removeAttribute('open');
	        }
	      }
	
	      if (summary.__twisty) {
	        summary.__twisty.firstChild.nodeValue = expanded ? '\u25BA' : '\u25BC';
	        summary.__twisty.setAttribute('class', expanded ? 'arrow arrow-closed' : 'arrow arrow-open');
	      }
	
	      return true;
	    },
	
	    destroy: function destroy(node) {
	      GOVUK.details.removeEvent(node, 'click');
	    },
	
	    // Bind two load events for modern and older browsers
	    // If the first one fires it will set a flag to block the second one
	    // but if it's not supported then the second one will fire
	    init: function init($container) {
	      GOVUK.details.addEvent(document, 'DOMContentLoaded', GOVUK.details.addDetailsPolyfill);
	      GOVUK.details.addEvent(window, 'load', GOVUK.details.addDetailsPolyfill);
	    }
	  };
	  global.GOVUK = GOVUK;
	})(window);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	// javascript 'shim' to trigger the click event of element(s)
	// when the space key is pressed.
	//
	// Created since some Assistive Technologies (for example some Screenreaders)
	// Will tell a user to press space on a 'button', so this functionality needs to be shimmed
	// See https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
	//
	// Usage instructions:
	// GOVUK.shimLinksWithButtonRole.init();
	;(function (global) {
	  'use strict';
	
	  var $ = global.jQuery;
	  var GOVUK = global.GOVUK || {};
	
	  GOVUK.shimLinksWithButtonRole = {
	
	    init: function init() {
	      // listen to 'document' for keydown event on the any elements that should be buttons.
	      $(document).on('keydown', '[role="button"]', function (event) {
	        // if the keyCode (which) is 32 it's a space, let's simulate a click.
	        if (event.which === 32) {
	          event.preventDefault();
	          // trigger the target's click event
	          event.target.click();
	        }
	      });
	    }
	
	    // hand back to global
	  };global.GOVUK = GOVUK;
	})(window);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	;(function (global) {
	  'use strict';
	
	  var $ = global.jQuery;
	  var GOVUK = global.GOVUK || {};
	
	  function ShowHideContent() {
	    var self = this;
	
	    // Radio and Checkbox selectors
	    var selectors = {
	      namespace: 'ShowHideContent',
	      radio: '[data-target] > input[type="radio"]',
	      checkbox: '[data-target] > input[type="checkbox"]'
	
	      // Escape name attribute for use in DOM selector
	    };function escapeElementName(str) {
	      var result = str.replace('[', '\\[').replace(']', '\\]');
	      return result;
	    }
	
	    // Adds ARIA attributes to control + associated content
	    function initToggledContent() {
	      var $control = $(this);
	      var $content = getToggledContent($control);
	
	      // Set aria-controls and defaults
	      if ($content.length) {
	        $control.attr('aria-controls', $content.attr('id'));
	        $control.attr('aria-expanded', 'false');
	        $content.attr('aria-hidden', 'true');
	      }
	    }
	
	    // Return toggled content for control
	    function getToggledContent($control) {
	      var id = $control.attr('aria-controls');
	
	      // ARIA attributes aren't set before init
	      if (!id) {
	        id = $control.closest('[data-target]').data('target');
	      }
	
	      // Find show/hide content by id
	      return $('#' + id);
	    }
	
	    // Show toggled content for control
	    function showToggledContent($control, $content) {
	      // Show content
	      if ($content.hasClass('js-hidden')) {
	        $content.removeClass('js-hidden');
	        $content.attr('aria-hidden', 'false');
	
	        // If the controlling input, update aria-expanded
	        if ($control.attr('aria-controls')) {
	          $control.attr('aria-expanded', 'true');
	        }
	      }
	    }
	
	    // Hide toggled content for control
	    function hideToggledContent($control, $content) {
	      $content = $content || getToggledContent($control);
	
	      // Hide content
	      if (!$content.hasClass('js-hidden')) {
	        $content.addClass('js-hidden');
	        $content.attr('aria-hidden', 'true');
	
	        // If the controlling input, update aria-expanded
	        if ($control.attr('aria-controls')) {
	          $control.attr('aria-expanded', 'false');
	        }
	      }
	    }
	
	    // Handle radio show/hide
	    function handleRadioContent($control, $content) {
	      // All radios in this group which control content
	      var selector = selectors.radio + '[name=' + escapeElementName($control.attr('name')) + '][aria-controls]';
	      var $form = $control.closest('form');
	      var $radios = $form.length ? $form.find(selector) : $(selector);
	
	      // Hide content for radios in group
	      $radios.each(function () {
	        hideToggledContent($(this));
	      });
	
	      // Select content for this control
	      if ($control.is('[aria-controls]')) {
	        showToggledContent($control, $content);
	      }
	    }
	
	    // Handle checkbox show/hide
	    function handleCheckboxContent($control, $content) {
	      // Show checkbox content
	      if ($control.is(':checked')) {
	        showToggledContent($control, $content);
	      } else {
	        // Hide checkbox content
	        hideToggledContent($control, $content);
	      }
	    }
	
	    // Set up event handlers etc
	    function init($container, elementSelector, eventSelectors, handler) {
	      $container = $container || $(document.body);
	
	      // Handle control clicks
	      function deferred() {
	        var $control = $(this);
	        handler($control, getToggledContent($control));
	      }
	
	      // Prepare ARIA attributes
	      var $controls = $(elementSelector);
	      $controls.each(initToggledContent);
	
	      // Handle events
	      $.each(eventSelectors, function (idx, eventSelector) {
	        $container.on('click.' + selectors.namespace, eventSelector, deferred);
	      });
	
	      // Any already :checked on init?
	      if ($controls.is(':checked')) {
	        $controls.filter(':checked').each(deferred);
	      }
	    }
	
	    // Get event selectors for all radio groups
	    function getEventSelectorsForRadioGroups() {
	      var radioGroups = [];
	
	      // Build an array of radio group selectors
	      return $(selectors.radio).map(function () {
	        var groupName = $(this).attr('name');
	
	        if ($.inArray(groupName, radioGroups) === -1) {
	          radioGroups.push(groupName);
	          return 'input[type="radio"][name="' + $(this).attr('name') + '"]';
	        }
	        return null;
	      });
	    }
	
	    // Set up radio show/hide content for container
	    self.showHideRadioToggledContent = function ($container) {
	      init($container, selectors.radio, getEventSelectorsForRadioGroups(), handleRadioContent);
	    };
	
	    // Set up checkbox show/hide content for container
	    self.showHideCheckboxToggledContent = function ($container) {
	      init($container, selectors.checkbox, [selectors.checkbox], handleCheckboxContent);
	    };
	
	    // Remove event handlers
	    self.destroy = function ($container) {
	      $container = $container || $(document.body);
	      $container.off('.' + selectors.namespace);
	    };
	  }
	
	  ShowHideContent.prototype.init = function ($container) {
	    this.showHideRadioToggledContent($container);
	    this.showHideCheckboxToggledContent($container);
	  };
	
	  GOVUK.ShowHideContent = ShowHideContent;
	  global.GOVUK = GOVUK;
	})(window);

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
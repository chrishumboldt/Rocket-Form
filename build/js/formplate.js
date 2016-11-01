/**
 * File: build/js/formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
**/

// Webplate tools module extension
var Web = (function (Web) {
	// Basic checks
	if (!Web.exists) {
		var exists = function (check) {
			return (check === null || check === false || typeof (check) == 'undefined') ? false : true;
		};
		Web.exists = exists;
	}
	if (!Web.has) {
		var has = {
			spaces: function (check) {
				return /\s/.test(check);
			},
			class: function (element, className) {
				return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
			}
		};
		Web.has = has;
	}
	if (!Web.is) {
		var is = {
			touch: function () {
				return 'ontouchstart' in window || 'onmsgesturechange' in window;
			}
		};
		Web.is = is;
	}
	// Classes
	if (!Web.class) {
		var classMethods = {
			add: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = 0, len = className.length; i < len; i++) {
							classMethods.addExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.addExecute(element, classes[i]);
						}
					} else {
						classMethods.addExecute(element, className);
					}
				}
			},
			addExecute: function (element, className) {
				var crtClass = element.className;
				if (crtClass.match(new RegExp('\\b' + className + '\\b', 'g')) === null) {
					element.className = crtClass === '' ? className : crtClass + ' ' + className;
				}
			},
			clear: function (element) {
				if (exists(element)) {
					element.removeAttribute('class');
				}
			},
			remove: function (element, className) {
				if (exists(element)) {
					if (typeof className === 'object') {
						for (var i = className.length - 1; i >= 0; i--) {
							classMethods.removeExecute(element, className[i]);
						}
					} else if (has.spaces(className)) {
						var classes = className.split(' ');
						for (var i = 0, len = classes.length; i < len; i++) {
							classMethods.removeExecute(element, classes[i]);
						}
					} else {
						classMethods.removeExecute(element, className);
					}
				}
			},
			removeExecute: function (element, className) {
				if (element.className.indexOf(className) > -1) {
					element.className = element.className.split(' ').filter(function (val) {
						return val != className;
					}).toString().replace(/,/g, ' ');
					if (element.className === '') {
						classMethods.clear(element);
					}
				}
			}
		};
		Web.class = classMethods;
	}
	// Gets
	if (!Web.get) {
		var get = {
			index: function (node) {
				return [].indexOf.call(node.parentNode.children, node);
			},
			extension: function (file) {
				return file.split('.').pop().toLowerCase();
			},
			integers: function (string) {
				return string.replace(/^\D+ /g, '').replace(/ /g, '');
			}
		};
		Web.get = get;
	}
	// Development
	if (!Web.log) {
		var log = function (text) {
			if (window && window.console) {
				console.log(text);
			}
		};
		Web.log = log;
	}
	// DOM
	if (!Web.dom) {
		Web.dom = {};
	}
	if (!Web.dom.html) {
		Web.dom.html = document.getElementsByTagName('html')[0];
	}
	// Events
	if (!Web.event) {
		var eventMethods = {
			add: function (elem, type, eventHandle) {
				if (elem == null || typeof (elem) == 'undefined') return;
				if (elem.addEventListener) {
					elem.addEventListener(type, eventHandle, false);
				} else if (elem.attachEvent) {
					elem.attachEvent('on' + type, eventHandle);
				} else {
					elem['on' + type] = eventHandle;
				}
			},
			remove: function (elem, type, eventHandle) {
				if (elem == null || typeof (elem) == 'undefined') return;
				if (elem.removeEventListener) {
					elem.removeEventListener(type, eventHandle, false);
				} else if (elem.detachEvent) {
					elem.detachEvent('on' + type, eventHandle);
				} else {
					elem['on' + type] = eventHandle;
				}
			}
		};
		Web.event = eventMethods;
	}
	// Helpers
	if (!Web.helper) {
		var helper = {
			setDefault: function (setValue, defaultValue) {
				if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
					return false;
				} else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
					return setValue;
				} else if (typeof setValue === typeof defaultValue) {
					return setValue;
				} else {
					return defaultValue;
				}
			}
		};
		Web.helper = helper;
	}

	return Web;
})(Web || {});

// Component container
var Formplate = (function () {
	// Defaults
	var defaults = {
		selector: '.formplate',
		colour: 'blue',
		label: 'normal',
		style: 'line'
	};

	// Functions
	var setup = function () {
		if (!Web.is.touch()) {
			Web.class.add(Web.dom.html, 'fmp-no-touch');
		}
	};
	var setupFormElement = function (formContainer, options) {
		// Variables
		var element = false;
		var classes = ['_c-' + options.colour, '_s-' + options.style];
		var type = false;

		// Set type
		if (formContainer.querySelector('input')) {
			// Inputs
			element = formContainer.querySelector('input');
			type = element.getAttribute('type');
		} else if (formContainer.querySelector('textarea')) {
			// Textarea
			element = formContainer.querySelector('textarea');
			type = 'textarea';
		} else if (formContainer.querySelector('select')) {
			// Selects
			element = formContainer.querySelector('select');
			type = 'select';
		}

		// Apply styles
		switch (type) {
			case 'checkbox':
			case 'radio':
				// Checked
				if (element.checked) {
					classes.push('_checked');
				} else {
					Web.class.remove(element, '_checked');
				}
				// Toggler?
				if (Web.has.class(element, 'toggler')) {
					classes.push('fmp-tog');
				} else {
					classes.push('fmp-check');
					if (type === 'radio') {
						classes.push('_t-radio');
					}
				}
				break;

			case 'text':
			case 'password':
				classes.push('fmp-inp');
				if (type === 'password') {
					classes.push('_t-password');
				}
				if (options.label.length > 0 && options.label !== 'normal') {
					classes.push('_l-' + options.label);
				}
				if (element.value.length > 0) {
					classes.push('_valued');
				}
				break;

			case 'textarea':
				if (options.label.length > 0 && options.label !== 'normal') {
					classes.push('_l-' + options.label);
				}
				if (element.value.length > 0) {
					classes.push('_valued');
				}
				break;

			case 'select':
				classes.push('fmp-sel');
				break;

		}
		Web.class.add(formContainer, classes);

		// Return
		return {
			container: formContainer,
			element: element,
			type: type
		}
	};

	// Inner component
	var component = function (objForm) {
		console.log(objForm);
	};

	// Initialiser
	var init = function (uOptions) {
		// Options
		var uOptions = (typeof uOptions === 'object') ? uOptions : false; // User options
		var options = {
			selector: Web.helper.setDefault(uOptions.selector, defaults.selector),
			colour: Web.helper.setDefault(uOptions.colour, defaults.colour),
			label: Web.helper.setDefault(uOptions.label, defaults.label),
			style: Web.helper.setDefault(uOptions.style, defaults.style)
		};
		var formElements = document.querySelectorAll(options.selector);
		// Catch
		if (formElements.length < 1) {
			return false;
		}
		// Initialise each component and return
		var objReturn = [];
		for (var i = 0, len = formElements.length; i < len; i++) {
		   objReturn.push(new component(setupFormElement(formElements[i], options)));
		}
	};

	// Execute and return
	setup();
	return {
		defaults: defaults,
		init: init
	}
})();

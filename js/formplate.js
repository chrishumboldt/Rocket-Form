/**
 * File: formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Tools
// Variables

// Defaults
// Defaults
var $formplateDefault = {
	selector: '.formplate',
	colour: 'blue'
};

function formplate($userOptions) {
	// Tools
	var tool = function(document) {
		// Elements
		var $toolEl = {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
		};

		// Functions
		var classAdd = function($element, $class) {
			var $crtClass = $element.className;
			if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
				$element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
			}
		};
		var classClear = function($element) {
			$element.removeAttribute('class');
		};
		var classRemove = function($element, $class) {
			if ($element.className.indexOf($class) > -1) {
				$element.className = $element.className.split(' ').filter(function($val) {
					return $val != $class;
				}).toString().replace(/,/g, ' ');
				if ($element.className === '') {
					classClear($element);
				}
			}
		};
		var eventAdd = function($elem, $type, $eventHandle) {
			if ($elem == null || typeof($elem) == 'undefined') return;
			if ($elem.addEventListener) {
				$elem.addEventListener($type, $eventHandle, false);
			} else if ($elem.attachEvent) {
				$elem.attachEvent("on" + $type, $eventHandle);
			} else {
				$elem["on" + $type] = $eventHandle;
			}
		};
		var hasClass = function($element, $class) {
			return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			eventAdd: eventAdd,
			hasClass: hasClass,
			isTouch: isTouch
		}
	}(document);

	// Variables
	var $self = this;
	$self.options = {
		selector: ($userOptions && $userOptions.selector) ? $userOptions.selector : $formplateDefault.selector,
		colour: ($userOptions && $userOptions.colour) ? $userOptions.colour : false,
	}

	var $formColour = $self.options.colour || tool.element.body.getAttribute('data-formplate-colour') || $formplateDefault.colour;
	var $formplateEls = document.querySelectorAll($self.options.selector);

	if (!tool.isTouch() && !tool.hasClass(tool.element.html, 'formplate-no-touch')) {
		tool.classAdd(tool.element.html, 'formplate-no-touch');
	}

	// Functions
	var checkToggle = function($element) {
		$element.onchange = function() {
			if (tool.hasClass($element.parentNode, '_checked')) {
				tool.classRemove($element.parentNode, '_checked');
			} else {
				tool.classAdd($element.parentNode, '_checked');
			}
		};
	};
	var radioToggle = function($element) {
		$element.onclick = function() {
			var $inputRadioGroup = document.getElementsByName($element.getAttribute('name'));
			for (var $i = 0, $len = $inputRadioGroup.length; $i < $len; $i++) {
				tool.classRemove($inputRadioGroup[$i].parentNode, '_checked');
			}
			tool.classAdd($element.parentNode, '_checked');
		};
	};

	// Set the colour
	tool.classAdd(tool.element.body, 'formplate-colour-' + $formColour);

	// Loop over all elements
	for (var $i = 0, $len = $formplateEls.length; $i < $len; $i++) {
		var $thisFormEl = $formplateEls[$i];
		var $input = $thisFormEl.querySelector('input');

		// Set the input classes
		if ($input != null) {
			var $inputType = $input.getAttribute('type');
			var $inputCheckClass = ($input.getAttribute('checked') === 'checked') ? ' _checked' : '';
			if ($inputType === 'checkbox') {
				if (tool.hasClass($input, 'toggler')) {
					tool.classAdd($thisFormEl, 'formplate-toggler' + $inputCheckClass);
				} else {
					tool.classAdd($thisFormEl, 'formplate-checkbox' + $inputCheckClass);
				}
				checkToggle($input);
			} else if ($inputType === 'radio') {
				tool.classAdd($thisFormEl, 'formplate-radio' + $inputCheckClass);
				radioToggle($input);
			} else if ($inputType === 'password') {
				tool.classAdd($thisFormEl, 'formplate-input _password');
			} else {
				tool.classAdd($thisFormEl, 'formplate-input');
			}
		} else {
			var $select = $thisFormEl.querySelector('select');
			if ($select != null) {
				tool.classAdd($thisFormEl, 'formplate-select');
			}
		}
	}
};
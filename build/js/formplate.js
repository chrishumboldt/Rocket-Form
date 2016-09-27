/**
 * File: formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
**/

// Table of contents
// Defaults
// Tools
// Variables

// Defaults
var $formplateDefault = {
	selector: '.formplate',
	colour: 'blue',
	style: 'line',
	label: 'normal'
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
			if (exists($element)) {
				if (typeof $class === 'object') {
					for (var $i = 0, $len = $class.length; $i < $len; $i++) {
						classAddExecute($element, $class[$i]);
					}
				} else if (hasWhiteSpace($class)) {
					var $classes = $class.split(' ');
					for (var $i = 0, $len = $classes.length; $i < $len; $i++) {
						classAddExecute($element, $classes[$i]);
					}
				} else {
					classAddExecute($element, $class);
				}
			}
		};
		var classAddExecute = function($element, $class) {
			var $crtClass = $element.className;
			if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
				$element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
			}
		};
		var classClear = function($element) {
			if (exists($element)) {
				$element.removeAttribute('class');
			}
		};
		var classRemove = function($element, $class) {
			if (exists($element)) {
				if (typeof $class === 'object') {
					for (var $i = $class.length - 1; $i >= 0; $i--) {
						classRemoveExecute($element, $class[$i]);
					}
				} else if (hasWhiteSpace($class)) {
					var $classes = $class.split(' ');
					for (var $i = 0, $len = $classes.length; $i < $len; $i++) {
						classRemoveExecute($element, $classes[$i]);
					}
				} else {
					classRemoveExecute($element, $class);
				}
			}
		};
		var classRemoveExecute = function($element, $class) {
			if ($element.className.indexOf($class) > -1) {
				$element.className = $element.className.split(' ').filter(function($val) {
					return $val != $class;
				}).toString().replace(/,/g, ' ');
				if ($element.className === '') {
					classClear($element);
				}
			}
		};
		var clone = function ($elm) {
			var $clone;

			switch(typeof $elm) {
				case 'object':
					if ($elm instanceof Array) {
						return JSON.parse(JSON.stringify($elm));
					}
					break;
				default:
					return false;
					break;
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
		var exists = function($element) {
			return ($element === null || typeof($element) === undefined) ? false : true;
		};
		var hasClass = function($element, $class) {
			return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
		};
		var hasWhiteSpace = function($check) {
			return /\s/.test($check);
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};

		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			clone: clone,
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
		colour: ($userOptions && $userOptions.colour) ? $userOptions.colour : $formplateDefault.colour,
		style: ($userOptions && $userOptions.style) ? $userOptions.style : $formplateDefault.style,
		label: ($userOptions && $userOptions.label) ? $userOptions.label : $formplateDefault.label,
	}

	var $formplateEls = document.querySelectorAll($self.options.selector);
	var $tester = tool.clone(document.querySelector($self.options.selector));

	if (!tool.isTouch() && !tool.hasClass(tool.element.html, 'fp-no-touch')) {
		tool.classAdd(tool.element.html, 'fp-no-touch');
	}

	// Functions
	var checkToggle = function($element) {
		$element.onclick = function() {
			if (tool.hasClass($element.parentNode, '_checked')) {
				$element.checked = false;
				tool.classRemove($element.parentNode, '_checked');
			} else {
				$element.checked = true;
				tool.classAdd($element.parentNode, '_checked');
			}
		};
	};
	var inputContentFocus = function($thisFormEl) {
		var $inputs = $thisFormEl.querySelectorAll('input');
		for (var $i = 0, $len = $inputs.length; $i < $len; $i++) {
			var $thisInput = $inputs[$i];
			$thisInput.onfocus = function() {
				var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
				tool.classAdd($parent, '_focused _valued');
			};
			$thisInput.onblur = function() {
				var $parent = ($thisInput.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode : ($thisInput.parentNode.parentNode.getAttribute('class').indexOf('fp-') > -1) ? $thisInput.parentNode.parentNode : $thisInput.parentNode.parentNode.parentNode;
				tool.classRemove($parent, '_focused');
				if ($thisInput.value.length < 1) {
					tool.classRemove($parent, '_valued');
				}
			};
		}
	};
	var radioToggle = function($element) {
		$element.onclick = function() {
			var $inputRadioGroup = document.getElementsByName($element.getAttribute('name'));
			for (var $i = 0, $len = $inputRadioGroup.length; $i < $len; $i++) {
				$inputRadioGroup[$i].checked = false;
				tool.classRemove($inputRadioGroup[$i].parentNode, '_checked');
			}
			$element.checked = true;
			tool.classAdd($element.parentNode, '_checked');
		};
	};
	var textareaContentFocus = function($textarea) {
		$textarea.onfocus = function() {
			tool.classAdd($textarea.parentNode, '_focused _valued');
		};
		$textarea.onblur = function() {
			tool.classRemove($textarea.parentNode, '_focused');
			if ($textarea.value.length < 1) {
				tool.classRemove($textarea.parentNode, '_valued');
			}
		};
	};

	// Loop over all elements and apply
	var $globalClasses = ['_c-' + $self.options.colour, '_s-' + $self.options.style];
	if ($self.options.label.length > 0 && $self.options.label !== 'normal') {
		$globalClasses.push('_l-' + $self.options.label);
	}
	for (var $i = 0, $len = $formplateEls.length; $i < $len; $i++) {
		var $thisFormEl = $formplateEls[$i];
		var $classes = tool.clone($globalClasses);

		// Set the input classes
		if ($thisFormEl.querySelector('input')) {
			var $input = $thisFormEl.querySelector('input');
			var $inputType = $input.getAttribute('type');

			if ($inputType === 'checkbox' || $inputType === 'radio') {
				// Removed _checked if need be
				if ($input.checked === true) {
					$classes.push('_checked');
				} else {
					if (tool.hasClass($thisFormEl, '_checked')) {
						tool.classRemove($thisFormEl, '_checked');
					}
				}
				// Checkbox type
				if (tool.hasClass($input, 'toggler')) {
					$classes.push('fp-tog');
				} else {
					$classes.push('fp-check');
					if ($inputType === 'radio') {
						$classes.push('_t-radio');
					}
				}
				tool.classAdd($thisFormEl, $classes);
				// Add events
				if ($inputType === 'checkbox') {
					checkToggle($input);
				} else if ($inputType === 'radio') {
					radioToggle($input);
				}
			} else if ($inputType === 'password') {
				$classes.push('fp-inp', '_t-password');
				if ($input.value.length > 0) {
					$classes.push('_valued');
				}
				tool.classAdd($thisFormEl, $classes);
				inputContentFocus($thisFormEl);
			} else {
				$classes.push('fp-inp');
				if ($input.value.length > 0) {
					$classes.push('_valued');
				}
				tool.classAdd($thisFormEl, $classes);
				inputContentFocus($thisFormEl);
			}
		} else if ($thisFormEl.querySelector('textarea')) {
			var $textarea = $thisFormEl.querySelector('textarea');
			$classes.push('fp-text');
			if ($textarea.value.length > 0) {
				$classes.push('_valued');
			}
			tool.classAdd($thisFormEl, $classes);
			textareaContentFocus($textarea);
		} else if ($thisFormEl.querySelector('select')) {
			var $select = $thisFormEl.querySelector('select');
			if ($select != null) {
				$classes.push('fp-sel');
				tool.classAdd($thisFormEl, $classes);
			}
		}
	}
};

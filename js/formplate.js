/**
 * File: formplate.js
 * Type: Javascript component
 * Author: Chris Humboldt
 * Last Edited: 29 April 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Modernizr
// Tools
// Component call

// Modernizr
// ---------------------------------------------------------------------------------------
/*! modernizr 3.0.0-alpha.3 (Custom Build) | MIT *
 * http://v3.modernizr.com/download/#-touchevents !*/
! function(e, n) {
	function o(e, n) {
		return typeof e === n
	}

	function t() {
		var e, n, t, s, i, a, l;
		for (var c in f) {
			if (e = [], n = f[c], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
				for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
			for (s = o(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) a = e[i], l = a.split("."), 1 === l.length ? Modernizr[l[0]] = s : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = s), r.push((s ? "" : "no-") + l.join("-"))
		}
	}

	function s(e) {
		var n = c.className,
			o = Modernizr._config.classPrefix || "";
		if (Modernizr._config.enableJSClass) {
			var t = new RegExp("(^|\\s)" + o + "no-js(\\s|$)");
			n = n.replace(t, "$1" + o + "js$2")
		}
		Modernizr._config.enableClasses && (n += " " + o + e.join(" " + o), c.className = n)
	}

	function i() {
		var e = n.body;
		return e || (e = u("body"), e.fake = !0), e
	}

	function a(e, n, o, t) {
		var s, a, r, f, l = "modernizr",
			d = u("div"),
			p = i();
		if (parseInt(o, 10))
			for (; o--;) r = u("div"), r.id = t ? t[o] : l + (o + 1), d.appendChild(r);
		return s = ["&#173;", '<style id="s', l, '">', e, "</style>"].join(""), d.id = l, (p.fake ? p : d).innerHTML += s, p.appendChild(d), p.fake && (p.style.background = "", p.style.overflow = "hidden", f = c.style.overflow, c.style.overflow = "hidden", c.appendChild(p)), a = n(d, e), p.fake ? (p.parentNode.removeChild(p), c.style.overflow = f, c.offsetHeight) : d.parentNode.removeChild(d), !!a
	}
	var r = [],
		f = [],
		l = {
			_version: "3.0.0-alpha.3",
			_config: {
				classPrefix: "fp-",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, n) {
				var o = this;
				setTimeout(function() {
					n(o[e])
				}, 0)
			},
			addTest: function(e, n, o) {
				f.push({
					name: e,
					fn: n,
					options: o
				})
			},
			addAsyncTest: function(e) {
				f.push({
					name: null,
					fn: e
				})
			}
		},
		Modernizr = function() {};
	Modernizr.prototype = l, Modernizr = new Modernizr;
	var c = n.documentElement,
		d = l._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
	l._prefixes = d;
	var u = function() {
			return "function" != typeof n.createElement ? n.createElement(arguments[0]) : n.createElement.apply(n, arguments)
		},
		p = l.testStyles = a;
	Modernizr.addTest("touchevents", function() {
		var o;
		if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) o = !0;
		else {
			var t = ["@media (", d.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			p(t, function(e) {
				o = 9 === e.offsetTop
			})
		}
		return o
	}), t(), s(r), delete l.addTest, delete l.addAsyncTest;
	for (var h = 0; h < Modernizr._q.length; h++) Modernizr._q[h]();
	e.Modernizr = Modernizr
}(window, document);

// Tools
// ---------------------------------------------------------------------------------------
var tool = {
	addEvent: function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.addEventListener) {
			$elem.addEventListener($type, $eventHandle, false);
		} else if ($elem.attachEvent) {
			$elem.attachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	},
	classAdd: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($selector.className.indexOf($class) === -1) {
			$selector.className = $selector.className === '' ? $class : $selector.className + ' ' + $class;
		}
	},
	classRemove: function($selector, $class) {
		var $crtClass = $selector.className;

		if ($crtClass.indexOf($class) > -1) {
			$selector.className = $selector.className.split(' ').filter(function($val) {
				return $val != $class;
			}).toString().replace(/,/g, ' ');
		}
	},
	hasClass: function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	},
	idAdd: function($selector, $id) {
		$selector.setAttribute('id', $id);
	},
	log: function($text) {
		if (window.console) {
			console.log($text);
		}
	},
	wrap: function($element, $tag, $className) {
		var $wrapper = document.createElement($tag);
		var $tempElement = $element.cloneNode(true);
		$wrapper.className = $className;

		$element.parentNode.insertBefore($wrapper, $element).appendChild($tempElement);
		$element.parentNode.removeChild($element);
	}
};

// Component call
// ---------------------------------------------------------------------------------------
function Formplate($selector) {
	// Variables
	var $bodyElement = document.getElementsByTagName('body')[0];
	var $formColour = $bodyElement.getAttribute('data-formplate-colour');
	var $formCheckboxes = document.querySelectorAll('.formplate input[type="checkbox"]');
	var $formRadioButtons = document.querySelectorAll('.formplate input[type="radio"]');
	var $formSelects = document.querySelectorAll('.formplate select');
	var $formTogglerHTML = document.createElement('span');
	$formTogglerHTML.className = 'handle';

	// Set the colour
	tool.classAdd($bodyElement, 'fp-colour-' + $formColour);

	// Checkboxes
	for (var $i = 0; $i < $formCheckboxes.length; $i++) {
		var $classes = (tool.hasClass($formCheckboxes[$i], 'toggler') === true) ? 'fp-toggler' : 'fp-checkbox';
		$classes += ($formCheckboxes[$i].getAttribute('checked') === 'checked') ? ' checked' : '';

		if (!tool.hasClass($formCheckboxes[$i].parentNode, 'fp-toggler') && !tool.hasClass($formCheckboxes[$i].parentNode, 'fp-checkbox')) {
			tool.wrap($formCheckboxes[$i], 'span', $classes);
		}
	}

	// Add toggler handle
	var $formTogglers = document.querySelectorAll('.fp-toggler');
	for (var $i = 0; $i < $formTogglers.length; $i++) {
		$formTogglers[$i].appendChild($formTogglerHTML.cloneNode());
	}

	// Radio buttons
	for (var $i = 0; $i < $formRadioButtons.length; $i++) {
		var $classes = ($formRadioButtons[$i].getAttribute('checked') === 'checked') ? 'fp-radio checked' : 'fp-radio';

		if (!tool.hasClass($formRadioButtons[$i].parentNode, 'fp-radio')) {
			tool.wrap($formRadioButtons[$i], 'span', $classes);
		}
	}

	// Selects
	for (var $i = 0; $i < $formSelects.length; $i++) {
		if (!tool.hasClass($formSelects[$i].parentNode, 'fp-select')) {
			tool.wrap($formSelects[$i], 'span', 'fp-select');
		}
	}

	// Events
	var $formCheckboxesNew = document.querySelectorAll('.fp-checkbox');
	for (var $i = 0; $i < $formCheckboxesNew.length; $i++)(function($i) {
		$formCheckboxesNew[$i].onclick = function() {
			if (tool.hasClass($formCheckboxesNew[$i], 'checked')) {
				tool.classRemove($formCheckboxesNew[$i], 'checked');
			} else {
				tool.classAdd($formCheckboxesNew[$i], 'checked');
			}
		};
	})($i);
	var $formRadioButtonsNew = document.querySelectorAll('.fp-radio');
	for (var $i = 0; $i < $formRadioButtonsNew.length; $i++)(function($i) {
		$formRadioButtonsNew[$i].onclick = function() {
			var $formRadioButtonInputName = $formRadioButtonsNew[$i].getElementsByTagName('input')[0].getAttribute('name');
			var $formRadioButtonsByName = document.querySelectorAll('input[name="' + $formRadioButtonInputName + '"]');

			for (var $i2 = 0; $i2 < $formRadioButtonsByName.length; $i2++) {
				tool.classRemove($formRadioButtonsByName[$i2].parentNode, 'checked');
			}

			tool.classAdd($formRadioButtonsNew[$i], 'checked');
		};
	})($i);
	var $formTogglersNew = document.querySelectorAll('.fp-toggler');
	for (var $i = 0; $i < $formTogglersNew.length; $i++)(function($i) {
		$formTogglersNew[$i].onclick = function() {
			if (tool.hasClass($formTogglersNew[$i], 'checked')) {
				tool.classRemove($formTogglersNew[$i], 'checked');
			} else {
				tool.classAdd($formTogglersNew[$i], 'checked');
			}
		};
	})($i);
};
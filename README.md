# Rocket Form
A universal form module.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
* [Initialization](#initialization)
   * [Options](#options)
   * [Defaults](#defaults)
* [HTML Examples](#html-examples)
   * [Input fields](input-fields)
* [Formplate Deprecated](#formplate-deprecated)

## Getting Started
Install via NPM.

```
npm install rocket-form
```

**NOTE** that this module has a dependency [Rocket Tools (28kb)](https://github.com/chrishumboldt/Rocket-Tools) which will automatically be installed as well.

Start by including the necessary files.

```html
<head>
   <link href="node_modules/rocket-form/css/form.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   /* Your content goes here */
   <script src="node_modules/rocket-tools/js/tools.min.js"></script>
   <script src="node_modules/rocket-form/js/form.min.js"></script>
</body>
```

## Basic Example
You will need to wrap your form elements with an identifier of your choice. Below is an example of executing the module complete with required HTML and Javascript.

```html
<div class="mod-form">
   <label for="input-example">Example Label<label>
   <input id="input-example" type="text" placeholder="Example Input">
</div>

<script>
Rocket.form();
</script>
```

## Initialization
Each initialization will bind to new form targets but will overlook existing ones. However existing form targets will have the state updated.

#### Options
See the different options you have available on initialization.

Name | Default | Options | Description
---- | ---- | ---- | ----
`targets` | `.mod-form` | | Set the HTML target.
`colour` | `blue` | `grey` `black` `white` `aqua` `blue` `green` `orange` `pink` `purple` `red` `grey-blue` | Set the colour of the form elements.
`label` | `normal` | `normal` `shift` | Set an animation on the form label.
`style` | `line` | `flat` `line` `raised` | Set the style of the form elements.

```javascript
Rocket.form({
   targets: '.form-element',
   colour: 'red',
   label: 'shift',
   style: 'raised'
});
```

#### Defaults
You can also overwrite the module options globally by altering the Rocket defaults. To do so reference the defaults object property, for example:

```javascript
Rocket.defaults.form.target = '.new-form-class';
Rocket.defaults.form.colour = 'green';
```

## HTML Examples
There are a variety of unique form elements with each being viable targets.  See an example of each below:

#### Input fields
```html
// Regular text input
<div class="mod-form">
   <label for="text-1">Text Label</label>
   <input type="text" id="text-1">
</div>

// Password input
<div class="mod-form">
   <label for="password-1">Password Label</label>
   <input type="password" id="password-1">
</div>
```

## Formplate Deprecated
The original library, Formplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Formplate will be maintained only with bug fixes under the **formplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2017 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

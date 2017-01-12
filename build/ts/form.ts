/**
 * Author: Chris Humboldt
**/

// Extend Rocket
Rocket.defaults.form = {
   targets: '.form',
   colour: 'blue',
   label: 'normal',
   size: 'normal',
   style: 'line'
};

// Module
module RockMod_Form {
   // Functions
   var check = {
      off: function (elm: any, container: any) {
         elm.checked = false;
         Rocket.classes.remove(container, '_checked');
      },
      on: function (elm: any, container: any) {
         elm.checked = true;
         Rocket.classes.add(container, '_checked');
      }
   };

   function checkSelect(inpOption: any, type: any, elm: any, container: any) {
      // Catch
      if (type !== 'checkbox') {
         return false;
      }
      // Continue
      const option = (typeof inpOption === 'string') ? inpOption : false;
      if (option === 'on') {
         check.on(elm, container);
      } else if (option === 'off') {
         check.off(elm, container);
      } else {
         if (Rocket.has.class(container, '_checked')) {
            check.off(elm, container);
         } else {
            check.on(elm, container);
         }
      }
   }

   function formApply(formContainer: any, options: any) {
      // Variables
      let element;
      let classes = ['_c-' + options.colour, '_s-' + options.style, '_sz-' + options.size];
      let type;

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
               Rocket.classes.remove(element, '_checked');
            }
            // Toggler?
            if (Rocket.has.class(element, 'toggler')) {
               classes.push('rf-tog');
            } else {
               classes.push('rf-check');
               if (type === 'radio') {
                  classes.push('_t-radio');
               }
            }
            break;

         case 'textarea':
            classes.push('rf-text');
            if (options.label.length > 0 && options.label !== 'normal') {
               classes.push('_l-' + options.label);
            }
            if (typeof element.value === 'string' && element.value.length > 0) {
               classes.push('_valued');
            }
            break;

         case 'select':
            classes.push('rf-sel');
            break;

         default:
            classes.push('rf-inp');
            if (type === 'password') {
               classes.push('_t-password');
            }
            if (options.label.length > 0 && options.label !== 'normal') {
               classes.push('_l-' + options.label);
            }
            if (typeof element.value === 'string' && element.value.length > 0) {
               classes.push('_valued');
            }

      }
      Rocket.classes.add(formContainer, classes);

      // Functions
      function clearValue() {
         if (type === 'text' || type === 'textarea') {
            element.value = '';
            Rocket.classes.remove(formContainer, ['_focused'].concat((element.value.length < 1) ? ['_valued'] : []));
         }
      }

      function toggle(option) {
         switch (type) {
            case 'checkbox':
               checkSelect(option, type, element, formContainer);
               break;
            case 'radio':
               radioSelect(option, type, element, formContainer);
               break;
         };
      }

      // Bind events
      switch (type) {
         case 'checkbox':
            Rocket.event.add(element, 'click', function () {
               checkSelect(false, type, element, formContainer);
            });
            break;

         case 'radio':
            Rocket.event.add(element, 'click', function () {
               radioSelect(false, type, element, formContainer);
            });
            break;

         default:
            Rocket.event.add(element, 'focus', function () {
               Rocket.classes.add(formContainer, ['_focused', '_valued']);
            });
            Rocket.event.add(element, 'blur', function () {
               Rocket.classes.remove(formContainer, ['_focused'].concat((element.value.length < 1) ? ['_valued'] : []));
            });
      };

      // Return
      return {
         toggle: toggle,
         clear: clearValue,
         form: element
      }
   }

   function radioSelect(inpOption: any, type: any, elm: any, container: any) {
      // Catch
      if (type !== 'radio') {
         return false;
      }
      // Continue
      const option = (typeof inpOption === 'string') ? inpOption : false;
      if (option === 'off') {
         check.off(elm, container);
      } else {
         const radioGroup: any = document.getElementsByName(elm.getAttribute('name'));
         for (let radio of radioGroup) {
            radio.checked = false;
            Rocket.classes.remove(radio.parentNode, '_checked');
         }
         check.on(elm, container);
      }
   }

   // Initialiser
   export function init (uOptions: any) {
      // Catch
      if (!Rocket.is.object(uOptions)) {
         return false;
      }
      // Continue
      const options = {
         targets: Rocket.helper.setDefault(uOptions.targets, Rocket.defaults.form.targets),
         colour: Rocket.helper.setDefault(uOptions.colour, Rocket.defaults.form.colour),
         label: Rocket.helper.setDefault(uOptions.label, Rocket.defaults.form.label),
         size: Rocket.helper.setDefault(uOptions.size, Rocket.defaults.form.size),
         style: Rocket.helper.setDefault(uOptions.style, Rocket.defaults.form.style)
      };
      const formElms = Rocket.dom.select(options.targets);
      // Catch
      if (formElms.length <= 0) {
         return false;
      }
      // Continue
      var objReturn = [];
      for (let elm of formElms) {
         objReturn.push(formApply(elm, options));
      }
      return objReturn;
   }
}

// Bind to Rocket
Rocket.form = RockMod_Form.init;

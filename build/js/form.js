/**
@author Chris Humboldt
**/

// Set the defaults
Rocket.defaults.form = {
   target: '.mod-form',
   colour: 'blue',
   label: 'normal',
   size: 'normal',
   style: 'line'
};

// Module
Rocket.form = ({
   target = Rocket.defaults.form.target,
   colour = Rocket.defaults.form.colour,
   label = Rocket.defaults.form.label,
   size = Rocket.defaults.form.size,
   style = Rocket.defaults.form.style
} = {}) => {
   // Variables
   const baseClasses = [`mod-form`];
   const regExpModForm = new RegExp('mod-form ');

   // Methods
   const action = {
      checkboxChange(formElm) {
         if (formElm.checked) {
            Rocket.classes.add(formElm.parentNode, 'is-checked');
         } else {
            Rocket.classes.remove(formElm.parentNode, 'is-checked');
         }
      },
      makeValued(formElm) {
         setTimeout(() => { Rocket.classes.add(formElm.parentNode, 'is-valued') }, 0);
      },
      processEvent(ev) {
         const elmTagName = Rocket.string.lowercase.all(ev.target.tagName);
         const elmParentClass = ev.target.parentNode.className;

         if ((elmTagName === 'input' || elmTagName === 'textarea') && regExpModForm.test(elmParentClass)) {
            const elmType = Rocket.string.lowercase.all(ev.target.getAttribute('type'));

            switch (elmType) {
               case 'checkbox':
                  if (ev.type === 'click') { action.checkboxChange(ev.target); }
                  break;

               case 'radio':
                  if (ev.type === 'click') { action.radioChange(ev.target); }
                  break;

               default:
                  if (ev.type === 'focusin') {
                     action.makeValued(ev.target);
                  } else if (ev.type === 'focusout') {
                     action.removeValued(ev.target);
                  }
            }
         }
      },
      radioChange(formElm) {
         const radioName = formElm.getAttribute('name') || false;
         if (!radioName) { return; }

         Rocket.classes.remove(Rocket.dom.select(`input[name="${radioName}"]`).map((item) => item.parentNode), 'is-checked');
         Rocket.classes.add(formElm.parentNode, 'is-checked');
      },
      removeValued(formElm) {
         if (formElm.value.length < 1) { Rocket.classes.remove(formElm.parentNode, 'is-valued'); }
      }
   };

   function applyEventListener() {
      if (Rocket.has.class(Rocket.dom.html, 'mod-form-listener')) {
         return;
      } else {
         Rocket.classes.add(Rocket.dom.html, 'mod-form-listener');
      }

      Rocket.event.add('.mod-form-listener', 'click', action.processEvent);
      Rocket.event.add('.mod-form-listener', 'focusin', action.processEvent);
      Rocket.event.add('.mod-form-listener', 'focusout', action.processEvent);
   };

   function applyForm(container) {
      const form = {container, element: undefined};
      const formClasses = Rocket.clone(baseClasses);
      let formType = '';
      let formIsInput = false;

      // Detect form element & type
      if (form.container.querySelector('input')) {
         form.element = form.container.querySelectorAll('input');

         formType = Rocket.string.lowercase.all(form.element[0].getAttribute('type'));
         if (formType === 'checkbox' || formType === 'radio') { form.element = form.element[0]; }
      } else if (form.container.querySelector('select')) {
         form.element = form.container.querySelector('select');
         formType = 'select';
      } else if (form.container.querySelector('textarea')) {
         form.element = form.container.querySelectorAll('textarea');
         formType = 'textarea';
      }

      // Update form styles
      switch (formType) {
         case 'checkbox':
         case 'radio':
            if (form.element.checked) {
               formClasses.push('is-checked');
            } else {
               Rocket.classes.remove(form.container, 'is-checked');
            }

            if (Rocket.has.class(form.element, '_mod-make-toggler')) {
               formClasses.push('_mod-type-toggler');
            } else {
               formClasses.push(`_mod-type-check--${formType}`);
            }

            break;

         case 'select':
            formClasses.push('_mod-type-select');
            break;

         default:
            formIsInput = true;
            formClasses.push(`_mod-type-input--${formType}`);

            setTimeout(() => {
               for (let i = 0, len = form.element.length; i < len; i++) {
                  /*
                  NOTE This is a hack to get around an autofill issue with Chrome. The input value
                  is not detected when trying to determine the "is-valued" class. Chrome does register
                  the value once it has been interacted with so this click event should get around that.
                  */
                  if (formType === 'password') { form.element[i].click(); }

                  if (form.element[i].value.length > 0) {
                     Rocket.classes.add(form.container, 'is-valued');
                     break;
                  }
               }
            }, 0);
      }

      // Remove styles if already applied
      if (Rocket.has.class(form.container, 'mod-form')) {
         const removeClasses = form.container.className
                                 .split(' ')
                                 .filter((item) => { return item.substring(0, 5) === '_mod-'; })
                                 .concat(['is-checked', 'is-valued']);

         Rocket.classes.remove(form.container, removeClasses);
      }

      // Apply styles
      if (label === 'shift' && formIsInput) { Rocket.classes.add(form.container, '_mod-label-shift'); }
      Rocket.classes.add(form.container, formClasses);
   };

   function init() {
      const formElms = Rocket.dom.select(target);

      updateFormClasses();
      if (formElms.length > 0) { formElms.map((item) => applyForm(item)) };
      applyEventListener();
   };

   function updateFormClasses() {
      if (colour !== 'blue') { baseClasses.push(`_mod-colour-${colour}`); }
      if (size !== 'normal') { baseClasses.push(`_mod-size-${size}`); }
      if (style !== 'line') { baseClasses.push(`_mod-style-${style}`); }
   }

   // Execute
   return init();
};

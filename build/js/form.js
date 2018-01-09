/**
@author Chris Humboldt
**/

// Set the defaults
Rocket.defaults.form = {
   targets: '.mod-form',
   colour: 'blue',
   label: 'normal',
   size: 'normal',
   style: 'line'
};

// Module
Rocket.form = ({
   targets = Rocket.defaults.form.targets,
   colour = Rocket.defaults.form.colour,
   label = Rocket.defaults.form.label,
   size = Rocket.defaults.form.size,
   style = Rocket.defaults.form.style
} = {}) => {
   // Variables
   const baseClasses = [`mod-form-applied`, `_mod-colour-${colour}`, `_mod-style-${style}`, `_mod-size-${size}`];
   const regExpModForm = new RegExp('mod-form-');

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
                  if (ev.type === 'click') {
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
      Rocket.event.add('.mod-form-listener', 'focusout', action.processEvent);
   };

   function applyForm(container) {
      const form = {container, element: undefined};
      const formClasses = Rocket.clone(baseClasses);
      let formType = '';

      // Detect form element & type
      if (form.container.querySelector('input')) {
         form.element = form.container.querySelectorAll('input');
         formType = Rocket.string.lowercase.all(form.element[0].getAttribute('type'));

         if (formType === 'checkbox' || formType === 'radio') { form.element = form.element[0]; }
      } else if (form.container.querySelector('select')) {
         form.element = form.container.querySelector('select');
         formType = 'select';
      } else if (form.container.querySelector('textarea')) {
         form.element = form.container.querySelector('textarea');
         formType = 'textarea';
      }

      // Remove styles if already applied
      if (Rocket.has.class(form.container, 'mod-form-applied')) {
         const removeClasses = form.container.className
                                 .split(' ')
                                 .filter((item) => { return item.substring(0, 5) === '_mod-'; })
                                 .concat(['is-checked', 'is-valued']);

         Rocket.classes.remove(form.container, removeClasses);
      }

      // Apply styles
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
            } else if (formType === 'checkbox') {
               formClasses.push('_mod-type-checkbox');
            } else {
               formClasses.push('_mod-type-radio');
            }

            break;

         case 'select':
            formClasses.push('_mod-type-select');
            break;

         case 'textarea':
            formClasses.push('_mod-type-textarea');
            if (label === 'shift') { formClasses.push('_mod-label-shift'); }
            if (form.element.value.length > 0) { formClasses.push('is-valued'); }
            break;

         default:
            if (label === 'shift') { formClasses.push('_mod-label-shift'); }
            formClasses.push((formType === 'password') ? '_mod-type-password' : '_mod-type-input');
      }
      Rocket.classes.add(form.container, formClasses);
      setTimeout(() => { Rocket.classes.add(form.container, '_mod-animate'); }, 0);
   };

   function init() {
      const formElms = Rocket.dom.select(targets);
      if (formElms.length > 0) { formElms.map((item) => applyForm(item)) };
      applyEventListener();
   };

   // Execute
   return init();
};

/**
@author Chris Humboldt
**/

// Set the defaults
Rocket.defaults.form = {
   targets: '.mod-form',
   colour: 'blue',
   label: 'normal',
   refresh: false,
   size: 'normal',
   style: 'line'
};

// Module
Rocket.form = ({
   targets = Rocket.defaults.form.targets,
   colour = Rocket.defaults.form.colour,
   label = Rocket.defaults.form.label,
   refresh = Rocket.defaults.form.refresh,
   size = Rocket.defaults.form.size,
   style = Rocket.defaults.form.style
} = {}) => {
   // Variables
   const baseClasses = [`is-applied`, `_mod-colour-${colour}`, `_mod-style-${style}`, `_mod-size-${size}`];

   // Methods
   const action = {
      checkboxChange() {
         const { container, element } = this;

         if (element.checked) {
            Rocket.classes.add(container, 'is-checked');
         } else {
            Rocket.classes.remove(container, 'is-checked');
         }
      },
      eventBlur() {
         Rocket.classes.remove(this, 'is-focused');
      },
      eventFocus() {
         Rocket.classes.add(this, 'is-focused');
      }
   };

   function applyForm(container) {
      // Check applied state
      if (Rocket.has.class(container, 'is-applied') && !refresh) { return; }

      // Continue
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

      // Remove existing styles based on refresh property
      if (refresh) {
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
            formClasses.push((formType === 'password') ? '_mod-type-password' : '_mod-type-input');
      }
      Rocket.classes.add(form.container, formClasses);
      setTimeout(() => { Rocket.classes.add(form.container, '_mod-animate'); }, 0);

      // Apply event handling
      switch (formType) {
         case 'checkbox':
            Rocket.event.add(form.element, 'change', action.checkboxChange.bind(form));
            break;

         default:
            setTimeout(() => { Rocket.event.add(form.element, 'blur', action.eventBlur.bind(form.container)) }, 0);
            setTimeout(() => { Rocket.event.add(form.element, 'focus', action.eventFocus.bind(form.container)) }, 0);

      }
   };

   function init() {
      const formElms = Rocket.dom.select(targets);
      if (formElms.length > 0) { formElms.map((item) => applyForm(item)) };
   };

   // Execute
   return init();
};

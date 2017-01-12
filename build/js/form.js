Rocket.defaults.form = {
    targets: '.form',
    colour: 'blue',
    label: 'normal',
    size: 'normal',
    style: 'line'
};
var RockMod_Form;
(function (RockMod_Form) {
    var check = {
        off: function (elm, container) {
            elm.checked = false;
            Rocket.classes.remove(container, '_checked');
        },
        on: function (elm, container) {
            elm.checked = true;
            Rocket.classes.add(container, '_checked');
        }
    };
    function checkSelect(inpOption, type, elm, container) {
        if (type !== 'checkbox') {
            return false;
        }
        var option = (typeof inpOption === 'string') ? inpOption : false;
        if (option === 'on') {
            check.on(elm, container);
        }
        else if (option === 'off') {
            check.off(elm, container);
        }
        else {
            if (Rocket.has.class(container, '_checked')) {
                check.off(elm, container);
            }
            else {
                check.on(elm, container);
            }
        }
    }
    function formApply(formContainer, options) {
        var element;
        var classes = ['_c-' + options.colour, '_s-' + options.style, '_sz-' + options.size];
        var type;
        if (formContainer.querySelector('input')) {
            element = formContainer.querySelector('input');
            type = element.getAttribute('type');
        }
        else if (formContainer.querySelector('textarea')) {
            element = formContainer.querySelector('textarea');
            type = 'textarea';
        }
        else if (formContainer.querySelector('select')) {
            element = formContainer.querySelector('select');
            type = 'select';
        }
        switch (type) {
            case 'checkbox':
            case 'radio':
                if (element.checked) {
                    classes.push('_checked');
                }
                else {
                    Rocket.classes.remove(element, '_checked');
                }
                if (Rocket.has.class(element, 'toggler')) {
                    classes.push('rf-tog');
                }
                else {
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
            }
            ;
        }
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
        }
        ;
        return {
            toggle: toggle,
            clear: clearValue,
            form: element
        };
    }
    function radioSelect(inpOption, type, elm, container) {
        if (type !== 'radio') {
            return false;
        }
        var option = (typeof inpOption === 'string') ? inpOption : false;
        if (option === 'off') {
            check.off(elm, container);
        }
        else {
            var radioGroup = document.getElementsByName(elm.getAttribute('name'));
            for (var _i = 0, radioGroup_1 = radioGroup; _i < radioGroup_1.length; _i++) {
                var radio = radioGroup_1[_i];
                radio.checked = false;
                Rocket.classes.remove(radio.parentNode, '_checked');
            }
            check.on(elm, container);
        }
    }
    function init(uOptions) {
        if (!Rocket.is.object(uOptions)) {
            return false;
        }
        var options = {
            targets: Rocket.helper.setDefault(uOptions.targets, Rocket.defaults.form.targets),
            colour: Rocket.helper.setDefault(uOptions.colour, Rocket.defaults.form.colour),
            label: Rocket.helper.setDefault(uOptions.label, Rocket.defaults.form.label),
            size: Rocket.helper.setDefault(uOptions.size, Rocket.defaults.form.size),
            style: Rocket.helper.setDefault(uOptions.style, Rocket.defaults.form.style)
        };
        var formElms = Rocket.dom.select(options.targets);
        if (formElms.length <= 0) {
            return false;
        }
        var objReturn = [];
        for (var _i = 0, formElms_1 = formElms; _i < formElms_1.length; _i++) {
            var elm = formElms_1[_i];
            objReturn.push(formApply(elm, options));
        }
        return objReturn;
    }
    RockMod_Form.init = init;
})(RockMod_Form || (RockMod_Form = {}));
Rocket.form = RockMod_Form.init;

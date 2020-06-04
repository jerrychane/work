import { extend, configure } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import { i18n } from './i18n'

configure({
    defaultMessage: (field, values) => {
        // overide the field name
        values._field_ = i18n.t(`field.${field}`);
        return i18n.t(`validation.${values._rules_}`, values);
    }
})

extend('email', email)
extend('min', min)
extend('length', length)
extend('required', required)
extend('confirmed', confirmed)
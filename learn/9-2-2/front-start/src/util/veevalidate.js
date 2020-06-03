import { extend } from 'vee-validate'
import { require, email, min, length, confirmed } from 'vee-validate/dist/rules'

extend('require', require)
extend('email', email)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)

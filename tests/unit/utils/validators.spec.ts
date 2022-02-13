import { validateEmail, validate, FIELDS } from '../../../src/utils/validators'
import { VALIDATIONS } from '../../../src/constants/messages'

describe('validators', () => {
  describe('validateEmail', () => {
    it('should return boolean whether email is valid or not', () => {
      expect(validateEmail('validamail@test.pl')).toBe(true)
      expect(validateEmail('test@test')).toBe(false)
      expect(validateEmail(' ')).toBe(false)
    })
  })

  describe('validate', () => {
    it('should return object with error name message for empty form object', () => {
      const form = {
        name: '',
        email: '',
        message: '',
      }

      expect(validate(form)).toEqual({
        inputName: FIELDS.name,
        message: VALIDATIONS.name,
      })
    })

    it('should return object with error email message for valid name field and invalid email', () => {
      const form = {
        name: 'Valid name',
        email: 'invalidmail@',
        message: '',
      }

      expect(validate(form)).toEqual({
        inputName: FIELDS.email,
        message: VALIDATIONS.email,
      })
    })

    it('should return object with error message', () => {
      const form = {
        name: 'Valid name',
        email: 'validemail@test.pl',
        message: '',
      }

      expect(validate(form)).toEqual({
        inputName: FIELDS.message,
        message: VALIDATIONS.message,
      })
    })

    it('should return false if all fields are valid', () => {
      const form = {
        name: 'Valid name',
        email: 'validemail@test.pl',
        message: 'Valid long enough message',
      }

      expect(validate(form)).toBe(false)
    })
  })
})

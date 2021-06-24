import { validateEmail } from '../../src/utils/validators'

describe('validators', () => {
  describe('validateEmail', () => {
    it('should return boolean whether email is valid or not', () => {
      expect(validateEmail('validamail@test.pl')).toBe(true)
      expect(validateEmail('test@test')).toBe(false)
      expect(validateEmail(' ')).toBe(false)
    })
  })
})

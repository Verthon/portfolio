import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import { sendEmail } from "../../src/utils/contact"

import { Contact } from '../../src/components/Contact'

jest.mock("../../src/utils/contact", () => ({
  sendEmail: jest.fn()
}))

describe('Contact', () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          email: `christopher.sordyl@gmail.com`,
          linkedin: 'https://www.linkedin.com/in/krzysztof-sordyl/',
          github: 'https://github.com/Verthon',
        },
      },
    })
  })
  it('should show error message in the form while submiting form without any data', async () => {
    const { getByRole } = render(<Contact />)
    fireEvent.click(getByRole('button'))

    expect(screen.getByRole('alert')).toBeTruthy()
    expect(sendEmail).not.toBeCalled();
  })
  it.todo('check submiting form with incorrect email')
  it.todo('check submiting form with correct email and name but empty message')
  it('should invoke email client once quick mail is clicked', async () => {
    const { getByText } = render(<Contact />)
    fireEvent.click(getByText('Quick mail'))

    const errorMessage = await screen.findByRole('alert')
    expect(errorMessage).not.toBeInTheDocument()
  })
})

import * as React from 'react'
import user from '@testing-library/user-event'
import { render, screen, fireEvent, act, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import { sendEmail } from '../../src/utils/contact'

import { Contact } from '../../src/components/Contact'

jest.mock('../../src/utils/contact', () => ({
  sendEmail: jest.fn(() => Promise.resolve()),
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
    render(<Contact />)
    fireEvent.click(screen.getByText(/submit/i))

    expect(screen.getByRole('alert')).toBeTruthy()
    expect(sendEmail).not.toBeCalled()
  })
  it.todo('check submiting form with incorrect email')
  it.todo('check submiting form with correct email and name but empty message')
  it('should send email once everything is correct', async () => {
    render(<Contact />)

    const submitButton = screen.getByText(/submit/i)
    const nameInput = screen.getByPlaceholderText(/Your name/i)
    const emailInput = screen.getByPlaceholderText(/Email address/i)
    const messageInput = screen.getByPlaceholderText(/Message/i)

    user.type(nameInput, 'My correct name')
    user.type(emailInput, 'correctmail@gmail.com')
    user.type(messageInput, 'Important contact message')

    user.click(submitButton)

    await waitFor(() => expect(sendEmail).toHaveBeenCalledTimes(1))
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '.'

describe('Home Component', () => {
  it('should render button', () => {
    const { getByText } = render(<Home />)

    expect(getByText('Começar')).toBeInTheDocument()
  })

  it('should be able to start a cycle', async () => {
    const { getByText } = await render(<Home />)
    const button = getByText('Começar')

    await userEvent.type(screen.getByLabelText('Vou trabalhar em'), 'Trabalhar')
    //await userEvent.type(screen.getByLabelText('durante'), '5')
    screen.logTestingPlaygroundURL()

    await userEvent.click(button)

    //expect(getByText('Interromper')).toBeInTheDocument()
  })
})

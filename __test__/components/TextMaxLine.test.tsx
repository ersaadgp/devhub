import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TextMaxLine from '../../src/components/TextMaxLine'

describe('TextMaxLine', () => {
  it('renders children correctly with default props', () => {
    render(<TextMaxLine line={2}>Hello, world!</TextMaxLine>)
    expect(screen.getByText('Hello, world!')).toBeInTheDocument()
  })

  it('renders with custom variant and line', () => {
    render(
      <TextMaxLine variant="h6" line={1}>
        Custom Heading
      </TextMaxLine>,
    )
    const element = screen.getByText('Custom Heading')
    expect(element.tagName.toLowerCase()).toBe('h6')
  })

  it('applies custom sx style', () => {
    render(
      <TextMaxLine line={1} sx={{ color: 'red' }} data-testid="text-line">
        Colored Text
      </TextMaxLine>,
    )
    const el = screen.getByTestId('text-line')
    expect(el).toHaveStyle('color: rgb(255, 0, 0)')
    expect(el).toHaveStyle('overflow: hidden')
    expect(el).toHaveStyle('WebkitLineClamp: 1')
  })
})

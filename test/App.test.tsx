import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from '../src/App';

test('should render App', () => {
    expect(render(<App />)).toBeTruthy();
});

import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from '../src/App';
import {AuthProvider} from "../src/auth/Auth";

test('should render App', () => {
    expect(render(
        <AuthProvider>
            <App />
        </AuthProvider>
    )).toBeTruthy();
});

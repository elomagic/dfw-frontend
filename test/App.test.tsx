import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import {StrictMode} from "react";
import App from "../src/App";
import '../src/index.css'
import '../src/i18n/config';
import {AuthProvider} from "../src/auth/Auth";

test('should render App', () => {
    expect(render(
        <StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </StrictMode>
    )).toBeTruthy();
});

/**
 * @jest-environment jsdom
 */

import { LoginPage } from '../pages/login/index'
import { screen, render, cleanup } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query'

afterEach(() => {
    cleanup()
})

test('test', () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
    render(wrapper(<LoginPage />))
})

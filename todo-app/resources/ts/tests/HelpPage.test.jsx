/**
 * @jest-environment jsdom
 */
import React from "react";
import { screen, render, cleanup } from '@testing-library/react';
import { HelpPage } from '../pages/help/index'
import "@testing-library/jest-dom"

afterEach(() => {
    cleanup()
})

test('HelpPageに適切な文字が表示される', () => {
    render(<HelpPage />)
    expect(screen.getByText('ヘルプ')).toBeInTheDocument()
})

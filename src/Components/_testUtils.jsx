import React from "react";
import { render } from "@testing-library/react";
import UserProvider from "../UserProvider";

const allProviders = ({ children }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: allProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
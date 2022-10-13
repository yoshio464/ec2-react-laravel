import React from "react"
import { Routers } from "./router"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./hooks/AuthContext";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        }
    }
})

export const App: React.FC = () => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <Routers />
            </QueryClientProvider>
        </AuthProvider>
    )
}

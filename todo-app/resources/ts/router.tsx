import React, { useEffect } from 'react'
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import { TaskPage } from './pages/tasks'
import { HelpPage } from './pages/help'
import { LoginPage } from './pages/login'
import { useLogout, useUser } from './queries/AuthQuery'
import { useAuth } from './hooks/AuthContext'
import { NotFoundPage } from './pages/error'

export const Routers: React.FC = () => {
    const logout = useLogout()
    const { isAuth, setIsAuth } = useAuth()
    const { isLoading, data: authUser } = useUser()

    useEffect(() => {
        if (authUser) {
            setIsAuth(true)
        }
    }, [authUser])

    const GuardRoute = () => {
        return isAuth ? <Outlet /> : <Navigate to='/login' />
    }

    const LoginRoute = () => {
        return !isAuth ? <Outlet /> : <Navigate to='/' />
    }

    const navigation = (
        <header className="global-head">
        <ul>
            <li><Link to="/">ホーム</Link></li>
            <li><Link to="/help">ヘルプ</Link></li>
            <li onClick={() => logout.mutate()}><span>ログアウト</span></li>
        </ul>
        </header>
    )

    const loginNavigation = (
        <header className="global-head">
        <ul>
            <li><Link to="/help">ヘルプ</Link></li>
            <li><Link to="/login">ログイン</Link></li>
        </ul>
        </header>
    )

    if (isLoading) return <div className='loader'></div>

    return (
        <>
            {isAuth ? navigation : loginNavigation}
            <Routes>
                <Route path="/" element={<GuardRoute />}>
                    <Route path="/" element={<TaskPage />} />
                </Route>
                <Route path="/help" element={<HelpPage />}/>
                <Route path="/login" element={<LoginRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

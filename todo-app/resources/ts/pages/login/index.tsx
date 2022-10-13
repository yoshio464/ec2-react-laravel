import React, { useState } from "react";
import { useLogin } from "../../queries/AuthQuery";

export const LoginPage: React.FC = () => {
    const login = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent<HTMLFormElement>|React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        login.mutate({email, password})
    }

    return(
        <div className="login-page">
            <div className="login-panel">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>メールアドレス</label>
                        <input
                            type="email"
                            className="input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>パスワード</label>
                        <input
                            type="password"
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn" onClick={() => handleLogin}>ログイン</button>
                </form>
            </div>
            <div className="links"><a href="/help">ヘルプ</a></div>
        </div>
    )
}

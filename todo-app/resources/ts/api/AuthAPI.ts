const axios = require('axios').default

const getUser = async () => {
    const { data } = await axios.get('api/user')
    return data
}

const login = async ({email, password}: {email:string, password: string}) => {
    const { data } = await axios.post('api/login', {
        email: email,
        password: password
    })
    return data
}

const logout = async () => {
    const { data } = await axios.post('api/logout')
    return data
}

export { getUser, login, logout }

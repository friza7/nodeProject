const logout = async () => {
    const res = await fetch('/auth/logout')
    const info = await res.json()
    if (info.ok) {
        window.location.href = '/auth/login'
    }
}
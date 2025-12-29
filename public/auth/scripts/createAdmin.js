const form = document.getElementById('createAdminForm')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(form))

    console.log(data)

    const res = await fetch('/auth/createAdmin', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (res.status === 200) {
        window.location.href = '/auth/login'
    }


})
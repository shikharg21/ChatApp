let socket = io()
socket.on('connected', () => {
    console.log("connected " + socket.id)
})

$(() => {
    let mssgelist = $('#mssgelist')
    let mssgebox = $('#mssgebox')
    let submit = $('#sendbtn')
    let loginbox = $('#loginbox')
    let loginbtn = $('#loginbtn')

    let logindiv = $('#login-div')
    let chatdiv = $('#chat-div')

    let user = ''

    submit.click(() => {
        socket.emit('send_mssge', {
            user: user,
            message: mssgebox.val()
        })
    })

    loginbtn.click(() => {
        user = loginbox.val()
        chatdiv.show()
        logindiv.hide()
        socket.emit('login',{
            user:user
        })
    })

    socket.on('recv_mssge', (data) => {
        mssgelist.append($('<li>' + data.user + ':' + data.message + '</li>'))
    })
})
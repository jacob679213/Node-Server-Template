$(function(){
    $('button#signIn').click(function(){
        //get login values
    let username = $("input#username").val()
    let password = $("input#password").val()

    const payload = {
        body: JSON.stringify({
            Username : username,
            Password: password
           }),
           method:'post',
           headers:{
               'content-type': 'application/json'
           }
        }

    if(username != '' && password != ''){
        fetch('/login',payload)
            .then(res=>res.json())
            .then(res=>console.log(res))
        }
    })
})
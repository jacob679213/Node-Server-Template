$(function () {
  //switch between sign in and sign up
  $("button#signInSwitch").click(function () {
    $("div#signIn").show();
    $("div#signUp").hide();
  });
  $("button#signUpSwitch").click(function () {
    $("div#signIn").hide();
    $("div#signUp").show();
  });

  //sign in
  $("button#signInSubmit").click(function () {
    //get login values
    let username = $("input#username").val();
    let password = $("input#password").val();

    const payload = {
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    };

    if (username != "" && password != "") {
      fetch("/login", payload)
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  });

  //sign up
  $("button#signUpSubmit").click(function () {
    const payload = {
      body: JSON.stringify({
        Fname: $("input#Fname").val(),
        Lname: $("input#Lname").val(),
        username: $("input#signUsername").val(),
        email: $("input#email").val(),
        password: $("input#signPassword").val(),
      }),
      method: "post",
      headers: {
        "content-type": "application/json",
      },
    };
    fetch("/signup", payload)
      .then((res) => res.json())
      .then((res) => console.log(res));
  });
});

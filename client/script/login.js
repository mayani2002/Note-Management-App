function createLoginForm() {
    const loginForm = `
        <div class="login-page">
            <div class="form">
                <h1>Please Login</h1>
                <input type="text" id="login-username" placeholder="username" />
                
                <input type="password" id="login-password" placeholder="password" />
                
                <button id="loginButton" type="button">Login</button>
                <br><br><br>
                <p>
                    Don't have an account?
                    <span>
                        <button style="cursor: pointer" class="link goToSignup">SignUp</button>
                    </span>
                </p>
            </div>
        </div>
    `;

    $('body').append(loginForm);

    $('.goToSignup').click(function () {
        console.log('goToSignup clicked');
        $.getScript('script/signup.js', function () {
            console.log('Login script loaded');
            createSignupForm();
        });
        $('.login-page').hide();
    });

    $('#loginButton').on('click', function () {
        const username = $('#login-username').val();
        const password = $('#login-password').val();

        const data = {
            username: username,
            password: password,
        }
        console.log(data)
        
        async function postlogin(url, data) {
            const response = await fetch(url, {
                method: "POST", 
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow", 
                body: JSON.stringify(data)
            });
            return response.json(); 
        }
        postlogin('http://localhost:3001/user/login', data).then(res => {
            console.log(res); // JSON data parsed by `response.json()` call
            if (res.message === 'Login successful') {
                document.cookie = `username=${res.result?.username}`;
                document.cookie = `id=${res.result?.id}`;
                window.location.reload();
            } else if (res.message === 'Internal server error') {
                alert("Internal server error!");
            }else if(res.message === 'Invalid password'){
                alert("Invalid password!");
            } else if (res.message === 'User not found'){
                alert("User not found!!" );
            }
        }   );
    });
}

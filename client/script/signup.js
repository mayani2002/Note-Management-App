function createSignupForm() {
    const signupForm = `
            <div class="signup-page">
                <div class="form">
                    <h1>Create an account</h1>
                    <input type="text" id="signup-username" placeholder="username" required />
                    <input type="email" id="signup-email" placeholder="abc@gmail.com" requied/>
                    <input type="password" id="signup-password" placeholder="password" />
                    <input type="password" id="signup-confirm_password" placeholder="confirm password" required />
                    <button id="signup" type="button" >Signup</button>
                    </br>
                    </br></br>
                    <p>
                        Already have an account?
                        <span>
                            <button style="cursor: pointer" class="link goToLogin">Login</button>
                        </span>
                    </p>
                </div>
            </div>`;

    $('body').append(signupForm);

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    $('.goToLogin').click(function () {
        console.log('goToLogin clicked');
        $.getScript('script/login.js', function () {
            console.log('Login script loaded');
            createLoginForm();
        });
        $('.signup-page').hide();
    });


    // Add event listener for the signup button
    $('#signup').on('click', function () {
        const username = $('#signup-username').val();
        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        const confirm_password = $('#signup-confirm_password').val();
        if (!isValidEmail(email)) {
            alert('Error: Invalid email');
            return;
        }
        if (password === '' || confirm_password === '') {
            alert('Error: Password field is empty');
            return;
        }

        if (password !== confirm_password) {
            alert('Error: Passwords do not match');
            return;
        }
        const data = {
            username: username,
            email: email,
            password: password
        }

        async function postsignup(url, data) {
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

        postsignup('http://localhost:3001/user/signup', data).then(res => {
            console.log('SignUp Res --> ', res);
            if (res.message === 'success') {
                alert("Account Created!");
                document.cookie = `username=${res.result?.username}`;
                document.cookie = `id=${res.result?.id}`;
                window.location.reload();
            } else if (res.message === 'Internal server error') {
                alert("Internal server error!");
            } else if (res.message === 'Username already exists') {
                alert("Username already exists!");
            }
        });
    });
}

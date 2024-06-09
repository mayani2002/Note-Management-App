$(document).ready(function () {
    if (!document.cookie.includes("username")) {
        $.getScript('script/login.js', function () {
            console.log('Login script loaded');
            createLoginForm();
        });
    } else {
        $.getScript('script/main.js', function () {
            main();
            console.log('Notes script loaded');
        });
    }
    
});
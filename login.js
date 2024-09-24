const email = document.querySelector('#email');
const emailNull = document.querySelector('.email-null')

email.addEventListener('blur', function(){
    if(!email.value){
        email.classList.add('error');
        emailNull.style.display = 'block';
    }else{
        email.classList.remove('error');
        emailNull.style.display = 'none';
    }
});

const password = document.querySelector('#password');
const passwordNull = document.querySelector('.password-null');

password.addEventListener('blur',function(){
    if(!password.value){
        password.classList.add('error');
        passwordNull.style.display = 'block';
    }else{
        password.classList.remove('error');
        passwordNull.style.display = 'none';
    }
}); 

const username = document.querySelector('#username');
const usernameNull = document.querySelector('.username-null');

username.addEventListener('blur',function(){
    if(!username.value){
        username.classList.add('error');
        usernameNull.style.display = 'block';
    }else{
        username.classList.remove('error');
        usernameNull.style.display = 'none';
    }
});
export { passwordVisible, passwordInvisible };

function passwordVisible(password, visible, invisible) {
    password.type = 'text';
    visible.style.display = 'none';
    invisible.style.display = 'block';
}

function passwordInvisible(password, visible, invisible) {
    password.type = 'password';
    invisible.style.display = 'none';
    visible.style.display = 'block';
}
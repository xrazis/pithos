document.querySelector('#next0').addEventListener('click', event => {
    const email = document.querySelector('#email').value;
    if (email) {
        document.querySelector("#step0").classList.add('hide');
        document.querySelector("#step1").classList.remove('hide');
        document.querySelector("#emailP").classList.toggle('blue-text');
        document.querySelector("#passP").classList.toggle('blue-text');
    } else {
        console.log("email");
    }
});

document.querySelector('#back1').addEventListener('click', event => {
    document.querySelector("#step1").classList.add('hide');
    document.querySelector("#step0").classList.remove('hide');
    document.querySelector("#emailP").classList.toggle('blue-text');
    document.querySelector("#passP").classList.toggle('blue-text');
});

document.querySelector('#next1').addEventListener('click', event => {
    const password = document.querySelector('#password').value;
    if (password) {
        document.querySelector("#step1").classList.add('hide');
        document.querySelector("#step2").classList.remove('hide');
        document.querySelector("#passP").classList.toggle('blue-text');
        document.querySelector("#submitP").classList.toggle('blue-text');
    } else {
        console.log("pass");
    }
});

document.querySelector('#back2').addEventListener('click', event => {
    document.querySelector("#step2").classList.add('hide');
    document.querySelector("#step1").classList.remove('hide');
    document.querySelector("#submitP").classList.toggle('blue-text');
    document.querySelector("#passP").classList.toggle('blue-text');
});
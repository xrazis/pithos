document.querySelector('form').addEventListener(('submit'), (event) => {
    event.preventDefault();

    const { value } = document.querySelector('input');

    const header = document.querySelector('h1');
    if (value.includes('@')) {
        header.innerHTML = 'looks good';
    } else {
        header.innerHTML = 'no good!';
    }
});

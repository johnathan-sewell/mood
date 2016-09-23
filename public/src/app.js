console.log('hello, I am the front end');

var smilesController = (function() {
    const submitSmilesToAPI = () => {
        console.log('submit here');
    };

    var formEl = document.querySelector('.js-smiles-form');
    formEl.addEventListener('submit', e => {
        e.preventDefault();
        submitSmilesToAPI();
    });
})();

const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const count = document.querySelector('#count');

button.addEventListener('click', function() {
   if (input.value.trim() === '') {
        alert('Por favor, informe um capítulo.');
        input.focus();
        return;
    }
});
function atualizarContador() {
    count.textContent = list.children.length;

}
button.addEventListener('click', function () {

    if (input.value.trim() !== '') {

        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        li.textContent = input.value;
        deleteButton.textContent = '❌';

        li.append(deleteButton);
        list.append(li);
        atualizarContador();

        deleteButton.addEventListener('click', function () {
            li.remove();
            atualizarContador();
        });

        input.value = '';
        input.focus();
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        button.click();
    }
});

deleteButton.addEventListener('click', () => {
    if (confirm('Deseja excluir este capítulo?')) {
        li.remove();
    }
});


botaoExcluir.addEventListener('click', function() {
    list.removeChild(li);
    input.focus();

});

input.value = '';
input.focus();
localStorage.setItem('chapters', JSON.stringify(chapters));



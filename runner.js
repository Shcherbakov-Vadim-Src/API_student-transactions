startPages();

function startPages(){
fetch('https://acb-api.algoritmika.org/api/transaction')               
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach(item => {
            let newP = document.createElement('table');
            newP.innerHTML = `<tr>
                                <td>${item.from} перевел</td>
                                <td>${item.to}</td>
                                <td>платёж ${item.amount} руб.</td>
                                <td class="id">id транзакции ${item.id}</td>
                                <td><button class="deleteTr">Удалить</button></td>
                                </tr>`;
            inform.append(newP);
            deleteElement();
        });
    });
};

const form = document.querySelector('form');
const paymentFrom = document.querySelector('.paymentFrom');
const to = document.querySelector('.to');
const summ = document.querySelector('.summ');
const button = document.querySelector('.button');
const inform = document.querySelector('.inform'); 
const deleteTr = document.querySelector('.deleteTr');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(data.get('paymentFrom'));
    console.log(data.get('to'));
    console.log(data.get('summ'));

    const newTransaction = {                                              
        from: `${data.get('paymentFrom')}`, 
        to: `${data.get('to')}`,
        amount: `${data.get('summ')}`,
    };

    fetch('https://acb-api.algoritmika.org/api/transaction', {            
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify(newTransaction)
    }).then(() => {
        location.reload();
    });
});

function deleteElement() {  
    const elementDelete = document.querySelectorAll('.deleteTr');  
    elementDelete.forEach((el) => {
        el.addEventListener('click', (event) => {               
            event.preventDefault();
            let targetElement = event.target.parentElement.previousElementSibling.innerText.split(' ');
            let url = 'https://acb-api.algoritmika.org/api/transaction/';
            let id = targetElement[2];
            fetch(`${url}${id}`, {                       
                method: 'DELETE'
            }).then(() => {
                location.reload();
            });
        });
    });
};
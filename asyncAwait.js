window.addEventListener('DOMContentLoaded', () => {
    getOrders()
        .then(res => {
            res.forEach(order => {
                displayExpense(order);
            });
        })
})
let form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    item = e.target.item.value;
    price = e.target.price.value;
    table = e.target.table.value;
    let order = {
        item,
        price,
        table
    }
    sendOrder(order)
        .then(res => {
            console.log(res);
            displayExpense(res);
        });
});

function displayExpense(order) {
    let items = document.querySelector(`#${order.table}`);
    let list = document.createElement('li');
    list.name = order._id;
    list.classList = 'list-group-item';
    list.textContent = order.item + '-' + order.price + '-' + order.table;
    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.name = 'Delete';
    deleteBtn.classList = 'btn btn-outline-dark btn-inline btn-sm';
    deleteBtn.value = 'Delete Order';
    deleteBtn.onclick = function () { deleteList(this); };

    let btnUlist = document.createElement('ul');
    btnUlist.classList = 'list-inline';
    let btnList = document.createElement('li');
    btnList.classList = 'list-inline-item';
    btnList.appendChild(deleteBtn);
    btnUlist.appendChild(btnList);

    list.appendChild(btnUlist);
    items.appendChild(list);
}

function deleteList(deleteBtn) {
    let items = deleteBtn.parentElement.parentElement.parentElement.parentElement;
    let list = deleteBtn.parentElement.parentElement.parentElement;
    id = list.name;
    deleteOrder(id)
        .then(res => {
            items.removeChild(list);
        })
}

async function sendOrder(order) {
    try {
        const response = await fetch('https://crudcrud.com/api/00e30f4ac17f44a58bef3eb8192f588c/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
            .then((res) => {
                console.log('Data sent successfully');
                return res.json();
            })
            .catch(() => console.log('Failed to send data'));
        return response;
        // if (response.ok) {
        //     return response.json();
        // } else {
        //     console.error('Failed to send data');
        // }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getOrders() {
    try {
        const response = await fetch('https://crudcrud.com/api/00e30f4ac17f44a58bef3eb8192f588c/orders')
            .then((res) => {
                console.log('Order retrieved successfully');
                return res.json();
            })
            .catch(() => console.log('failed to Retrieve orders'));
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteOrder(id) {
    try {
        const response = await fetch(`https://crudcrud.com/api/00e30f4ac17f44a58bef3eb8192f588c/orders/${id}`, {
            method: 'DELETE',
        })
            .then(console.log('Order deleted successfully'))
            .catch((err) => console.log(err + ' Failed to delete data'));

        // if (response.ok) {
        //     console.log('Data deleted successfully');
        // } else {
        //     console.error('Failed to delete data');
        // }
    } catch (error) {
        console.error('Error:', error);
    }
}



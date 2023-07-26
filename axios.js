window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/afe589aa9b11432c8e31d9abd919c04f/orders")
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                displayExpense(res.data[i]);
            }
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
    axios.post("https://crudcrud.com/api/afe589aa9b11432c8e31d9abd919c04f/orders", order)
        .then(res => {
            console.log(res.data);
            displayExpense(res.data);
        });
    // localStorage.setItem(expense.category, JSON.stringify(expense));
    // amount.value = "";
    // description.value = "";
    // category.value = "";
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
    listName = list.name;
    axios.delete(`https://crudcrud.com/api/afe589aa9b11432c8e31d9abd919c04f/orders/${listName}`)
        .then(res => {
            items.removeChild(list);
        })
}

$(document).ready(function () {
    $('.addItem').on('click', function (e) {
        const id = $(this).data('id');
        addCart(id);
    });
});

function deleteCart(ID) {
    const url = window.location.href + '/del';
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": ID
        })
    })
}

function addCart(ID) {
    const url = 'http://localhost:3000/watchlist/add';
    console.log(url)
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": ID
        })
    })
}

$(document).ready(function () {
    $('.addItem').ready(function () {
        const items = []
        $('.addItem').each(function () {
            const id = $(this).data('id');
            items.push({id: id, button: $(this)});
        })
        for (const item of items) {
            $.getJSON(`/watchlist/check/${item.id}`, function (data) {
                active(item.button, data)
            });
        }
    });

    function active(button, data) {
        if (data === true) {
            button.children(":first").addClass("active");
            button.addClass('deleteItem').removeClass('addItem');
        }
    }

    $(document).on('click', '.addItem', function (e) {
        const id = $(this).data('id');
        addCart(id);
        $(this).children(":first").addClass("active");
        $(this).addClass('deleteItem').removeClass('addItem');
    });

    $(document).on('click', '.deleteItem', function (e) {
        const id = $(this).data('id');
        deleteCart(id);
        $(this).children(":first").removeClass("active");
        $(this).removeClass('deleteItem').addClass('addItem');
    });
});

function deleteCart(ID) {
    const url = 'http://localhost:3000/watchlist/del';
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

function isInCart(ID) {
    $.getJSON(`./watchlist/in-cart?id=${ID}`, function (data) {
        return data;
    });
    return true;
}

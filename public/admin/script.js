
var table;
$(document).ready(function () {
    table = $('.table').DataTable();
    $('.save').click((e) => {
        e.preventDefault();
    });
    $('.edit').click((e) => {
        e.preventDefault();
    })
})

function Edit(CatID) {
    
    $(`.row-${CatID}`).toggle();
}
function Delete(button, ID) {
    table.row($(button).parents("tr")).remove().draw(false);
    const url = window.location.href + '/del/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function Approve(button, ID) {
    table.row($(button).parents("tr")).remove().draw();
    const url = window.location.href + '/approve/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    }) 
}
function Save(CatID) {
    const value = $(`.row-${CatID}`).find('input[name="CatName"]').val();
    const url = window.location.href + `/edit/${CatID}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "CatName": value
        })
    })
    const t = $(`.row-${CatID}`).find('.CatName');
    console.log(t.find('a').length)
    if(t.find('a').length){
        $(`.row-${CatID}`).find('.CatName').html(`<a href="./${CatID}">${value}</a>`);
    }
    else {
        $(`.row-${CatID}`).find('.CatName').html(value)
    }
    $(`.row-${CatID}`).toggle();
}
function toggleModal() {
    $("#addCat").modal();
}
function Cancel(CatID) {
    $(`.row-${CatID}`).toggle();
}
function toBidder(button, ID) {
    $(button).addClass('btn-secondary').removeClass('btn-info').html('<i class="fa fa-arrow-down" aria-hidden="true"></i> To Seller')
    const url = window.location.href + '/toBidder/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function toSeller(button, ID) {
    $(button).addClass('btn-secondary').removeClass('btn-info').html('<i class="fa fa-arrow-down" aria-hidden="true"></i> To Bidder')
    const url = window.location.href + '/toSeller/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function SaveUser(ID) {
    const username = $(`.row-${ID}`).find('input[name="Username"]').val();
    console.log(username);
    const email = $(`.row-${ID}`).find('input[name="Email"]').val();
    const url = window.location.href + `/edit/${ID}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Username" : username,
            "Email" : email
        })
    });
    $(`.row-${ID}`).find('.Username').html(username);
    $(`.row-${ID}`).find('.Email').html(email);
    $(`.row-${ID}`).toggle();
}

var table;
var editor;
$(document).ready(function () {
    table = $('.table').DataTable();
    $('.save').click((e) => {
        e.preventDefault();
    });
    $('.edit').click((e) => {
        e.preventDefault();
    });
})
function Edit(button) {
    var CatName = $(button).parent().parent().find('.CatName');
    const sub = $(CatName).find('a');
    if (sub.length > 0) {
        CatName = sub.html();
    }
    else {
        CatName = CatName.html().trim();
    }
    const CatID = $(button).parent().parent().find('th').html();
    $('#editCat').modal();
    $('#EditCatID').val(CatID);
    $('#EditCatName').val(CatName);
    
    $('#formEdit').attr('action', './category/edit/' + CatID);
}
function ResetPassword(button) {
    // const Username = $(button).parent().parent().find('.Username').html();
    // const UserID = $(button).parent().parent().find('.UserID').html();
    const Email = $(button).parent().parent().find('.Email').html();
    fetch("http://localhost:3000/auth/requestNewPassword", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Email": Email
        })
    });
    $('#resetUser').modal();
    // $('#editUser').modal();
    // $('#EditUserID').val(UserID);
    // $('#EditUsername').val(Username);
    // $('#EditEmail').val(Email);
    // $('#formEdit').attr('action', './user/edit/' + UserID);
}

function DeleteCat(button, ID) {
    table.row($(button).parents("tr")).remove().draw(false);
    //$(button).attr('class', 'btn btn-success btn-sm shadow').html('<i class="fa fa-check" aria-hidden="true"></i> Unban');
    const url = 'http://localhost:3000/admin/category/del/'+ID;

    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function Delete(button, ID) {
    table.row($(button).parents("tr")).remove().draw(false);
    const url = window.location.href + '/del/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function Ban(button, ID) {
    //table.row($(button).parents("tr")).remove().draw(false);
    $(button).attr('class', 'btn btn-success btn-sm shadow').attr('onclick', `Unban(this,${ID})`).html('<i class="fa fa-check" aria-hidden="true"></i> Unban');
    const url = window.location.href + '/del/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function Unban(button, ID) {
    $(button).attr('class', 'btn btn-danger btn-sm shadow').attr('onclick', `Ban(this,${ID})`).html('<i class="fa fa-trash" aria-hidden="true"></i> Ban');
    const url = window.location.href + '/unban/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function BanUnban(button, ID) {
    $(button).find
}
function Approve(button, ID) {
    table.row($(button).parents("tr")).remove().draw();
    const url = window.location.href + '/approve/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    }) 
}
function SaveCat() {
    const CatID = $('#EditCatID').val();
    const value = $('#EditCatName').val();
    const url = `http://localhost:3000/admin/category/edit/${CatID}`;
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
    if(t.find('a').length){
        $(`.row-${CatID}`).find('.CatName').html(`<a href="./category/${CatID}">${value}</a>`);
    }
    else {
        $(`.row-${CatID}`).find('.CatName').html(value)
    }
    //$(`.row-${CatID}`).toggle();
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
function SaveUser() {
    const ID = $('#EditUserID').val();
    const username = $('#EditUsername').val();
    const email = $('#EditEmail').val();
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
}

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
    table.row($(button).parents("tr")).remove().draw();
    //$(`.row-${ID}`).hide('500');
    const url = window.location.href + '/del/' + ID;
    console.log(url);
    fetch(url, {
        method: 'POST',
    })
}
function Save(CatID) {
    const value = $(`.row-${CatID}`).find('input[name="CatName"]').val();
    const url = 'http://localhost:3000/admin/category' + `/edit/${CatID}`;
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
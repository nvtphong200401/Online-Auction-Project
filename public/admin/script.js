function Edit(CatID) {
    $(`.row-${CatID}`).toggle();
}
function Delete(CatID) {
    $(`.row-${CatID}`).hide('500');
}
function Save(CatID) {
    const value = $(`.row-${CatID}`).find('input[name="CatName"]').val();
    $(`.row-${CatID}`).find('#CatName').html(value);
    $(`.row-${CatID}`).toggle();
}
function toggleModal(){
    $("#myModal").modal();
}
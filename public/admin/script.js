
   var table;
   $(document).ready(function () {
       table = $('.table').DataTable();
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
       $(`.row-${CatID}`).find('#CatName').html(value);
       $(`.row-${CatID}`).toggle();
   }
   function toggleModal(){
       $("#addCat").modal();
   }
   function Cancel(CatID) {
       $(`.row-${CatID}`).toggle();
   }
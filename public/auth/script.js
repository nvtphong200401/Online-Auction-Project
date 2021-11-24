$(document).ready(function() {
    $('#get-new-password').click(function(e) {
      e.preventDefault();
      $('.show1').toggle('500');
      $('.show2').toggle('500');
    });
    $('#goback').click(function(e) {
      e.preventDefault();
      $('.show1').toggle('500');
      $('.show2').toggle('500');
    });
    $('#register').click(function (e) {
        e.preventDefault();
        $('.show3').toggle('500');
        $('.show1').toggle('500');
    });
    $('#gobackLog').click(function (e) {
        e.preventDefault();
        $('.show3').toggle('500');
        $('.show1').toggle('500');
    })
  });
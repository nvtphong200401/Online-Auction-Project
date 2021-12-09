$(document).ready(function () {
  $('#get-new-password').click(function (e) {
    e.preventDefault();
    $('.show1').toggle('500');
    $('.show2').toggle('500');
  });
  $('#goback').click(function (e) {
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
  });
  $('#verifyEmail').click(function (e) {
    e.preventDefault();
    $('.show4').toggle('500');
    console.log("here")
    $('.show1').toggle('500');
  });
  $('#goback4').click(function (e) {
    e.preventDefault();
    $('.show1').toggle('500');
    $('.show4').toggle('500');
  });
  function onSubmit(token) {
    document.getElementById("demo-form").submit();
  };

  $('.show3').on('submit', function (e) {
    e.preventDefault();

    const username = $('#txtUsername').val();
    if (username.length === 0) {
      alert('Invalid data!');
      return;
    }

    $.getJSON(`/auth/is-available?user=${username}`, function (data) {
      if (data === false) {
        alert('Invalid username ! Please choose another username');
      } else {
        $('.show3').off('submit').submit();
      }
    });
  });

  $('#txtDOB').datetimepicker({
    timepicker: false,
    format: 'd/m/Y',
    mask: true
  });
  $('#txtUsername').select();
});


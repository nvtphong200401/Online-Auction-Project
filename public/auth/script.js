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
    const password = $('#txtPassword').val();
    const rePassword = $('#txtRePassword').val();
    const email = $('#txtEmail').val();
    var eighteenYearsAgo = moment().subtract(18, "years");
    const dob = $('#txtDOB').val();
    if(!eighteenYearsAgo.isAfter(moment(dob))){
      alert("Sorry you cannot join with us");
      return;
    }
    if (username.length === 0) {
      alert('Invalid data!');
      return;
    }
    if(password.length < 7){
      alert("Password must be greater than 6 characters");
      return;
    }
    if(password != rePassword){
      alert("Password and Re-Password do not match !");
      return;
    }
    console.log($('#txtDOB').val());
    console.log(typeof($('#txtDOB').val()));

    $.getJSON(`/auth/is-available?user=${username}`, function (data) {
      if (data === false) {
        alert('Invalid username ! Please choose another username');
      } else {
        $('.show3').off('submit').submit();
      }
    });
    $.getJSON(`/auth/is-available?email=${email}`, function (data) {
      if (data === false) {
        alert('This email has already use ! Please choose another email');
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
function registerSubmit(event) {
  if(grecaptcha && grecaptcha.getResponse().length > 0){
    
  } else {
    alert("Please tick into captcha");
    return;
  }
}
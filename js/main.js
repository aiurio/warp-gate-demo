$('.step_form .btn').on('click', finishStep);
$('#fbLogin').on('click', login);
$('#processPayment').on('click', processPayment);

//Functions
function finishStep(e){
  var step = $(e.target).data('step');
  var next = $(e.target).data('next');
  $('.step[data-step=' + step + ']').addClass('done');
  $('#step_' + step).removeClass('active');
  if(next) $('#step_' + next).addClass('active');
}

function login(){
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me',{fields: 'first_name,last_name,email,picture'}, function(response) {
          console.log(response);
          $('.userStart').hide();
          $('.userForm').show();
          $('#firstName').attr('value', response.first_name);
          $('#lastName').attr('value', response.last_name);
          $('#email').attr('value', response.email);
          $('#user_avatar').attr('src', response.picture.data.url);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }else{
      console.log(response);
    }
  });
}

function processPayment(){
  window.runPayment($('#cc_number').val(),
                    $('#cvc_number').val(),
                    $('#exp_month').val(),
                    $('#exp_year').val());

}

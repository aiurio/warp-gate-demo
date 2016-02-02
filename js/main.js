$('.step_form .btn').on('click', finishStep);

$('#fbLogin').on('click', login);

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

var handler = StripeCheckout.configure({
    key: 'pk_T20xIUBLEJGrjK8dhW9Yit8iq45I7',
    image: '/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
      console.log(token);
      $('[data-step="two"]').click();
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
    }
  });

  $('#payStripe').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Adella',
      description: 'Membership',
      amount: 4999
    });
  });

  // Close Checkout on page navigation
  $(window).on('popstate', function() {
    handler.close();
  });

$('.step_form .btn').on('click', finishStep);
$('#fbLogin').on('click', login);
$('#fbShare').on('click', share);
var customer = {};
//Functions
var actions = {
  saveCustomerInfo: function(){
    customer.first_name = $('#firstName').val();
    customer.last_name = $('#lastName').val();
    customer.email = $('#email').val();
    customer.name = customer.first_name + customer.last_name;
    customer.slug = $('#slug').val();
    console.log(customer);
  },
  processPayment: function(){
    console.log($('#cc_number').val(),
    $('#cvc_number').val(),
    $('#exp_month').val(),
    $('#exp_year').val());
    window.runPayment(customer,
                      $('#cc_number').val(),
                      $('#cvc_number').val(),
                      $('#exp_month').val(),
                      $('#exp_year').val());
  }
};

function finishStep(e){
  var step = $(e.target).data('step');
  var next = $(e.target).data('next');
  var run  = $(e.target).data('run');
  $('.step[data-step=' + step + ']').addClass('done');
  $('#step_' + step).removeClass('active');
  if(next) $('#step_' + next).addClass('active');
  if(run) actions[run]();
}

function share(){
  FB.ui({
    method: 'share',
    href: 'http://adella.com/team/' + customer.slug,
  }, function(response){});
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
          $('#slug').attr('value', response.email.split('@')[0]);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }else{
      FB.login(function(){
        login();
      }, {scope: 'public_profile,email'});
      console.log(response);
    }
  });
}

$(window).scroll(function(e){
  $('#h2').css('transform', 'translate3d(0px, ' + $(window).scrollTop() * 0.6 + 'px, 0px)');
  if((window.pageYOffset +  window.innerHeight + 200) >  $('#brushes').offset().top){
    $('#brushes').css('opacity', '1');
  }
});

if((window.pageYOffset +  window.innerHeight + 200) >  $('#brushes').offset().top){
  $('#brushes').css('opacity', '1');
}

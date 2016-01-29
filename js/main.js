$('.step_form .btn').on('click', finishStep);

$('#fbLogin').on('click', fbLoginClick);

//Functions
function finishStep(e){
  var step = $(e.target).data('step');
  var next = $(e.target).data('next');
  $('.step[data-step=' + step + ']').addClass('done');
  $('#step_' + step).removeClass('active');
  if(next) $('#step_' + next).addClass('active');
}


function fbLoginClick(){
	console.log('starting');
	window.onbeforeunload = confirmExit;
    function confirmExit() {
        return "You have attempted to leave this page. Are you sure?";
    }
	FB.login(function(response) {
		window.onbeforeunload = null;
		console.log(response);
		alert('response');
		
	    if (response.authResponse) {
		    console.log('Welcome!  Fetching your information.... ');
		    FB.api('/me', function(response) {
		    	console.log('Good to see you, ' + response.name + '.');
		    });
	    } else {
	    	console.log('User cancelled login or did not fully authorize.');
	    }
	});	
}
$('.step_form .btn').on('click', finishStep);

//Functions
function finishStep(e){
  var step = $(e.target).data('step');
  var next = $(e.target).data('next');
  $('.step[data-step=' + step + ']').addClass('done');
  $('#step_' + step).removeClass('active');
  if(next) $('#step_' + next).addClass('active');
}

;(function(){
window.stripeKeys = {
	publish : '',
	secret: ''
};

window.setKeys = function(pub, priv){
	window.stripeKeys.publish = pub;
	window.stripeKeys.secret = priv;
};

window.runPayment = function(customer, number, cvc, month, year){
	Stripe.setPublishableKey(window.stripeKeys.publish);
	Stripe.card.createToken({
	  number: number,
	  cvc: cvc,
	  exp_month: month,
	  exp_year: year
	}, tokenResponse);
};

function tokenResponse(code, res){
	if( code < 200 || code >= 300 || (res && res.error) ){
		return tokenFailed(code, res);
	}
	console.log('succesfully created token', res);

	$.ajax({
        url: '/api/customers',
        type: 'POST',
        data: {
				  'amount': 4999,
				  'customer': customer,
				  'description': 'Test test',
				  'metadata': {
				    'foo': 'bar'
				  }
				},
				headers: {
					'x-stripe-key': window.stripeKeys.secret,
					'x-stripe-token': res.id
				},
        dataType: 'json',
        success: function (response) {
            console.log('success', response);
        },
        error: function (xhr, status) {
            console.log('arguments');
        }
    });
}

function tokenFailed(code, res){
	console.warn(res);
}


console.log('Get started with the following: \n\n\n window.setKeys("PUBLIC_KEY", "PRIVATE_KEY"); \n window.runPayment("4111111111111111", "123", "12", "2024");');

})();

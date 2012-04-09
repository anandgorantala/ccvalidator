(function( $ ){
  $.fn.ccvalidator = function(options) {
	return this.each(function() {

		var cfg = {
			'ccimgs'   : '#acceptedcards',
			'errorclass' : 'error',
			'validclass' : 'valid',
			'validateon' : 'blur'
      	};

		if ( options ) {
        	$.extend( cfg, options );
     	}
		var ccinput = $(this);
		var ccnum = ccinput.val();
		
		// This code identifies the credit card issuer as the user types.
		$(this).keyup(function () { 
			ccnum = ccinput.val();

			if(ccnum == '') {
				cc_reset();
				return;
			}
			
			highlightIssuer();
			
			if($('#cc_errormsg').length != 0) {
				cc_error(cc_validate());
			}
		});
		
		// This code activates based on the user's setting for validation, default is blur.
		$(this).bind(cfg.validateon, function () { 
			ccnum = ccinput.val();
			if(ccnum == '') {
				cc_reset();
				return;
			}
			cc_error(cc_validate());
		});

		
		function highlightIssuer() {
			$(cfg.ccimgs).children('li').css('opacity', 0.1);
			$(cfg.ccimgs).children('.'+cc_getIssuer()).css('opacity', 1);			
		}
		
		// Returns the Credit card issuer from the known list, else returns 'cc_unknown'
		function cc_getIssuer() {
		
			if(ccnum.match('^4[0-9]*$')) {
				return 'cc_visa';
			} else if(ccnum.match('^5[1-5][0-9]*$')) {
				return 'cc_mastercard';
			} else if(ccnum.match('^3[47][0-9]*$')) {
				return 'cc_amex';
			} else if(ccnum.match('^6(?:011|5[0-9]{2})[0-9]*$')) {
				return 'cc_discover';
			} else if(ccnum.match('^3(?:0[0-5]|[68][0-9])[0-9]*$')) {
				return 'cc_dinersclub';
			} else if(ccnum.match('^(?:2131|1800|35\d{3})[0-9]*$')) {
				return 'cc_jcb';
			} else {
				return 'cc_unknown'
			}
		}
		
		// Performs the Luhn Validation and returns True or False.
		function cc_validate() {
			var ccnumsum = 0;
			var ccnumstring = ccnum.toString();
			
			if(isNaN(ccnum) || ccnum.substring(0,1) == 0 || ccnum.length < 13 || ccnum.length > 16) {
				return false;
			}
			for(var i=ccnumstring.length-2; i>=0; i=i-2) {
				ccnumsum += parseInt(cc_stringsum(2*parseInt(ccnumstring.charAt(i))));
				if(i!=0) {
					ccnumsum += parseInt(ccnumstring.charAt(i-1));
				}
			}
			
			if((ccnumsum + parseInt(ccnumstring.charAt(ccnumstring.length-1)))%10 == 0) {
				return true;
			}
			
			
			return false;
		}
		
		// Returns the sum of digits in a number.
		function cc_stringsum(numstring) {
			var numstring = numstring.toString();
			var numstringsum = 0;
			if(numstring.length <= 1) {
				return numstring;
			}

			for(var j=0;j<numstring.length;j++) {
				numstringsum += parseInt(numstring.charAt(j))
			}
			return numstringsum;
		}
		
		// Sets/Unsets the error and valid classes on the elements.
		function cc_error(show) {
			if(!show) {
				if(!$('#cc_errormsg').length) {
					ccinput.after('<p id="cc_errormsg" class="'+cfg.errorclass+'">Not a valid credit card number</p>');
				}
				ccinput.removeClass('valid');			
				ccinput.addClass('error');				
			} else {
				ccinput.siblings('#cc_errormsg').remove();
				ccinput.removeClass('error');			
				ccinput.addClass('valid');				
			}
		}
		
		// Resets the html and css on all the elements
		function cc_reset() {
			$(cfg.ccimgs).children('li').css('opacity', 1);
			ccinput.siblings('#cc_errormsg').remove();
			ccinput.removeClass('error valid');			
			return;
		}


	});

  };
})( jQuery );
	
	
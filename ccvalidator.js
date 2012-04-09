(function( $ ){
  $.fn.ccvalidator = function(options) {
	return this.each(function() {

		var cfg = {
			'ccimgs'   : '#acceptedcards',
			'errorclass' : 'error',
			'validclass' : 'valid'
      	};

		if ( options ) { 
        	$.extend( cfg, options );
     	}
		var ccinput = $(this);
		
		$(this).keyup(function () { 
			//this.value = this.value.replace(/[^0-9\.]/g,'');
			var cc = $(this).val();
			cc = cc.replace(/[^0-9\.]/g,'');

			$(cfg.ccimgs).children('li').css('opacity', 0.1);
			$(cfg.ccimgs).children('.'+cc_getIssuer(cc)).css('opacity', 1);
		
			cc_error(cc_luhnvalidation(cc))
			
			
			
		});


		function cc_getIssuer(ccnum) {
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
		
		function cc_luhnvalidation(ccnum) {
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
		
		function cc_error(show) {
			if(!show) {
				$('#errormsg').removeClass('hidden');
				$('#errormsg').html('Not a valid credit card number');
				ccinput.removeClass('valid');			
				ccinput.addClass('error');				
			} else {
				$('#errormsg').addClass('hidden');
				$('#errormsg').html('');
				ccinput.removeClass('error');			
				ccinput.addClass('valid');				
			}
		}


	});

  };
})( jQuery );
	
	
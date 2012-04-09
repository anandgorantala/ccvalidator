CCValidator
-----------

A client side validator for credit card numbers. Highlights the card type and performs Luhn algorithm check


DEMO
-------


See a demo of the plugin in action here: [http://ianand2.github.com/ccvalidator/example.html](http://ianand2.github.com/ccvalidator/example.html)


REQUIREMENTS
------------


You will need jQuery(http://jquery.com) to run this. 


USAGE
-----


	$(document).ready(function() {
		$("#ccnum").ccvalidator();
	});

	Options
	- ccimgs: The selector for the unordered list containing the images of the credit card issuers, default is '#accepetedcards'. Identifies, Visa, Mastercard, American Express, Discover, JCB and Diners Club
	- errorclass: For invalid numbers, the class that will be set to the input and the error message appended to the input.
	- validclass: The class that will be set to the input when the number is valid.
	- validateon: Trigger to perform the validation, default is on 'blur'.

	
	
LICENSE
-------


This work is licensed under Creative Commons Attribution Sharealike 3.0


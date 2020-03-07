const accordionFunc = ()=> {

	$('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().addClass('accordion__item--active');       
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).parent().removeClass('accordion__item--active');  
    });

    // ORANGE TIMES ICON
	$('.accordion-btn').on('click', function () {
	    	$('.accordion-btn').not(this).removeClass('change-header-color');
			$(this).toggleClass('change-header-color');     
	    });

}

export default accordionFunc
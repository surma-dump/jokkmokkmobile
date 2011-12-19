(function($) {
	var url_prefix = 'http://uk.jokkmokk.jp/photo/nr';
	var url_suffix = '/latest.jpg';
	for(var i = 1; i <= 5; i++) {
		var url = url_prefix+i+url_suffix;
		$('<img>').attr('src', url).appendTo($('#cam'+i+' > figure'));
	}

})(jQuery);

(function($) {
	var $main = $('#main');
	var $campreview = $('<div class="camview"><h1></h1><figure><img /></figure></div>');
	var $popup = $('<div class="alert-message" data-alert><a class="close" href="#">×</a><p></p></div>');
	var cam_url_prefix = 'http://uk.jokkmokk.jp/photo/nr';
	var cam_url_suffix = '/latest.jpg';
	var tromso_url = 'http://jokkmokkmobile.appspot.com/tromso';
	var tromso_img_url_prefix = 'http://polaris.nipr.ac.jp/~acaurora/aurora/Tromso/html/';
	var img_regexp = /[0-9]+s\.jpg$/;

	var loadCams = function() {
		$main.empty().removeClass('cams tromso').addClass('cams');
		for(var i = 1; i <= 5; i++) {
			var url = cam_url_prefix+i+cam_url_suffix;
			var $elem = $campreview.clone();
			$elem.find('img').attr('src', url);
			$elem.find('h1').text('Cam '+i);
			$elem.attr('id', 'cam'+i);
			$elem.appendTo($main);
		}
	}

	var format_date = function(date) {
		var year = date.substr(0,4);
		var month = date.substr(4,2);
		var day = date.substr(6,2);
		var hour = date.substr(8,2);
		var minute = date.substr(10,2);
		return day+"."+month+"."+year+" "+hour+":"+minute;
	}

	var loadTromso = function() {
		$main.empty().removeClass('cams tromso').addClass('tromso');
		$.get(tromso_url)
			.success(function(data) {
				var $imgs = $(data).find('table table[border=3] img').filter(function(idx) {
					return img_regexp.test($(this).attr('src'));
				}).each(function(idx, img) {
					var src = $(img).attr('src');
					$('<div>')
					.append($('<h3>').text(format_date(""+img_regexp.exec(src))))
					.append($('<img>').attr('src', tromso_img_url_prefix+src))
					.appendTo($main);
				});
			})
			.error(function(msg) {
				$popup.clone().addClass('error').appendTo($main).find('p').text('Oh noes! It failed!');
			});
	}

	loadCams();
	// loadTromso();
	$('#cams').click(loadCams);
	$('#tromso').click(loadTromso);
})(jQuery);

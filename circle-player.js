(function ( $ ) {
	
	var audios = [];
	
	$.fn.CirclePlayer = function(url) {
		var audio = document.createElement('audio');
		audio.src = url;
		audios.push(audio);
		
		var isPlaying = false;
		
		var playbtn = $('<i class="fa fa-play"></i>');
		var container = $('<div class="cp-container"></div>');
		var background = $('<div class="cp-background"></div>');
		var border = $('<div class="cp-border"></div>');
		var lessthanhalf = $('<div class="cp-less-than-half"></div>');
		var morethanhalf = $('<div class="cp-more-than-half"></div>');
		var fill = $('<div class="cp-fill"></div>');
		container.append(background).append(border).append(lessthanhalf).append(morethanhalf).append(fill).append(playbtn);
		$(this).append(container);
		
		
		fill.on('click',function(e) {
			if(isPlaying){
				audio.pause();
			} else {
				audio.play();
			}
		});
		
		var step = setInterval(function() {
			var deg = (audio.currentTime/audio.duration)*360;
			border.css('transform','rotate('+deg+'deg)');
			if(deg > 180) {
				morethanhalf.show();
				lessthanhalf.hide();
			} else {
				morethanhalf.hide();
				lessthanhalf.show();
			}
		}, 100);
		
		
		function borderClick(e) {
			if(e.offsetX > 25) {
				audio.currentTime = Math.atan2(e.offsetX-25,25-e.offsetY)/(2*Math.PI)*audio.duration;
			} else {
				audio.currentTime = (Math.atan2(e.offsetX-25,25-e.offsetY)/(2*Math.PI)+1)*audio.duration;
			}
		}
		background.on('click',borderClick);
		
		
		function onPlay() {
			for(var i in audios){
				if(audios[i] != audio){
					audios[i].pause();
				}
			}
			isPlaying = true;
			playbtn
				.removeClass('fa-play')
				.addClass('fa-pause')
				.removeClass('fa-spinner')
				.removeClass('fa-pulse');
		}
		audio.addEventListener('play', onPlay, false);
		audio.addEventListener('playing', onPlay, false);
		audio.addEventListener('pause', function() {
			isPlaying = false;
			playbtn
				.addClass('fa-play')
				.removeClass('fa-pause')
				.removeClass('fa-spinner')
				.removeClass('fa-pulse');
		}, false);
		audio.addEventListener('waiting', function() {
			isPlaying = false;
			playbtn
				.removeClass('fa-play')
				.removeClass('fa-pause')
				.addClass('fa-spinner')
				.addClass('fa-pulse');
		}, false);
	};

}( jQuery ));

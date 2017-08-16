require([
  'gitbook',
  'jquery'
], function (gitbook,$) {
	debugger
	$(document.body).on('click','.mermaid-container .fa',function(){
		$(this).siblings().toggle();
	});
	gitbook.events.bind('page.change', function () {
		$('.lang-mermaid').each(function(item){
			$(this).after(mermaidAPI.render(this.innerText)).hide();
		})
		.removeClass('lang-mermaid')
		.parent()
		.addClass('mermaid-container')
		.append('<i class="fa fa-file-text-o" aria-hidden="true"></i>');
	});
});
require([
  'gitbook',
  'jquery'
], function (gitbook,$) {
	debugger
	$(document.body).on('click','.mermaid-container i.fa',function(){
		$(this).parent().siblings('svg,pre').toggle();
	});
	var id = 0;
	gitbook.events.bind('page.change', function () {
		$('.lang-mermaid',gitbook.state.$book).each(function(item){
			var $container = $('<div class=mermaid-container ></div>');
			var svg = mermaidAPI.render('mermaid-id-'+id++,this.innerText);
			var href =  URL.createObjectURL(new Blob([ svg ],{type:'image/svg+xml'}))
			$(this).parent().after($container);
			$container.append(svg);
			$container.append('<div class=mermaid-tool ><i class="fa fa-file-text-o" aria-hidden="true"></i> <a href="' + href + '" target=_blank class="fa fa-eye"></a></div>');
			$container.append($(this).parent().hide());
		});

		$('a[href$=".mermaid"]',gitbook.state.$book).each(function(){
			var $this = $(this);
			$.get(this.href,(text)=>{
				var $container = $('<div class=mermaid-container ></div>');
				var svg = mermaidAPI.render('mermaid-id-'+id++,text);
				var href =  URL.createObjectURL(new Blob([ svg ],{type:'image/svg+xml'}))
				$this.after($container);
				$container.append(svg);
				$container.append('<div class=mermaid-tool ><i class="fa fa-file-text-o" aria-hidden="true"></i> <a href="' + href + '" target=_blank class="fa fa-eye"></a></div>');
			});
		});
	});
});
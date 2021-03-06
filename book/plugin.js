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
		mermaidAPI.getConfig().gantt.axisFormatter = [
			["%I:%M", function(t) {
				return t.getHours()
			}
			], ["%a %d", function(t) {
				return t.getDay() && 1 != t.getDate()
			}
			], ["%b %d", function(t) {
				return 1 != t.getDate()
			}
			], ["%m-%y", function(t) {
				return t.getMonth()
			}
			]];

		var render = function($container,text){
			var svg = mermaidAPI.render('mermaid-id-'+id++,text);
			var href =  URL.createObjectURL(new Blob([ svg ],{type:'image/svg+xml'}))
			$container.append(svg);
			$container.append('<div class=mermaid-tool ><i class="fa fa-file-text-o" aria-hidden="true"></i> <a href="' + href + '" target=_blank class="fa fa-eye"></a> <a href="' + href + '" download="mermaid.svg" target=_blank class="fa fa-download"></a> </div>');
		};

		$('.lang-mermaid',gitbook.state.$book).each(function(item){
			var $container = $('<div class=mermaid-container ></div>');
			$(this).parent().after($container);
			$container.append($(this).parent().hide());
			render($container,this.innerText);
		});

		$('a[href$=".mermaid"]',gitbook.state.$book).each(function(){
			var $this = $(this);
			$.get(this.href,(text)=>{
				var $container = $('<div class=mermaid-container ></div>');
				$this.after($container);
				render($container,text);
			});
		});
	});
});
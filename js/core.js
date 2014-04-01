$(function(){
	var $switchLayout = $('#switch-layout'),
		$main = $('#main'),
		str = '',
		tmpl = _.template( $('#layout-item').html() ),
		styles = [
			{
				'cls': 'style0',
				'desc': '宽度自适应',
				'layout': '自适应'
			},
				{
				'cls': 'style1',
				'desc': '固定宽度自适应',
				'layout': '固定居中'
			},
			{
				'cls': 'style2',
				'desc': '主体先出现 - 左侧固定右侧自适应',
				'layout': '固定 自适应'
			},
			{
				'cls': 'style3',
				'desc': '主体先出现 - 右侧固定左侧自适应',
				'layout': '自适应 固定'
			},
			{
				'cls': 'style4',
				'desc': '三栏等高',
				'layout': '等高  等高 等高'
			},
			{
				'cls': 'style5',
				'desc': '三栏左右固定 中间自适应',
				'layout': '固定 自适应 固定'
			},
			{
				'cls': 'style6',
				'desc': '左两栏固定右侧自适应',
				'layout': '定 固定 自适应'
			},
			{
				'cls': 'style7',
				'desc': '左侧适应右两栏固定',
				'layout': '适应 固定 固定 '
			},
			{
				'cls': 'style8',
				'desc': '中间固定左右自适应A',
				'layout': '自适应 固定 自适应'
			},
			{
				'cls': 'style9',
				'desc': '中间固定左右自适应B',
				'layout': '自适应 固定 自适应'
			},
			{
				'cls': 'style10',
				'desc': '左侧固定 右两栏自适应',
				'layout': '固定 自适应 自适应'
			},
			{
				'cls': 'style11',
				'desc': '右侧固定 左两栏自适应',
				'layout': ' 自适应 自适应 固定'
			}
		];
	$.each(styles, function(i, s){
		str += tmpl({
			item : s,
			index: i
		});
	});

	$switchLayout.html(str).on('click', '.btn', function(){
		var $this = $(this),
			cls = $this.parents('li').data('cls');

		$switchLayout.find('.btn-success').removeClass('btn-success');
		$this.addClass('btn-success');
		$main.removeClass().addClass(cls);

	}).find('li:first').find('span').addClass('btn-success');
});

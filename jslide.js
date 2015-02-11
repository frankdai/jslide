(function($) {
    $.jslide = function(element, options) {
        var defaults = {
            'number': 4,
            'time': 600,
            onMovingLeft: function () {console.log('left')},
            onMovingRight: function () {console.log('right')},
            'CSSTransition':false,
            'animationType': 'ease-in-out',
        }
        var plugin = this;
        plugin.settings = $.extend({}, defaults, options);
        var $element = $(element),
             element = element;
        var left=$element.find('.jslide-control.left');
        var right=$element.find('.jslide-control.right');
        var container=$element.find('.jslide-container');
        var items=$element.find('.jslide-item');
        var outside=$element.find('.jslide-outside');
        var moving;
        plugin.init = function() {
            var paddingLeft=left.width();
            var paddingRight=right.width();
            var text='right '+plugin.settings.time+'ms '+plugin.settings.animationType;
            $element.css({'padding-left':paddingLeft,'padding-right':paddingRight});
            moving=outside.width();
            items.css('width',moving/plugin.settings.number);
            console.log((Math.ceil(items.length/plugin.settings.number)))
            container.css({'width':moving*(Math.ceil(items.length/plugin.settings.number)),'position':'relative','right':0});
            if (plugin.settings.CSSTransition) {
                container[0].style.webkitTransition=text;
                container[0].style.mozTransition=text;
                container[0].style.transition=text;
            }
        }
        plugin.move = function(direction) {
            var step,callback;
            if (direction==='left') {
                step=parseInt(container.css('right'))+moving;
                callback=plugin.settings.onMovingLeft;
            }
            else if (direction==='right') {
                step=parseInt(container.css('right'))-moving;
                callback=plugin.settings.onMovingRight;
            }
            if (plugin.settings.CSSTransition) {
                container.css('right',step);
                callback();
            }
            else {
                container.animate({'right':step},plugin.settings.time,callback);
            }
            
        }
        plugin.init();
        $(window).resize(plugin.init);
        var event=function(){
            if (right&&left) {
                    right.click(function(){
                        if (container.width()-parseInt(container.css('right'))>moving) {
                            plugin.move('left');
                        }
                        else {
                             //$(this).removeClass('nomore')
                        }
                    })
                    left.click(function(){
                        if (parseInt(container.css('right'))>0) {
                            plugin.move('right');
                            //$(this).removeClass('nomore')
                        }
                        else  {
                            //$(this).addClass('nomore')
                        }     
                })
            } 
        }
        event();
    }

    $.fn.jslide = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('jslide')) {
                var plugin = new $.jslide(this, options);
                $(this).data('jslide', plugin);
            }
        });
    }
})(jQuery);
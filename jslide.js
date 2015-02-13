(function($) {
    var Jslide = function(element, options) {
        var defaults = {
            'number': 4,
            'time': 600,
            onMovingLeft: function () {},
            onMovingRight: function () {},
            'CSSTransition':false,
            'animationType': 'ease-in-out',
            'controlLeft':$(element).find('.jslide-control.left'),
            'controlRight':$(element).find('.jslide-control.right'),
            'controlEvent':'click',
        }
        var plugin = this;
        plugin.settings = $.extend({}, defaults, options);
        var $element = $(element),
             element = element;
        var left=plugin.settings.controlLeft;
        var right=plugin.settings.controlRight;
        var container=$element.find('.jslide-container');
        var items=$element.find('.jslide-item');
        var outside=$element.find('.jslide-outside');
        var moving;
        var checkEnd=function(){
            if (parseInt(container.css('right'))==0) {
                left.addClass('nomore');
            }
            else if (container.width()-parseInt(container.css('right'))<=moving) {
                right.addClass('nomore');
            }
        }
        plugin.init = function() {
            var paddingLeft=left.width()||0;
            var paddingRight=right.width()||0;
            var text='right '+plugin.settings.time+'ms '+plugin.settings.animationType;
            if (left.hasClass('jslide-control') && right.hasClass('jslide-control')) {
                $element.css({'padding-left':paddingLeft,'padding-right':paddingRight});
            }
            moving=outside.width();
            items.css('width',moving/plugin.settings.number);
            container.css({'width':moving*(Math.ceil(items.length/plugin.settings.number)),'position':'relative','right':0});
            if (plugin.settings.CSSTransition) {
                container[0].style.webkitTransition=text;
                container[0].style.mozTransition=text;
                container[0].style.transition=text;
            }
        }
        plugin.move = function(direction) {
            var step,callback;
            if (direction==='left' && container.width()-parseInt(container.css('right'))>moving) {
                step=parseInt(container.css('right'))+moving;
                callback=plugin.settings.onMovingLeft;
                left.removeClass('nomore');
                if (plugin.settings.CSSTransition) {
                    container.css('right',step);
                    window.setTimeout(callback,plugin.settings.time+100)
                }
                else {
                    container.animate({'right':step},plugin.settings.time,callback);
                }
                window.setTimeout(checkEnd,plugin.settings.time+100);
            }
            else if (direction==='right' && parseInt(container.css('right'))>=moving) {
                step=parseInt(container.css('right'))-moving;
                callback=plugin.settings.onMovingRight;
                right.removeClass('nomore');
                if (plugin.settings.CSSTransition) {
                    container.css('right',step);
                    window.setTimeout(callback,plugin.settings.time+100)
                }
                else {
                    container.animate({'right':step},plugin.settings.time,callback);
                }
                window.setTimeout(checkEnd,plugin.settings.time+100);
            }
        }
        plugin.init();
        var event=function(){
            var startX,endX;
            if (right&&left) {
                    right.on(plugin.settings.controlEvent,function(){plugin.move('left')});
                    left.on(plugin.settings.controlEvent,function(){plugin.move('right')});
                }
            container.on('swipeLeft',function(){plugin.move('left')}).on('swipeRight',function(){plugin.move('right')}); 
            container[0].addEventListener('touchstart',function(event){
                startX=event.changedTouches[0].clientX;
                },false)
            container[0].addEventListener('touchend',function(event){
                endX=event.changedTouches[0].clientX;
                if (startX-endX>0) {
                        $(this).trigger('swipeLeft');
                    }
                else {
                        $(this).trigger('swipeRight')
                    }
                },false)
            }
        event();
    }

    $.fn.jSlide = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('jslide')) {
                var plugin = new Jslide(this, options);
                $(this).data('jslide', plugin);
            }
        });
    }
})(jQuery);
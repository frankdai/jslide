(function($) {
    $.jslide = function(element, options) {
        var defaults = {
            'number': 4,
            'time': 600,
            onMovingLeft: function () {},
            onMovingRight: function () {},
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
            var paddingLeft=left.width()||0;
            var paddingRight=right.width()||0;
            var text='right '+plugin.settings.time+'ms '+plugin.settings.animationType;
            $element.css({'padding-left':paddingLeft,'padding-right':paddingRight});
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
                //container[0].addEventListener("transitionend", function(){console.log('hello')} , false);
                window.setTimeout(callback,plugin.settings.time+100)
            }
            else {
                container.animate({'right':step},plugin.settings.time,callback);
            }
            
        }
        plugin.init();
        //$(window).resize(plugin.init);
        var checkEnd=function(){
            if (parseInt(container.css('right'))==0) {
                left.addClass('nomore');
            }
            else if (container.width()-parseInt(container.css('right'))<=moving) {
                right.addClass('nomore');
            }
        }
        var event=function(){
            var startX,endX;
            var rightFunc=function(){
                        if (container.width()-parseInt(container.css('right'))>moving) {
                            plugin.move('left');
                            left.removeClass('nomore');
                            window.setTimeout(checkEnd,plugin.settings.time+100);
                        }
                    }
            var leftFunc=function(){
                        if (parseInt(container.css('right'))>=moving) {
                            plugin.move('right');
                            right.removeClass('nomore');
                            window.setTimeout(checkEnd,plugin.settings.time+100);
                        }
                    }
            if (right&&left) {
                    right.click(rightFunc);
                    left.click(leftFunc);
                }
            container.on('swipeLeft',rightFunc).on('swipeRight',leftFunc); 
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
                var plugin = new $.jslide(this, options);
                $(this).data('jslide', plugin);
            }
        });
    }
})(jQuery);
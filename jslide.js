(function($) {
    $.jslide = function(element, options) {
        var defaults = {
            number: 4
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
            $element.css({'padding-left':paddingLeft,'padding-right':paddingRight});
            moving=outside.width();
            items.css('width',moving/plugin.settings.number);
            container.css('width',moving/plugin.settings.number*items.length)
        }
        var moveLeft = function() {
            alert('yes');
        }
        var moveRight = function(){
            alert();
        }
        plugin.init();
        window.addEventListener('resize',plugin.init,false);
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
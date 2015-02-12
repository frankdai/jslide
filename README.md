# jSlide: Responsive & Touch-Enabled jQuery Carousel Plugin

Feature:

 * Easy to set up. Minimum markup and essential CSS styles.
 * Responsive design.
 * Touch-Enabled on mobile device. Swipe left or right for sliding.
 * API for customized control


This is not a slideshow plugin so there is no automatic sliding enabled. 

To use this plugin, simply add the js file after jQuery library. The HTML markup is like this:

```html
<div class="jslide">
	<div class="jslide-control left nomore">&lt;</div>
	<div class="jslide-control right">&gt;</div>
	<div class="jslide-outside">
		<div class="jslide-container">
			<div class="jslide-item"></div>
			<div class="jslide-item"></div>
			<div class="jslide-item"></div>
		</div>
	</div>
</div>
```
The markup element tagname is not relevant to this plugin so you can use ol li section tagname instead. The plugin will swap 'nomore' class when the carousel run into left and right end for better styling and user experience. 

After the markup and CSS rules, you can invoke the function:

```javascript
var jslide=$('.jslide').jSlide()
```

## Options

| Options | Type | Explaination | Default Value |
| ------- | :--: |------------ | :-------------: |
| number|number|Number of items to show in single slide|4|
| time | number|Time of the sliding animation in milliesconds| 600|
|CSSTransition|boolean|Use CSS3 transition to acheive animation|false|
|animationType|string|[CSS3 transition function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)|ease-in-out|
|onMovingLeft|function|function to invoke when the slide moving left|empty function|
|onMovingRight|function|function to invoke when the slide moving right |empty function|

## API
```javascript
jslide.data('jslide').move('left') //move the slide to left
jslide.data('jslide').move('right') //move the slide to right
jslide.data('jslide').init() //re-initialize the plugin when dimension of wrapper 'jslide' class is changed, such during an 'resize' or 'oritentationchange' event
```

## Customization
### Customize With Style
The only necessary CSS style are followed:

```CSS
.jslide-outside {
    overflow:hidden;
}
.jslide-item {
    float: left;
    box-sizing:border-box;
}
.jslide-container {
    box-sizing:border-box;
}
.jslide-container::after {
    content:" ";
    display: block;
    visibility:hidden;
    width:0;
    height:0;
    clear:both;
}
```
If you want use built-in control, please add this to the CSS:
```CSS
.jslide {
    position:relative;
}
.jslide-control { 
    position:absolute;
}
.jslide-control.left {
    left:0;
}
.jslide-control.right {
    right:0;
}
```

Please place your actual content inside the jslide-item container and set margin/padding accrodingly. Please do not set margin on the item container itself. 

### Customize The Controls
The two jslide-control class elements are optional. You can simply remove them from markup if you want to hide the left/right control, as in mobile device you can swipe left and right.

If you want to use your customized controls ,please place them outside of this markup region and use above-mentioned API for control the slide. Please use your own logic for controlling like stop the slide and add/remove control class when it reach the end.
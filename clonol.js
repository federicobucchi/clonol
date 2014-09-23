(function($){

  $.clonol = function(origin, destination) {
    var newDestination = origin.clone().appendTo(destination);
    var originElements = origin.find('*');
    var destinationElements = newDestination.find('*');

    newDestination.applyStyle(origin);

    destinationElements.each(function(index, element){
      var destinationElement = $(element);
      var originElement = $(originElements.get(index));
      destinationElement.applyStyle(originElement);
    });
  }

  $.fn.getElStyle = function(only, except) {
    var el = {};
    var style;
    var name;

    if (only && only instanceof Array) {

      for (var i = 0, l = only.length; i < l; i++) {
        name = only[i];
        el[name] = this.css(name);
      }

    } else {

      if (this.length) {
        var domEl = this.get(0);

        if (window.getComputedStyle) {
          var patternReg = /\-([a-z])/g;
          var upperCase = function (a, b) { return b.toUpperCase(); }
          var camelCase = function(string){
            return string.replace(patternReg, upperCase);
          }

          if (style = window.getComputedStyle(domEl, null)) {
            var camel, value;

            if (style.length) {

              for (var i = 0, l = style.length; i < l; i++) {
                name = style[i];
                camel = camelCase(name);
                value = style.getPropertyValue(name);
                el[camel] = value;
              }

            } else {

              for (name in style) {
                camel = camelCase(name);
                value = style.getPropertyValue(name) || style[name];
                el[camel] = value;
              }

            }
          }
        }

        else if (style = domEl.currentStyle) {

          for (name in style) {
            el[name] = style[name];
          }

        }

        else if (style = domEl.style) {

          for (name in style) {

            if (typeof style[name] != 'function') {
              el[name] = style[name];
            }

          }
        }
      }

    }

    if (except && except instanceof Array) {

      for (var i = 0, l = except.length; i < l; i++) {
        name = except[i];
        delete el[name];
      }

    }

    return el;
  };

  $.fn.applyStyle = function(el, only, except) {
    var style = $(el).getElStyle(only, except);

    this.css(style);

    return this;
  };

})(jQuery);
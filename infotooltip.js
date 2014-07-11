// Generated by CoffeeScript 1.7.1
(function() {
  var $body, $doc, $window, InfoTooltip, pos, tooltip,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $doc = $(document);

  $window = $(window);

  $body = $('body');

  pos = {
    left: 0,
    top: 0,
    center: 0.5,
    bottom: 1,
    right: 1,
    get: function(p) {
      var r;
      if ((r = this[p]) != null) {
        return r;
      }
      if (~p.indexOf('%')) {
        return parseInt(p) / 100;
      }
    }
  };

  InfoTooltip = (function() {
    function InfoTooltip() {
      this._mouseenter = __bind(this._mouseenter, this);
      this.tooltipPosition = __bind(this.tooltipPosition, this);
      this.showTooltip = __bind(this.showTooltip, this);
      this.hideTooltip = __bind(this.hideTooltip, this);
      this.init = __bind(this.init, this);
      this.init();
    }

    InfoTooltip.prototype.init = function() {
      $doc = $(document);
      $window = $(window);
      $body = $('body');
      $doc.on('mouseenter', '[data-tooltip-text]', this._mouseenter);
      $doc.on('mouseleave', '[data-tooltip-text]', this.hideTooltip);
      $doc.on('hide-tootlip', this.hideTooltip);
      this.tooltip = $("<div class='general-help-tooltip'>");
      this.interval = null;
      return $body.append(this.tooltip.hide());
    };


    /*
    	Hide tooltip
     */

    InfoTooltip.prototype.hideTooltip = function() {
      clearTimeout(this.interval);
      return this.interval = setTimeout((function(_this) {
        return function() {
          return _this.tooltip.stop(true, true).transition({
            opacity: 0,
            duration: 100
          }, function() {
            _this.tooltip.hide();
            return $window.off('resize', _this.hideTooltip);
          });
        };
      })(this), 150);
    };

    InfoTooltip.prototype.showTooltip = function() {
      var showTooltip, target, text;
      if (this.e.isDefaultPrevented()) {
        return;
      }
      showTooltip = (text = (target = $(this.e.currentTarget)).attr('data-tooltip-text')).length > 0;
      showTooltip && (showTooltip = !target.hasClass('no-tooltip'));
      showTooltip && (showTooltip = !target.attr('data-no-tooltip'));
      if (showTooltip) {
        this.tooltip.html(text);
        $window.on('resize', this.hideTooltip);
        return this.tooltip.show().css({
          opacity: 0
        }).css(this.tooltipPosition(target, target.attr('data-tooltip-position'))).removeClass('center left right bottom top').addClass(this.position).stop(true, true).transition({
          opacity: 1
        });
      }
    };

    InfoTooltip.prototype.tooltipPosition = function(target, position) {
      var h, left, offset, top, v, _ref, _ref1;
      this.target = target != null ? target : this.target;
      this.position = position || this.position || 'center top';
      _ref = this.position.replace(' ', '-').split('-'), h = _ref[0], v = _ref[1];
      _ref1 = {
        h: pos.get(h),
        v: pos.get(v)
      }, h = _ref1.h, v = _ref1.v;
      offset = target.offset();
      top = offset.top + target.outerHeight() * v - this.tooltip.outerHeight(false) * (1 - v);
      left = offset.left + target.outerWidth() * h - this.tooltip.outerWidth(false) * (1 - h);
      return {
        top: top,
        left: left
      };
    };


    /*
    	Trigger the showTooltip on mouse enter
     */

    InfoTooltip.prototype._mouseenter = function(e) {
      this.e = e;
      clearTimeout(this.interval);
      return this.interval = setTimeout(this.showTooltip, 150);
    };

    return InfoTooltip;

  })();

  tooltip = new InfoTooltip;

  $(tooltip.init);

}).call(this);

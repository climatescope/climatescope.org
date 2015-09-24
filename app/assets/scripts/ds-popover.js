/**
 * All purpose popover.
 * Positioned absolutely according to an anchor point.
 *
 * Usage:
 *  popover.setContent(content)
 *  popover.show(posX, posY);
 *  popover.hide();
 *
 */
 function DSPopover() {
  var _id = 'ds-popover-' + (++DSPopover.uniqueId);
  var $popover = null;
  var _working = false;
  var _content = null;
  var _x = null;
  var _y = null;
  // Previous values. Used to know if we need to reposition or update
  // the popover.
  var _prev_content = null;
  var _prev_x = null;
  var _prev_y = null;

  /**
   * Sets the popover content.
   * 
   * @param ReactElement
   * Content for the popover. Can be anything supported by react. 
   */
  this.setContent = function(content, classes) {
    classes = 'tooltip-map tooltip-chart' + (classes ? ' ' + classes : '');
    _prev_content = _content;

    _content = '<div id="' + _id + '" class="' + classes + '">';
      _content += '<div class="tooltip-inner">';
        _content += content;
      _content += '</div>';
    _content += '</div>';

    return this;
  }

  /**
   * Appends the popover to #site-canvas positioning it absolutely
   * at the specified coordinates. 
   * If the popover already exists it will be repositioned.
   * The anchor point for the popover is the bottom center with 8px of offset.
   *
   * Note: The popover needs to have content before being shown.
   * 
   * @param  anchorX
   *   Where to position the popover horizontally.
   * @param  anchorY
   *   Where to position the popover vertically.
   */
  this.show = function(anchorX, anchorY) {
    _prev_x = _x;
    _prev_y = _y;
    _x = anchorX;
    _y = anchorY;

    if (_working) return;

    if (_content === null) {
      console.warn('Content must be set before showing the popover.');
      return this;
    }

    var changePos = !(_prev_x == _x && _prev_y == _y);

    // Different content?
    if (_content != _prev_content) {
      $popover = $('#' + _id);
      if ($popover.length > 0) {
        $popover.replaceWith(_content);
      }
      else {
        $popover = $(_content);
        $('#site-canvas').append($popover);
      }
      // With a change in content, position has to change.
      changePos = true;
    }

    if (changePos) {
      _working = true;
      $popover = $('#' + _id);
      // Set position on next tick.
      // Otherwise the popover has no spatiality.
      setTimeout(function() {
        var containerW = $('#site-canvas').outerWidth();
        var sizeW = $popover.outerWidth();
        var sizeH = $popover.outerHeight();

        var leftOffset = anchorX  - sizeW / 2;
        var topOffset = anchorY - sizeH - 8;

        // If the popover would be to appear outside the window on the right
        // move it to the left by that amount.
        // And add some padding.
        var overflowR = (leftOffset + sizeW) - containerW ;
        if (overflowR > 0) {
          leftOffset -= overflowR + 16;
        }

        // Same for the left side.
        if (leftOffset < 0) {
          leftOffset = 16;
        }

        $popover
        .css('left', leftOffset + 'px')
        .css('top', topOffset + 'px')
        .show();

        _working = false;
      }, 1);
    }

    return this;
  }

  /**
   * Removes the popover from the DOM.
   */
  this.hide = function() {
    $('#' + _id).remove();
    _content = null;
    _prev_content = null;
    _x = null;
    _y = null;
    _prev_x = null;
    _prev_y = null;
    return this;
  }

  return this;
};

DSPopover.uniqueId = 0;
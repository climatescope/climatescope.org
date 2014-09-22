/**
 * Common methods used in the table related controllers.
 * Modifies the scope object
 * @param {Object} scope
 */
function setupCommonTableMethods(scope) {
  // Sort default.
  scope.sortField = 'score';
  scope.sortReverse = true;
  
  scope.setSort = function(field) {
    scope.sortField = field;
    scope.sortReverse = !scope.sortReverse;
  };
  
  scope.checkSortClasses = function(field) {
    if (scope.sortField != field) {
      return 'sort-none';
    }
    if (scope.sortReverse === true) {
      return 'sort-desc';
    }
    else {
      return 'sort-asc';
    }
  };
  
  /**
   * Calc the bar segment.
   * Can provide a parameter object with value and weight
   * or
   * 1st param is value
   * 2nd param is weight.
   */
  scope.calcBarSegment = function(param, weight) {
    weight = weight || null;
    var v, w;
    if (typeof param == 'object') {
      v = param.value;
      w = param.weight;
    }
    else {
      v = param;
      w = weight;
    }
    return ( v * w * (100/5) ) + '%';
  };
  
  scope.getTranslatedUrl = function(subject, id) {
    switch(subject) {
      case 'country':
        return (CS.countryIndex) ? CS.countryIndex[id] : '';
      break;
      case 'state':
        return (CS.stateIndex) ? CS.stateIndex[id] : '';
      break;
      case 'parameter':
        return (CS.parameterIndex) ? CS.parameterIndex[id] : '';
      break;
      default:
        return '';
      break;
    }
  };
  
  scope.getTooltipContent = function(params) {
    var t = '<dl class="params-legend">';
    angular.forEach(params, function(param) {
      var className = 'param-' + param.id;
      t += '<dt class="' + className + '">';
      t += param.name;
      t += '</dt>';
      t += '<dd>';
      t += round(param.value, 2);
      t += '<small>';
      // 0.29 * 100 = 28.999999999999
      // Round to solve the problem.
      t += round(param.weight * 100, 2) + '%';
      t += '</small>';
      t += '</dd>';
    });
    t += '</dl>';
    
    return t;
  };
};

/**
 * Common methods used in the parameter Details table
 * Modifies the scope object
 * @param {Object} scope
 */
function setupCommonParamDetailTableMethods(scope) {
  scope.getParamUrl = function(param) {
    return scope.getTranslatedUrl('parameter', param.id);
  };
  
  scope.getTooltipContent = function(ind) {
    return [
      '<h6>' + ind.name + '</h6>',
      '<p>Parameter description will go here.</p>'
    ].join('');
  };
}
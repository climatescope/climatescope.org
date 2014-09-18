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
  
  scope.calcBarSegment = function(param) {
    weight = param.weight != null ? param.weight : 0.25;
    return ( param.value * weight * (100/5) ) + '%';
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
function setupCommonCountryListMethods(scope) {
  setupCommonTableMethods(scope);

  scope.calcBarSegment = function(param) {
    weight = param.weight != null ? param.weight : 0.25;
    return ( param.value * weight * (100/5) ) + '%';
  };
  
  scope.getCountryUrl = function(country) {
    var iso = country.iso.toLowerCase();
    return scope.getTranslatedUrl('country', iso);
  };
  
  scope.getStateUrl = function(state) {
    var iso = state.iso.toLowerCase();
    return scope.getTranslatedUrl('state', iso);
  };

  scope.toggleStates = function($event) {
    var tbody = jQuery($event.target).closest('tbody');
    var statesRow = tbody.find('.country-states');
    if (statesRow.is(':hidden')) {
      tbody.addClass('open');
      statesRow.trSlideDown();
    }
    else {
      tbody.removeClass('open');
      statesRow.trSlideUp();
    }
  };
}

/**
 * Common methods used in the table related controllers.
 * Modifies the scope object
 * @param {Object} scope
 */
function setupCommonTableMethods(scope) {
  // Sort default.
  scope.sortField = null;
  scope.sortReverse = false;
  scope.sortExpression = [];
  // Score sort field for when we're using a sort expression.
  scope.sortExpScoreField = null;
  
  scope.setSort = function(field) {
    scope.sortField = field;
    scope.sortReverse = !scope.sortReverse;
  };
  
  scope.setSortExpression = function(field) {
    // Set normal sort.
    scope.setSort(field);
    var expr = scope.sortField;
    if (scope.sortReverse) {
      expr = '-' + expr;
    }
    scope.sortExpression = [expr, scope.sortExpScoreField];
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
  setupCommonTableMethods(scope);

  scope.getParamUrl = function(param) {
    return scope.getTranslatedUrl('parameter', param.id);
  };
  
  scope.getTooltipContent = function(ind) {
    return [
      '<h6>' + ind.name + '</h6>',
      '<p>' + ind.description + '</p>'
    ].join('');
  };

  scope.toggleTable = function(id, e) {
    var $section = $('.param-' + id);
    var $tableWrapper = $('.table-wrapper', $section);
    var $table = $('table', $section);

    // First run.
    if ($tableWrapper.data('visible') === undefined) {
      $tableWrapper.data('visible', false);
      $tableWrapper.data('orig_max_height', $tableWrapper.css('max-height'));
    }

    var maxHeight = $tableWrapper.data('visible') ? $tableWrapper.data('orig_max_height') : $table.height();

    $tableWrapper.animate({
      'max-height': maxHeight
    });

    $tableWrapper.data('visible', !$tableWrapper.data('visible'));

    var text = $tableWrapper.data('visible') ? CS.t('View less') : CS.t('View more');
    e.target.text = text;
    e.target.setAttribute('title', text)
  };
}
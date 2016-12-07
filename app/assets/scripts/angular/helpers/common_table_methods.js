function setupCommonCountryListMethods(scope) {
  setupCommonTableMethods(scope);

  scope.calcBarSegment = function(param) {
    weight = param.weight != null ? param.weight : 0.25;
    return ( param.data[0].value * weight * (100/5) ) + '%';
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

  // The trendline data needs to be computed.
  // Using a function and returning data in chart-data will result in a
  // infinite digest loop because the chart directive will watch for changes,
  // and the value is returned by the function is not bound to the scope.
  scope.computeTrendlineData = function(country) {
    // Calculate the y domain across all countries.
    var allValues = [];
    $.each(scope.countries, function (i, country) {
      $.each(country.score, function (i, score) {
        allValues.push(score.value);
      })
    });

    // Compute the global y domain.
    var ymin = d3.min(allValues);
    var ymax = d3.max(allValues);
    // Give the domain some margin.
    ymin -= ((ymax - ymin) * 0.1);
    ymax += ((ymax - ymin) * 0.1);

    country.trendline = {
      id: country.iso,
      globalY: {
        min: ymin,
        max: ymax,
      },
      data: country.score
    };
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
      t += formatThousands(param.data[0].value, 2);
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

  scope.toggleExpandable = function(target, e) {
    var $target = $(target);
    var $targetInner = $('.expandable-wrapper', $target);

    // First run.
    if ($target.data('visible') === undefined) {
      $target.data('visible', false);
      $target.data('orig_max_height', $target.css('max-height'));
    }

    if ($target.data('visible')) {
      $target.removeClass('revealed');
    }
    else {
      $target.addClass('revealed');
    }

    var maxHeight = $target.data('visible') ? $target.data('orig_max_height') : $targetInner.height();

    $target.animate({
      'max-height': maxHeight,
    });

    $target.data('visible', !$target.data('visible'));

    var text = $target.data('visible') ? CS.t('View less') : CS.t('View more');
    e.target.text = text;
    e.target.setAttribute('title', text);
  };
};

function setupPolicyStatsVizMethods(scope) {
  scope.policyCount = 0;
  scope.pMechanisms = [
    { count: 0, id: 'Energy Market Mechanism', name: 'Energy Market' },
    { count: 0, id: 'Equity Finance Mechanism', name: 'Equity Finance' },
    { count: 0, id: 'Carbon Market Mechanism', name: 'Carbon Market' },
    { count: 0, id: 'Debt Finance Mechanism', name: 'Debt Finance' },
    { count: 0, id: 'Tax-based Mechanism', name: 'Tax-based' },
    { count: 0, id: 'unknown', name: 'Policy Barrier' }
  ];

  scope.countPolicyTypes = function(policyList) {
    $.each(policyList, function(i, policy) {
      if (policy.type === null || policy.status.name == 'Expired') {
        return;
      }

      $.each(policy.type.mechanism, function(ii, mechanism) {
        for (var i in scope.pMechanisms) {
          if (scope.pMechanisms[i].id == mechanism.name) {
            scope.pMechanisms[i].count++;
            break;
          }
        }
      });
    });
  }
};
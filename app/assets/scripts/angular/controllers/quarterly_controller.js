(function() {
  var app = angular.module('quarterlyApp', ['ngRoute', 'ui.bootstrap'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });

  app.controller('quarterlyController', ['$http', '$filter', '$rootScope', '$scope', '$location',
  function($http, $filter, $rootScope, $scope, $location) {
    var _self = this;

    var _perPage = 4;
    var _curPage = 1;
    var _allPosts = [];
    var _totalPages = 0;

    this.posts = [];

    // When switching languages the url must be changed to include the page no.
    var updateLangSwitcherUrl = function() {
      $('.lang-menu a').each(function() {
        var url;
        // If the original url is set return it.
        if ($(this).data('orig_href')) {
          url = $(this).data('orig_href');
        }
        // Otherwise store it and return the href value.
        else {
          url = $(this).attr('href');
          $(this).data('orig_href', url);
        }
        url += '#?page=' + _curPage;
        $(this).attr('href', url);
      });
    };

    var computePosts = function() {
      var start = (_curPage - 1) * _perPage;
      _self.posts = _allPosts.slice(start, start + _perPage);
    }

    this.isControlDisabled = function(which) {
      switch(which) {
        case 'prev':
          return _curPage <= 1;
        break;
        case 'next':
          return _curPage >= _totalPages;
        break;
      }
    }

    this.prev = function() {
      if (this.isControlDisabled('prev')) {
        return;
      }
      _curPage--;
      $location.search({page: _curPage});
      updateLangSwitcherUrl();
      computePosts();
    };

    this.next = function() {
      if (this.isControlDisabled('next')) {
        return;
      }
      _curPage++;
      $location.search({page: _curPage});
      updateLangSwitcherUrl();
      computePosts();
    };

    $http.get(CS.domain + '/' + CS.lang + '/api/quarterly_posts.json').success(function(data) {
      _allPosts = data;
      _totalPages = Math.ceil(_allPosts.length / _perPage);
      console.log(_allPosts)
      computePosts();
    });

    $rootScope.$on('$locationChangeSuccess', function() {
      var qstring = $location.search();
      _curPage = qstring.page || 1;
      updateLangSwitcherUrl();
      computePosts();
    });

  }]);
})(); 
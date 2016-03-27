(function(){
    'use strict';
    angular.module('plotly', [])
    .directive('plotly', function($window) {
      return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
          data: '=',
          graphLayout: '=',
          options: '='
        },
        link: function(scope, element) {
          element = element[0].children[0];
          var initialized = false;
          var init = function() {
            if (initialized)
              return;
            else
              initialized = true;
            Plotly.newPlot(element, scope.data, scope.graphLayout, scope.options);
          }

          scope.$watch(function() {
            return [scope.graphLayout, scope.data];
          }, function() {
            init();
            element.graphLayout = scope.graphLayout;
            element.data = scope.data;
            Plotly.redraw(element);
          }, true);

          var w = angular.element($window);
          scope.getWindowDimensions = function () {
            return {
              'h': w.height(),
              'w': w.width()
            };
          };
          scope.$watch(scope.getWindowDimensions, function () {
            Plotly.Plots.resize(element);
          }, true);
          w.bind('resize', function () {
            scope.$apply();
          });
        }
      };
    });
})();

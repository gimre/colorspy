( function ( ) {
    'use strict';

    angular.module( 'colorspy' ).directive( 'csGui', [

        function ( ) {

            return {
                restrict: 'A',
                controller: 'image-controller',
                replace: true,
                templateUrl: 'views/gui.html',
                scope: {
                    src: '@'
                },
                link: function ( $scope, elem ) {
                    $scope.model.image = elem.find( 'img' )[ 0 ];
                }
            };
            
        }

    ] );

} )( );
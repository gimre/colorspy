( function ( ) {
    'use strict';

    angular.module( 'colorspy' ).controller( 'image-controller', [

        '$scope',
        '$element',
        '$timeout',
        'color-service',
        'utils-service',

        function ( $scope, $element, $timeout, colorService, utils ) {

            $scope.model = {
                colors: [ ],
                total: 0,
                image: $element.find( 'img' )[ 0 ]
            };

            $scope.extractColors = function ( ) {
                if ( !$scope.model.colors.length ) {
                    colorService.extractColors( $scope.model.image ).then( function ( colors ) {
                        var sorted = Object.keys( colors )
                            .sort( utils.descendingByHits.bind( colors ) );

                        $scope.model.total = sorted.reduce( function ( t, c ) {
                            return t + colors[ c ] | 0;
                        }, 0 );

                        console.log( $scope.model.total );

                        $scope.model.colors = sorted
                            .slice( 0, 10 )
                            .map( function ( c ) { return [ c, colors[ c ] | 0 ] } );
                    } );
                }
            };

            $scope.model.image.addEventListener( 'load', $scope.extractColors );

        }

    ] );

} )( );
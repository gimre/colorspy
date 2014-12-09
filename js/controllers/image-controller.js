( function ( ) {
    'use strict';

    angular.module( 'colorspy' ).controller( 'image-controller', [

        '$scope',
        'color-service',
        'utils-service',

        function ( $scope, colorService, utils ) {

            $scope.model = {
                colors: [ ],
                image: null
            };

            $scope.extractColors = function ( ) {
                colorService.extractColors( $scope.model.image ).then( function ( colors ) {
                    //$scope.model.colors = colors;

                    console.log(
                        Object.keys( colors )
                            .sort( utils.descendingByHits.bind( colors ) )
                            .slice( 0, 10 )
                            .map( function ( c ) { return [ c, colors[c] ] } )
                    );
                } );
            };

        }

    ] );

} )( );
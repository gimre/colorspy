( function ( ) {
    'use strict';

    angular.module( 'colorspy' ).filter('percent', ['$filter', function ($filter) {

        return function ( input, decimals, condensed ) {
            var number = $filter( 'number' )( input * 100, decimals | 0 );
            if ( condensed && number < 1 )
                number = '.' + number.split( '.' ).pop( );
            return number + '%';
        };

    } ] );

} )( )
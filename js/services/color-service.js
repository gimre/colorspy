( function ( ) {
    'use strict';

    angular.module( 'colorspy' ).service( 'color-service', [

        '$q',
        'utils-service',

        function ( $q, utils ) {

            return {
                extractColors: function ( image ) {
                    var cores = navigator.hardwareConcurrency || 2,
                        pixels = utils.getImagePixels32( image ),
                        job = $q.defer( );

                    utils.runJobs( cores, pixels, function ( colorData ) {
                        job.resolve( colorData );
                    } );

                    return job.promise;
                }
            };
        }

    ] );

} )( );
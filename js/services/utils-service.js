( function ( d ) {
    'use strict';

    angular.module( 'colorspy' ).service( 'utils-service', [

        function ( ) {

            var service = {
                descendingByHits: function ( k1, k2 ) {
                    return this[ k2 ] - this[ k1 ];
                },

                getImagePixels32: function ( image ) {
                    var backface = d.createElement( 'canvas' ),
                        context  = backface.getContext( '2d' );

                    backface.height = image.height;
                    backface.width  = image.width;
                    context.drawImage( image, 0, 0, image.width, image.height );
                    
                    return new Uint32Array( context.getImageData( 0, 0, backface.width, backface.height ).data.buffer );
                },

                hexToRgb: function ( hex ) {
                    var bigint = parseInt( hex.substring( 1 ), 16 );
                    return {
                        r: ( bigint >> 16 ) & 255,
                        g: ( bigint >> 8 ) & 255,
                        b: bigint & 255
                    };
                },

                mergeMaps: function ( dest, src ) {
                    for ( var c in src ) {
                        dest[ c ]  = ( dest [ c ] || 0 ) + src[ c ];
                    }
                },

                rgbToHex: function ( r, g, b ) {
                    return '#' + ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).substring( 1 );
                },

                runJobs: function ( count, pixels, callback ) {
                    var chunkSize = pixels.length / count,
                        colorMap  = { };

                    for ( var i = 0; i < count; i ++ ) {
                        var worker = new Worker( 'js/worker.js' ),
                            begin  = chunkSize * i | 0,
                            end    = chunkSize * ( i + 1 ) | 0;

                        service.startJob( worker, pixels.buffer.slice( begin * 4, end * 4 ) );

                        worker.onmessage = function ( event ) {
                            service.mergeMaps( colorMap, event.data );
                            if ( ! -- count ) {
                                callback( colorMap );
                            }
                        }
                    }
                },

                startJob: function ( worker, buffer ) {
                    worker.postMessage( new Uint32Array( buffer ), [ buffer ] );
                    return worker;
                }
            };

            return service;
        }

    ] );

} )( document );
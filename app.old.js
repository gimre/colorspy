( function ( w, d, n ) {
    'use strict';

    var bootstrapAll = function ( ) {
        acquireImage( );
        createGUI( );
    };

    var acquireImage = function ( ) {
        var image = d.querySelector( 'img' );
        image.id = 'image';
        model.image = image;
    };

    var createGUI = function ( ) {
        var container = d.createElement( 'div' );
        container.className = 'spy-container';
        container.innerHTML = '<div class="stage"></div><div class="colorwheel interactive" onclick="handlers.extractColors( this )"></div>';
        container.firstChild.appendChild( model.image );
        d.body.appendChild( container );
    };

    w.addEventListener( 'load', bootstrapAll );

} )( window, document, navigator );
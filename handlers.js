( function ( scope, d ) {
    'use strict';

    scope.handlers = {
        extractColors: function ( target ) {
            if ( target.classList.contains( 'active' ) ) {
                target.classList.add( 'leave' );
                target.classList.remove( 'active' );
                target.firstChild.addEventListener( 'webkitTransitionEnd', function ( ) {
                    target.classList.remove( 'leave' );
                    target.innerHTML = '';
                } );

                [].forEach.call( target.children, function ( c, index ) {
                    c.style.webkitTransitionDelay = ( target.children.length - index ) * 25 + 'ms' ;
                    c.classList.remove( 'active' );
                } );
            } else {
                target.classList.add( 'active' );
                target.classList.add( 'enter' );

                utils.extractColorMap( model.image, function ( colorMap ) {
                    var colors = Object.keys( colorMap );

                    colors
                        .sort( utils.descendingByHits.bind( colorMap ) )
                        .slice( 0, 9 )
                        .forEach( function ( color, index ) {
                            var e = d.createElement( 'div' );
                            e.className             = 'color';
                            e.title                 = '#' + color;
                            e.style.backgroundColor = '#' + color;
                            e.style.webkitTransitionDelay = index * 25 + 'ms' ;
                            target.appendChild( e );
                            
                            var x = e.clientHeight;
                            e.classList.add( 'active' );
                        } );

                    target.classList.remove( 'enter' );
                } );
            }
        }
    };

} )( window, document );
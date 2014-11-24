var hexMap = '0123456789abcdef';

var decToHex = function ( value ) {
    var result = '';

    for ( var i = 0; i < 6; i ++ ) {
        result += hexMap[ value & 0xf ];
        value = value >>> 4;
    }

    return result;
};

onmessage = function ( event ) {
    var pixels  = event.data,
        len     = pixels.length - 1,
        last    = pixels[ len ],
        lastHex = decToHex( last & 0xffffff ),
        lastSeq = 1,
        colorData = { };

    while ( len > 0 ) {
        -- len;
        var p = pixels[ len ];
        if ( p - last ) {
            colorData[ lastHex ] = ( colorData[ lastHex ] ? colorData[ lastHex ] : 0 ) + lastSeq;
            lastHex = decToHex( p & 0xffffff );
            lastSeq = 1;
            last = p;
        } else {
            lastSeq ++;
        }
    }

    colorData[ lastHex ] = colorData[ lastHex ] ? colorData[ lastHex ] + lastSeq : 1;

    postMessage( colorData );
};
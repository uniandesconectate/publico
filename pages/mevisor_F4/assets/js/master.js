( function ()
{
    const btn_clean = document.querySelector( '#clean' );
    const btn_download = document.querySelector( '#download' );
    const options = document.querySelectorAll( '[type=radio]' );
    const pointer = document.querySelector( '.pointer' );

    btn_download.addEventListener( 'click', function ()
    {
        const elementHTML = document.querySelector( '#printable' );

        html2pdf()
            .set( {
                filename: 'results.pdf',
                margin: 4,
                image: {
                    type: 'png',
                    quality: 0.9
                },
                html2canvas: {
                    scale: 1,
                    width: elementHTML.clientWidth,
                    height: elementHTML.clientHeight * 2,
                    y: 600
                },
                jsPDF: {
                    orientation: 'p',
                    unit: 'mm',
                    format: 'letter',
                    hotfixes: [ "px_scaling" ]
                }
            } )
            .from( elementHTML )
            .save();
    } );

    btn_clean.addEventListener( 'click', function ()
    {
        document.querySelectorAll( '[type=radio]' ).forEach( element =>
        {
            element.checked = false;
        } );

        document.querySelectorAll( '[Type=hidden]' ).forEach( element =>
        {
            element.value = '';
        } );


        document.querySelectorAll( '[type=text]' ).forEach( element =>
        {
            element.value = '';
        } );

        calcular();
    } );

    options.forEach( element =>
    {
        element.addEventListener( 'click', function ()
        {
            const elementDestino = this.dataset.text;
            const valorAsignar = this.value;
            const inputText = document.querySelector( '#' + elementDestino );
            inputText.value = valorAsignar;
            calcular();
        } );
    } );

    function calcular ()
    {
        let totalObj1 = 0;
        document.querySelectorAll( '[Type=hidden]' ).forEach( element =>
        {
            totalObj1 = totalObj1 + Number( element.value );
            if ( totalObj1 > 13 )
            {
                let position = ( ( totalObj1 - 13 ) * 100 ) / 52;
                pointer.style.setProperty( '--pointer-x', position + "%" );
            } else
            {
                let position = ( ( 0 ) * 100 ) / 52;
                pointer.style.setProperty( '--pointer-x', position + "%" );
            }
        } );
    }
} )();
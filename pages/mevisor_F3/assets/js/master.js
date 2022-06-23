( function ()
{
    const btn_clean = document.querySelector( '#clean' );
    const btn_download = document.querySelector( '#download' );
    const options = document.querySelectorAll( '[type=radio]' );
    const inputResult = document.querySelector( '#result' );
    const primiparo = document.querySelector( '#primiparo' );
    const entusiasta = document.querySelector( '#entusiasta' );
    const avanzado = document.querySelector( '#avanzado' );

    btn_download.addEventListener( 'click', function ()
    {
        const elementHTML = document.querySelector( '#printable' );

        html2pdf()
            .set( {
                filename: 'results.pdf',
                margin: 2,
                html2canvas: {
                    scale: 1,
                    width: elementHTML.clientWidth,
                    height: elementHTML.clientHeight * 2,
                    x: 100,
                    y: 1000
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
            let resultObj = element.dataset.result;

            if ( resultObj == 'obj1' )
            {
                totalObj1 = totalObj1 + Number( element.value );
                inputResult.value = totalObj1;

                if ( totalObj1 < 46 )
                {
                    hideElements();
                    primiparo.classList.remove( 'is-hidden' );
                } else if ( totalObj1 > 45 && totalObj1 < 75 )
                {
                    hideElements();
                    entusiasta.classList.remove( 'is-hidden' );
                } else if ( totalObj1 > 74 )
                {
                    hideElements();
                    avanzado.classList.remove( 'is-hidden' );
                }
            }
        } );
    }

    function hideElements ()
    {
        primiparo.classList.add( 'is-hidden' );
        entusiasta.classList.add( 'is-hidden' );
        avanzado.classList.add( 'is-hidden' );
    }
} )();
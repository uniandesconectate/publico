( function () {
    const btn_clean = document.querySelector( '#clean' );
    const btn_download = document.querySelector( '#download' );
    const options = document.querySelectorAll( '[type=radio]' );
    const pointer1 = document.querySelector( '.pointer1' );
    const pointer2 = document.querySelector( '.pointer2' );

    btn_download.addEventListener( 'click', function () {
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

    btn_clean.addEventListener( 'click', function () {
        document.querySelectorAll( '[type=radio]' ).forEach( element => {
            element.checked = false;
        } );

        document.querySelectorAll( '[Type=hidden]' ).forEach( element => {
            element.value = '';
        } );


        document.querySelectorAll( '[type=text]' ).forEach( element => {
            element.value = '';
        } );

        calcular();
    } );

    options.forEach( element => {
        element.addEventListener( 'click', function () {
            const elementDestino = this.dataset.text;
            const valorAsignar = this.value;
            const inputText = document.querySelector( '#' + elementDestino );
            inputText.value = valorAsignar;
            calcular();
        } );
    } );

    function calcular () {
        let totalObj1 = 0;
        let totalObj2 = 0;
        document.querySelectorAll( '[Type=hidden]' ).forEach( element => {
            if ( element.dataset.result === "obj1" ) {
                totalObj1 = totalObj1 + Number( element.value );
                if ( totalObj1 > 8 ) {
                    let position = ( ( totalObj1 - 8 ) * 100 ) / 32;
                    pointer1.style.setProperty( '--pointer-x', position + "%" );
                } else {
                    let position = ( ( 0 ) * 100 ) / 32;
                    pointer1.style.setProperty( '--pointer-x', position + "%" );
                }
            } else if ( element.dataset.result === "obj2" ) {
                totalObj2 = totalObj2 + Number( element.value );
                if ( totalObj2 > 7 ) {
                    let position = ( ( totalObj2 - 7 ) * 100 ) / 28;
                    pointer2.style.setProperty( '--pointer-x', position + "%" );
                } else {
                    let position = ( ( 0 ) * 100 ) / 60;
                    pointer2.style.setProperty( '--pointer-x', position + "%" );
                }
            }
        } );
    }
} )();
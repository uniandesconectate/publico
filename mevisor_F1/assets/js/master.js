( function ()
{
    const btn_clean = document.querySelector( '#clean' );
    const btn_download = document.querySelector( '#download' );
    const options = document.querySelectorAll( '[type=radio]' );
    const inputResultObj1 = document.querySelector( '#resultObj1' );
    const inputResultObj2 = document.querySelector( '#resultObj2' );
    const inputResultObj3 = document.querySelector( '#resultObj3' );

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
                    y: 280
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
        let totalObj2 = 0;
        let totalObj3 = 0;
        document.querySelectorAll( '[Type=hidden]' ).forEach( element =>
        {
            let resultObj = element.dataset.result;

            switch ( resultObj )
            {
                case 'obj1':
                    totalObj1 = totalObj1 + Number( element.value );
                    inputResultObj1.value = totalObj1;
                    break;

                case 'obj2':
                    totalObj2 = totalObj2 + Number( element.value );
                    inputResultObj2.value = totalObj2;
                    break;

                case 'obj3':
                    totalObj3 = totalObj3 + Number( element.value );
                    inputResultObj3.value = totalObj3;
                    break;

                default:
                    break;
            }

        } );
    }

} )();
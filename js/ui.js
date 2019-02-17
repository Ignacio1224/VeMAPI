const LV = ['LogIn', 'VeMAPI'];
const LS = ['LogIn', 'SignIn'];
const MT = ['M-New', 'M-View'];


ons.ready(() => {
    window.fn = {};

    window.fn.open = function () {
        var menu = document.getElementById('menu');
        menu.open();
    };

    window.fn.load = function (page) {
        var content = document.getElementById('content');
        var menu = document.getElementById('menu');
        content.load(page)
            .then(menu.close.bind(menu));
    };


    // LogIn Page
    $('#SignIn').hide();
    $('#VeMAPI').hide();


});


function LogIn() {
    let email = $('#L-email').val();
    let password = $('#L-password').val();

    if (email === 'bob' && password === 'secret') {
        ClearInputs('LogIn');
        ToggleWindows(LV);
    } else {
        ShowModal('Usuario o clave incorrecto');
    }
};

function SignIn(v = false) {
    if (!v) {
        ToggleWindows(LS);
    } else {
        const sEmail = $('#S-email').val();
        const sPassword = $('#S-password').val();
        const sPhone = $('#S-phone').val();

        if (sEmail == '' || sPassword == '' || sPhone == '') {
            ShowModal('Los campos no pueden estar vacíos');
        } else {
            ClearInputs('SignIn');
            console.log('Sign In');
        }
    }
}

function RegisterVehicle() {
    console.log('Add Vehicle');
}

/**
 * End User Session
 */
function EndSession() {
    console.log('End Session');
    ToggleWindows(LV);
}

/**
 * Utils
 */
function ToggleWindows(ws) {
    for (w of ws) {
        $(`#${w}`).toggle();
    }
}

function MantainmentTabs(t) {
    ToggleWindows(MT);
    if (t === 'N') {
        $('#Bttn-M-T-View').removeClass('M-tab-active');
        $('#Bttn-M-T-New').addClass('M-tab-active');
    } else if (t === 'V') {
        $('#Bttn-M-T-New').removeClass('M-tab-active');
        $('#Bttn-M-T-View').addClass('M-tab-active');
    }
}

function LoadManteinments() {
    const car = $('#M-cmbCars').val();
    
    // Get All Mantainmentos of selected car
    FillManteinments([{ fecha: '12/12/12', taller: "doctorcar", servicio: 'cambio de aros', descripcion: 'aaa', precio: 135 }, { fecha: '12/12/12', taller: "doctorcar", servicio: 'cambio de aros', descripcion: 'aaa', precio: 135}])
}

function FillManteinments(m) {
    $('#M-View ons-list-item').remove();

    m.forEach(x => {
        $('#M-View').append(`
            <ons-list-item expandable>
                Mantenimientos
                <div class="expandable-content">
                    <ons-card>
                        <div class="title">
                            Detalles
                        </div>
                        <div class="content">
                            <ons-list>
                                <ons-list-item>Fecha - ${x.fecha}</ons-list-item>
                                <ons-list-item>Taller - ${x.taller}</ons-list-item>
                                <ons-list-item>Servicio - ${x.servicio}</ons-list-item>
                                <ons-list-item>Descripción - ${x.descripcion}</ons-list-item>
                                <ons-list-item>Precio - ${x.precio}</ons-list-item>
                            </ons-list>
                        </div>
                    </ons-card>
                </div>
            </ons-list-item>
        `);
    });
}

function ClearInputs(place) {
    const inputs = $(`#${place} :input`);

    for (i of inputs) {
        $(i).val('');
    }
}

function ShowModal(value) {
    let modal = $('ons-modal');

    $('#modalSpan').html(value);

    modal.show();
    setTimeout(function () {
        modal.hide();
    }, 2400);
}
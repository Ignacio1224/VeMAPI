const LV = ['LogIn', 'VeMAPI'];
const LS = ['LogIn', 'SignIn'];
const MT = ['M-New', 'M-View'];
const WT = ['W-C-Description', 'W-C-Agenda'];


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


    IntroAction('L-email', LogIn, true);
    IntroAction('L-password', LogIn, true);
    IntroAction('S-email', LogIn, true);
    IntroAction('S-password', LogIn, true);
    IntroAction('S-phone', LogIn, true);
    // IntroAction('txtSearchWorkshop', FillMap);

});


function LogIn(v = false) {
    if (!v) {
        ClearInputs('SignIn');
        ToggleWindows(LS);
    } else {
        let email = $('#L-email').val();
        let password = $('#L-password').val();

        if (email === 'bob' && password === 'secret') {
            ClearInputs('LogIn');
            ToggleWindows(LV);
        } else {
            ShowModal('Usuario o clave incorrecto');
        }
    }
};

function SignIn(v = false) {
    if (!v) {
        ClearInputs('LogIn');
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
        const r = Math.floor(Math.random() * 101);
        if (r % 2 === 0) {
            $(`#${w}`).slideToggle('slow');
        } else if (r % 3 == 0) {
            $(`#${w}`).toggle('slow');
        } else if (r % 5 == 0) {
            $(`#${w}`).toggle();
        } else {
            $(`#${w}`).slideToggle();
        }
    }
}

function IntroAction(el, fn, fnArgs = null) {
    $(`#${el}`).keyup(function (event) {
        if (event.keyCode === 13) {
            if (fnArgs) {
                fn(fnArgs);
            } else {
                fn();
            }
        }
    });
}

function MantainmentTabs(t) {
    ToggleWindows(MT);
    if (t === 'N') {
        $('#Bttn-M-T-View').removeClass('M-tab-active');
        $('#Bttn-M-T-New').addClass('M-tab-active');
        $('#Bttn-M-T-New').prop("disabled", true);
        $('#Bttn-M-T-View').prop("disabled", false);
    } else if (t === 'V') {
        $('#Bttn-M-T-New').removeClass('M-tab-active');
        $('#Bttn-M-T-View').addClass('M-tab-active');
        $('#Bttn-M-T-New').prop("disabled", false);
        $('#Bttn-M-T-View').prop("disabled", true);
    }
}

function WorkshopTabs(t) {
    if (t !== 'R') {
        ToggleWindows(WT);
    } else {
        console.log('Marcar Ruta');
        
    }
    switch (t) {
        case 'D':
            $('#Bttn-W-T-Agenda').removeClass('three-tab-active');
            $('#Bttn-W-T-Route').removeClass('three-tab-active');
            $('#Bttn-W-T-Description').addClass('three-tab-active');
            $('#Bttn-W-T-Description').prop("disabled", true);
            $('#Bttn-W-T-Agenda').prop("disabled", false);
            $('#Bttn-W-T-Route').prop("disabled", false);
            break;
        case 'A':
            $('#Bttn-W-T-Description').removeClass('three-tab-active');
            $('#Bttn-W-T-Route').removeClass('three-tab-active');
            $('#Bttn-W-T-Agenda').addClass('three-tab-active');
            $('#Bttn-W-T-Agenda').prop("disabled", true);
            $('#Bttn-W-T-Description').prop("disabled", false);
            $('#Bttn-W-T-Route').prop("disabled", false);
            break;
        case 'R':
            $('#Bttn-W-T-Description').removeClass('three-tab-active');
            $('#Bttn-W-T-Agenda').removeClass('three-tab-active');
            $('#Bttn-W-T-Route').addClass('three-tab-active');
            $('#Bttn-W-T-Route').prop("disabled", true);
            $('#Bttn-W-T-Description').prop("disabled", false);
            $('#Bttn-W-T-Agenda').prop("disabled", false);
            break;
        default:
            break;
    }
}

function LoadManteinments() {
    const car = $('#M-cmbCars').val();

    // Get All Mantainmentos of selected car
    FillManteinments([{
        fecha: '12/12/12',
        taller: "doctorcar",
        servicio: 'cambio de aros',
        descripcion: 'aaa',
        precio: 135
    }, {
        fecha: '12/12/12',
        taller: "doctorcar",
        servicio: 'cambio de aros',
        descripcion: 'aaa',
        precio: 135
    }])
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

    modal.show('fold');
    setTimeout(function () {
        modal.hide('fold');
    }, 2000);
}


function FillMap() {
    const search = $('#txtSearchWorkshop').val();

    console.log("Call ajax");
}
// Google Maps API
function initMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}
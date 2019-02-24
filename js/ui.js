const LV = ['LogIn', 'VeMAPI'];
const LS = ['LogIn', 'SignIn'];
const SV = ['SignIn', 'VeMAPI']
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

});


function DisplayWCard() {
    $('#W-TabPane').show();
    workshop = SearchWrk($(this)[0].title);

    $('#W-C-Description').html(`
    <ons-card>
        <div class="title">
            ${workshop.GetDescription()}
        </div>
        <img src="http://images.marcelocaiafa.com/${workshop.GetImg()}" alt="Add Image" style="width: 100%">
        <div class="content">
            <ons-list>
                <ons-list-item>
                    <p style="text-align: left;">Direccion: ${workshop.GetAddress()}</p>
                </ons-list-item>
                <ons-list-item>
                    <p>Teléfono: ${workshop.GetPhone()}</p>
                </ons-list-item>
                <ons-list-item>
                    <label for="W-favourite">Marcar como favorito</label>
                    <ons-checkbox input-id="W-favourite" onclick="AddFavouriteWorkshop(${workshop.GetId()})"></ons-checkbox>
                </ons-list-item>
            </ons-list>
        </div>
    </ons-card>
    `);
// REVISARRRR
    if (SearchFavouriteWorkshop(workshop.GetId())) {
        $('#W-favourite').prop("checked", true);
    }

    $('#W-C-Description').show();
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


function ShowModal(value) {
    let modal = $('ons-modal');

    $('#modalSpan').html(value);

    modal.show('fold');
    setTimeout(function () {
        modal.hide('fold');
    }, 2000);
}


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


function WorkshopTabs(t) {
    if (t !== 'R') {
        ToggleWindows(WT);
    } else {
        showDirections = true;
        InitMap(workshops);
        showDirections = false;

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
const LV = ['LogIn', 'VeMAPI'];
const LS = ['LogIn', 'SignIn'];
const SV = ['SignIn', 'VeMAPI']
const MT = ['M-New', 'M-View'];
const WT = ['W-C-Description', 'W-C-Agenda'];

// Says if maintainance is created by map or by favourite workshops
let MCBM; 

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
        
        if (page === 'mantainment.html') {
            setTimeout(() => {
                LoadVehicles('N-cmbvehicles');
                LoadServices('N-cmbServices');
                $('#N-img-auto').hide();
                $('#M-img-auto').hide();
            }, 100);
        }

        if (page === 'workshops.html') {
            setTimeout(() => {
                LoadServices('W-cmbServices');
                $('#A-img-auto').hide();
            }, 100);
        }
        
        if (page === 'vehicle.html') {
            setTimeout(() => {
                // Load generic image in vehicle
                $('#V-image').prop('src', `data:image/jpeg;base64,${addImage}`);
            }, 100);

        }
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


function AddVehicleImage() {
    const img = GetImage($('#V-car_registration').val());
    $('#V-image').attr('src', `data:image/jpeg;base64,${img}`);    
}


function LoadVehicleImage(veh, el) {
    GetVehicleImage(SearchVehicle(veh).GetRegistration()).then((vehicleImage) => {
        if (vehicleImage) {
            $(`#${el}`).attr('src', vehicleImage).show();
        }
    });
    
}


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
                    <label for="W-favourite" style="margin-right: 1em;">Marcar como favorito</label>
                    <ons-checkbox input-id="W-favourite" onclick="ToggleFavouriteWorkshop(${workshop.GetId()})"></ons-checkbox>
                </ons-list-item>
            </ons-list>
        </div>
    </ons-card>
    `);
    
    setTimeout(() => {
        if (SearchFavouriteWorkshop(workshop.GetId())) {
            $('#W-favourite').prop("checked", true);
        }
    }, 100);
    
    $('#W-C-Description').show();
}


function FillMaintenances(m) {
    $('#M-View ons-list-item').remove();

    m.forEach(x => {
        $('#M-View').append(`
            <ons-list-item expandable>
                Mantenimiento ${x.GetDateTime()}
                <div class="expandable-content">
                    <ons-card>
                        <div class="title">
                            Detalles
                        </div>
                        <div class="content">
                            <ons-list>
                                <ons-list-item>Taller - ${x.GetWorkshop()}</ons-list-item>
                                <ons-list-item>Servicio - ${SearchService(x.GetService()).GetName()}</ons-list-item>
                                <ons-list-item>Descripción - ${x.GetDescription()}</ons-list-item>
                                <ons-list-item>Precio - ${x.GetPrice()} U$D</ons-list-item>
                            </ons-list>
                        </div>
                    </ons-card>
                </div>
            </ons-list-item>
        `);
    });
}


function FillMap() {
    const serv = $('#W-cmbServices').val();
    if (serv !== '') {
        LoadWorkshops(serv).done(() => {
            InitMap(workshops);
            $('#googleMap').show();
        });
    } else {
        $('#googleMap').html('');
        $('#W-TabPane').hide();
        $('#W-C-Description').hide();
        $('#W-C-Agenda').hide();
    }
}


function LoadLogInData(usu = null) {
    GetCurrentPosition();
    InitDatabase();
    LoadFavouriteWorkshops();
    LoadVehicles('N-cmbvehicles');
    LoadServices('N-cmbServices');
    $('#N-img-auto').hide();

    if (usu == null) {
        ToggleWindows(LV);
    } else {
        ToggleWindows(SV);
    }
}


function LoadTotalPrice(veh, el) {
    $('#M-View ons-list-item').remove();
    $(`#${el}`).html('');
    $('#M-img-auto').hide();
    let vehicle = $(`#${veh}`).val();
    
    if (vehicle != '') {
        LoadMaintenances(vehicle).done(() => {
            let total = 0;
            maintenances.forEach((f) => {
                total += parseFloat(f.GetPrice());
            });
            
            $(`#${el}`).html(`Total: ${total} U$D`).show();
            
            LoadVehicleImage(vehicle, 'M-img-auto');
        });
    }
}


function MaintenanceBehaviour(val) {
    switch (val) {
        case 'V':
            let veh = $('#N-cmbvehicles').val();
            if (veh !== '' && veh !== undefined) {
                $('#N-cmbServices').prop('disabled', false);
                $('#N-img-auto').hide();
                LoadVehicleImage(veh, 'N-img-auto');
                MCBM = false;
            } else {
                $('#N-cmbServices').append(`<option value="">Services</option>`);
                $('#M-totalPrice').html('').hide();
                $('#N-cmbServices').prop('disabled', true);
            }
            
            veh = $('#A-cmbvehicles').val();
            if (veh !== '' && veh !== undefined) {
                $('#A-txtDate').prop('disabled', false);
                LoadTotalPrice('A-cmbvehicles','A-totalPrice');
                $('#A-img-auto').hide();
                LoadVehicleImage(veh, 'A-img-auto');
                MCBM = true;
            } else {
                $('#A-txtDate').prop('disabled', true);
                $('#A-totalPrice').html('').hide();
            }

            break;

        case 'S':
            if ($('#N-cmbServices').val() !== '' && $('#N-cmbServices').val() !== undefined) {
                const serv = $('#N-cmbServices').val();
                LoadWorkshops(serv).done(() => {
                    LoadFavouriteWorkshops().then(() => {
                        $('#N-cmbWorkshopsFav').html('<option value="">Taller Favorito</option>');
                        workshops.forEach((w) => {
                            for (let i = 0; i < favouriteWorkshops.length; i++) {
                                if (w.GetId() == String(favouriteWorkshops[i].Id)) {
                                    $('#N-cmbWorkshopsFav').append(`<option value="${w.GetId()}">${w.GetDescription()}</option>`);
                                }
                                
                            }
                        });
                        
                        $('#N-cmbWorkshopsFav').prop('disabled', false);
                    });
                });
            } else {
                $('#N-cmbWorkshopsFav').html('<option value="">Taller Favorito</option>');
                $('#N-cmbWorkshopsFav').prop('disabled', true);
            }

            break;

        case 'W':
            if ($('#N-cmbWorkshopsFav').val() !== '' && $('#N-cmbServices').val() !== undefined) {
                $('#N-txtDate').prop('disabled', false);
            } else {
                $('#N-txtDate').prop('disabled', true);
            }

            break;

        case 'Da':
            if ($('#N-txtDate').val() !== '' && $('#N-txtDate').val() !== undefined) {
                $('#N-txtTime').prop('disabled', false);
            } else {
                $('#N-txtTime').prop('disabled', true);
            }
            
            if ($('#A-txtDate').val() !== '' && $('#A-txtDate').val() !== undefined) {
                $('#A-txtTime').prop('disabled', false);
            } else {
                $('#A-txtTime').prop('disabled', true);
            }

            break;

        case 'T':
            if ($('#N-txtTime').val() !== '' && $('#N-txtTime').val() !== undefined) {
                $('#N-txtDescription').prop('disabled', false);
            } else {
                $('#N-txtDescription').prop('disabled', true);
            }
            
            if ($('#A-txtTime').val() !== '' && $('#A-txtTime').val() !== undefined) {
                $('#A-txtDescription').prop('disabled', false);
            } else {
                $('#A-txtDescription').prop('disabled', true);
            }

            break;

        case 'De':
            if ($('#N-txtDescription').val() !== '' && $('#N-txtDescription').val() !== undefined) {
                $('#N-txtKilometers').prop('disabled', false);
            } else {
                $('#N-txtKilometers').prop('disabled', true);
            }

            if ($('#A-txtDescription').val() !== '' && $('#A-txtDescription').val() !== undefined) {
                $('#A-txtKilometers').prop('disabled', false);
            } else {
                $('#A-txtKilometers').prop('disabled', true);
            }

            break;

        case 'K':
            if ($('#N-txtKilometers').val() !== '' && $('#N-txtKilometers').val()) {
                $('#N-txtPrice').prop('disabled', false);
            } else {
                $('#N-txtPrice').prop('disabled', true);
            }

            if ($('#A-txtKilometers').val() !== '' && $('#A-txtKilometers').val() !== undefined) {
                $('#A-txtPrice').prop('disabled', false);
            } else {
                $('#A-txtPrice').prop('disabled', true);
            }

            break;

        case 'P':
            if ($('#N-txtPrice').val() !== '' && $('#N-txtPrice').val() !== undefined) {
                $('#N-BttnAdd').prop('disabled', false);
            } else {
                $('#N-BttnAdd').prop('disabled', true);
            }

            if ($('#A-txtPrice').val() !== '' && $('#A-txtPrice').val() !== undefined) {
                $('#A-bttnAgenda').prop('disabled', false);
            } else {
                $('#A-bttnAgenda').prop('disabled', true);
            }

            break;

        case true:
            const vehicle = (MCBM) ? $('#A-cmbvehicles').val() : $('#N-cmbvehicles').val();
            const service = (MCBM) ? $('#W-cmbServices').val() : $('#N-cmbServices').val();
            const mworkshop = (MCBM) ? workshop.GetId() : $('#N-cmbWorkshopsFav').val();
            const date = (MCBM) ? $('#A-txtDate').val(): $('#N-txtDate').val();
            const time = (MCBM) ? $('#A-txtTime').val() : $('#N-txtTime').val();
            const description = (MCBM) ? $('#A-txtDescription').val() : $('#N-txtDescription').val();
            const kilometers = (MCBM) ? $('#A-txtKilometers').val() : $('#N-txtKilometers').val();
            const price = (MCBM) ? $('#A-txtPrice').val() : $('#N-txtPrice').val();
            if (vehicle != '' && service != '' && mworkshop != '' && date != '' && time != '' && description != '' && kilometers != '' && price != '') {
                const m = new Maintenance(vehicle, service, mworkshop, date, time, description, kilometers, price);

                RegisterMaintenace(m).done(() => {
                    if (MCBM) {
                        ClearInputs('W-C-Agenda');
                        $('#A-txtDate').prop('disabled', true);
                        $('#A-txtTime').prop('disabled', true);
                        $('#A-txtDescription').prop('disabled', true);
                        $('#A-txtKilometers').prop('disabled', true);
                        $('#A-txtPrice').prop('disabled', true);
                        $('#A-BttnAdd').prop('disabled', true);
                    } else if (MCBM === false){
                        ClearInputs('M-New');
                        $('#N-cmbServices').prop('disabled', true);
                        $('#N-cmbWorkshopsFav').prop('disabled', true);
                        $('#N-txtDate').prop('disabled', true);
                        $('#N-txtTime').prop('disabled', true);
                        $('#N-txtDescription').prop('disabled', true);
                        $('#N-txtKilometers').prop('disabled', true);
                        $('#N-txtPrice').prop('disabled', true);
                        $('#N-BttnAdd').prop('disabled', true);    
                    }
                    
                    ShowModal('Mantenimiento agendado');
                });
            }
            break;

        default:
            break;
    }
}


function MantainmentTabs(t) {
    ToggleWindows(MT);
    if (t === 'N') {
        $('#Bttn-M-T-View').removeClass('M-tab-active');
        $('#Bttn-M-T-New').addClass('M-tab-active');
        $('#Bttn-M-T-New').prop("disabled", true);
        $('#Bttn-M-T-View').prop("disabled", false);
        $('#M-totalPrice').html('').hide();
        ClearInputs('M-View');
        $('#M-View ons-list-item').remove();
        $('#N-img-auto').hide();
    } else if (t === 'V') {
        $('#Bttn-M-T-New').removeClass('M-tab-active');
        $('#Bttn-M-T-View').addClass('M-tab-active');
        $('#Bttn-M-T-New').prop("disabled", false);
        $('#Bttn-M-T-View').prop("disabled", true);
        LoadVehicles('M-cmbvehicles');
        $('#M-img-auto').hide();
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


function ToggleFavouriteWorkshop(idWrk) {
    SaveFavouriteWorkshop(idWrk, $('#W-favourite').is(':checked'));
}


function ToggleWindows(ws) {
    for (w of ws) {
        ClearInputs(w);

        if (w == 'VeMAPI') {
            $('#googleMap').hide();
            $('#W-TabPane').hide();
            $('#W-C-Description').hide();
            $('#W-C-Agenda').hide();
            $('#M-View ons-list-item').remove();
            $('#M-totalPrice').html('').hide();
        }

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
            $('#A-totalPrice').html('').hide();
            $('#A-img-auto').hide();
            LoadVehicles('A-cmbvehicles');
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

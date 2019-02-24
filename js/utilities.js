let user;

let workshop;
let workshops;
let favouriteWorkshops;

let services;

let directionsDisplay;
let directionsService;
let showDirections;
let myPosition;

let database;


function AddFavouriteWorkshop(wrk) {

    if ($('#W-favourite').is(':checked')) {

        database.transaction((tx) => {
            tx.executeSql("INSERT INTO FavouriteWorkshop VALUES (?,?)", [user.GetEmail(), wrk], () => {
                ShowModal('Añadido a favoritos');
            }, () => {
                ShowModal('No se pudo añadir a favoritos');
            });
        });
    } else {

        database.transaction((tx) => {
            tx.executeSql("DELETE FROM FavouriteWorkshop WHERE Id=?", [wrk], () => {
                ShowModal('Removido de favoritos');
            }, () => {
                ShowModal('No se pudo remover de favoritos');
            });
        });
    }

    LoadFavouriteWorkshops();
}


function AddImage(vehicle, url) {
    database.transaction((tx) => {
        tx.executeSql('INSERT INTO VehicleImage VALUES (VehicleRegistration=?, Url=?)', [vehicle, url]);
    });
}


function CalculateRoute(end) {
    var request = {
        origin: {
            lat: myPosition.lat,
            lng: myPosition.lng
        },
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });

}


function ChangeImage() {
    navigator.camera.getPicture((img) => {
        $('#V-image').prop('src', `data:image/jpeg;base64,${img}`);
        const vehicleRegistration = $('#V-car_registration').val();
        AddImage(vehicleRegistration, img);
    }, (err) => {
        ShowModal('No se pudo tomar la foto');
    }, {
        destinationType: Camera.DestinationType.DATA_URL
    });
}


function ClearInputs(place) {
    const inputs = $(`#${place} :input`);

    for (i of inputs) {
        $(i).val('');
    }
}


function FillMap() {
    $('#W-TabPane').hide();
    $('#W-C-Description').hide();
    $('#W-C-Agenda').hide();

    const serv = $('#W-cmbServices').val();
    LoadWorkshops(serv, true);
}


function GetCurrentPosition() {
    myPosition = {
        lat: null,
        lng: null
    };

    navigator.geolocation.getCurrentPosition((response) => {
        myPosition.lat = response.coords.latitude;
        myPosition.lng = response.coords.longitude;
    }, (err) => {
        ShowModal('No se pudo obtener la geolocalización');
    }, {
        enableHighAccuracy: true
    });
}


function InitDatabase() {
    database.transaction(
        (tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS FavouriteWorkshop (Email, Id)", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS VehicleImage (VehicleRegistration, Url)", []);
        }
    );
}


function InitMap(wrk) {
    if (showDirections) {
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
    }
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {
            lat: myPosition.lat,
            lng: myPosition.lng
        },
        zoom: 12
    });

    if (showDirections) {
        directionsDisplay.setMap(map);
        CalculateRoute(workshop.GetPosition());
    } else {
        wrk.forEach((w) => {
            const marker = new google.maps.Marker({
                position: w.GetPosition(),
                title: w.GetId(),
                label: w.GetDescription()
            });
            marker.setMap(map);
            marker.addListener('click', DisplayWCard);
        });
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


function LoadFavouriteWorkshops() {
    favouriteWorkshops = [];
    database.transaction(
        (tx) => {
            tx.executeSql("SELECT Email, Id FROM FavouriteWorkshop", [], (tx, results) => {
                for (r of results.rows) {
                    favouriteWorkshops.push(r);
                }
            });
        }
    );
}


function LoadLogInData(usu = null) {
    GetCurrentPosition();
    LoadServices('N-cmbServices');
    InitDatabase();
    LoadFavouriteWorkshops();

    if (usu) {
        ToggleWindows(SV);
    } else {
        ToggleWindows(LV);
    }
}


function LoadManteinments() {
    const vehicle = $('#M-cmbvehicles').val();

    // Get All Mantainmentos of selected vehicle
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


function LoadServices(el) {
    $.ajax({
        url: 'http://api.marcelocaiafa.com/servicio',
        headers: {
            Authorization: user.GetToken()
        },
        dataType: 'JSON',
        method: 'GET',
        success: (request) => {
            services = [];
            request.description.forEach((s) => {
                const serv = new Service(s.id, s.descripcion, s.nombre);
                services.push(serv);
            });

            $(`#${el}`).html('<option value="">Servicio</option>');

            services.forEach((s) => {
                $(`#${el}`).append(`<option value="${s.GetId()}">${s.GetName()}</option>`)
            });
        },
        error: (err) => {
            ShowModal(err.responseJSON.descripcion);
        }
    });
}


function LoadWorkshops(serv, renderMap = false) {
    if (serv == "") {
        return ShowModal("El servicio no puede estar vacío");
    }
    const url = `http://api.marcelocaiafa.com/taller?servicio=${serv}`;
    $.ajax({
        url,
        headers: {
            Authorization: user.GetToken()
        },
        dataType: 'JSON',
        method: 'GET',
        success: (request) => {
            workshops = [];
            request.description.forEach((w) => {
                const wrk = new Workshop(serv, w.direccion, w.telefono, w.descripcion, w.imagen, w.id, w.lat, w.lng);
                workshops.push(wrk);
            });

            if (renderMap) {
                InitMap(workshops);
            }

        },
        error: (err) => {
            ShowModal(err.responseJSON.descripcion);
        }
    });
}


function LogIn(v = false, usu = null) {
    if (!v) {

        ToggleWindows(LS);

    } else {

        if (usu) {
            LoadLogInData();
        } else {

            let email = $('#L-email').val();
            let password = $('#L-password').val();

            if (email !== '' && password !== '' && ValidateEmail(email)) {

                user = new User(null, email, null, password);

                $.ajax({
                    type: "POST",

                    url: "http://api.marcelocaiafa.com/login",

                    data: JSON.stringify(user.GenerateLogInJSON()),

                    dataType: "JSON",

                    success: function (response) {
                        user = new User(response.description.usuario.id, response.description.usuario.email, response.description.usuario.telefono, null, response.description.token);

                        database = window.openDatabase('Favourites', '1.0', 'Database for favourite workshops', 1024 * 1024 * 4);

                        LoadLogInData(usu);
                    },

                    error: function (err) {
                        ShowModal(err.responseJSON.descripcion);
                    }
                });

            } else {

                ShowModal('Usuario o clave incorrecto');

            }
        }
    };
}


function LogOut() {
    $.ajax({
        type: "POST",
        url: "http://api.marcelocaiafa.com/logout",
        headers: {
            Authorization: user.GetToken()
        },
        success: function (response) {
            user = null;
            workshop = null;
            workshops = null;
            favouriteWorkshops = null;
            directionsDisplay = null;
            directionsService = null;
            showDirections = null;
            myPosition = null;
            database = null;
            ToggleWindows(LV);
        },
        error: function (err) {
            ShowModal('No se pudo finaizar la sesión');
        }
    });
}


function Manteinment() {

}

function RegisterVehicle() {
    const vehicleRegistration = $('#V-vehicle_registration').val();
    const description = $('#V-description').val();

    if (vehicleRegistration != '' && description != '') {
    
        const vehicle = new Vehicle(vehicleRegistration, description, user.GetId());
        $.ajax({
            type: "POST",
            url: "http://api.marcelocaiafa.com/vehiculo",
            headers: {
                Authorization: user.GetToken()
            },
            data: JSON.stringify(vehicle.GetVehicleJSON()),
            dataType: "JSON",
            success: function (response) {
                ClearInputs('listNewVehicle');
                $('#V-image').prop('src', `data:image/jpeg;base64,${addImage}`);
                ShowModal('Vehículo registrado!');
            },
            error: function (err) {
                ShowModal(err.responseJSON.descripcion);
            }
        });
    } else {
        ShowModal('Los campos no pueden estar vacíos');
    }
}


function SearchFavouriteWorkshop(id) {
    let i = 0;
    let w = null;
    while (!w && i < favouriteWorkshops.length) {
        if (favouriteWorkshops[i].Id == id) {
            w = favouriteWorkshops[i];
        }
        i++;
    }
    return w;
}


function SearchWrk(id) {
    let i = 0;
    let w = null;
    while (!w && i < workshops.length) {
        if (workshops[i].GetId() == id) {
            w = workshops[i];
        }
        i++;
    }
    return w;
}


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
            if (!ValidateEmail(sEmail)) {

                ShowModal('El email no es válido');

            } else {

                user = new User(null, sEmail, sPhone, sPassword);

                $.ajax({
                    type: "POST",

                    url: "http://api.marcelocaiafa.com/usuario",

                    data: JSON.stringify(user.GenerateSignInJSON()),

                    dataType: "JSON",

                    success: function (response) {
                        user = new User(response.description.usuario.id, response.description.usuario.email, response.description.usuario.telefono, sPassword, response.token);
                        LogIn(true, user);
                    },

                    error: function (err) {
                        ShowModal(err.responseJSON.descripcion);
                    }
                });
            }
        }
    }
}


function ValidateEmail(mail) {
    let valid = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        valid = true;
    }
    return (valid);
}
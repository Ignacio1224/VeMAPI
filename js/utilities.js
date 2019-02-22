let user;
let usu = new User('icabrera@psico.edu.uy', 092041396, null, 'yY73Bk47eff7H65Aqncn4J537Ld19Gp6n1a7GKSqGDlFbQR4y4pt6dQOi5Ra76kn6WM61fyhGrfTOYe72X4O1h2o75');

let workshop;
let workshops;

let directionsDisplay;
let directionsService;
let showDirections;


function CalculateRoute(end) {
    var request = {
        origin: {lat: -34.1, lng: -56.9},
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });

}


function ClearInputs(place) {
    const inputs = $(`#${place} :input`);
    
    for (i of inputs) {
        $(i).val('');
    }
}


/**
 * End User Session
 */
function EndSession() {
    console.log('End Session');
    ToggleWindows(LV);
}


function InitMap(wrk) {
    if(showDirections)
    {
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
    }
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {
            lat: -34.9,
            lng: -56.1
        },
        zoom: 11
    });

    if(showDirections)
    {
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


function RegisterVehicle() {
    console.log('Add Vehicle');
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
        ClearInputs('LogIn');
        ToggleWindows(LS);
    } else {
        const sEmail = $('#S-email').val();
        const sPassword = $('#S-password').val();
        const sPhone = $('#S-phone').val();

        if (sEmail == '' || sPassword == '' || sPhone == '') {
            ShowModal('Los campos no pueden estar vacíos');
        } else {
            if (! ValidateEmail(sEmail)) {
                ShowModal('El email no es válido');
            } else {
                ClearInputs('SignIn');
                user = new User(sEmail, sPhone, sPassword);
                
                $.ajax({
                    type: "POST",
                    url: "http://api.marcelocaiafa.com/usuario",
                    data: user.GenerateJSON(),
                    dataType: "JSON",
                    success: function (response) {
                        user = new User(response.description.usuario.email, response.description.usuario.telefono, null, response.token);
                        LogIn(true);
                    },
                    error: function (err) {
                        console.log(err);
                        ShowModal(err);
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


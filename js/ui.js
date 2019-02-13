const LV = ['LogIn', 'VeMAPI'];
const LS = ['LogIn', 'SignIn'];

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

    $('#SignIn').hide();
    $('#VeMAPI').hide();
});

function LogIn () {
    let email = $('#L-email').val();
    let password = $('#L-password').val();

    if (email === 'bob' && password === 'secret') {
        ClearInputs('LogIn');
        ToggleWindows(LV);
    } else {
        ShowModal('Incorrect email or password.');
    }
};

function SignIn (v = false) {
    if (!v) {
        ToggleWindows(LS);
    } else {

    }
}

/**
 * End User Session
 */
function EndSession () {
    console.log('End Session');
    ToggleWindows(LV);
}

/**
 * Utils
 */
function ToggleWindows (ws) {
    for (w of ws) {
        $(`#${w}`).toggle();
    }
}

function ClearInputs (place) {
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
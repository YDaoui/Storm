document.addEventListener('DOMContentLoaded', function() {
    // ---- Gestion du basculement entre login et registrierung ----
    const showLink = document.getElementById('show-registration-link');
    const hideLink = document.getElementById('hide-registration-link');
    const loginContainer = document.getElementById('login-form-container');
    const registrationContainer = document.getElementById('registration-form-container');

    if (showLink && loginContainer && registrationContainer) {
        showLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginContainer.style.display = 'none';
            registrationContainer.style.display = 'block';
        });
    }

    if (hideLink && loginContainer && registrationContainer) {
        hideLink.addEventListener('click', function(e) {
            e.preventDefault();
            registrationContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }

    // ---- Gestion du lien "Passwort vergessen?" (simple alerte) ----
    const forgotLink = document.getElementById('forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funktion "Passwort vergessen" wird hier implementiert.');
        });
    }

    // ---- Soumission du formulaire de login (exemple) ----
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Anmeldeversuch (Demo) – hier würde die Authentifizierung stattfinden.');
            // Eventuell Weiterleitung nach index.html
            // window.location.href = 'index.html';
        });
    }

    // ---- Soumission du formulaire d'inscription (exemple) ----
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registrierungsversuch (Demo) – hier würden die Daten versendet.');
            // window.location.href = 'index.html';
        });
    }
});
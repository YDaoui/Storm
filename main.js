document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('login-form-container');
    const registrationContainer = document.getElementById('registration-form-container');
    const forgotContainer = document.getElementById('forgot-form-container');

    // Liens de bascule
    const showRegLink = document.getElementById('show-registration-link');
    const hideRegLink = document.getElementById('hide-registration-link');
    const forgotLink = document.getElementById('forgot-link');
    const backToLoginLink = document.getElementById('back-to-login-link');

    // --- Afficher inscription, cacher les autres ---
    if (showRegLink) {
        showRegLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginContainer.style.display = 'none';
            forgotContainer.style.display = 'none';
            registrationContainer.style.display = 'block';
        });
    }

    // --- Revenir à la connexion depuis l'inscription ---
    if (hideRegLink) {
        hideRegLink.addEventListener('click', function(e) {
            e.preventDefault();
            registrationContainer.style.display = 'none';
            forgotContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }

    // --- Afficher "Passwort vergessen", cacher les autres ---
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginContainer.style.display = 'none';
            registrationContainer.style.display = 'none';
            forgotContainer.style.display = 'block';
        });
    }

    // --- Revenir à la connexion depuis "Passwort vergessen" ---
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            forgotContainer.style.display = 'none';
            registrationContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }

    // --- Soumission du formulaire de login (exemple) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Anmeldeversuch (Demo) – hier würde die Authentifizierung stattfinden.');
        });
    }

    // --- Soumission du formulaire d'inscription (exemple) ---
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registrierungsversuch (Demo) – hier würden die Daten versendet.');
        });
    }

    // --- Soumission du formulaire "Passwort vergessen" (exemple) ---
    const forgotForm = document.getElementById('forgot-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Anfrage zum Zurücksetzen des Passworts wurde gesendet (Demo).');
        });
    }
});
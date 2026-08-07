// ===== INITIALISATION FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyDQQ_AUOF5mQZ-mrTxJX6j25gbmkSEd5f8",
  authDomain: "vertrauen-e1039.firebaseapp.com",
  projectId: "vertrauen-e1039",
  storageBucket: "vertrauen-e1039.firebasestorage.app",
  messagingSenderId: "936311977548",
  appId: "1:936311977548:web:826b67f91a84a060c6e6e9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===== FONCTIONS FIRESTORE =====
async function emailExists(email) {
  const doc = await db.collection('users').doc(email).get();
  return doc.exists;
}

async function createUser(userData) {
  const { email, ...data } = userData;
  await db.collection('users').doc(email).set(data);
}

async function getUser(email) {
  const doc = await db.collection('users').doc(email).get();
  if (doc.exists) return doc.data();
  return null;
}

// ===== GESTION DES FORMULAIRES =====
document.addEventListener('DOMContentLoaded', function() {
  const loginContainer = document.getElementById('login-form-container');
  const registrationContainer = document.getElementById('registration-form-container');
  const forgotContainer = document.getElementById('forgot-form-container');

  const showRegLink = document.getElementById('show-registration-link');
  const hideRegLink = document.getElementById('hide-registration-link');
  const forgotLink = document.getElementById('forgot-link');
  const backToLoginLink = document.getElementById('back-to-login-link');

  showRegLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    forgotContainer.style.display = 'none';
    registrationContainer.style.display = 'block';
    resetRegistrationForm();
  });

  hideRegLink.addEventListener('click', (e) => {
    e.preventDefault();
    registrationContainer.style.display = 'none';
    forgotContainer.style.display = 'none';
    loginContainer.style.display = 'block';
  });

  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    registrationContainer.style.display = 'none';
    forgotContainer.style.display = 'block';
    document.getElementById('forgot-message').textContent = '';
  });

  backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotContainer.style.display = 'none';
    registrationContainer.style.display = 'none';
    loginContainer.style.display = 'block';
  });

  function resetRegistrationForm() {
    document.getElementById('email').value = '';
    document.getElementById('email_wdh').value = '';
    document.getElementById('vorname').value = '';
    document.getElementById('nachname').value = '';
    document.getElementById('tel_vorwahl').value = '';
    document.getElementById('tel_nummer').value = '';
    document.getElementById('fax_vorwahl').value = '';
    document.getElementById('fax_nummer').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-password-confirm').value = '';
    document.getElementById('datenschutz').checked = false;
    document.getElementById('register-message').textContent = '';
    document.getElementById('password-fields').style.display = 'none';
    document.getElementById('register-btn').textContent = 'Registrieren';
    document.getElementById('register-btn').dataset.emailVerified = 'false';
    document.getElementById('email').dataset.validated = '';
  }

  // ---------- INSCRIPTION ----------
  const regForm = document.getElementById('registration-form');
  const regMessage = document.getElementById('register-message');
  const registerBtn = document.getElementById('register-btn');

  regForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (registerBtn.dataset.emailVerified !== 'true') {
      const email = document.getElementById('email').value.trim();
      const emailWdh = document.getElementById('email_wdh').value.trim();
      const vorname = document.getElementById('vorname').value.trim();
      const nachname = document.getElementById('nachname').value.trim();
      const datenschutz = document.getElementById('datenschutz').checked;

      if (!email || !emailWdh || !vorname || !nachname) {
        regMessage.textContent = 'Bitte füllen Sie alle Pflichtfelder aus (E-Mail, Vorname, Nachname). / Veuillez remplir tous les champs obligatoires (e-mail, prénom, nom).';
        regMessage.style.color = '#cc0000';
        return;
      }
      if (email !== emailWdh) {
        regMessage.textContent = 'E-Mail-Adressen stimmen nicht überein. / Les adresses e-mail ne correspondent pas.';
        regMessage.style.color = '#cc0000';
        return;
      }
      if (!datenschutz) {
        regMessage.textContent = 'Bitte akzeptieren Sie die Datenschutzbestimmungen. / Veuillez accepter les conditions de protection des données.';
        regMessage.style.color = '#cc0000';
        return;
      }

      try {
        const exists = await emailExists(email);
        if (exists) {
          regMessage.textContent = 'Diese E-Mail ist bereits registriert. / Cet e-mail est déjà enregistré. Bitte verwenden Sie eine andere. / Veuillez en utiliser un autre.';
          regMessage.style.color = '#cc0000';
          document.getElementById('password-fields').style.display = 'none';
          registerBtn.dataset.emailVerified = 'false';
        } else {
          regMessage.textContent = 'E-Mail ist frei. Bitte legen Sie jetzt ein Passwort fest. / L\'e-mail est libre. Veuillez maintenant définir un mot de passe.';
          regMessage.style.color = '#008000';
          document.getElementById('password-fields').style.display = 'block';
          registerBtn.dataset.emailVerified = 'true';
          registerBtn.textContent = 'Passwort speichern';
          document.getElementById('email').dataset.validated = email;
        }
      } catch (error) {
        console.error('Firebase error:', error);
        regMessage.textContent = 'Fehler bei der Verbindung zur Datenbank. / Erreur de connexion à la base de données.';
        regMessage.style.color = '#cc0000';
      }
    } else {
      const email = document.getElementById('email').dataset.validated;
      const password = document.getElementById('reg-password').value;
      const passwordConfirm = document.getElementById('reg-password-confirm').value;
      const anrede = document.getElementById('anrede').value;
      const vorname = document.getElementById('vorname').value.trim();
      const nachname = document.getElementById('nachname').value.trim();
      const telVorwahl = document.getElementById('tel_vorwahl').value.trim();
      const telNummer = document.getElementById('tel_nummer').value.trim();
      const faxVorwahl = document.getElementById('fax_vorwahl').value.trim();
      const faxNummer = document.getElementById('fax_nummer').value.trim();
      const datenschutz = document.getElementById('datenschutz').checked;

      if (!password || !passwordConfirm) {
        regMessage.textContent = 'Bitte Passwort und Bestätigung eingeben. / Veuillez saisir le mot de passe et sa confirmation.';
        regMessage.style.color = '#cc0000';
        return;
      }
      if (password !== passwordConfirm) {
        regMessage.textContent = 'Passwörter stimmen nicht überein. / Les mots de passe ne correspondent pas.';
        regMessage.style.color = '#cc0000';
        return;
      }
      if (!datenschutz) {
        regMessage.textContent = 'Bitte akzeptieren Sie die Datenschutzbestimmungen. / Veuillez accepter les conditions de protection des données.';
        regMessage.style.color = '#cc0000';
        return;
      }

      const telefon = telVorwahl + ' ' + telNummer;
      const fax = faxVorwahl + ' ' + faxNummer;

      const userData = {
        anrede,
        vorname,
        nachname,
        telefon,
        fax,
        password: password,
        created_at: new Date().toISOString()
      };

      try {
        await createUser({ email, ...userData });
        regMessage.textContent = 'Registrierung erfolgreich! / Inscription réussie ! Weiterleitung ... / Redirection ...';
        regMessage.style.color = '#008000';
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
      } catch (error) {
        console.error('Firebase error:', error);
        regMessage.textContent = 'Fehler beim Speichern des Benutzers. / Erreur lors de l\'enregistrement de l\'utilisateur.';
        regMessage.style.color = '#cc0000';
      }
    }
  });

  // ---------- CONNEXION ----------
  const loginForm = document.getElementById('login-form');
  const loginMsg = document.getElementById('login-message');

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('user').value.trim();
    const password = document.getElementById('pass').value.trim();

    if (!email || !password) {
      loginMsg.textContent = 'Bitte E-Mail und Passwort eingeben. / Veuillez saisir e-mail et mot de passe.';
      loginMsg.style.color = '#cc0000';
      return;
    }

    try {
      const user = await getUser(email);
      if (user && user.password === password) {
        loginMsg.textContent = 'Login erfolgreich! / Connexion réussie ! Weiterleitung ... / Redirection ...';
        loginMsg.style.color = '#008000';
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
      } else {
        loginMsg.textContent = 'Email ou mot de passe incorrect. / E-Mail oder Passwort falsch.';
        loginMsg.style.color = '#cc0000';
      }
    } catch (error) {
      console.error('Firebase error:', error);
      loginMsg.textContent = 'Fehler bei der Verbindung zur Datenbank. / Erreur de connexion à la base de données.';
      loginMsg.style.color = '#cc0000';
    }
  });

  // ---------- PASSWORT VERGESSEN ----------
  const forgotForm = document.getElementById('forgot-form');
  const forgotMsg = document.getElementById('forgot-message');

  forgotForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('forgot-username').value.trim();

    if (!email) {
      forgotMsg.textContent = 'Bitte geben Sie Ihre E-Mail ein. / Veuillez saisir votre e-mail.';
      forgotMsg.style.color = '#cc0000';
      return;
    }

    try {
      const user = await getUser(email);
      if (user) {
        forgotMsg.textContent = 'Ein Link zum Zurücksetzen wurde gesendet. / Un e-mail de réinitialisation a été envoyé.';
        forgotMsg.style.color = '#008000';
      } else {
        forgotMsg.textContent = 'Aucun compte associé à cet email. / Kein Konto mit dieser E-Mail verknüpft.';
        forgotMsg.style.color = '#cc0000';
      }
    } catch (error) {
      console.error('Firebase error:', error);
      forgotMsg.textContent = 'Fehler bei der Anfrage. / Erreur lors de la demande.';
      forgotMsg.style.color = '#cc0000';
    }
  });
});
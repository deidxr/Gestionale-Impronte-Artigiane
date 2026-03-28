/* ==========================================
   GESTIONE MENU LATERALE (SIDENAV)
   ========================================== */
function openNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
        sidenav.style.width = "250px";
    }
}

function closeNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
        sidenav.style.width = "0";
    }
}

/* ==========================================
   INVIO ORDINE A GOOGLE SHEETS
   ========================================== */
const scriptURL = 'https://script.google.com/macros/s/AKfycbzAe4ZkAKHcgj42j7L-xsfqbfIz8AuAwQCuR7BWjH8d7yK-Huly0mIuN9KRT3YoQ11bfw/exec';
const form = document.forms['contact-form'];

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Troviamo il pulsante di invio per dare un feedback
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
        const originalText = submitBtn.value || submitBtn.innerText;
        
        // Disabilitiamo il tasto durante l'invio
        if(submitBtn.tagName === "INPUT") submitBtn.value = "INVIANDO...";
        else submitBtn.innerText = "INVIANDO...";
        submitBtn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors'})
            .then(response => {
                alert("Ottimo! Ordine inserito con successo in ContactName.");
                window.location.reload();
            })
            .catch(error => {
                console.error('Errore!', error.message);
                alert("Si è verificato un errore. Riprova tra poco.");
                
                // Ripristiniamo il tasto in caso di errore
                submitBtn.disabled = false;
                if(submitBtn.tagName === "INPUT") submitBtn.value = originalText;
                else submitBtn.innerText = originalText;
            });
    });
}
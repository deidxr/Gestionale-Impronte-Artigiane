/* ==========================================
   CONFIGURAZIONE
   ========================================== */
const scriptURL = 'https://script.google.com/macros/s/AKfycbzAe4ZkAKHcgj42j7L-xsfqbfIz8AuAwQCuR7BWjH8d7yK-Huly0mIuN9KRT3YoQ11bfw/exec';

/* ==========================================
   GESTIONE MENU LATERALE
   ========================================== */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/* ==========================================
   CARICAMENTO DATI DA GOOGLE SHEETS
   ========================================== */
async function caricaOrdini() {
    const tabellaCorpo = document.getElementById('tabellaCorpo');
    
    try {
        const response = await fetch(scriptURL);
        const dati = await response.json();

        tabellaCorpo.innerHTML = '';

        if (dati.length === 0) {
            tabellaCorpo.innerHTML = '<tr><td colspan="11" style="text-align:center;">Nessun ordine in archivio.</td></tr>';
            return;
        }

        // ORDINAMENTO: Dal numero ordine più alto al più basso (i più recenti sopra)
        // Se preferisci dal più basso al più alto, scambia b.ordine e a.ordine
        dati.sort((a, b) => (parseInt(b.ordine) || 0) - (parseInt(a.ordine) || 0));

        dati.forEach(ordine => {
            const riga = document.createElement('tr');

            // Gestione colore dei badge in base allo stato
            let classeBadge = 'badge-default';
            const stato = (ordine.stato || '').toLowerCase();
            
            if (stato.includes('ricevuto')) classeBadge = 'stato-ricevuto';
            else if (stato.includes('lavorazione')) classeBadge = 'stato-lavorazione';
            else if (stato.includes('pronto')) classeBadge = 'stato-pronto';

            // Formattazione Date (se presenti)
            const formattaData = (dataStr) => {
                if (!dataStr || dataStr === '-') return '-';
                const d = new Date(dataStr);
                return isNaN(d) ? dataStr : d.toLocaleDateString('it-IT');
            };

            riga.innerHTML = `
                <td style="font-weight:bold; color:#258529;">#${ordine.ordine || '-'}</td>
                <td>${formattaData(ordine.dataO)}</td>
                <td>
                    <div style="font-weight:bold;">${ordine.nome || '-'}</div>
                    <div style="font-size:0.8rem; color:#666;">${ordine.telefono || ''}</div>
                </td>
                <td>${ordine.incaricato || '-'}</td>
                <td>${ordine.lavoro || '-'}</td>
                <td>${formattaData(ordine.dataC)}</td>
                <td style="font-weight:bold; color:#d4751b;">${ordine.posizione || '-'}</td>
                <td style="font-weight:bold;">€ ${ordine.saldo || '0.00'}</td>
                <td><span class="badge ${classeBadge}">${ordine.stato || 'Ricevuto'}</span></td>
                <td style="max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:0.8rem;">
                    ${ordine.note || ''}
                </td>
                <td style="text-align:center;">
                    <a href="tel:${ordine.telefono}" class="btn-call">
                        <i class="fa-solid fa-phone"></i>
                    </a>
                </td>
            `;
            tabellaCorpo.appendChild(riga);
        });

    } catch (errore) {
        console.error('Errore:', errore);
        tabellaCorpo.innerHTML = '<tr><td colspan="11" style="text-align:center; color:red;">Errore nel caricamento. Controlla la connessione o lo script URL.</td></tr>';
    }
}

/* ==========================================
   FUNZIONE DI RICERCA (FILTRO)
   ========================================== */
function filtraOrdini() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const righe = document.getElementById("tabellaCorpo").getElementsByTagName("tr");

    for (let i = 0; i < righe.length; i++) {
        const testoRiga = righe[i].innerText.toLowerCase();
        righe[i].style.display = testoRiga.includes(input) ? "" : "none";
    }
}

/* ==========================================
   AVVIO AUTOMATICO
   ========================================== */
document.addEventListener('DOMContentLoaded', caricaOrdini);
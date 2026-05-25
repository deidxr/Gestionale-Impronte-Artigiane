/* ==========================================
   CONFIGURAZIONE
   ========================================== */
const scriptURL = "https://script.google.com/macros/s/AKfycbyPUKyfbVDRyHnq3Yswb61iEo_YjYKEOqo8gcbubKDY2BcciKZjuacStmYuNzjT3IVOKg/exec";

let tuttiGliOrdini = [];

async function caricaOrdini() {
    const corpo = document.getElementById("tabellaCorpo");
    try {
        const response = await fetch(SCRIPT_URL);
        tuttiGliOrdini = await response.json();
        mostraOrdini(tuttiGliOrdini);
    } catch (error) {
        corpo.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:40px; color:red;">Errore nel caricamento dei dati</td></tr>`;
    }
}

function mostraOrdini(ordini) {
    const corpo = document.getElementById("tabellaCorpo");
    corpo.innerHTML = "";
    
    if (ordini.length === 0) {
        corpo.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:40px;">Nessun ordine trovato</td></tr>`;
        return;
    }

    ordini.forEach(item => {
        const tr = document.createElement("tr");
        
        let dataOrdineFormattata = "-";
        if (item.dataO) {
            if (item.dataO.includes("T")) {
                dataOrdineFormattata = new Date(item.dataO).toLocaleDateString("it-IT");
            } else {
                dataOrdineFormattata = item.dataO;
            }
        }

        let dataConsegnaFormattata = "-";
        if (item.dataC) {
            if (item.dataC.includes("T")) {
                dataConsegnaFormattata = new Date(item.dataC).toLocaleDateString("it-IT");
            } else {
                dataConsegnaFormattata = item.dataC;
            }
        }

        const statoClasse = (item.stato || "ricevuto").toLowerCase().replace(/\s+/g, "-");

        tr.innerHTML = `
            <td>#${item.ordine || "-"}</td>
            <td>${dataOrdineFormattata}</td>
            <td><strong>${item.nome || "-"}</strong><br><small style="color:#777;">${item.telefono || ""}</small></td>
            <td>${item.incaricato || "-"}</td>
            <td>${item.lavoro || "-"}</td>
            <td>${dataConsegnaFormattata}</td>
            <td>${item.posizione || "-"}</td>
            <td>€ ${parseFloat(item.saldo || 0).toFixed(2)}</td>
            <td><span class="badge stato-${statoClasse}">${item.stato || "RICEVUTO"}</span></td>
            <td>${item.note || "-"}</td>
            <td style="text-align:center;">
                ${item.telefono ? `<a href="tel:${item.telefono}" class="btn-call"><i class="fa-solid fa-phone"></i></a>` : "-"}
            </td>
        `;
        corpo.appendChild(tr);
    });
}

function filtraOrdini() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtrati = tuttiGliOrdini.filter(item => {
        return (
            (item.nome && item.nome.toLowerCase().includes(query)) ||
            (item.lavoro && item.lavoro.toLowerCase().includes(query)) ||
            (item.ordine && item.ordine.toString().includes(query)) ||
            (item.posizione && item.posizione.toLowerCase().includes(query))
        );
    });
    mostraOrdini(filtrati);
}

document.addEventListener("DOMContentLoaded", caricaOrdini);

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

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
   RICERCA BATTERIE (Pagina bt.html)
   ========================================== */
function cercaBatteria() {
    const tabellaBatterie = {
        "AG0": ["sr521sw", "sr63", "sr521", "sb-ac/dc", "280-59", "ja", "v379", "d379", "618", "gp379", "s521b", "379", "lr521", "379a", "379x", "ag0", "ag-0", "521a", "uc379", "sr418sw", "sb-ac", "379ld"],
        "AG1": ["sr621sw", "sr60", "sr621", "sb-ag/dg", "280-34", "t", "v364", "d364", "602", "s621e", "gp364", "ag1", "ag-1", "364", "l621", "lr621", "sg1", "lr60", "lr620", "sw621", "gp164", "364x", "364a", "ag1/364a", "sb-ag", "e364", "sg", "ks364", "gp64a", "g1"],
        "AG2": ["sr726sw", "sr59", "sr726", "sb-al", "280-28", "n", "v397", "d397", "607", "s726e", "gp397", "ag2", "ag-2", "397", "l726", "397a", "397x", "e397", "d396", "lr59", "lr726", "v396", "396", "612", "v", "280/52", "sb-bl", "ks396", "gp96a", "g2"],
        "AG3": ["sr41w", "sr736", "sb-b1", "280-13", "k", "v392", "d392", "247d", "s736e", "ag3", "ag-3", "gp392", "lr736", "392", "192", "l736", "g3", "v3ga", "lr41", "sg3", "a.sg3", "g3a", "v36a", "92a", "gp192", "392x", "sr41", "tr41sw", "sr41sw", "247b", "sp392", "s736s", "392a", "392x", "l736h", "l736s", "sr736pw", "rw47", "rw47s", "gp392-a1", "sr41", "e392"],
        "AG4": ["sr626sw", "sr66", "sr626", "sb-aw", "280-39", "ba", "v377", "d377", "606", "s626e", "gp377", "ag4", "ag-4", "377", "l626", "sg4", "lr626", "lr66", "sr628sw", "b377", "e377ca", "lr626sw", "377a", "sr262sw", "377x", "377s", "sr632sw", "gp177", "sr6265w", "377/376", "e377a", "sr66sw", "sr625sw", "377ba", "cr626sw", "d377", "v377", "ks377", "gp77a", "g4"],
        "AG5": ["sr754w", "sr48", "sr754", "sb-b3", "f", "v393", "d393", "255", "s754e", "gp393", "ag5", "ag-5", "393", "sg5", "lr750", "lr48", "lr754", "l750", "393s", "393a", "393x", "393b", "d309", "309", "d309/393b", "sr485w", "v309", "rw48", "v393", "255", "ks393", "gp93a-g5"],
        "AG6": ["sr920sw", "sr69", "sr921", "sb-an", "280-31", "v371", "d371", "605", "s921e", "gp371", "ag6", "ag-6", "371", "cx921", "sr290sw", "sr69", "sg6", "lr921", "lr920sw", "l921", "371a", "371x", "605", "ba", "ks371", "gp71a", "g6"],
        "AG7": ["sr927w", "sr57", "sr927", "sb-bp/ep", "280-44", "w", "v399", "d399", "613", "gp399", "926e", "399", "ag7", "ag-7", "lr927", "gr927", "sr927sw", "cx926", "399x", "399a", "sr57h", "lr926", "sb-bp", "sr927pw", "sr327w", "d395", "v395", "395", "610", "la", "280/48", "sb-ap/dp", "ks395", "gp95a"],
        "AG8": ["sr1120w", "sr55", "sr1121", "sb-bs/es", "280-30", "l", "v391", "d391", "609", "s1121e", "gp391", "ag8", "ag-8", "391", "191", "l1121", "g8", "vg8ga", "lr1120", "ca26", "v8gs", "sg8", "391a", "391x", "v8ga", "gp191", "lr55", "sb-bs", "sr1120pw", "e391", "lr1120", "391", "es", "ks391", "gp91a", "g8"],
        "AG9": ["sr936sw", "sr936", "sb-a4", "280-17", "v394", "d394", "625", "394", "gp394", "ag9", "ag-9", "sgs", "l936", "lr936", "sr45", "rw33", "394a", "394x", "sr9365w", "e394", "lr626", "v394", "ks394", "gp94a", "g9"],
        "AG10": ["sr1130w", "sr54", "sr1130", "sb-bu", "280-15", "m", "v389", "d389", "626", "s1131e", "gp389", "ag10", "ag-10", "389", "189", "l1131", "g10", "vi0ga", "lr1130", "gp189", "lr54", "sg10", "a389", "l1131", "rw89", "lr1130s", "lr1131", "l1131/d", "lr1130h", "389a", "389e", "389x", "l1133", "sr1131", "ll1131", "ll1131f", "l1131f", "l1131h", "lr1130x", "l-1151", "sr1130pw", "l1130", "lh1130", "e389", "v389", "sb/su", "ks389", "gp89a"],
        "AG11": ["sr721sw", "sr58", "sr721", "sb-ak/dk", "280-29", "s", "v362", "d362", "601", "s721e", "gp362", "ag11", "ag-11", "362", "sg11", "362a", "sr720", "362x", "362/361", "rw310", "l721", "lr721", "sb-ak", "b362", "lr271", "v361", "x", "sb-bk/ek", "gp62a", "g11"],
        "AG12": ["186", "1176a", "186-1", "g12a", "gp86a", "l1142", "lr1142", "lr43", "rw84", "vi2ga", "gp186", "l1142f", "10l124", "g12-a", "d386", "sr1142", "v386", "386", "260", "h", "280/41", "sb-b8", "ks386", "gp86a", "g12"],
        "AG13": ["1128mp", "1166a", "ag13", "d76a", "g13a", "gpa7", "gpa76", "lr44", "lr1154", "l1154", "px675a", "px76a", "rpx675", "s76", "v13ga", "rw82", "ka", "a76", "208-904", "sb-f9", "g13-a", "ca18", "ca19", "lr44", "gp76a", "l1154h", "a-76", "ag14", "ag-14", "ka76", "ms76h", "cr44", "lr44h", "l1154g", "lt44g", "gps76a", "l1154c", "l1154f", "gpa75", "gda76", "a613", "lr44gd", "sr44", "v357", "357", "228", "j", "280/62", "sb-b9", "ks357", "ks76", "gp77a", "g13"],
    };

    const inputField = document.getElementById("nomeBatteria");
    const risultatoDiv = document.getElementById("risultato");

    if (!inputField || !risultatoDiv) return;

    const nomeBatteria = inputField.value.toLowerCase().trim();

    if (nomeBatteria === "") {
        risultatoDiv.innerHTML = "Per favore, inserisci un codice.";
        risultatoDiv.style.display = "block";
        risultatoDiv.className = "result-box";
        return;
    }

    let trovato = false;

    for (const [corrispondente, batterie] of Object.entries(tabellaBatterie)) {
        if (batterie.includes(nomeBatteria)) {
            risultatoDiv.innerHTML = `CORRISPETTIVO: <span>${corrispondente}</span>`;
            risultatoDiv.className = "result-box success";
            risultatoDiv.style.display = "block";
            trovato = true;
            break;
        }
    }

    if (!trovato) {
        risultatoDiv.innerHTML = "⚠️ Batteria non trovata.";
        risultatoDiv.className = "result-box error";
        risultatoDiv.style.display = "block";
    }
}
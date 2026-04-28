/** @module funzioniArchivio.js - Modulo contenente le funzioni del progetto */
const prompt = require("prompt-sync")();
const fs = require("fs");

const STATI_VALIDI = ["attivo", "guasto", "in manutenzione"];

const normalizza = x => x[0].toUpperCase() + x.slice(1).toLowerCase();

const inserisciNome = () => prompt("Nome dispositivo: ");
const inserisciTipologia = () => prompt("Tipologia: ");
const inserisciSeriale = () => prompt("Numero di serie: ");

const inserisciStato = function(){
    let stato;
    do {
        stato = prompt("Stato (attivo / guasto / in manutenzione): ").toLowerCase().trim();
    } while (!STATI_VALIDI.includes(stato));
    return stato;
}

const inserimentoDispositivo = function(){
    let nome = normalizza(inserisciNome());
    let tipologia = normalizza(inserisciTipologia());
    let seriale = inserisciSeriale().trim();
    let stato = inserisciStato();
    
    let nuovoDispositivo = { "Nome": nome, "Tipologia": tipologia, "Seriale": seriale, "Stato": stato, "Manutenzioni": [] };
    return nuovoDispositivo;
}

const controlloDuplicato = function(inventario, nuovoDispositivo){
    return inventario.every(x => x.Seriale !== nuovoDispositivo.Seriale);
}

const cambiaStato = function(inventario, seriale){
    let index = inventario.findIndex(x => x.Seriale === seriale);
    if (index === -1) return false;
    let nuovoStato = inserisciStato();
    inventario[index].Stato = nuovoStato;
    return true;
}

const visualizzaInventario = function(inventario){
    inventario.forEach(x => console.log(x));
}



const aggiuntaNota = function(inventario, seriale){
    let index = inventario.findIndex(x => x.Seriale === seriale);
    if (index === -1) return false;
    let data = prompt("Data intervento (gg/mm/aaaa): ").trim();
    let descrizione = prompt("Descrizione intervento: ").trim();
    let nota = { "Data": data, "Descrizione": descrizione };
    inventario[index].Manutenzioni.push(nota);
    return true;
}

const ricercaPerStato = function(inventario, stato){
    inventario.forEach(x => {
        if (x.Stato === stato) {
            console.log(x);
        }
    });
}

const esportaJSON = function(inventario){
    let nomeFile = "inventario_export.json";
    fs.writeFileSync(nomeFile, JSON.stringify(inventario, null, 2));
    console.log("File esportato: " + nomeFile);
}

module.exports = { inserimentoDispositivo, controlloDuplicato, cambiaStato, visualizzaInventario, aggiuntaNota, ricercaPerStato, esportaJSON };
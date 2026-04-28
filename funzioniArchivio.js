/** @module funzioniArchivio.js - Modulo contenente le funzioni del progetto */
const prompt = require("prompt-sync")();
const fs = require("fs");

const STATI_VALIDI = ["attivo", "guasto", "in manutenzione"];

/**
 * Funzione per normalizzare i nomi con la prima lettera maiuscola e il resto minuscolo
 * @param {String} x Stringa da normalizzare
 * @returns {String} Stringa normalizzata
 */
const normalizza = x => x[0].toUpperCase() + x.slice(1).toLowerCase();

// Funzioni di Input 

/**
 * Funzione generale per l'inserimento del nome del dispositivo
 * @returns {String} Nome del dispositivo
 */
const inserisciNome = () => prompt("Nome dispositivo: ");

/**
 * Funzione generale per l'inserimento della tipologia del dispositivo
 * @returns {String} Tipologia del dispositivo
 */
const inserisciTipologia = () => prompt("Tipologia: ");

/**
 * Funzione generale per l'inserimento del numero di serie del dispositivo
 * @returns {String} Numero di serie del dispositivo
 */
const inserisciSeriale = () => prompt("Numero di serie: ");

/**
 * Funzione per l'inserimento e la validazione dello stato operativo
 * @returns {String} Stato operativo valido inserito dall'utente
 */
const inserisciStato = function(){
    let stato;
    do {
        stato = prompt("Stato (attivo / guasto / in manutenzione): ").toLowerCase().trim();
    } while (!STATI_VALIDI.includes(stato));
    return stato;
}

// Logica Archivio 

/**
 * Funzione per l'inserimento di un nuovo dispositivo hardware
 * @returns {Object} Oggetto rappresentante il nuovo dispositivo
 */
const inserimentoDispositivo = function(){
    let nome = normalizza(inserisciNome());
    let tipologia = normalizza(inserisciTipologia());
    let seriale = inserisciSeriale().trim();
    let stato = inserisciStato();
    return { "Nome": nome, "Tipologia": tipologia, "Seriale": seriale, "Stato": stato, "Manutenzioni": [] };
}

/**
 * Funzione per controllare che un numero di serie non sia già presente
 * @param {Array} inventario Lista dei dispositivi registrati
 * @param {Object} nuovoDispositivo Nuovo dispositivo da controllare
 * @returns {Boolean} Restituisce "true" se il seriale è univoco, altrimenti "false"
 */
const controlloDuplicato = function(inventario, nuovoDispositivo){
    return inventario.every(x => x.Seriale !== nuovoDispositivo.Seriale);
}

/**
 * Funzione per modificare lo stato operativo di un dispositivo
 * @param {Array} inventario Lista dei dispositivi registrati
 * @param {String} seriale Numero di serie del dispositivo da aggiornare
 * @returns {Boolean} Restituisce true se l'aggiornamento è avvenuto, sennò false
 */
const cambiaStato = function(inventario, seriale){
    let index = inventario.findIndex(x => x.Seriale === seriale);
    if (index === -1) return false;
    let nuovoStato = inserisciStato();
    inventario[index].Stato = nuovoStato;
    return true;
}

/**
 * Funzione per la visualizzazione completa dell'inventario
 * @param {Array} inventario Lista dei dispositivi registrati
 */
const visualizzaInventario = function(inventario){
    inventario.forEach(x => console.log(x));
}

// --- Funzioni Avanzate (Fase 2/3) ---

/**
 * Funzione per aggiungere una nota di manutenzione a un dispositivo
 * @param {Array} inventario Lista dei dispositivi registrati
 * @param {String} seriale Numero di serie del dispositivo a cui aggiungere la nota
 * @returns {Boolean} Restituisce "true" se la nota è stata aggiunta, altrimenti "false"
 */
const aggiuntaNota = function(inventario, seriale){
    let index = inventario.findIndex(x => x.Seriale === seriale);
    if (index === -1) return false;
    let data = prompt("Data intervento (gg/mm/aaaa): ").trim();
    let descrizione = prompt("Descrizione intervento: ").trim();
    let nota = { "Data": data, "Descrizione": descrizione };
    inventario[index].Manutenzioni.push(nota);
    return true;
}

/**
 * Funzione per la ricerca e visualizzazione dei dispositivi in base allo stato operativo
 * @param {Array} inventario Lista dei dispositivi registrati
 * @param {String} stato Stato operativo da ricercare
 */
const ricercaPerStato = function(inventario, stato){
    inventario.forEach(x => {
        if (x.Stato === stato) console.log(x);
    });
}

/**
 * Funzione per l'esportazione dell'inventario in formato JSON su file
 * @param {Array} inventario Lista dei dispositivi registrati
 */
const esportaJSON = function(inventario){
    let nomeFile = "inventario_export.json";
    fs.writeFileSync(nomeFile, JSON.stringify(inventario, null, 2));
    console.log("File esportato con successo: " + nomeFile);
}

module.exports = { 
    inserimentoDispositivo, 
    controlloDuplicato, 
    cambiaStato, 
    visualizzaInventario, 
    aggiuntaNota, 
    ricercaPerStato, 
    esportaJSON 
};
const inv = require("./funzioniArchivio");
const prompt = require("prompt-sync")();

/**
 * Rappresenta un dispositivo hardware
 * @typedef {Object} Dispositivo
 * @property {String} Nome Nome del dispositivo
 * @property {String} Tipologia Tipologia del dispositivo
 * @property {String} Seriale Numero di serie del dispositivo
 * @property {String} Stato Stato operativo del dispositivo
 * @property {Object[]} Manutenzioni Lista interventi
 */

function main() {
    let inventario = [];
    while (true)
    {
        console.log("\n--- Menù ---\n1. Registra Dispositivo\n2. Cambia Stato Dispositivo\n3. Visualizza Inventario\n4. Aggiungi Nota Manutenzione\n5. Ricerca per Stato\n6. Esporta Inventario (JSON)\n0. Uscita dal programma");
        let scelta;
        do {
            scelta = Number(prompt("Scelta: "));
        } while (isNaN(scelta));

        switch (scelta)
        {
            case 1:
                let nuovoDispositivo = inv.inserimentoDispositivo();
                if (inv.controlloDuplicato(inventario, nuovoDispositivo)) {
                    inventario.push(nuovoDispositivo);
                    console.log("\x1b[32mDispositivo Registrato\x1b[0m");
                } else {
                    console.log("\x1b[31mNumero di serie già presente\x1b[0m");
                }
                break;
            case 2:
                let seriale = prompt("Numero di serie del dispositivo: ").trim();
                if (inv.cambiaStato(inventario, seriale)) {
                    console.log("\x1b[32mStato aggiornato\x1b[0m");
                } else {
                    console.log("\x1b[31mDispositivo non trovato\x1b[0m");
                }
                break;
            case 3:
                inv.visualizzaInventario(inventario);
                break;
            case 4:
                let serialeNota = prompt("Numero di serie del dispositivo: ").trim();
                if (inv.aggiuntaNota(inventario, serialeNota)) {
                    console.log("\x1b[32mNota aggiunta\x1b[0m");
                } else {
                    console.log("\x1b[31mDispositivo non trovato\x1b[0m");
                }
                break;
            case 5:
                let statoRicerca = prompt("Stato da ricercare (attivo / guasto / in manutenzione): ").toLowerCase().trim();
                inv.ricercaPerStato(inventario, statoRicerca);
                break;
            case 6:
                inv.esportaJSON(inventario);
                break;
            case 0:
                console.log("\x1b[34mUscita dal Programma\x1b[0m");
                return;
            default:
                console.log("Scelta Errata.");
                break;
        }
    }
}
main();
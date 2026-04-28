const inv = require("./funzioniArchivio");
const prompt = require("prompt-sync")();

/**
 * Rappresenta un dispositivo hardware
 * @typedef {Object} Dispositivo
 * @property {String} Nome Nome del dispositivo
 * @property {String} Tipologia Tipologia del dispositivo
 * @property {String} Seriale Numero di serie del dispositivo
 * @property {String} Stato Stato operativo del dispositivo
 */

function main() {
    /**
     * @type {Dispositivo[]}
     */
    let inventario = [];
    while (true)
    {
        console.log("\n--- Menù FASE 1 ---\n1. Registra Dispositivo\n2. Cambia Stato Dispositivo\n3. Visualizza Inventario\n0. Uscita dal programma");
        let scelta;
        do {
            scelta = Number(prompt("Scelta: "));
        } while (isNaN(scelta));

        switch (scelta)
        {
            case 1:
                let nuovoDispositivo = inv.inserimentoDispositivo();
                if (inv.controlloDuplicato(inventario, nuovoDispositivo))
                {
                    inventario.push(nuovoDispositivo);
                    console.log("\x1b[32mDispositivo Registrato\x1b[0m");
                }
                else
                {
                    console.log("\x1b[31mNumero di serie già presente\x1b[0m");
                }
                break;
            case 2:
                let seriale = prompt("Numero di serie del dispositivo: ").trim();
                if (inv.cambiaStato(inventario, seriale))
                {
                    console.log("\x1b[32mStato aggiornato\x1b[0m");
                }
                else
                {
                    console.log("\x1b[31mDispositivo non trovato\x1b[0m");
                }
                break;
            case 3:
                inv.visualizzaInventario(inventario);
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
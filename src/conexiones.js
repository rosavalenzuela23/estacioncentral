const estacion_central_queue = '/queue/estacion.central.recibir';
const envioQueue = '/queue/estacion.central'
const { contextBridge } = require('electron');

const listaCallback = [];

contextBridge.exposeInMainWorld('rabbit', { 
    agregarSubscriptorRabbit: (callback) => {
        listaCallback.push(callback);
    },
    cambiarEstadoSemaforo: (semaforo) => {
        enviarMensaje(semaforo);
    }
})

let globalClient = undefined;

export function on_connect(client) {

    globalClient = client;

    alert('Conexion realizada con exito');

    client.subscribe(estacion_central_queue, message => {
        for (const callback of listaCallback) { 
            callback(message);
        }
    })

    enviarMensaje({cmd: 'obtenerMapa'});

}

function enviarMensaje(msg) {
    if (globalClient == undefined) throw new Error("No existe una conexion con el cliente");

    console.log(globalClient);

    globalClient.send("/queue/estacion.central", {}, JSON.stringify(msg));

}

export function on_error() {
    alert('Hubo un error al interntar conectarse, porfavor reinicie la pagina');
    //la neta no se si va algo mas aqui
}

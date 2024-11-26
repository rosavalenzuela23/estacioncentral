// Make an instance of two and place it on the page.
class Mapa {
    semaforos;

    verificarClick(x, y) {
        for (const s of this.semaforos) {

            //verficar que el click este en el rango de las x
            if (x >= s.posicionx && x <= s.posicionx + 40) {
                //verificar que el click este en rango de las y's
                if (y >= s.posiciony && y <= s.posiciony + 40) {
                    //si hizo click en un semaforo, lo que significa cambiarlo
                    //de estado
                    rabbit.cambiarEstadoSemaforo({cmd: 'actualizar', data: s});
                    return;
                }
            }

        }
    }

}



let mapa = new Mapa();

document.addEventListener('click', evt => {
    mapa.verificarClick(evt.clientX, evt.clientY);  
})

const params = {
    fullscreen: true
};
const elem = document.body;
const two = new Two(params).appendTo(elem);


function actualizarMapa(mapajson) {
    mapa.semaforos = mapajson.semaforos;

    two.clear();
    for (const c of mapajson.caminos) {
        //dibujar cada camino
        const pi = c.posicionInicio;
        const pf = c.posicionFinal;
        two.makeLine(pi.x, pi.y, pf.x, pf.y);
    }

    for (const s of mapajson.semaforos) {
        const rect = two.makeRectangle(s.posicionx, s.posiciony, 40, 40);
        if (s.estado == 'VERDE') {
            rect.fill = 'rgb(0, 255, 0)';
        } else if (s.estado == 'ROJO') {
            rect.fill = 'rgb(255, 0, 0)';
        }
    }


    two.update();
}


rabbit.agregarSubscriptorRabbit( (msg) => {
    actualizarMapa(JSON.parse(msg.body));
});
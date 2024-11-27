// Make an instance of two and place it on the page.
const urlCarroSvg = './svg/car.svg';

class Mapa {
    semaforos;
    vehiculos = new Map();

    verificarClick(x, y) {
        for (const s of this.semaforos) {

            //verficar que el click este en el rango de las x
            if (x >= s.posicionx - 20 && x <= s.posicionx + 20) {
                //verificar que el click este en rango de las y's
                if (y >= s.posiciony - 20 && y <= s.posiciony + 20) {
                    //si hizo click en un semaforo, lo que significa cambiarlo
                    //de estado
                    rabbit.cambiarEstadoSemaforo({cmd: 'actualizar', data: s});
                    return;
                }
            }

        }
    }

    actualizarVehiculo(v) {
        if(!this.vehiculos.get(v.identificador)) {
            this.agregarVehiculo(v);
            return;
        }

        this.vehiculos.get(v.identificador)['svg'].setAttribute(
            'style',
            `transform: translate(${v.posicion.x}px, ${v.posicion.y}px);`
        );

        //nada
    }

    agregarVehiculo(v) {
        const svg = document.createElement('img');
        svg.setAttribute('width', 20);
        svg.setAttribute('height', 20);
        svg.setAttribute('style', `transform: translate(${v.posicion.x}px, ${v.posicion.y}px);`)
        svg.id = v.identificador;
        svg.setAttribute('src', urlCarroSvg);
        document.body.append(svg);
        v['svg'] = svg;
        this.vehiculos.set(v.identificador, v);
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

        for (const car of c.vehiculos) {
            mapa.actualizarVehiculo(car);
        }

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
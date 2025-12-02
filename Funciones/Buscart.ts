import { rl, tareas, limpiarYMostrar } from '../main';
import { menu } from '../main';
import { Tarea } from '../Tarea';
import { mostrarListaYDetalles } from './Vert';

export function buscarTarea() {
    console.clear();
    rl.question("Ingrese el título o parte del título de la tarea: ", (busqueda: string) => {
        if (busqueda.length === 0) {
            limpiarYMostrar("Debe ingresar algún texto para buscar.", buscarTarea);
            return;
        }
        
        const busquedaLower = busqueda.toLowerCase();
        const resultados: Tarea[] = [];

        for (let i = 0; i < tareas.length; i++) {
            const tarea = tareas[i];
            if (tarea.titulo.toLowerCase().includes(busquedaLower)) {
                resultados.push(tarea);
            }
        }

        if (resultados.length === 0) {
            console.log("No se encontraron tareas con ese título.");
            rl.question("0 para volver al menú principal, cualquier otra tecla para intentar otra búsqueda: ", (respuesta) => {
                if (respuesta === "0") {
                    menu();
                } else {
                    buscarTarea();
                }
            });
        } else {
            console.log("Tareas encontradas:");
            mostrarListaYDetalles(resultados, buscarTarea); 
        }
    });
}
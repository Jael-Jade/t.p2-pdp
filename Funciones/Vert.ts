import { rl, tareas, limpiarYMostrar } from '../main';
import { menu } from '../main';
import { Tarea } from '../Tarea';
import { editarTarea } from './editart';

export function mostrarListaYDetalles(lista: Tarea[], volverFunc: Function) {
    console.clear();
    if (lista.length === 0) {
        console.log("No hay tareas que cumplan esta condición.");
        rl.question("0 para volver al menú anterior: ", (respuesta) => {
            if (respuesta === "0") {
                volverFunc();
            } else {
                menu();
            }
        });
        return;
    }

    console.log("--- Tareas Encontradas ---");
    lista.forEach(t => {
        console.log(`${t.id} - ${t.titulo} [${t.estado}]`);
    });
    console.log("--------------------------");

    rl.question("Ingrese el ID de la tarea para ver detalles, o 0 para volver: ", (idTareaStr: string) => {
        if (idTareaStr === "0") {
            volverFunc();
            return;
        }

        const idNum = parseInt(idTareaStr);
        let tarea: Tarea | undefined;
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].id === idNum) {
                tarea = lista[i];
                break;
            }
        }

        if (tarea) {
            console.clear();
            console.log("--- Detalles de la Tarea ---");
            console.log(`ID:           ${tarea.id}`);
            console.log(`Título:       ${tarea.titulo}`);
            console.log(`Descripción:  ${tarea.descripcion || 'Sin Datos'}`);
            console.log(`Estado:       ${tarea.estado}`);
            console.log(`Dificultad:   ${tarea.dificultad}`);
            console.log(`Vencimiento:  ${tarea.vencimiento ? tarea.vencimiento.toLocaleDateString() : 'Sin Datos'}`);
            console.log(`Creación:     ${tarea.creacion.toLocaleDateString()}`);
            console.log("--------------------------");
            
            console.log("1 para editar esta tarea");
            console.log("0 para volver a la lista");
            console.log("Cualquier otra tecla para Menú Principal");

            rl.question("Seleccione una opción: ", (opcion: string) => {
                switch (opcion) {
                    case "1":
                        editarTarea(tarea, () => mostrarListaYDetalles(lista, volverFunc));
                        break;
                    case "0":
                        mostrarListaYDetalles(lista, volverFunc);
                        break;
                    default:
                        menu();
                        break;
                }
            });
        } else {
            console.log("ID no válido.");
            mostrarListaYDetalles(lista, volverFunc); 
        }
    });
}

export function verTareas() {
    if (tareas.length === 0) {
        limpiarYMostrar("No hay tareas", menu);
        return;
    }

    console.log("--- ¿Qué tareas deseas ver? ---");
    console.log("1. Todas las tareas");
    console.log("2. Pendientes");
    console.log("3. En curso");
    console.log("4. Terminadas");
    console.log("0. Volver al menú principal");

    rl.question("Seleccione una opción: ", (opcion: string) => {
        const listaFiltrada: Tarea[] = [];
        const volver: Function = verTareas;
        let condicionEstado: Tarea['estado'] | 'todas' = 'todas';
        
        switch (opcion) {
            case "1":
                condicionEstado = 'todas';
                break;
            case "2":
                condicionEstado = 'pendiente';
                break;
            case "3":
                condicionEstado = 'en curso';
                break;
            case "4":
                condicionEstado = 'terminada';
                break;
            case "0":
                menu();
                return;
            default:
                limpiarYMostrar("Opción no válida", verTareas);
                return;
        }

        for (let i = 0; i < tareas.length; i++) {
            const tarea = tareas[i];
            if (condicionEstado === 'todas' || tarea.estado === condicionEstado) {
                listaFiltrada.push(tarea);
            }
        }

        mostrarListaYDetalles(listaFiltrada, volver);
    });
}
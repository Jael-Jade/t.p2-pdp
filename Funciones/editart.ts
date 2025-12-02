import { rl, limpiarYMostrar } from '../main';
import { menu } from '../main';
import { Tarea } from '../Tarea';

export function editarTarea(tarea: Tarea, volverALista: Function) {
    console.clear();
    console.log("--- Editar tarea - ID:", tarea.id, "---");
    console.log("Deje vacío para no cambiar. Ingrese '--' para dejar un campo en blanco o nulo.");

    rl.question(`Título actual (${tarea.titulo}): `, (nuevoTitulo: string) => {
        if (nuevoTitulo.length > 0) tarea.titulo = nuevoTitulo;
        
        rl.question(`Descripción actual (${tarea.descripcion || 'Sin Datos'}): `, (nuevaDesc: string) => {
            if (nuevaDesc === '--') {
                tarea.descripcion = '';
            } else if (nuevaDesc.length > 0) {
                tarea.descripcion = nuevaDesc;
            }

            rl.question(`Estado actual (${tarea.estado}) [pendiente/en curso/terminada]: `, (nuevoEstado: string) => {
                const estadoValido = ["pendiente", "en curso", "terminada"];
                if (estadoValido.includes(nuevoEstado.toLowerCase())) {
                    tarea.estado = nuevoEstado.toLowerCase() as Tarea['estado'];
                }

                rl.question(`Vencimiento actual (${tarea.vencimiento ? tarea.vencimiento.toLocaleDateString() : 'Sin Datos'}): `, (nuevoVenc: string) => {
                    if (nuevoVenc === '--') {
                        tarea.vencimiento = null;
                    } else if (nuevoVenc.length > 0) {
                        tarea.vencimiento = new Date(nuevoVenc);
                    }

                    rl.question(`Dificultad actual (${tarea.dificultad}) [facil/medio/dificil]: `, (nuevaDif: string) => {
                        const dificultadValida = ["facil", "medio", "dificil"];
                        if (dificultadValida.includes(nuevaDif.toLowerCase())) {
                            tarea.dificultad = nuevaDif.toLowerCase() as Tarea['dificultad'];
                        }

                        console.clear();
                        console.log("¡Tarea actualizada correctamente!");
                        
                        rl.question("0 para volver a la lista, cualquier otra tecla para Menú Principal: ", (respuesta: string) => {
                            if (respuesta === "0") {
                                volverALista();
                            } else {
                                menu();
                            }
                        });
                    });
                });
            });
        });
    });
}
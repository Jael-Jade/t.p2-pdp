import { rl, tareas, proximoId, limpiarYMostrar } from '../Tarea';
import { menu } from '../main';
import { Tarea } from '../Tarea';

export function agregarTarea() {
    console.log("--- Agregar una nueva tarea ---");
    rl.question("Ingrese el titulo de la tarea: ", (titulo: string) => {
        if (titulo.length === 0) {
            limpiarYMostrar("El titulo no puede estar vacio.", agregarTarea);
            return;
        }

        rl.question("Ingrese la descripcion de la tarea: ", (descripcion: string) => {
            rl.question("Ingrese el vencimiento (aaaa-mm-dd, o vacío): ", (vencimientouser: string) => {
                const vencimiento: Date | null = vencimientouser ? new Date(vencimientouser) : null;
                
                console.log("\nSeleccione el estado (1: Pendiente, 2: En curso, 3: Terminada)");
                rl.question("Opcion: ", (opcionEstado: string) => {
                    let estado: Tarea['estado'] = 'pendiente';
                    if (opcionEstado === '2') estado = 'en curso';
                    if (opcionEstado === '3') estado = 'terminada';
                    
                    console.log("\nSeleccione la dificultad (1: Facil, 2: Medio, 3: Dificil)");
                    rl.question("Opcion: ", (opcionDificultad: string) => {
                        let dificultad: Tarea['dificultad'] = 'facil';
                        if (opcionDificultad === '2') dificultad = 'medio';
                        if (opcionDificultad === '3') dificultad = 'dificil';

                        proximoId++;
                        const nuevaTarea: Tarea = { 
                            id: proximoId,
                            titulo,
                            descripcion,
                            estado,
                            creacion: new Date(),
                            vencimiento,
                            dificultad
                        };

                        tareas.push(nuevaTarea);
                        limpiarYMostrar("Tarea agregada y guardada exitosamente.", menu);
                    });
                });
            });
        });
    });
}
import * as readline from 'readline';
import { agregarTarea } from './Funciones/Agregart';
import { verTareas } from './Funciones/Vert';
import { buscarTarea } from './Funciones/Buscart';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function limpiarYMostrar(mensaje: string, callback: Function) {
    console.clear();
    console.log(mensaje);
    callback();
}

export function menu() {
    console.log("\n--- Gestor de Tareas en TS ---");
    console.log("1. Ver tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("0. Salir");
    
    rl.question("Seleccione una opcion: ", function(opcion: string){
        switch(opcion){
            case "1":
                console.clear();
                verTareas();
                break;
            case "2":
                console.clear();
                buscarTarea();
                break;
            case "3":
                console.clear();
                agregarTarea();
                break;
            case "0":
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                limpiarYMostrar("Opcion no valida", menu);
                break;
        }
    });
};

menu();
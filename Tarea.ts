export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en curso' | 'terminada';
    creacion: Date;
    vencimiento: Date | null;
    dificultad: 'facil' | 'medio' | 'dificil';
    ultimaEdicion?: Date;
}
export const tareas: Tarea[] = [];
export let proximoId: number = 0;
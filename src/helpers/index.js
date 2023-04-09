export const generarID = () => {
    let random  = Math.random().toString(36).substr(2);
    let fecha   = Date.now().toString(36);
    return random + fecha;
}

export const formatearFecha = (fecha) => {
    const newFecha = new Date(fecha);
    const opciones = {
        year    :   "numeric",
        month   :   "long",
        day     :   "2-digit"
    }
    return newFecha.toLocaleDateString('es-ES', opciones);
}
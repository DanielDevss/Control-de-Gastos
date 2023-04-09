import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({ 
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
  }) => {

  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
    
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1300);

  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  const handleReset = () => {
    const resultado = confirm('¿Seguro que desea reiniciar la app?');
    if(resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }


  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          value={porcentaje} 
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#3b92f6',
            trailColor: '#f5f5f5',
            textColor: porcentaje > 100 ? '#dc2626' : '#3b92f6'
          })}

        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleReset}>Resetear App</button>
        <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
        <p className={`${porcentaje>100 ? "negativo" : ''}`}><span>Disponible: </span>{formatearCantidad(disponible)}</p>
        <p><span>Gasto: </span>{formatearCantidad(gastado)}</p>
      </div>
    </div>
  )
}

export default ControlPresupuesto

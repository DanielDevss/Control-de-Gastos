import React from 'react'
import Gasto from './Gasto'

const ListaGastos = ({
  gastos,
  setDetectarGasto,
  eliminarGasto,
  gastosFiltrado,
  filtro,
}) => {


  return (
    <div className='listado-gastos contenedor'>

      {
        filtro ? (
          <>
            <h2>{gastosFiltrado.length > 0 ? "Gastos" : "Aún no hay gastos en está categoría"}</h2>
            {gastosFiltrado.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setDetectarGasto={setDetectarGasto}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{gastosFiltrado.length > 0 ? "Gastos" : "Aún no hay gastos"}</h2>
            {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setDetectarGasto={setDetectarGasto}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        )
      }
    </div>
  )
}

export default ListaGastos

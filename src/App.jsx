import { useEffect,useState } from 'react'
import Header from './components/Header'
import ListaGastos from './components/ListaGastos'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import {generarID} from './helpers/index.js' 
import Filtros from './components/Filtros'
function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem('presupuesto')) ?? 0 );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  //Hook Para Modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  //Hook Detectar Gastos
  const [detectarGasto, setDetectarGasto] = useState({});

  //Hook filtro
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrado, setGastosFiltrado] = useState([]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto)
  }, [presupuesto])

  //Gastos en Local Storage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos] );

  useEffect(() => {

    const presupuestoLS = Number(localStorage.getItem('presupuesto'))
    if( presupuestoLS > 0 ){
      setIsValidPresupuesto(true)
    }

  }, [])

  //Modal para detectar edicion
  useEffect(() => {
    if(Object.keys(detectarGasto).length > 0) {
      console.log('Hay algo en editar Gasto');
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }

  },[detectarGasto])

  //Filtro de gastos
  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      console.log(gastosFiltrados)
      setGastosFiltrado(gastosFiltrados);
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true);
    setDetectarGasto({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  //ANCHOR GUARDDAR GASTO
  const guardarGasto = (gasto) => {

    if(gasto.id){
      // Actualizar gasto
      const gastosActualizado = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizado);
      setDetectarGasto({})
    }else{
      // Nuevo gasto
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }


    setAnimarModal(false);
    setTimeout(()=>{
        setModal(false)
    }, 500)
  }

  //ANCHOR ELIMINAR GASTO
  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
    console.log(gastosActualizados);
    setGastos(gastosActualizados);
  } 

  return (
    <div className={modal ? "fijar" : ""}>
      <Header 
        gastos={gastos}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (      
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListaGastos
              gastos={gastos}
              setDetectarGasto={setDetectarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrado={gastosFiltrado}
            />
            
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal 
                  detectarGasto={detectarGasto}
                  setModal={setModal} 
                  animarModal={animarModal} 
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  setDetectarGasto={setDetectarGasto}
                   />}
    </div>
  )
}

export default App

import {useEffect, useState} from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal,animarModal, setAnimarModal, guardarGasto,detectarGasto, setDetectarGasto}) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre,setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if(Object.keys(detectarGasto).length > 0){
            setNombre(detectarGasto.nombre)
            setCantidad(detectarGasto.cantidad)
            setCategoria(detectarGasto.categoria)
            setFecha(detectarGasto.fecha)
            setId(detectarGasto.id)
        }
    }, []);


    const ocultarModal = () => {
        setAnimarModal(false);
        setDetectarGasto({})
        setTimeout(()=>{
            setModal(false)
        }, 500)

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre,cantidad,categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')
            setDetectarGasto({})
            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return
        }

        guardarGasto({nombre, cantidad, categoria,fecha ,id})

    }


    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                    src={CerrarBtn}
                    alt="cerrar modal" 
                    onClick={ocultarModal}
                 />
            </div>
            <form className={`formulario ${animarModal ? "animar" : 'cerrar' }`} onSubmit={handleSubmit} >
                
                <legend>{detectarGasto.nombre ? "Editar gasto" : "Nuevo gasto"}</legend>

                { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input type="text" placeholder='Ingresa el nombre del gasto' id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value) } />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" placeholder='Añade la cantidad del gasto' id='cantidad' value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categorìa</label>
                    <select id='categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">-- Seleccione categorìa --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                    
                </div>

                <input type="submit" value={detectarGasto.nombre ? "Actualizar Gasto" : "Añadir Gasto"} />

            </form>
        </div>
    )
}

export default Modal

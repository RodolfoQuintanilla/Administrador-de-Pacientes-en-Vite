import { useState, useEffect } from "react";
import Error from "./error";


const Formulario = ({ pacientes, setpacientes, paciente, setpaciente }) => {


    const [nombre, setnombre] = useState('');
    const [propietario, setpropietario] = useState('');
    const [email, setemail] = useState('');
    const [fecha, setfecha] = useState('');
    const [sintomas, setsintomas] = useState('');

    const [error, seterror] = useState(false);


    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setnombre(paciente.nombre);
            setpropietario(paciente.propietario);
            setemail(paciente.email);
            setfecha(paciente.fecha);
            setsintomas(paciente.sintomas);
        }

    }, [paciente]);



    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            seterror(true);
            return;
        }
        seterror(false);

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            id: generarId()
        };

        if (paciente.id) {
            //Editando registro
            objetoPaciente.id = paciente.id;
            console.log(objetoPaciente);
            console.log(paciente);

            const pacientesActualizados = pacientes.map(pasienteState => pasienteState.id ===
                paciente.id ? objetoPaciente : pasienteState);

            setpacientes(pacientesActualizados);
            setpaciente({});

        } else {
            objetoPaciente.id = generarId();
            setpacientes([...pacientes, objetoPaciente]);
        }


        setnombre('');
        setpropietario('');
        setemail('');
        setfecha('');
        setsintomas('');

    };

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>


            <p className="text-lg mt-5 text-center mb-10">
                Añadir Paciente y {''}
                <span className="text-indigo-600 font-bold">Administrarlos
                </span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

                {error && (
                    <Error >Todos los campos son Obligatorios </Error>
                )}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase 
                    font-bold">Nombre Mascota:</label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setnombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase 
                    font-bold">Nombre Propietario:</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setpropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase 
                    font-bold">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase 
                    font-bold">Alta:</label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setfecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase 
                    font-bold">Sintomas:</label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los Sintomas"
                        value={sintomas}
                        onChange={(e) => setsintomas(e.target.value)}
                    />


                </div>

                <input
                    type="submit"
                    className="border-2  p-2 mt-2 bg-indigo-600 w-full p3
                     text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer
                     transition-colors
                     "
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />
            </form>
        </div>
    );

};

export default Formulario;
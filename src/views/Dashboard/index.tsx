import { FormEvent, useEffect, useState } from 'react'
import { MagnifyingGlass, Funnel, CaretLeft , CaretRight  } from "phosphor-react";
import Header from '../../components/Header';
import Load from '../../components/load';
import * as Dialog from '@radix-ui/react-dialog';
import CardEditCar from "../../components/CardEditCar"
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import '../../input.css';
import api from '../../Services/api';
import { useNavigate } from 'react-router';


interface DataCar {
    id:string, 
    city:string,
    name:string
    brand:string, 
    model:string, 
    year:string, 
    km:string, 
    price:number,
    image:string
  }
  


function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState(false);
    const [catalogoList, setCatalogoList] = useState<DataCar[]>([])

    
    const navigate = useNavigate();

    const handleClickAlterFunction = (alterFor:string) => {

        switch (alterFor) {
            case "Listar":
                document.getElementById("cadastrar").style.display = "none";
                document.getElementById("listar").style.display = "block";
                // location.reload()
                break;
            case "Cadastrar":
                document.getElementById("listar").style.display = "none";
                document.getElementById("cadastrar").style.display = "block";
                break;
            default:
                break;
        }
       
    }
 
    const handleClickLogOut = () => {
        navigate('/Login')
        localStorage.clear();
    }

    async function handleCreatedCar(event: FormEvent){
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        // console.log(data.email)
        const token = JSON.parse(localStorage.getItem('user')).token.token

      
        if(!data.localidade || !data.modelo || !data.marca || !data.detalhe || !data.ano || !data.km || !data.price ){
            setMessage("Preencha todos os campos")
            setError(true)
            setLoading(false)
            return
        }
        
          

        
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await api.post(`/create/auto`, {
                "city":data.localidade,
                "name":data.modelo,
                "brand":data.marca, 
                "model":data.detalhe, 
                "year":data.ano, 
                "km":data.km, 
                "price":+data.price
           
          }, config).then(async response => {

            console.log(response.data._id)
            const header = {
                headers: {  "Content-Type": "multipart/form-data" }
            };
        
          

            var reader = new FileReader();
            reader.readAsDataURL(data.image);

                reader.onload = async function () {

                    await api.post(`/upload/car/${response.data._id}/image`, {  
                        "image":reader.result
                    }, header).then(response => {
                        console.log(response)

                    })

                }

            setMessage("Veiculo Criado com Sucesso")
            setLoading(false)
            location.reload()
            
          }).catch(error => {
            console.log(error.response.status)
            setError(true)

            if(error.response.status !== 201){
                setLoading(false)
                setMessage("Erro ao cadastrar novo veiculo")
            }

            if(error.response.status == 403){
                setLoading(false)
                navigate('/Login')
                localStorage.clear();
            }
        })
         
        }catch(err){
          console.log(err)
          setError(true)
          setLoading(false)
          setMessage("Ocorreu um erro inesperado para cadastrar novo veiculo")
        }
      }
        
  useEffect(() => {
    
    api.get(`/list/auto`)
    .then((response) =>{
      console.log(response.data)
      
      setCatalogoList(response.data.Cars)
    //   setLoad(false)
    })
    .catch((error) => {
      console.log("[ERROR LIST] "+ error)
    })
  

}, [])

  return  (
     <>
 
        <div className='flex justify-between'>
            <div className='w-[256px] h-screen float-left bg-[white] fixed flex flex justify-center pt-[100px]'>
                <div>
                 <img src="/Símbolo-texto-horizontal.svg" className="w-[164px] h-[27px]" />
                    <div className='mt-[100px] text-[14px] text-[#1E1A17] h-[410px]'>
                        <h1 className='mb-[20px]'>Geral</h1>

                        <h1 className='ml-[52px] gap-[16px] text-[16px] mb-[14px] cursor-pointer flex' onClick={() => handleClickAlterFunction("Listar")}><img src="/format-list-bulleted.svg"/> Listar Veículo</h1>
                        <h1 className='ml-[52px] gap-[16px] text-[16px]  mb-[14px] cursor-pointer flex' onClick={() => handleClickAlterFunction("Cadastrar")}><img src="/car.svg"/>  Cadastrar Veículo</h1>
                        <h1 className='ml-[52px] gap-[16px] text-[16px] cursor-pointer flex' onClick={handleClickLogOut}><img src="/exit-to-app.svg"/>Sair</h1>
                    </div>
                  
                </div>

            </div> 

            <div className='w-full border  float-right bg-[#F8F8F8]' >
                <div className='mt-[100px]'>

                    <div className='h-[1000px]' id="listar">
                        <h1 className="text-[#E1861B] text-[24px]  ml-[305px] ">Veículos cadastrados</h1>
                        <h1 className="text-[#919499] text-[16px]  ml-[305px] mb-[50px]">Edite ou delete os veículos que esão cadastrados.</h1>
                        <div className='w-[1030px]  bg-white ml-[300px] rounded-[15px] p-[50px]'>
                            <h1 className="text-[#1E1A17] text-[24px] mb-[30px]">Lista de veículos</h1>
                            {loading == true && 
                                <div className='w-full flex justify-center'>
                                    <Load />
                                </div>}
                            <div className='flex flex-wrap justify-end gap-[40px] '>
                            {
                                catalogoList.map((index) => (
                                <CardEditCar 
                                    id={index._id}
                                    image={index.image}
                                    city={index.city} 
                                    brand={index.brand} 
                                    model={index.model} 
                                    year={index.year} 
                                    km={index.km} 
                                    price={index.price} 
                                    name={index.name}/>
                                ))
                            }
                            </div>
                        </div>
                    </div>


                    <div className="hidden" id="cadastrar">
                        <h1 className="text-[#E1861B] text-[24px]  ml-[350px] ">Cadastrar veículo</h1>
                        <h1 className="text-[#919499] text-[16px]  ml-[350px] mb-[50px]">Cadastre os veículos que irão aparecer no site principal</h1>
                        <div className='w-[682px] h-[780px] bg-white ml-[350px] rounded-[15px] p-[50px]'>
                            <h1 className="text-[#1E1A17] text-[24px] ]">Insira os dados do veículo</h1>
                            <form onSubmit={handleCreatedCar} className='mt-8 flex flex-col gap-4'>

                                <div className='flex justify-between gap-[32px] mb-[24px]'>
                                    <div>
                                        <label className="block mb-[16px] text-sm font-medium text-[#1E1A17] ">Marca*</label>
                                        <input id="marca" name="marca" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" placeholder='Ex: Fiat '/> 
                    
                                    </div>
                                    <div>
                                        <label className="block mb-[16px] text-sm font-medium text-[#1E1A17] ">Modelo*</label>
                                        <input id="modelo" name="modelo" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='Ex: Uno'/> 
                                    
                                </div>
                                </div>
                            
                                <div className='flex justify-between gap-[32px] mb-[24px]'>
                                    <div>
                                        <label className="block mb-[16px] text-sm font-medium text-[#1E1A17] ">Detalhes do veículo*</label>
                                        <input id="detalhe" name="detalhe" className="border border-[#B9B8B7] w-[592px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 1.4 MPFI LTZ 8V FLEX'/>
                                
                                    </div>
                                </div>

                                <div className='flex justify-between gap-[32px] mb-[24px]'>
                                    <div>
                                        <label className="block mb-[16px] text-sm font-medium text-[#1E1A17] ">Ano*</label>
                                        <input id="ano" name="ano" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 2002'/>
                                
                                    </div>
                                    <div>
                                        <label className="block mb-[16px] text-sm font-medium text-[#1E1A17] ">localidade*</label>
                                        <input id="localidade" name="localidade" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: Osasco - SP'/>
                                
                                    </div>
                                </div>

                                <div className='flex justify-between gap-[32px] '>
                                    <div>
                                        <label className="block mb-[16px] text-sm font-medium text-[#1E1A17] ">Valor*</label>
                                        <input id="price" name="price" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center" placeholder='EX: R$ 70.00'/> 
                                    </div>
                                    <div>
                                        <label className="block mb-[16px] text-sm font-medium text-[#1E1A17] ">Quilometragem*</label>
                                        <input id="km" name="km" className="border border-[#B9B8B7] w-[280px] h-[56px] rounded-[8px] p-[16px] flex flex-row items-center"  placeholder='EX: 12.000 km'/> 
                                        
                                    </div>
                                </div>
                                <div className='w-[592px] '>
                                    <div className="mb-3 w-96">
                                        <label className="form-label inline-block text-gray-700">Anexar Foto</label>
                                        <input id="image" name="image" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" />
                                    </div>
                                </div>
                                {error == true && message  &&
                                    <div className='w-full h-[56px] flex justify-center items-center bg-[#F8BFBF] text-[#D22E2E]'>
                                        {message}
                                    </div>}

                                <button type="submit" className={`text-black bg-[#E1861B] text-[#FFF] tracking-letterButton font-normal w-full h-[56px] text-sm flex justify-center items-center rounded-[4px]  `}>
                                    {loading == false ? "Cadastrar" : <Load/>}
                                </button> 
                            
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>

      
     
         
    </>
  )
}

export default Dashboard

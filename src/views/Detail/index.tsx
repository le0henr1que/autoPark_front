import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Header from "../../components/Header"
import api from "../../Services/api"
import {DataCar} from "../../@types/types"
import { MapPin } from "phosphor-react"
import { useAuth } from "../../Providers/auth"


function Detail(){
    const [dataCar, setDataCar] = useState<DataCar[]>([])
    const {id} = useParams()

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>();

    function converterFloatReal(valor:string){
        var inteiro = null, decimal = null, c = null, j = null;
        var aux = new Array();
        valor = ""+valor;
        c = valor.indexOf(".",0);
      
        if(c > 0){
         
           inteiro = valor.substring(0,c);
           decimal = valor.substring(c+1,valor.length);
        } else{
           inteiro = valor;
        }
     

        for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
              aux[c]=inteiro.substring(j-3,j);
        }
     

        inteiro = "";
        for(c = aux.length-1; c >= 0; c--){
           inteiro += aux[c]+'.';
        }
    
     
        inteiro = inteiro.substring(0,inteiro.length-1);
     
        decimal = parseInt(decimal);
        if(isNaN(decimal)){
           decimal = "00";
        } else{
           decimal = ""+decimal;
           if(decimal.length === 1){
              decimal = "0"+decimal;
           }
        }
        valor = inteiro+","+decimal;
        return valor;
    }
    const token = JSON.parse(localStorage.getItem('token')).token

    const user = JSON.parse(localStorage.getItem('user'))

   const handleForm = async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await api.post(`/sendEmail`, {
        "email": user.email,
        "message":`${user.name} demonstrou interesse no veiculo ${dataCar.brand} ${dataCar.name}, entre em contato para negociar.`
       
      }, config).then(response => {
        console.log(response)
        setLoading(false)
        setMessage("Você demonstrou interesse no veiculo e um email foi enviado para ele, aguarde o anunciante entrar em contato com você.")

      }).catch(error => {
        console.log(error.response.status)
        if(error.response.status !== 200){
            setLoading(false)
            setMessage("Erro ao Enviar Email")
        }
        if(error.response.status == 403){
            setLoading(false)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate("/")
        }
    })
     
   


   }

    useEffect(() => {
        api.get(`/list/${id}/auto`)
        .then((response) =>{
            setDataCar(response.data.Cars)
        })    
    }, [])

    return (
        <>
            <Header/>
            <div className='w-[100%] h-screen bg-[#FFFF] flex justify-center items-center'>
                <div className="w-[80%] h-screen bg-white flex justify-center items-center">
                    
                    <div className='flex justify-center h-[520px] w-screen items-start shadow-2xl rounded-[10px] border-[#B9B8B7] p-[40px] gap-[30px]'>
                        <img className="float-left w-[600px]" src={!dataCar.image ? "/Frame146Error.svg" : dataCar.image}/>
                                                    
                            <div className="w-[400px]">
                                <div className='flex justify-start mb-[8px]'>
                                    <h1 className='text-[#1E1A17] text-[30px]'>{dataCar.brand} {dataCar.name}</h1>
                                </div>

                                <div className='flex flex-col justify-start mb-[16px]'>
                                    <h1 className='text-[#898E99] text-[14px]'>{dataCar.model}</h1>
                                    <h1 className='text-[#4C515B] text-[14px]'>{dataCar.year} | {dataCar.km}</h1>
                                </div>
                                
                                <div className='flex flex-col justify-start mb-[16px]'>
                                    <h1 className='text-[#898E99] text-[14px]'>Apenas</h1>
                                    <h1 className='text-[#E1861B] text-[28px]'>R$ {converterFloatReal(dataCar.price)}</h1>
                                </div>

                            
                                <div className='flex justify-start mb-[20px] gap-[8px]'>
                                    <MapPin size={16} weight="fill" color={'#4C515B'} /><h1 className='text-[#4C515B] text-[14px]'>{dataCar.city}</h1>
                                </div>
                                <button type="submit" className={`tracking-letterButton text-white font-semibold w-[202px] h-[40px] text-sm flex flex-row justify-center items-center p-[8px 24px] gap-[10px] bg-[#E1861B] rounded-[4px] mb-[20px]`} onClick={handleForm}>
                                    {loading == false ? "Demonstrar Interesse" : <Load/>}
                                </button>
                                {message}
                            </div>
                  
 
                    </div>
                   

                </div>
            </div>
        </>
    )
}

export default Detail
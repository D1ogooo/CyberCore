import { Link } from "react-router-dom";

function Pagina_404() {
  return (
   <>
    <div className="flex flex-col items-center">
     <h1 className="text-center">Página não encontrada</h1>
     <Link to='/' className="h-2 w-2">Voltar ao início</Link>  
    </div>
   </>
  )
}

export { Pagina_404 }
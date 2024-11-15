import { Routes, Route } from 'react-router-dom'
import { Pagina_404 } from '../pages/NotFoundPage'
import { SignIn } from '../pages/Auth/SignIn'
import { SignUp } from '../pages/Auth/SignUp'

export function AuthRoutes() {
 return (
  <>
   <Routes>
    <Route path='/' element={<SignIn/>}/>
     <Route path='/signup' element={<SignUp/>}/>
    <Route path="*" element={<Pagina_404/>}/>
   </Routes>
  </>
 )
}
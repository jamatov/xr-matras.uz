import { Navigate, Outlet } from "react-router-dom"
import { MATTRESS_TOKEN } from "../shared/types"

const PrivateRoutes = () => {
    let auth = localStorage.getItem(MATTRESS_TOKEN)
    return (
        auth ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoutes
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/authSlice"

export default function Login() {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.auth)

    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(login({ phoneNumber, password }))

    }
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <form onSubmit={handleLogin} className="col-lg-6 mx-auto py-5">
                        <h5>LOGIN</h5>
                        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} type="text" placeholder="Phone number" className="form-control" />
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="form-control" />
                        <button disabled={isLoading} type="submit" className="btn btn-outline-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

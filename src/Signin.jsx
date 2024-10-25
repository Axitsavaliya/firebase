import { useState } from "react"
import { auth, Provider } from "./firebase-crud"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import GoogleButton from 'react-google-button'
// import ReCAPTCHA from "react-google-recaptcha";

function Signin() {

    let [login, setlogin] = useState({})
    let navigate = useNavigate()

    let submit = (e) => {
        e.preventDefault()
        console.log(login);
        signInWithEmailAndPassword(auth, login.email, login.password)
            .then((res) => {
                console.log(res.user);
                localStorage.setItem("userId", JSON.stringify(res.user.uid))
                navigate("/")
                alert("Login Success")
            })
            .catch((err) => {
                // alert(err)
                console.log(err);
            })
    }

    let setinput = (e) => {
        let { name, value } = e.target
        setlogin({ ...login, [name]: value })
    }

    let handleClick = () => {
        signInWithPopup(auth, Provider)
            .then((res) => {
                console.log(res.user);
                navigate("/")

            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <h1 style={{ textAlign: "center", padding: "20px" }}  >Signin</h1>
            <form action="" onSubmit={(e) => { submit(e) }} >
                <table border={1} style={{ margin: "auto" }}>
                    <tr>
                        <td>email</td>
                        <td><input type="email" name='email' placeholder='email' onChange={(e) => { setinput(e) }} /></td>
                    </tr>
                    <tr>
                        <td>password</td>
                        <td><input type="password" name='password' placeholder='password' onChange={(e) => { setinput(e) }} /></td>
                    </tr>
                    {/* <tr>
                        <td></td>
                        <td> <ReCAPTCHA sitekey="6LdKsWkqAAAAAHxG9azlYmh-VuraMq8qwufVKg0P"/> </td>
                    </tr> */}
                    <tr>
                        <td></td>
                        <td><button type="submit">submit</button></td>
                    </tr>
                </table>
                <div style={{ paddingTop: "20px"}}>
                    <GoogleButton onClick={() => handleClick()} style={{ margin: "auto" }}></GoogleButton><br/>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Link to={"/signup"} >Signup</Link>
                </div>
            </form>
        </>
    )
}
export default Signin;
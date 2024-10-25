import { useState } from "react"
import { auth } from "./firebase-crud"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"

function SignUp() {


    let [list, setList] = useState({})



    let setinput = (e) => {
        let { name, value } = e.target
        setList({ ...list, [name]: value })
    }


    let submit = (e) => {
        e.preventDefault()
        window.location = "/signin"
        // console.log(list);
        if (list.password == list.cpass) {
            createUserWithEmailAndPassword(auth, list.email, list.password)
                .then((res) => {
                    console.log(res.user);
                })
                .catch((err) => {
                    console.log(err.code);
                })
        }
        else {
            alert("password not match")
        }
    }

    return (
        <>

            <h1 style={{ textAlign: "center" }}>SignUp</h1>
            <form action="" onSubmit={(e) => { submit(e) }} style={{ padding: "20px" }}>
                <table border={1} style={{ margin: "auto", padding: "10px" }}>
                    <tr>
                        <td>email</td>
                        <td><input type="email" name='email' placeholder='email' onChange={(e) => { setinput(e) }} /></td>
                    </tr>
                    <tr>
                        <td>password</td>
                        <td><input type="password" name='password' placeholder='password' onChange={(e) => { setinput(e) }} /></td>
                    </tr>
                    <tr>
                        <td>cpass</td>
                        <td><input type="cpass" name='cpass' placeholder='cpass' onChange={(e) => { setinput(e) }} /></td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><button type="submit" >submit</button></td>
                    </tr>

                </table>
            </form>
            <div style={{ textAlign: "center", paddingTop: "10px" }}>
                <Link to={"/signin"}>signin</Link>
            </div>
            <br />
            <br />

        </>
    )
}
export default SignUp;
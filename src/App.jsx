import { useEffect, useState } from "react";
import { db } from "./firebase-crud"
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"
import { FaLongArrowAltDown } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { auth } from "./firebase-crud";


function App() {

  let getuserdata = collection(db, "user");
  let [users, setUsers] = useState([]);
  const [data, setdata] = useState({})
  const [pos, setpos] = useState(null)

  auth.onAuthStateChanged((user) => {
    if (user.uid) {
      console.log(user.uid);

    } else {
      window.location = "/signin"

    }
  })

  // basice data

  useEffect(() => {
    setTimeout(() => {
      getUserdata();
    }, 1000);
  }, [])

  let getUserdata = () => {
    let getuser = async () => {
      let getdata = await getDocs(getuserdata);
      let newarr = []
      getdata.docs.map((val) => {
        let obj = { ...val.data(), id: val.id }
        // console.log(obj);
        newarr.push(obj)
      })
      setUsers(newarr);
    }
    getuser();

  }



  // submit data /and/ add data
  let setinput = (e) => {
    let { name, value } = e.target;
    setdata({ ...data, [name]: value })
  }


  let submit = async (e) => {
    e.preventDefault()

    if (pos) {
      // console.log(pos);
      console.log(data);
      let updatedata = await updateDoc(doc(getuserdata, pos), data)
      // console.log(updatedata);
    }
    else {
      let addata = await addDoc(getuserdata, data)
      console.log(addata);
    }
    getUserdata();
  }





  //delet data 
  let remove = async (userid) => {
    console.log(userid);
    let deletedata = await deleteDoc(doc(getuserdata, userid));
    // console.log(deletedata);
    getUserdata();
  }




  // updata data
  let updatadata = async (id) => {
    setpos(id)
    // console.log(userid);
    let getobj = await getDoc(doc(getuserdata, userid))
    // console.log(getobj.data());
    setdata(getobj.data())
    // setdata()
  }


  // logout data
  let setlogouts = () => {
    auth.signOut()
    window.location = "/signin"
  }


  return (
    <>
      <h1 style={{ textAlign: "center" }}>firebase</h1>
      <div style={{ margin: "auto", display: "flex", justifyContent: "space-around" }}>
        <button onClick={() => { setlogouts() }} ><BiLogOutCircle /></button>
      </div>
      <form action="" onSubmit={(e) => { submit(e) }} style={{ paddingTop: "20px" }}>
        <table border={1} style={{ margin: "auto", padding: "10px" }}>
          <tr>
            <td>name</td>
            <td><input type="text" value={data.name ? data.name : ""} name='name' placeholder='user name' onChange={(e) => { setinput(e) }} /></td>
          </tr>
          <tr>
            <td>email</td>
            <td><input type="email" value={data.email ? data.email : ""} name='email' placeholder='email' onChange={(e) => { setinput(e) }} /></td>
          </tr>
          <tr>
            <td></td>
            <td><button type="submit">{pos == null ? "submit" : "edit"}</button></td>
          </tr>
        </table>
      </form>
      <br />
      <br />


      <table border={1} style={{ margin: "auto" }}>
        <tr>
          <td>name</td>
          <td>email</td>
          <td>Action</td>
        </tr>
        {users.map((val, index) => {
          return (
            <tr>
              <td>{val.name}</td>
              <td>{val.email}</td>

              <td><button onClick={() => { remove(val.id) }}><RiDeleteBin5Fill /></button></td>
              <td><button onClick={() => { updatadata(val.id) }}><FaLongArrowAltDown /></button></td>
            </tr>
          )
        })}
      </table>

    </>
  )
}

export default App

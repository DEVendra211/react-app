import { useState } from "react";
import app from "./Firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import Wheather from "./Wheather";

const App = () => {
  const [data, setdata] = useState({ name: "", email: "", image: "", isLogged: false })


  const handleClick = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // console.log(user);
        // console.log(user.email);
        // console.log(user.displayName);
        // console.log(user.photoURL);
        setdata({ name: user.displayName, email: user.email, image: user.photoURL, isLogged: true })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    
    }
    const handleLogout = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        setdata({ name: "", email: "", image: "", isLogged: false })
      }).catch((error) => {
        // An error happened.
      });


  }



  return (
    <>


      {
        data.isLogged === true ?
          <>
            <h2>hello {data.name}</h2>
            <p>{data.email}</p>
            <img src={data.image} />
            <input type="button" value="Logout" onClick={handleLogout} />
            <Wheather email={data.email}/>

          </>
          :
          <>
            <h2>for use this app you nedd to login</h2>
            <input type="button" value="Login" onClick={handleClick} />
          </>
      }
    </>
  )
}

export default App

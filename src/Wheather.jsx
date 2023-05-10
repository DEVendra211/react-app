import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";

const Wheather = (props) => {

  const Api_key="bbf7ec31514cf4b9f119d77f42738b81";

  const [data ,setdata] = useState([]);
  const [city ,setcity] = useState("");
  const [msg ,setmsg] = useState("");

  const adddata=()=>{

    axios.post('https://6457e7d81a4c152cf98d21f9.mockapi.io/user',
    {
      email:props.email,
      city:city
    }
    )
    .then((response)=>{
      console.log("data has been added");
      setmsg(`you add this ${city}`)

    })
    .catch((error)=>{
      console.log(error);
    })
    setcity("");
  }

  useEffect(()=>{
    axios.get('https://6457e7d81a4c152cf98d21f9.mockapi.io/user')
    .then((response)=>{
      // console.log(response);
      let userdata=response.data;
      userdata=userdata.filter((row)=>row.email===props.email)

      const city_list=[]
      for(let row of userdata){
        city_list.push(row.city);
      }
      // console.log(city_list);

      const rcds=[]

      const arr=[];

      for(let v of city_list){

        console.log(v);
        arr.push(
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${v}&appid=${Api_key}&units=metric`) 
          .then(response=>{
            const city_wheather=response.data;

            rcds.push(city_wheather)
            // console.log(response.data);
          })
          .catch((error)=>{
            console.log(error);
          })
        )
        
      }
      Promise.all(arr)
      .then(()=>{
        setdata(rcds)
        // console.log(rcds);  
      })
      .catch((error)=>{
        console.log(error);
      })
      
      // console.log(userdata);
    })
  },[msg])
  // console.log("before return", data);
  return (
    <>
    <input type="text" value={city} onChange={(e)=>setcity(e.target.value) }/>
    <input type="button" value="add" onClick={adddata} />

    {
      data.map((show,i)=>{
        return(
          <div key={i} className='box'>
           <h2> {show.main.temp}</h2>
           <p>{show.name}</p>
          </div>
        )
      })
    }
    </>
  )
}

export default Wheather
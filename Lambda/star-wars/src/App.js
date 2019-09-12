import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from "axios";
import Landing from "./components/Container";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  const [data, setData] = useState({});
  
  
    
    useEffect(() => {
      const fetchData = () => {
        axios
          .get("https://swapi.co/api/people/")  
          .then(res => setData(res.data))
        
         

          
      }
        fetchData();
       
    }, []);

//     const url = 'https://swapi.co/api/people/'
//     const axiosTest = axios.get

// // Axios Test Data.
//     axiosTest(url).then(function(axiosTestResult) {
//     console.log('response.JSON:', {
//     message: 'Request received',
//     data: axiosTestResult.data
//   })
// })

  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
      <Landing
          data={data}
       />
    </div>
  );
}

export default App;



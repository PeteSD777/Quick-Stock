import { render } from "@testing-library/react";
import React from "react";


import {TextField} from "@material-ui/core";
import {Input} from "@material-ui/core";

import {Button} from "@material-ui/core";
function FindStockSymbol(){

    const [stock, setStock]=React.useState();
    const [phrase, setPhrase]=React.useState("");
    const [price, setPrice]=React.useState();
    const [rendP, setRendP]=React.useState(
        
    );


   
     function handlePhrase(e){
         var name= (e.target.value);
         var repName=name.split(' ').join('+');
         setPhrase(repName);
         setRendP(repName.split('+').join(" "));
         }  
  

     
     function FindSymbol(e){
         
     
         fetch('https://finnhub.io/api/v1/search?q='+phrase+'&token=c312v3qad3idae6u6sp0')
         
         
         .then(resp=> {
             if(resp.status>400){
                 throw new Error("Server no response")
             }
       return resp.json()

         })
         .then((resp)=>{
             setStock(resp.result[0].displaySymbol)
             const stockid=resp.result[0].displaySymbol
         
             return fetch('https://finnhub.io/api/v1/quote?symbol='+stockid+'&token=c312v3qad3idae6u6sp0')
            
         })
         .then(response=>response.json())
         .then((resp)=>{
             
             setPrice(resp.c)
         })

         
       
         

         e.preventDefault();
         return({stock})
        
        
         }
        
     
     return (
         <div>
         
         
    
        <form  onSubmit={FindSymbol}>
        {phrase=="" &&
        <h1>Enter your value</h1>}
        <h1>{rendP} {stock} {price}</h1>


        <Input color="primary" onChange={handlePhrase}></Input><br />
        <Button  size="large" variant="outlined" color="primary" onClick={FindSymbol}>Check Info</Button>
     
        </form>
        
        
        
  
        </div>
      

        
        
            

            
        

     )



}

export default FindStockSymbol;

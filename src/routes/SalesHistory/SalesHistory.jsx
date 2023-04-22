
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../contexts/themeContext';
import './SalesHistory.css';


export default function SalesHistory(props){

    const themeContext = useContext(ThemeContext);

    const [sales, setSales] = useState([]);

    useEffect( () =>{
        fetch(themeContext.APIURL+'user/business/salesHistory',
        {
            method:'POST',
            headers: {'Content-Type':'application/json', 'Authorization':themeContext.token},
            mode:'cors',
            body:JSON.stringify({bName: themeContext.bName})
        }).then(res =>{
            return res.json();
        }).then(res =>{
            setSales(res.data);
        });
    },[themeContext]);
    return(
        <p>{JSON.stringify(sales)}</p>
    );
}
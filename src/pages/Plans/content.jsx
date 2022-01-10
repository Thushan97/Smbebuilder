/* eslint-disable */
import './style.css';
import React from 'react';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Content() {
    const [plan, setPlan] = useState('');
    
    useEffect(() => {
        async function addPlan(){
            const response = await api.plan.addPaln(plan);
            // console.log(response.data);
        }
        addPlan();
    }, [plan])

    return (
        <div className="plansScreen">
            <div className="plansScreenInfo">
                <h3>Pro Plan</h3>
                <h4>$7.99/mo</h4>
            </div>
            <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/6xpx5uohy"><button className="plugnpaidButton" onClick={() => setPlan("pro_plan")}>Purchase</button></a><script src="https://plu.ug/n/nljldt-hy"></script></div>

            <div className="plansScreenInfo">
                <h3>Infinite Plan</h3>
                <h4>$13.99/mo</h4>
            </div>
            <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/6xpx5uohy"><button className="plugnpaidButton" onClick={() => setPlan("infinite_plan")}>Purchase</button></a><script src="https://plu.ug/n/nljldt-hy"></script></div>
        </div>   
    );
}

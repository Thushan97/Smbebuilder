/* eslint-disable */
/**
 * External Dependencies
 */
import './style.css';
import React from "react";
import api from "../../services/api";

export default function Content() {
    const onClick = async (plan) => {
       
        try {
            console.log("plan start");
            const res = await api.auth.updateUser(18,plan);
           
            if(res.data.status){

                console.log("plan updated")
            }else{
                //TODO:handle Errors
                console.log(res)
            }
        } catch (error) {
            //TODO: handle Errors
            console.log(`error`, error);
        }

    };
    return (
        <div className="plansScreen">
            <div className="plansScreenInfo">
                <h3>Pro Plan</h3>
                <h4>$7.99/mo</h4>
            </div>
            <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/xoxpoc1h4"><button className="plugnpaidButton">Purchase</button></a></div>
            <button className="plugnpaidButton" onClick={()=>onClick("pro")}>Update Plan</button>
            <div className="plansScreenInfo">
                <h3>Infinite Plan</h3>
                <h4>$13.99/mo</h4>
            </div>
            {/* <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/6xpx5uohy"><button className="plugnpaidButton">Purchase</button></a><script src="https://plu.ug/n/nljldt-hy"></script></div> */}
            <button className="plugnpaidButton" onClick={()=>onClick("infinite")}>Update Plan</button>   
            <div className="plansScreenInfo">
                <h3>Admin Plan</h3>
            </div>
            <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/6xpx5uohy"><button className="plugnpaidButton">Purchase</button></a><script src="https://plu.ug/n/nljldt-hy"></script></div>
        </div>   
    );    
}


// class Content extends Component {   
//     constructor() {

    
//         // This binding is necessary to make `this` work in the callback
//         this.updatePlan = this.updatePlan.bind(this);
//       } 
//     updatePlan (id) {
//         console.log(`id`, id);
//          try {
             
//              const res = await api.builder.getFileAccessToken(id);
//              console.log(res)
//              if(res.data.status){
//                  localStorage.clear();
//                  window.location.replace(`${process.env.REACT_APP_API_HOST}/api/builder/app/${res.data.token}`)
//              }else{
//                  //TODO:handle Errors
//                  console.log(res)
//              }
//          } catch (error) {
//              //TODO: handle Errors
//          }
 
//      };
//     render() { 
//         return (
//             <div className="plansScreen">
//                 <div className="plansScreenInfo">
//                     <h3>Pro Plan</h3>
//                     <h4>$7.99/mo</h4>
//                 </div>
//                 {/* <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/6xpx5uohy"><button className="plugnpaidButton" onClick={()=>updatePlan}>Update Plan</button></a><script src="https://plu.ug/n/nljldt-hy"></script></div> */}
//                 <button className="plugnpaidButton" onClick={()=>updatePlan()}>Update Plan</button>
//                 <div className="plansScreenInfo">
//                     <h3>Infinite Plan</h3>
//                     <h4>$13.99/mo</h4>
//                 </div>
//                 <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/6xpx5uohy"><button className="plugnpaidButton">Purchase</button></a><script src="https://plu.ug/n/nljldt-hy"></script></div>
                            
//                 <div className="plansScreenInfo">
//                     <h3>Admin Plan</h3>
//                 </div>
//                 <div><a className="plugnpaid-4znzgakhe" href="https://plu.ug/l/6xpx5uohy"><button className="plugnpaidButton">Purchase</button></a><script src="https://plu.ug/n/nljldt-hy"></script></div>
//             </div>   
//         );    
//     }
// }
 
// export default Content;

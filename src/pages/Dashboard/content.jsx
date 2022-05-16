/* eslint-disable */
import "../Plans/style.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useLocation } from "react-router-dom";

export default function Content() {
    const currentPlan = sessionStorage.getItem("userType");
    // const [plan, setPlan] = useState(currentPlan);
    const search = useLocation().search;
    // const payment = new URLSearchParams(search).get("payment");
    const plan = new URLSearchParams(search).get("plan");

    async function handleClick() {
        try {
            const userId = sessionStorage.getItem("userId");
            if (plan) {
                const res = await api.auth.updateUser(userId, plan);
                if (res.data.status) {
                    console.log("plan updated");
                } else {
                    //TODO:handle Errors
                    console.log(res);
                }
            }
        } catch (error) {
            //TODO: handle Errors
            console.log(`error`, error);
        }
    }

    useEffect(() => {
        handleClick();
    }, [plan]);

    return (
        <div className="plansScreen">
            <div className="plansScreenInfo">
                <h3>Pro Plan</h3>
                <h4>$7.99/mo</h4>
                <button
                    className="plugnpaidButton"
                    // onClick={() => setPlan("pro")}
                >
                    <a href="https://customer.b3ware.com/cart/kn986u5hm">
                        Purchase
                    </a>
                </button>
            </div>

            <div className="plansScreenInfo">
                <h3>Infinite Plan</h3>
                <h4>$13.99/mo</h4>
                <button
                    className="plugnpaidButton"
                    // onClick={() => setPlan("infinite")}
                >
                    <a href="https://customer.b3ware.com/cart/opmy6c5ho">
                        Purchase
                    </a>
                </button>
            </div>
        </div>
    );
}

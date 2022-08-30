import React, { useEffect, useState } from "react";
import axios from "axios";

const Pay = () => {
    const KEY = "pk_test_51LHghOFkoqITIvETHcS7S5hdmPHLHTp5Ku2rYigtA2GrMLLSDZNGc1XpMKtbuATdsc1seeETnDuWK08eLfHKQTWG00njP4VMAI";
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        console.log(token);
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:5000/checkout/payment", {
                    amount: 2000,
                    tokenId: stripeToken.id,
                });
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        makeRequest();
    }, [stripeToken]);
    return (
        <>
            <div className="flex justify-center items-center h-screen w-full">{!stripeToken ? "a" : <span>Processing, please wait...</span>}</div>
        </>
    );
};

export default Pay;

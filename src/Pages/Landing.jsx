import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    const [pathType, setPathType] = useState(0);

    return (
        <div className="h-[100vh] bg-black">
            <h1 className="text-4xl p-16 pt-8 text-white font-mono font-bold">
                Vaul-E <span className="text-sm">V 1.0</span>
            </h1>
            <h1 className="text-white ml-16 text-5xl font-mono">
                Creating and maintaining multiple Wallets<br /> on different{" "}
                <strong>Blockchains</strong> Made Easy
            </h1>
            <h1 className="text-white mt-8 ml-16 mb-8 text-2xl font-mono">
                Choose a blockchain to get started
            </h1>

            <button
                onClick={() => {
                    setPathType(60);
                    navigate("/createmnemonic", { state: { pathType: 60 } });
                }}
                className="ml-16 text-black h-12 w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]"
            >
                Ethereum
            </button>

            <button
                onClick={() => {
                    setPathType(501);
                    navigate("/createmnemonic", { state: { pathType: 501 } });
                }}
                className="ml-4 text-black h-12 w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]"
            >
                Solana
            </button>

            <hr className="mt-56" />
            <h1 className="text-white font-mono pl-16 pt-8 text-lg">
                Developed By <strong>Senpai</strong>
            </h1>
        </div>
    );
}

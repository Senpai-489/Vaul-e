import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    const [pathType, setPathType] = useState(0);

    return (
        <div className="min-h-screen bg-black flex flex-col justify-between">
            {/* Main Title */}
            <header className="pt-8 px-4 md:px-16">
                <h1 className="text-4xl text-white font-mono font-bold">
                    Vaul-E <span className="text-sm">V 1.0</span>
                </h1>
            </header>

            {/* Description and Blockchain Selection */}
            <main className="flex-1 px-4 md:px-16">
                <div className="mt-4 md:mt-8">
                    <h1 className="text-white text-3xl md:text-5xl font-mono leading-tight">
                        Creating and maintaining multiple Wallets on different <strong>Blockchains</strong> Made Easy
                    </h1>
                    <h2 className="text-white mt-6 text-xl md:text-2xl font-mono">
                        Choose a blockchain to get started
                    </h2>
                </div>

                {/* Buttons for Blockchain Options */}
                <div className="mt-8 md:mt-12 flex space-x-4">
                    <button
                        onClick={() => {
                            setPathType(60);
                            navigate("/createmnemonic", { state: { pathType: 60 } });
                        }}
                        className="text-black h-12 w-full md:w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]"
                    >
                        Ethereum
                    </button>

                    <button
                        onClick={() => {
                            setPathType(501);
                            navigate("/createmnemonic", { state: { pathType: 501 } });
                        }}
                        className="text-black h-12 w-full md:w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]"
                    >
                        Solana
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-4 md:px-16 py-8 bg-black">
                <hr className="border-gray-500 mb-6" />
                <h1 className="text-white font-mono text-center md:text-left text-lg">
                    Developed By <strong>Senpai</strong>
                </h1>
            </footer>
        </div>
    );
}

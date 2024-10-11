import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateMnemonic, validateMnemonic } from 'bip39';  

export default function MnemonicCreate() {
    const location = useLocation();
    const { pathType } = location.state || {};  
    const [mnemonic, setMnemonic] = useState(""); 
    const [isValid, setIsValid] = useState(false);  
    const navigate = useNavigate();

    const handleGenerate = () => {
        const mn = generateMnemonic();  
        setMnemonic(mn);
        setIsValid(true);  
    };

    const handleMnemonicChange = (e) => {
        const input = e.target.value;
        setMnemonic(input);
        setIsValid(validateMnemonic(input));  
    };

    return (
        <div className="min-h-screen bg-black">
            <h1 className="text-white pt-16 px-4 md:px-20 text-4xl md:text-5xl font-mono text-center md:text-left">
                Create Mnemonic for your {pathType === 60 ? 'Ethereum' : 'Solana'} Wallet
            </h1>
            
            <div className="text-white px-4 md:px-20 mt-8 md:mt-12">
                <h2 className="font-mono text-2xl md:text-4xl">Your Mnemonic:</h2>
                <input 
                    type="text" 
                    placeholder="Enter your Seed Phrase or Generate One" 
                    value={mnemonic} 
                    onChange={handleMnemonicChange}  
                    className="text-grey bg-transparent border-2 border-slate-400 bg-stone-500 text-lg font-mono h-10 p-2 w-full md:w-[60%] rounded-xl mt-2 "
                />
                <div className="flex justify-center md:justify-start mt-4">
                   
                </div>
                <h2 className="font-mono  text-[rgb(221,112,112)] text-lg md:text-xl">
                    Write it down or save it somewhere safe
                </h2>
                <button 
                        className="text-black text-sm h-12 w-full md:w-28 font-mono text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]" 
                        onClick={handleGenerate}
                    >
                        Create Seed Phrase
                    </button>
            </div>

            <div className="flex justify-center md:justify-start px-4 md:px-20 mt-6">
                <button 
                    className={`text-black text-sm h-12 w-full md:w-28 font-sans text-md rounded-lg bg-white ${!isValid ? 'opacity-50' : 'hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]'}`} 
                    onClick={function() {
                        if (isValid) {
                            navigate(pathType === 60 ? '/ethereum' : '/solana', { state: { mnemonic: mnemonic } });
                        }
                    }}
                    disabled={!isValid}  
                >
                    Proceed
                </button>
            </div>
            <hr className="mt-56" />
            <h1 className="text-white font-mono pl-16 pt-8 text-lg">
                Developed By <strong>Senpai</strong>
            </h1>
        </div>
    );
}

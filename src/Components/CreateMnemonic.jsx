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
        <div className="h-[100vh] bg-black">
            <h1 className='text-white p-20 text-5xl font-mono'>
                Create Mnemonic for your {pathType === 60 ? 'Ethereum' : 'Solana'} Wallet
            </h1>
            
            <div className='text-white ml-20'>
                <h2 className='font-mono text-4xl'>Your Mnemonic:</h2>
                <input 
                    type='text' 
                    placeholder='Enter your Seed Phrase or Generate One' 
                    value={mnemonic} 
                    onChange={handleMnemonicChange}  
                    className="text-grey bg-stone-500 text-lg font-mono h-12 p-2 w-[60%] rounded-xl "
                />
                <button 
                    className="ml-20 mt-4 text-black translate-y-2 text-mono text-sm h-12 w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]" 
                    onClick={handleGenerate}
                >
                    Create Seed Phrase
                </button>
                <h2 className='font-mono text-[rgb(221,112,112)] text-xl'>
                    Write it Down or save it somewhere safe
                </h2>
            </div>

            <button 
                className={`ml-20 mt-4 text-black translate-y-2 text-mono text-sm h-12 w-28 font-sans text-md rounded-lg bg-white ${!isValid ? 'opacity-50' : 'hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]'}`} 
                onClick={function() {
                    if (isValid) {
                        navigate(pathType === 60 ? '/ethereum' : '/solana',{ state: { mnemonic: mnemonic }} );
                    }
                }}
                disabled={!isValid}  
            >
                Proceed
            </button>
        </div>
    );
}

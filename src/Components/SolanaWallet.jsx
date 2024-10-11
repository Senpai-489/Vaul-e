import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useLocation } from "react-router-dom";

export default function SolanaWallet() {  
    const location = useLocation(); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [pvtKeys, setPvtKeys] = useState([]); 
    const [showPrivateKey, setShowPrivateKey] = useState([]);  
    const { mnemonic } = location.state || {};  

    const deleteWallet = (index) => {
        const updatedPublicKeys = [...publicKeys];
        const updatedPvtKeys = [...pvtKeys];
        const updatedVisibility = [...showPrivateKey];

        updatedPublicKeys.splice(index, 1); 
        updatedPvtKeys.splice(index, 1);     
        updatedVisibility.splice(index, 1); 

        setPublicKeys(updatedPublicKeys);
        setPvtKeys(updatedPvtKeys);
        setShowPrivateKey(updatedVisibility);
    };

    return (
        <div className="min-h-screen bg-black font-mono pt-20 px-4 md:px-20">
            <h2 className="text-white text-4xl md:text-5xl font-mono text-center md:text-left">Your Solana Wallets</h2>
            
            <div className="flex justify-center md:justify-start mt-4">
                <button 
                    className="text-black text-sm h-12 w-full md:w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]"
                    onClick={async function() {
                        const seed = await mnemonicToSeed(mnemonic);
                        const path = `m/44'/501'/${currentIndex}'/0'`;  
                        const derivedSeed = derivePath(path, seed.toString("hex")).key;
                        const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                        const keypair = Keypair.fromSecretKey(secretKey);

                        setCurrentIndex(currentIndex + 1);
                        setPublicKeys([...publicKeys, keypair.publicKey.toString()]);
                        setPvtKeys([...pvtKeys, Buffer.from(secretKey).toString("hex")]);
                        setShowPrivateKey([...showPrivateKey, false]);  
                    }}
                >
                    Add Solana Wallet
                </button>
            </div>

            <div className="mt-8 space-y-8">
                {publicKeys.map((publicKey, index) => (
                    <div className="text-white" key={index}>
                        <h2 className="text-2xl md:text-3xl">Wallet {index + 1}</h2>
                        <p className="break-all">Solana PublicKey - {publicKey}</p>

                        <div className="flex flex-col md:flex-row items-start md:items-center mt-2">
                            <h2 className="mr-2">Private Key:</h2>
                            <input 
                                type={showPrivateKey[index] ? "text" : "password"} 
                                value={pvtKeys[index]} 
                                readOnly 
                                className="text-lg font-mono bg-stone-500 text-grey p-2 w-full md:w-[50%] rounded-lg"
                            />
                            <button 
                                className="mt-2 md:mt-0 md:ml-4 text-black text-sm h-10 w-full md:w-20 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]"
                                onClick={() => {
                                    const visibility = [...showPrivateKey];
                                    visibility[index] = !visibility[index];
                                    setShowPrivateKey(visibility);  
                                }}
                            >
                                {showPrivateKey[index] ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="flex justify-center md:justify-start">
                            <button 
                                className="mt-4 text-black text-sm h-10 w-full md:w-28 font-sans text-md rounded-lg bg-red-500 hover:drop-shadow-[0_0px_5px_rgba(255,0,0,1)]"
                                onClick={() => deleteWallet(index)}  
                            >
                                Delete Wallet
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="mt-56" />
            <h1 className="text-white font-mono pl-16 pt-8 text-lg">
                Developed By <strong>Senpai</strong>
            </h1>
        </div>
    );
}

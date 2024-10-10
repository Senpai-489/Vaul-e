import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useLocation } from "react-router-dom";

export default function SolanaWallet (){  
    const location = useLocation(); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [pvtKeys, setPvtKeys] = useState([]); 
    const [showPrivateKey, setShowPrivateKey] = useState([]);  
    const { mnemonic } = location.state || {};  

    // Function to delete a wallet
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
        <div className="h-[100vh] bg-black font-mono pt-20 pl-20">
            <h2 className='text-white text-5xl font-mono'>Your Solana Wallets</h2>
            <button 
                className="mt-4 text-black text-sm h-12 w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]" 
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

           
            {publicKeys.map((publicKey, index) => (
                <div className="text-white pt-8" key={index}>
                    <h2 className="text-2xl">Wallet {index + 1}</h2>
                    <p>Solana PublicKey - {publicKey}</p>

                   
                    <div>
                        <h2>Private Key:</h2>
                        <input 
                            type={showPrivateKey[index] ? "text" : "password"} 
                            value={pvtKeys[index]} 
                            readOnly 
                            className="text-lg font-mono bg-stone-500 text-grey p-2 w-[50%] rounded-lg"
                        />
                        <button 
                            className="ml-4 text-black text-sm h-10 w-20 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]"
                            onClick={() => {
                                const visibility = [...showPrivateKey];
                                visibility[index] = !visibility[index];
                                setShowPrivateKey(visibility);  
                            }}
                        >
                            {showPrivateKey[index] ? "Hide" : "Show"}
                        </button>
                    </div>

                   
                    <button 
                        className=" mt-4 text-black text-sm h-10 w-28 font-sans text-md rounded-lg bg-red-500 hover:drop-shadow-[0_0px_5px_rgba(255,0,0,1)]"
                        onClick={() => deleteWallet(index)}  
                    >
                        Delete Wallet
                    </button>
                </div>
            ))}
        </div>
    );
};

import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";  
import { Wallet, HDNodeWallet } from "ethers";
import { useLocation } from "react-router-dom";

export const EthWallet = () => {  
    const location = useLocation(); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [pvtKeys, setPvtKeys] = useState([]); 
    const [showPrivateKey, setShowPrivateKey] = useState([]);  
    const { mnemonic } = location.state || {};  

    const deleteWallet = (index) => {
        const updatedAddresses = [...addresses];
        const updatedPvtKeys = [...pvtKeys];
        const updatedVisibility = [...showPrivateKey];

        updatedAddresses.splice(index, 1); 
        updatedPvtKeys.splice(index, 1);     
        updatedVisibility.splice(index, 1);  

        setAddresses(updatedAddresses);
        setPvtKeys(updatedPvtKeys);
        setShowPrivateKey(updatedVisibility);
    };

    return (
        <div className="min-h-screen bg-black font-mono pt-20 px-4 md:px-20">
            <h2 className='text-white text-4xl md:text-5xl font-mono text-center md:text-left'>Your ETH Wallets</h2>
            
            <div className="flex justify-center md:justify-start mt-4">
                <button 
                    className="text-black text-sm h-12 w-full md:w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]" 
                    onClick={() => {
                        if (!mnemonic) {
                            alert("Please provide a valid mnemonic!");
                            return;
                        }

                        const seed = mnemonicToSeedSync(mnemonic);  
                        const derivationPath = `m/44'/60'/${currentIndex}'/0`;  
                        const hdNode = HDNodeWallet.fromSeed(seed);
                        const child = hdNode.derivePath(derivationPath);
                        const privateKey = child.privateKey;
                        const wallet = new Wallet(privateKey);

                        setCurrentIndex(currentIndex + 1);
                        setAddresses([...addresses, wallet.address]);
                        setPvtKeys([...pvtKeys, privateKey]);
                        setShowPrivateKey([...showPrivateKey, false]);  
                    }}
                >
                    Add ETH Wallet
                </button>
            </div>

            <div className="mt-8 space-y-8">
                {addresses.map((address, index) => (
                    <div className="text-white" key={index}>
                        <h2 className="text-2xl md:text-3xl">Wallet {index + 1}</h2>
                        <p className="break-all">ETH PublicKey - {address}</p>

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
};

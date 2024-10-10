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
        <div className="h-[100vh] bg-black font-mono pt-20 pl-20">
            <h2 className='text-white text-5xl font-mono'>Your ETH Wallets</h2>
            <button 
                className="mt-4 text-black text-sm h-12 w-28 font-sans text-md rounded-lg bg-white hover:drop-shadow-[0_0px_5px_rgba(255,255,255,1)]" 
                onClick={function () {
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

                    // Update addresses and private keys
                    setCurrentIndex(currentIndex + 1);
                    setAddresses([...addresses, wallet.address]);
                    setPvtKeys([...pvtKeys, privateKey]);
                    setShowPrivateKey([...showPrivateKey, false]);  
                }}
            >
                Add ETH Wallet
            </button>

           
            {addresses.map((address, index) => (
                <div className="text-white pt-8" key={index}>
                    <h2 className="text-2xl">Wallet {index + 1}</h2>
                    <p>ETH PublicKey - {address}</p>

                   
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

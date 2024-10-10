import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing"
import { EthWallet } from "./Components/EthWallet";
import SolanaWallet from "./Components/SolanaWallet";
import MnemonicCreate from "./Components/CreateMnemonic";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/ethereum" element={<EthWallet />}/>
        <Route path="/Solana" element={<SolanaWallet />}/>
        <Route path="/createmnemonic" element={<MnemonicCreate/>}/>
      </Routes>
    </BrowserRouter>
  );
}
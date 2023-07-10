"use client";

import { INft, PINATA_URL, mintNftContract } from "@/lib/web3.config";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../layout";
import axios from "axios";
import Image from "next/image";
import NftCard from "@/components/NftCard";

const Mint: NextPage = () => {
  const { account } = useContext(AppContext);

  const [tokenId, setTokenId] = useState<number>();
  const [balance, setBalance] = useState<number>();

  const onClickMint = async () => {
    try {
      const mintResponse = await mintNftContract.methods
        .mintNft()
        .send({ from: account });

      if (Number(mintResponse.status) === 1) {
        const myNftResponse = await mintNftContract.methods
          .getLatestNft(account)
          .call();

        setTokenId(Number(myNftResponse));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBalanceOf = async () => {
    try {
      const response = await mintNftContract.methods.balanceOf(account).call();

      setBalance(1000 - Number(response));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBalanceOf();
  }, [balance]);

  return (
    <div className="flex flex-col items-start px-8 pt-5">
      {account && (
        <button className=" text-2xl mb-5" onClick={onClickMint}>
          민팅하기
        </button>
      )}

      {tokenId && <NftCard tokenId={tokenId} />}

      <div>현재 남은 NFT 개수 : {balance} 개</div>
    </div>
  );
};

export default Mint;
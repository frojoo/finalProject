"use client";

import SaleNftCard from "@/components/saleNftCard";
import { saleNftContract } from "@/lib/web3.config";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SaleNft: NextPage = () => {
  const [onSaleNft, setOnSaleNft] = useState<number[]>();

  const getSaleNfts = async () => {
    try {
      const response: bigint[] = await saleNftContract.methods
        .getOnSaleList()
        .call();

      const tempArray = response.map((v, i) => {
        return Number(v);
      });

      setOnSaleNft(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSaleNfts();
  }, []);

  return (
    <div className="px-8 pt-5">
      <div className="grid grid-cols-3">
        {onSaleNft?.map((v, i) => (
          <SaleNftCard
            key={i}
            index={i}
            tokenId={v}
            getSaleNfts={getSaleNfts}
          />
        ))}
      </div>
    </div>
  );
};

export default SaleNft;

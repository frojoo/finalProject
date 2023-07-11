"use client";

import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/app/layout";
import { SALE_NFT_ADDRESS, mintNftContract } from "@/lib/web3.config";
import { redirect } from "next/navigation";
import MyNftCard from "@/components/MyNftCard";

const MyNft: NextPage = () => {
  const [tokenIds, setTokenIds] = useState<number[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account } = useContext(AppContext);

  const getSaleStatus = async () => {
    try {
      const response: boolean = await mintNftContract.methods
        .isApprovedForAll(account, SALE_NFT_ADDRESS)
        .call();

      setSaleStatus(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSaleStatus = async () => {
    try {
      setIsLoading(true);

      const response = await mintNftContract.methods
        .setApprovalForAll(SALE_NFT_ADDRESS, !saleStatus)
        .send({ from: account });

      if (Number(response.status) === 1) {
        setSaleStatus(!saleStatus);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  const getMyNfts = async () => {
    try {
      const response: BigInt[] = await mintNftContract.methods
        .getAllNFTs(account)
        .call();

      const tempArray = response.map((v) => {
        return Number(v);
      });

      setTokenIds(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) {
      redirect("/");
    }

    getSaleStatus();
    getMyNfts();
  }, [account, getSaleStatus, getMyNfts]);

  return (
    <div className="px-8 pt-5">
      <div className="flex items-center text-2xl">
        판매 상태 :
        <>
          {isLoading ? (
            <span className="ml-2 animate-spin">🔴</span>
          ) : saleStatus ? (
            <span className="text-green-500 ml-2">승인</span>
          ) : (
            <span className="text-red-400 ml-2">거부</span>
          )}
          <button
            className="ml-1 text-sm font-bold"
            onClick={onClickSaleStatus}
          >
            상태 변경
          </button>
        </>
      </div>
      <div className="mt-8 grid grid-cols-3">
        {tokenIds?.length === 0
          ? "내 다덴부가 없습니다. '민팅하기'에서 나만의 다덴부를 획득하세요!"
          : tokenIds?.reverse().map((v, i) => {
              return <MyNftCard index={i} tokenId={v} />;
            })}
      </div>
    </div>
  );
};

export default MyNft;

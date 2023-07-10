import Link from "next/link";
import { FC, ReactNode } from "react";

interface SideMenuProps {
  children: ReactNode;
}

const SideMenu: FC<SideMenuProps> = ({ children }) => {
  return (
    <div className="bg-slate-100 min-h-screen flex">
      <nav className="w-60 shrink-0 flex flex-col py-8 pl-4">
        <div className="bg-slate-500 grow pt-12 flex flex-col items-center gap-4 text-white">
          <Link href="/">
            <button>Home</button>
          </Link>
          <Link href="/mint">
            <button>Mint</button>
          </Link>
          <Link href="/my-nft">
            <button>My NFT</button>
          </Link>
          <Link href="/sale-nft">
            <button>Sale NFT</button>
          </Link>
        </div>
        <div>Created by JY</div>
      </nav>
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

export default SideMenu;

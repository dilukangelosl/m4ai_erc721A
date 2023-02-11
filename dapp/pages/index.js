import Head from "next/head";
import Navbar from "../components/Navbar/NavbarC";
import HeroSectiom from "../components/Hero/Hero";
import { Toaster } from "react-hot-toast";
import { useEagerConnect, useInactiveListener } from "../lib/hooks/web3Hook";

export default function Home() {
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>M4OGACAI</title>
        <meta
          name="description"
          content="Welcome to the home of M4AI/OGACAI AI collection on OpenSea. Discover the best items in this collection."
        />
        <link rel="icon" href="/favicon.ico" />
  
      </Head>

      <div className="globalbody">
        <Navbar />
        <HeroSectiom />
      </div>
    </>
  );
}

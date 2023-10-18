import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';


export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  const [value, setValue] = useState('');


  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        <form
          onSubmit={(event) => {
          event.preventDefault();
          }} >
          <Textarea variant="plain" placeholder="Send something..." sx={{ mb: 1 }}></Textarea>
          <Button type="submit">Submit</Button>
        </form>
        </div>
      {isConnected && (
        <div className="h2 text-center">Your address: {userAddress}</div>
      )}
    </div>
  );
}

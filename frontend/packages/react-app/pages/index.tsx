import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { BasicMessageABI } from "../utils/abis/MessageSender";
import { buildArgs } from "../components/_helper";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  const [messageText, setMessageText] = useState(""); // State para el texto del mensaje

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const args = buildArgs(messageText); // Llamamos a buildArgs con el texto del mensaje

    /*const config = prepareWriteContract({
      address: '0x78966DeFeC946e78BF9E2A7f93b5f443ADbD36eE',
      abi: BasicMessageABI,
      functionName: 'send',
      args: [args],
    });*/

    // Aquí puedes usar la configuración de 'config' para enviar la transacción al contrato
    // y manejar el resultado según sea necesario
	console.log("chainselector" ,args.destinationChainSelector);
	writeContract({
		address: '0x78966DeFeC946e78BF9E2A7f93b5f443ADbD36eE',
		abi: BasicMessageABI,
		functionName: 'send',
/*		args: [
			args.destinationChainSelector, 
			args.receiver,
			args.messageText, 
			args.payFeesIn
		]
*/		args: [
			args.destinationChainSelector,
			args.receiver,
			args.messageText,
			args.payFeesIn
		]
		}).then((hash) => {
			if (hash) {
			// Transaction hash está disponible, puedes mostrar un mensaje con él
			console.log(`CIIP Hash:`, hash);
			} else {
			console.log('La transacción no se completó con éxito.');
			}
  		});
	};

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        <form onSubmit={handleSubmit}>
          <Textarea
            variant="plain"
            placeholder="Send something..."
            sx={{ mb: 1 }}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)} // Actualizamos el state del mensaje
          ></Textarea>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

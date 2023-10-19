import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';

//import { useDebounce } from 'use-debounce'
import {
  usePrepareContractWrite,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'


export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  /*
  const [to, setTo] = useState('')
  const [debouncedTo] = useDebounce(to, 500)
  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
  })

  /*const { config } = usePrepareContractWrite({
    address: '0xe2510c5470FEDD84e6FbFF29c647B0c883dBc496',
    abi: [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_inputBoxAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_dappAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "FailedToWithdrawEth",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"name": "InvalidRouter",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "latestMessageId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "latestSourceChainSelector",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "latestSender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "latestMessage",
				"type": "string"
			}
		],
		"name": "MessageReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "dappAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "decodedEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "messageId",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "sourceChainSelector",
						"type": "uint64"
					},
					{
						"internalType": "bytes",
						"name": "sender",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "token",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct Client.EVMTokenAmount[]",
						"name": "destTokenAmounts",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Client.Any2EVMMessage",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "ccipReceive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDappAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatestMessageDetails",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRouter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "withdrawToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
    ],
    functionName: 'mint',
  })*/

  //https://wagmi.sh/examples/contract-write
 
  /*const { data, sendTransaction } = useSendTransaction(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  
  {isSuccess && (
        <div>
          Successfully sent {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}*/
  const isSuccess = false;

//should handle if (isConnected) {
  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        <form
          onSubmit={(e) => {
          e.preventDefault()
          /*sendTransaction?.()*/
          }}
        >
          <Textarea variant="plain" placeholder="Send something..." sx={{ mb: 1 }}
            /*onChange={(e) => setTo(e.target.value)} value={to}*/
          ></Textarea>
          <Button type="submit" /*disabled={!to}*/ >Submit</Button>
        </form>
        </div>
    </div>
  );
}

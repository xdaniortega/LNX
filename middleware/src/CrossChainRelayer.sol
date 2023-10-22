// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {Withdraw} from "./utils/Withdraw.sol";
import {IInputBox} from "@cartesi/rollups/contracts/inputs/IInputBox.sol"; // Import IInputBox from npm package

contract CrossChainRelayer is CCIPReceiver, Withdraw {
  bytes32 latestMessageId;
  uint64 latestSourceChainSelector;
  address latestSender;
  string latestMessage;
  address inputBoxAddress; // Address of the InputBox contract
  address dappAddress; // Address of the Dapp contract

  event MessageReceived(
    bytes32 latestMessageId,
    uint64 latestSourceChainSelector,
    address latestSender,
    string latestMessage
  );

  event decodedEvent(address dappAddress, string message);

  struct DecodedMessage {
    address dappAddress;
    string message;
  }

  constructor(
    address router,
    address _inputBoxAddress,
    address _dappAddress
  ) CCIPReceiver(router) {
    inputBoxAddress = _inputBoxAddress;
    dappAddress = _dappAddress;
  }

  function _ccipReceive(
    Client.Any2EVMMessage memory message
  ) internal override {
    latestMessageId = message.messageId;
    latestSourceChainSelector = message.sourceChainSelector;
    latestSender = abi.decode(message.sender, (address));
    latestMessage = abi.decode(message.data, (string));

    //DecodedMessage memory decodedMessage = _decodeLatestMessage(latestMessage);
    //dappAddress = decodedMessage.dappAddress;
    // Forward the message to the InputBox contract
    // Maybe inputBox changes for different dApps
    // we're not handling input hash returned by addInput
    IInputBox(inputBoxAddress).addInput(
      dappAddress,
      abi.encodePacked(latestMessage)
    );

    emit MessageReceived(
      latestMessageId,
      latestSourceChainSelector,
      latestSender,
      latestMessage
    );
  }

  function getLatestMessageDetails()
    public
    view
    returns (bytes32, uint64, address, string memory)
  {
    return (
      latestMessageId,
      latestSourceChainSelector,
      latestSender,
      latestMessage
    );
  }

  // Private function to decode the latest message
  /*function _decodeLatestMessage(
    string memory message
  ) internal pure returns (DecodedMessage memory) {
    bytes memory messageData = bytes(message);

    // Decode the first 40 characters as an address (Dapp address)
    string memory _dappAddress;
    assembly {
      _dappAddress := mload(add(messageData, 40))
    }

    // The remaining bytes are the message content
    string memory messageContent = string(abi.encodePacked(messageData));

    return
      DecodedMessage(address(bytes20(bytes(_dappAddress))), messageContent);
  }*/

  function getDappAddress() public view returns (address) {
    return dappAddress;
  }
}

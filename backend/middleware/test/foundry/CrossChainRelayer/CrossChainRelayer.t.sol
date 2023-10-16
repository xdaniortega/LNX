// SPDX-License-Identifier: Apache-2.0 (see LICENSE)

/// @title CrossChainRelayer Test
pragma solidity ^0.8.8;

import {TestBase} from "../util/TestBase.sol";

import "forge-std/console.sol";

contract CrossChainRelayerTest is TestBase {
  CrossChainRelayer public crossChainRelayer;

  // Constructor para inicializar el contrato CrossChainRelayer que se va a probar

  /*funcion setup
    
  constructor(address router, address _inputBoxAddress) CCIPReceiver(router) {
    inputBoxAddress = _inputBoxAddress;
  }*/

  function testCCIPReceive() public {
    // Prueba 1: Verificar que la dirección de InputBox se haya configurado correctamente
    require(
      address(crossChainRelayer.inputBoxAddress()) != address(0),
      "La dirección de InputBox no se configuró correctamente"
    );

    // Prueba 2: Ejecutar una llamada _ccipReceive con datos de mensaje válidos
    CrossChainRelayer.DecodedMessage memory messageData;

    //esto deberia venir  como parameter
    messageData.dappAddress = address(this); // Puedes configurar la dirección del contrato actual
    messageData.message = "Prueba de mensaje válido";

    bytes memory encodedMessage = abi.encode(messageData);
    CrossChainRelayer.Client.Any2EVMMessage memory evmMessage;
    evmMessage.messageId = bytes32(123);
    evmMessage.sourceChainSelector = uint64(1);
    evmMessage.sender = abi.encode(address(this));
    evmMessage.data = encodedMessage;

    crossChainRelayer._ccipReceive(evmMessage);
  }
}

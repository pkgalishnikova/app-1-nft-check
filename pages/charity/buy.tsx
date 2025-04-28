import React, { useState } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  useToast,
  Textarea,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {
  useContract,
  useOwnedNFTs,
  useAddress,
  ConnectWallet,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { CHARITY_NFT_COLLECTION_ADDRESS } from "../../const/addresses";
import CharityNFTGrid from "../../components_new/NFTGrids/charity_NFTGrid";
import charityNFTAbi from "../../charityNFTAbi.json";

const CharityBuyPage = () => {
  const [isMintingModalOpen, setIsMintingModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const toast = useToast();
  const router = useRouter();
  const address = useAddress();
  const signer = useSigner();

  const { contract: charityCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);

  const { data: charityNFTs, isLoading: loadingCharityNfts } = useOwnedNFTs(
    charityCollection,
    address
  );

  const mintNFTWithMetadata = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const contract = new ethers.Contract(
        CHARITY_NFT_COLLECTION_ADDRESS,
        charityNFTAbi,
        signer
      );

      const amountInWei = ethers.utils.parseEther(paymentAmount);

      const tx = await contract.mint(amountInWei);
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Mint confirmed!");

      toast({
        title: "Mint Successful!",
        description: "Your NFT has been minted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setIsMintingModalOpen(false);
      setPaymentAmount("");
    } catch (err) {
      console.error("Mint failed:", err);
      toast({
        title: "Mint Failed",
        description: "Transaction failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="1200px" p={5}>
      <Heading mb={4}>Charity NFTs</Heading>
      <Text mb={8}>Release NFTs and manage them to donate money.</Text>

      <Flex alignItems="center" gap={4} mb={8}>
        <Box flex={1} maxW="200px">
          <ConnectWallet />
        </Box>
        <Button 
          colorScheme="green" 
          onClick={() => setIsMintingModalOpen(true)}
          isDisabled={!address}
        >
          Mint NFT
        </Button>
      </Flex>

      <Modal isOpen={isMintingModalOpen} onClose={() => setIsMintingModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint Charity NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Input the daily payment amount:</Text>
            <Textarea
              placeholder="Enter amount (in ETH)"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="green" 
              onClick={mintNFTWithMetadata}
              isDisabled={!paymentAmount}
              width="100%"
            >
              Confirm Mint
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading size="md" mb={4}>Your Charity NFTs</Heading>
      <Text mb={6}>Manage your charity NFTs.</Text>
      <CharityNFTGrid
        data={charityNFTs}
        isLoading={loadingCharityNfts}
        emptyText={"You do not own any NFTs yet from charity collection"}
      />
    </Container>
  );
};

export default CharityBuyPage;
// import { Avatar, Box, Container, Flex, Input, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
// import { MediaRenderer, ThirdwebNftMedia, Web3Button, useContract, useMinimumNextBid, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
// import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
// import React, { useState } from "react";
// import { CHARITY_NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS } from "../../../../const/addresses";
// import { GetStaticPaths, GetStaticProps } from "next";
// import Link from "next/link";

// type Props = {
//     nft: NFT;
//     contractMetadata: any;
// };

// export default function TokenPage({ nft, contractMetadata }: Props) {
//     const { contract: marketplace, isLoading: loadingMarketplace } =
//         useContract(
//             MARKETPLACE_ADDRESS,
//             "marketplace-v3"
//         );

//     const { contract: nftCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);

//     const { data: directListing, isLoading: loadingDirectListing } =
//         useValidDirectListings(marketplace, {
//             tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
//             tokenId: nft.metadata.id,
//         });

//     const [bidValue, setBidValue] = useState<string>();

//     const { data: auctionListing, isLoading: loadingAuction } =
//         useValidEnglishAuctions(marketplace, {
//             tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
//             tokenId: nft.metadata.id,
//         });


//     async function buyListing() {
//         let txResult;

//         if (auctionListing?.[0]) {
//             txResult = await marketplace?.englishAuctions.buyoutAuction(
//                 auctionListing[0].id,
//             );
//         } else if (directListing?.[0]) {
//             txResult = await marketplace?.directListings.buyFromListing(
//                 directListing[0].id,
//                 1
//             );
//         } else {
//             throw new Error("No listing found");
//         }

//         return txResult;
//     }

//     async function createBidOffer() {
//         let txResult;
//         if(!bidValue) {
//             return;
//         }

//         if (auctionListing?.[0]) {
//             txResult = await marketplace?.englishAuctions.makeBid(
//                 auctionListing[0].id,
//                 bidValue
//             );
//         } else if (directListing?.[0]){
//             txResult = await marketplace?.offers.makeOffer({
//                 assetContractAddress: CHARITY_NFT_COLLECTION_ADDRESS,
//                 tokenId: nft.metadata.id,
//                 totalPrice: bidValue,
//             })
//         } else {
//             throw new Error("No listing found");
//         }
//         return txResult;
//     }

//     return (
//         <Container maxW={"1200px"} p={5} my={5}>
//             <SimpleGrid columns={2} spacing={6}>
//                 <Stack spacing={"20px"}>
//                     <Box borderRadius={"6px"} overflow={"hidden"}>
//                         <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
//                             <ThirdwebNftMedia
//                                 metadata={nft.metadata}
//                                 width="100%"
//                                 height="100%"
//                             />
//                         </Skeleton>
//                     </Box>
//                     <Box>
//                         <Text fontWeight={"bold"}>Description:</Text>
//                         <Text>{nft.metadata.description}</Text>
//                     </Box>
//                     <Box paddingBottom={"70px"}>
//                         <Text fontWeight={"bold"}>Traits:</Text>
//                         <SimpleGrid columns={2} spacing={4}>
//                             {Object.entries(nft?.metadata.attributes || {}).map(
//                                 ([key, value]) => {
//                                     const trait = value as { trait_type: string; value: string | number };
//                                     return (
//                                         <Flex
//                                             key={key}
//                                             direction={"column"}
//                                             alignItems={"center"}
//                                             justifyContent={"center"}
//                                             borderWidth={1}
//                                             p={"8px"}
//                                             borderRadius={"4px"}
//                                         >
//                                             <Text fontSize={"small"}>{trait.trait_type}</Text>
//                                             <Text fontSize={"small"} fontWeight={"bold"}>
//                                                 {trait.value}
//                                             </Text>
//                                         </Flex>
//                                     );
//                                 })}
//                         </SimpleGrid>
//                     </Box>
//                 </Stack>
//                 <Stack spacing={"20px"}>
//                     {contractMetadata && (
//                         <Flex alignItems={"center"}>
//                             <Box borderRadius={"4px"} overflow={"hidden"} mr={"10px"}>
//                                 <MediaRenderer
//                                     src={contractMetadata.image}
//                                     height="32px"
//                                     width="32px"
//                                 />
//                             </Box>
//                             <Text fontWeight={"bold"}>{contractMetadata.name}</Text>
//                         </Flex>
//                     )}
//                     <Box mx={2.5}>
//                         <Text fontSize={"4xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
//                         <Link
//                             href={`/profile/${nft.owner}`}
//                         >
//                             <Flex direction={"row"} alignItems={"center"}>
//                                 <Avatar src='https://bit.ly/broken-link' h={"24px"} w={"24px"} mr={"10px"} />
//                                 <Text fontSize={"small"}>{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</Text>
//                             </Flex>
//                         </Link>
//                     </Box>

//                     {/* <Stack backgroundColor={"#EEE"} p={2.5} borderRadius={"6px"}>
//                         <Text color={"darkgray"}>Price:</Text>
//                         <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
//                             { directListing && directListing[0] ? (
//                                 <Text fontSize={"3xl"} fontWeight={"bold"}>
//                                     {directListing[0]?.currencyValuePerToken.displayValue}
//                                     {" " + directListing[0]?.currencyValuePerToken.symbol}
//                                 </Text>
//                             ) : auctionListing && auctionListing[0] ? (
//                                 <Text fontSize={"3xl"} fontWeight={"bold"}>
//                                     {auctionListing[0]?.buyoutCurrencyValue.displayValue}
//                                     {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
//                                 </Text>
//                             ) : (
//                                 <Text fontSize={"3xl"} fontWeight={"bold"}>Not for sale</Text>
//                             )}
//                         </Skeleton>
//                         <Skeleton isLoaded={!loadingAuction}>
//                             {auctionListing && auctionListing[0] && (
//                                 <Flex direction={"column"}>
//                                     <Text color={"darkgray"}>Bids starting from</Text>
//                                     <Text fontSize={"3xl"} fontWeight={"bold"}>
//                                         {auctionListing[0]?.minimumBidCurrencyValue.displayValue}
//                                         {" " + auctionListing[0]?.minimumBidCurrencyValue.symbol}
//                                     </Text>
//                                     <Text></Text>
//                                 </Flex>
//                             )}

//                         </Skeleton>
//                     </Stack> */}
//                     {/* <Skeleton isLoaded={!loadingMarketplace || !loadingDirectListing || !loadingAuction}>
//                         <Web3Button
//                             contractAddress={MARKETPLACE_ADDRESS}
//                             action={async () => buyListing()}
//                             isDisabled={(!auctionListing || !auctionListing[0]) && (!directListing || !directListing[0])}
//                         >Buy at asking price</Web3Button>
//                         <Text textAlign={"center"}>or</Text>
//                         <Flex direction={"column"}>
//                             <Input
//                                 mb={5}
//                                 defaultValue={
//                                     auctionListing?.[0]?.minimumBidCurrencyValue?.displayValue || 0
//                                 }
//                                 type={"number"}
//                                 onChange={(e) => setBidValue(e.target.value)}
//                             />
//                             <Web3Button
//                                 contractAddress={MARKETPLACE_ADDRESS}
//                                 action={async () => await createBidOffer()}
//                                 isDisabled={!auctionListing || !auctionListing[0]}
//                             >Place Bid</Web3Button>
//                         </Flex>
//                     </Skeleton> */}
//                 </Stack>
//             </SimpleGrid>

//         </Container>
//     )
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//     const tokenId = context.params?.tokenId as string;
//     const sdk = new ThirdwebSDK("sepolia");

//     let nft = null;
//     let contractMetadata = null;

//     try {
//       const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);
//       nft = await contract.erc721.get(tokenId);

//       // Handle undefined values
//       contractMetadata = await contract.metadata.get();
//       contractMetadata = {
//         ...contractMetadata,
//         description: contractMetadata.description ?? "No description available",
//         image: contractMetadata.image ?? null,
//         name: contractMetadata.name ?? "Unnamed Collection",
//       };
//     } catch (e) {
//       console.error("Error fetching NFT or metadata:", e);
//     }

//     return {
//       props: {
//         nft,
//         contractMetadata,
//       },
//       revalidate: 1,
//     };
//   };

//   export const getStaticPaths: GetStaticPaths = async () => {
//     const sdk = new ThirdwebSDK("sepolia");

//     const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);

//     const nfts = await contract.erc721.getAll();

//     const paths = nfts.map((nft) => {
//       return {
//         params: {
//           contractAddress: CHARITY_NFT_COLLECTION_ADDRESS,
//           tokenId: nft.metadata.id,
//         },
//       };
//     });

//     return {
//       paths,
//       fallback: "blocking", // can also be true or 'blocking'
//     };
//   };

// import { 
//     Avatar, 
//     Box, 
//     Container, 
//     Flex, 
//     Input, 
//     SimpleGrid, 
//     Skeleton, 
//     Stack, 
//     Text, 
//     useToast,
//     Badge
//   } from "@chakra-ui/react";
//   import { 
//     MediaRenderer, 
//     ThirdwebNftMedia, 
//     Web3Button, 
//     useContract, 
//     useValidDirectListings, 
//     useValidEnglishAuctions 
//   } from "@thirdweb-dev/react";
//   import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
//   import React, { useState } from "react";
//   import { CHARITY_NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS } from "../../../../const/addresses";
//   import { GetStaticPaths, GetStaticProps } from "next";
//   import Link from "next/link";

//   type Props = {
//     nft: NFT;
//     contractMetadata: any;
//   };

//   const TokenPage: React.FC<Props> = ({ nft, contractMetadata }) => {
//     const { contract: marketplace, isLoading: loadingMarketplace } =
//       useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

//     const { contract: nftCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);

//     const { data: directListing, isLoading: loadingDirectListing } =
//       useValidDirectListings(marketplace, {
//         tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
//         tokenId: nft.metadata.id,
//       });

//     const [bidValue, setBidValue] = useState<string>("");
//     const toast = useToast();

//     const { data: auctionListing, isLoading: loadingAuction } =
//       useValidEnglishAuctions(marketplace, {
//         tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
//         tokenId: nft.metadata.id,
//       });

//     // Extract status from NFT metadata
//     const currentStatus = nft.metadata?.status;
//     const isPaused = currentStatus !== "1";
//     const statusText = isPaused ? "Paused" : "Active";
//     const statusColor = isPaused ? "red" : "green";

//     async function togglePauseStatus() {
//       if (!nftCollection) return;

//       try {
//         const newStatus = isPaused ? "1" : "0";
//         const donations = nft.metadata?.sum || "0";
//         const pay = nft.metadata?.pay || "0";

//         await nftCollection.call("updateJson", [
//           nft.metadata.id,
//           newStatus,
//           donations,
//           pay
//         ]);

//         toast({
//           title: "Status updated",
//           description: `NFT is now ${newStatus === "1" ? "active" : "paused"}`,
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//         });

//         // Refresh the page to see changes
//         window.location.reload();
//       } catch (error) {
//         console.error("Error updating status:", error);
//         toast({
//           title: "Error updating status",
//           description: (error as Error).message,
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     }

//     async function buyListing() {
//       let txResult;

//       if (auctionListing?.[0]) {
//         txResult = await marketplace?.englishAuctions.buyoutAuction(
//           auctionListing[0].id,
//         );
//       } else if (directListing?.[0]) {
//         txResult = await marketplace?.directListings.buyFromListing(
//           directListing[0].id,
//           1
//         );
//       } else {
//         throw new Error("No listing found");
//       }

//       return txResult;
//     }

//     async function createBidOffer() {
//       let txResult;
//       if (!bidValue) {
//         return;
//       }

//       if (auctionListing?.[0]) {
//         txResult = await marketplace?.englishAuctions.makeBid(
//           auctionListing[0].id,
//           bidValue
//         );
//       } else if (directListing?.[0]) {
//         txResult = await marketplace?.offers.makeOffer({
//           assetContractAddress: CHARITY_NFT_COLLECTION_ADDRESS,
//           tokenId: nft.metadata.id,
//           totalPrice: bidValue,
//         });
//       } else {
//         throw new Error("No listing found");
//       }
//       return txResult;
//     }

//     return (
//       <Container maxW={"1200px"} p={5} my={5}>
//         <SimpleGrid columns={2} spacing={6}>
//           <Stack spacing={"20px"}>
//             <Box borderRadius={"6px"} overflow={"hidden"}>
//               <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
//                 <ThirdwebNftMedia
//                   metadata={nft.metadata}
//                   width="100%"
//                   height="100%"
//                 />
//               </Skeleton>
//             </Box>
//             <Box>
//               <Text fontWeight={"bold"}>Description:</Text>
//               <Text>{nft.metadata.description}</Text>
//             </Box>
//             <Box>
//               <Text fontWeight={"bold"}>Status:</Text>
//               <Badge colorScheme={statusColor}>{statusText}</Badge>
//             </Box>
//             <Box paddingBottom={"70px"}>
//               <Text fontWeight={"bold"}>Traits:</Text>
//               <SimpleGrid columns={2} spacing={4}>
//                 {Object.entries(nft?.metadata.attributes || {}).map(
//                   ([key, value]) => {
//                     const trait = value as { trait_type: string; value: string | number };
//                     return (
//                       <Flex
//                         key={key}
//                         direction={"column"}
//                         alignItems={"center"}
//                         justifyContent={"center"}
//                         borderWidth={1}
//                         p={"8px"}
//                         borderRadius={"4px"}
//                       >
//                         <Text fontSize={"small"}>{trait.trait_type}</Text>
//                         <Text fontSize={"small"} fontWeight={"bold"}>
//                           {trait.value}
//                         </Text>
//                       </Flex>
//                     );
//                   })}
//               </SimpleGrid>
//             </Box>
//           </Stack>
//           <Stack spacing={"20px"}>
//             {contractMetadata && (
//               <Flex alignItems={"center"}>
//                 <Box borderRadius={"4px"} overflow={"hidden"} mr={"10px"}>
//                   <MediaRenderer
//                     src={contractMetadata.image}
//                     height="32px"
//                     width="32px"
//                   />
//                 </Box>
//                 <Text fontWeight={"bold"}>{contractMetadata.name}</Text>
//               </Flex>
//             )}
//             <Box mx={2.5}>
//               <Text fontSize={"4xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
//               <Link href={`/profile/${nft.owner}`}>
//                 <Flex direction={"row"} alignItems={"center"}>
//                   <Avatar src='https://bit.ly/broken-link' h={"24px"} w={"24px"} mr={"10px"} />
//                   <Text fontSize={"small"}>{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</Text>
//                 </Flex>
//               </Link>
//             </Box>

//             {/* Pause/Unpause Button */}
//             <Web3Button
//               contractAddress={CHARITY_NFT_COLLECTION_ADDRESS}
//               action={togglePauseStatus}
//             >
//               {isPaused ? "Activate NFT" : "Pause NFT"}
//             </Web3Button>
// {/*   
//             <Stack backgroundColor={"#EEE"} p={2.5} borderRadius={"6px"}>
//               <Text color={"darkgray"}>Price:</Text>
//               <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
//                 {directListing && directListing[0] ? (
//                   <Text fontSize={"3xl"} fontWeight={"bold"}>
//                     {directListing[0]?.currencyValuePerToken.displayValue}
//                     {" " + directListing[0]?.currencyValuePerToken.symbol}
//                   </Text>
//                 ) : auctionListing && auctionListing[0] ? (
//                   <Text fontSize={"3xl"} fontWeight={"bold"}>
//                     {auctionListing[0]?.buyoutCurrencyValue.displayValue}
//                     {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
//                   </Text>
//                 ) : (
//                   <Text fontSize={"3xl"} fontWeight={"bold"}>Not for sale</Text>
//                 )}
//               </Skeleton>
//               <Skeleton isLoaded={!loadingAuction}>
//                 {auctionListing && auctionListing[0] && (
//                   <Flex direction={"column"}>
//                     <Text color={"darkgray"}>Bids starting from</Text>
//                     <Text fontSize={"3xl"} fontWeight={"bold"}>
//                       {auctionListing[0]?.minimumBidCurrencyValue.displayValue}
//                       {" " + auctionListing[0]?.minimumBidCurrencyValue.symbol}
//                     </Text>
//                   </Flex>
//                 )}
//               </Skeleton>
//             </Stack> */}
//             {/* <Skeleton isLoaded={!loadingMarketplace || !loadingDirectListing || !loadingAuction}>
//               <Web3Button
//                 contractAddress={MARKETPLACE_ADDRESS}
//                 action={async () => buyListing()}
//                 isDisabled={(!auctionListing || !auctionListing[0]) && (!directListing || !directListing[0])}
//               >
//                 Buy at asking price
//               </Web3Button>
//               <Text textAlign={"center"}>or</Text>
//               <Flex direction={"column"}>
//                 <Input
//                   mb={5}
//                   defaultValue={
//                     auctionListing?.[0]?.minimumBidCurrencyValue?.displayValue || 0
//                   }
//                   type={"number"}
//                   onChange={(e) => setBidValue(e.target.value)}
//                 />
//                 <Web3Button
//                   contractAddress={MARKETPLACE_ADDRESS}
//                   action={async () => await createBidOffer()}
//                   isDisabled={!auctionListing || !auctionListing[0]}
//                 >
//                   Place Bid
//                 </Web3Button>
//               </Flex>
//             </Skeleton> */}
//           </Stack>
//         </SimpleGrid>
//       </Container>
//     );
//   };

//   export default TokenPage;

//   export const getStaticProps: GetStaticProps = async (context) => {
//     const tokenId = context.params?.tokenId as string;
//     const sdk = new ThirdwebSDK("sepolia");

//     let nft = null;
//     let contractMetadata = null;

//     try {
//       const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);
//       nft = await contract.erc721.get(tokenId);

//       contractMetadata = await contract.metadata.get();
//       contractMetadata = {
//         ...contractMetadata,
//         description: contractMetadata.description ?? "No description available",
//         image: contractMetadata.image ?? null,
//         name: contractMetadata.name ?? "Unnamed Collection",
//       };
//     } catch (e) {
//       console.error("Error fetching NFT or metadata:", e);
//     }

//     return {
//       props: {
//         nft,
//         contractMetadata,
//       },
//       revalidate: 1,
//     };
//   };

//   export const getStaticPaths: GetStaticPaths = async () => {
//     const sdk = new ThirdwebSDK("sepolia");

//     const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);
//     const nfts = await contract.erc721.getAll();

//     const paths = nfts.map((nft) => {
//       return {
//         params: {
//           contractAddress: CHARITY_NFT_COLLECTION_ADDRESS,
//           tokenId: nft.metadata.id,
//         },
//       };
//     });

//     return {
//       paths,
//       fallback: "blocking",
//     };
//   };


// import { 
//   Avatar, 
//   Box, 
//   Container, 
//   Flex, 
//   SimpleGrid, 
//   Skeleton, 
//   Stack, 
//   Text, 
//   useToast,
//   Badge
// } from "@chakra-ui/react";
// import { 
//   MediaRenderer, 
//   ThirdwebNftMedia, 
//   Web3Button, 
//   useContract, 
//   useValidDirectListings, 
//   useValidEnglishAuctions 
// } from "@thirdweb-dev/react";
// import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
// import React, { useState } from "react";
// import { CHARITY_NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS, APP_CHARITY_CONTRACT_ADDRESS } from "../../../../const/addresses";
// import { GetStaticPaths, GetStaticProps } from "next";
// import Link from "next/link";
// import { useRouter } from 'next/router';

// type Props = {
//   nft: NFT;
//   contractMetadata: any;
// };

// export default function TokenPage({ nft, contractMetadata }: Props) {
//   const { contract: marketplace, isLoading: loadingMarketplace } =
//     useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

//   const { contract: nftCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);
//   const { contract: appNFTCharity } = useContract(APP_CHARITY_CONTRACT_ADDRESS);
//   const router = useRouter();

//   const { data: directListing, isLoading: loadingDirectListing } =
//     useValidDirectListings(marketplace, {
//       tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
//       tokenId: nft.metadata.id,
//     });

//   const [bidValue, setBidValue] = useState<string>("");
//   const toast = useToast();

//   const { data: auctionListing, isLoading: loadingAuction } =
//     useValidEnglishAuctions(marketplace, {
//       tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
//       tokenId: nft.metadata.id,
//     });

//   // Extract status from NFT metadata
//   const currentStatus = nft.metadata?.status;
//   const isPaused = currentStatus === "0";
//   const statusText = isPaused ? "Paused" : "Active";
//   const statusColor = isPaused ? "red" : "green";

//   async function togglePauseStatus() {
//     if (!appNFTCharity || !nftCollection) return;

//     try {
//       const tokenId = nft.metadata.id;
//       const charityId = 1; // Adjust this based on your contract setup
//       const status = currentStatus;
//       const donations = nft.metadata?.sum || "0";
//       const pay = nft.metadata?.pay || "0";

//       await appNFTCharity.call("statusChange", [
//         tokenId,
//         charityId,
//         status,
//         donations,
//         pay
//       ]);

//       toast({
//         title: "Status updated",
//         description: `NFT is now ${isPaused ? "active" : "paused"}`,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });

//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating status:", error);
//       toast({
//         title: "Error updating status",
//         description: (error as Error).message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }

//   return (
//     <Container maxW={"1200px"} p={5} my={5}>
//       <button
//                     onClick={() => router.back()}
//                     style={{
//                         backgroundColor: "#ededed",
//                         color: "black",
//                         borderRadius: "5px",
//                         padding: "0.5rem 1rem",
//                         fontSize: "1.1rem",
//                         border: "none",
//                         cursor: "pointer",
//                         transition: "background-color 0.15s ease",
//                     }}
//                 >
//                     Back
//                 </button>
//       <SimpleGrid columns={2} spacing={6}>
//         <Stack spacing={"20px"}>
//           <Box borderRadius={"6px"} overflow={"hidden"}>
//             <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
//               <ThirdwebNftMedia
//                 metadata={nft.metadata}
//                 width="100%"
//                 height="100%"
//               />
//             </Skeleton>
//           </Box>
//           <Box>
//             <Text fontWeight={"bold"}>Description:</Text>
//             <Text>{nft.metadata.description}</Text>
//           </Box>
//           <Box>
//             <Text fontWeight={"bold"}>Status:</Text>
//             <Badge colorScheme={statusColor}>{statusText}</Badge>
//           </Box>
//           <Box paddingBottom={"70px"}>
//             <Text fontWeight={"bold"}>Traits:</Text>
//             <SimpleGrid columns={2} spacing={4}>
//               {Object.entries(nft?.metadata.attributes || {}).map(
//                 ([key, value]) => {
//                   const trait = value as { trait_type: string; value: string | number };
//                   return (
//                     <Flex
//                       key={key}
//                       direction={"column"}
//                       alignItems={"center"}
//                       justifyContent={"center"}
//                       borderWidth={1}
//                       p={"8px"}
//                       borderRadius={"4px"}
//                     >
//                       <Text fontSize={"small"}>{trait.trait_type}</Text>
//                       <Text fontSize={"small"} fontWeight={"bold"}>
//                         {trait.value}
//                       </Text>
//                     </Flex>
//                   );
//                 })}
//             </SimpleGrid>
//           </Box>
//         </Stack>
//         <Stack spacing={"20px"}>
//           {contractMetadata && (
//             <Flex alignItems={"center"}>
//               <Box borderRadius={"4px"} overflow={"hidden"} mr={"10px"}>
//                 <MediaRenderer
//                   src={contractMetadata.image}
//                   height="32px"
//                   width="32px"
//                 />
//               </Box>
//               <Text fontWeight={"bold"}>{contractMetadata.name}</Text>
//             </Flex>
//           )}
//           <Box mx={2.5}>
//             <Text fontSize={"4xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
//             <Link href={`/profile/${nft.owner}`}>
//               <Flex direction={"row"} alignItems={"center"}>
//                 <Avatar src='https://bit.ly/broken-link' h={"24px"} w={"24px"} mr={"10px"} />
//                 <Text fontSize={"small"}>{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</Text>
//               </Flex>
//             </Link>
//           </Box>

//           <Web3Button
//             contractAddress={APP_CHARITY_CONTRACT_ADDRESS}
//             action={togglePauseStatus}
//           >
//             {isPaused ? "Activate NFT" : "Pause NFT"}
//           </Web3Button>
//         </Stack>
//       </SimpleGrid>
//     </Container>
//   );
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const tokenId = context.params?.tokenId as string;
//   const sdk = new ThirdwebSDK("sepolia");

//   let nft = null;
//   let contractMetadata = null;

//   try {
//     const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);
//     nft = await contract.erc721.get(tokenId);

//     contractMetadata = await contract.metadata.get();
//     contractMetadata = {
//       ...contractMetadata,
//       description: contractMetadata.description ?? "No description available",
//       image: contractMetadata.image ?? null,
//       name: contractMetadata.name ?? "Unnamed Collection",
//     };
//   } catch (e) {
//     console.error("Error fetching NFT or metadata:", e);
//   }

//   return {
//     props: {
//       nft,
//       contractMetadata,
//     },
//     revalidate: 1,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const sdk = new ThirdwebSDK("sepolia");

//   const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);
//   const nfts = await contract.erc721.getAll();

//   const paths = nfts.map((nft) => {
//     return {
//       params: {
//         contractAddress: CHARITY_NFT_COLLECTION_ADDRESS,
//         tokenId: nft.metadata.id,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast,
  Badge
} from "@chakra-ui/react";
import {
  MediaRenderer,
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
  useContractWrite
} from "@thirdweb-dev/react";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { CHARITY_NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS, APP_CHARITY_CONTRACT_ADDRESS } from "../../../../const/addresses";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { ethers } from "ethers";


type Props = {
  nft: NFT;
  contractMetadata: any;
};

const TokenPage = ({ nft, contractMetadata }: Props) => {
  const { contract: marketplace, isLoading: loadingMarketplace } =
    useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const { contract: nftCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);
  const { contract: appNFTCharity } = useContract(APP_CHARITY_CONTRACT_ADDRESS);
  const [isDonating, setIsDonating] = useState(false);
  const { mutateAsync: makeDonation } = useContractWrite(appNFTCharity, "transferFunds");
  const router = useRouter();
  const payAmount = ethers.utils.parseEther("0.1");

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  const [bidValue, setBidValue] = useState<string>("");
  const toast = useToast();

  const handleDonate = async () => {
    if (!nft.metadata?.pay || nft.metadata.pay === "0") {
      toast({
        title: "Invalid Donation Amount",
        description: "This NFT doesn't have a valid donation amount set",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsDonating(true);
    try {
      const payAmount = ethers.utils.parseEther(String(nft.metadata.pay || "0"));


      await makeDonation({
        args: [
          ethers.BigNumber.from(nft.metadata.id),
          1,
          ethers.BigNumber.from(nft.metadata.status || "0"),
          ethers.BigNumber.from(nft.metadata.sum || "0"),
          payAmount
        ],
        overrides: {
          value: payAmount
        }
      });

      toast({
        title: "Donation Successful",
        description: `Thank you for your donation of ${ethers.utils.formatEther(payAmount)} ETH`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Donation failed:", error);
      toast({
        title: "Donation Failed",
        description: error instanceof Error ? error.message : "Transaction failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDonating(false);
    }
  };

  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: CHARITY_NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  const currentStatus = nft.metadata?.status;
  const donations = nft.metadata?.sum || "0";
  const isPaused = currentStatus === "0";
  const statusText = isPaused ? "Paused" : "Active";
  const statusColor = isPaused ? "red" : "green";

  async function togglePauseStatus() {
    if (!appNFTCharity || !nftCollection) return;

    try {
      const tokenId = nft.metadata.id;
      const charityId = 1;
      const status = currentStatus;
      const donations = nft.metadata?.sum || "0";
      const pay = nft.metadata?.pay || "0";

      await appNFTCharity.call("statusChange", [
        tokenId,
        charityId,
        status,
        donations,
        pay
      ]);

      toast({
        title: "Status updated",
        description: `NFT is now ${isPaused ? "active" : "paused"}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error updating status",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Container maxW={"1200px"} p={5} my={5}>
      <SimpleGrid columns={2} spacing={6}>
        <Stack spacing={"20px"}>
          <Box borderRadius={"6px"} overflow={"hidden"}>
            <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width="100%"
                height="100%"
              />
            </Skeleton>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Text fontWeight={"bold"}>Description:</Text>
              <Text>{nft.metadata.description}</Text>
            </Box>

            <Box p={3}>
              <Text fontSize="sm">Weekly Donation: ${ethers.utils.formatEther(String(nft.metadata?.pay || "0"))} ETH</Text>
              <Text fontSize="sm">Total Donated: ${ethers.utils.formatEther(String(nft.metadata?.sum || "0"))} ETH </Text>
            </Box>

            <Box>
              <Text fontWeight={"bold"}>Status:</Text>
              <Badge colorScheme={statusColor}>{statusText}</Badge>
            </Box>

            <Box>
              <Text fontWeight={"bold"}>Amount Donated:</Text>
              <Text>
                {typeof nft.metadata?.sum === "string" || typeof nft.metadata?.sum === "number"
                  ? nft.metadata.sum
                  : "0"} wei
              </Text>
            </Box>

            <Box>
              <Text fontWeight={"bold"}>Rank:</Text>
              <Badge colorScheme={
                nft.metadata?.rank === "Gold" ? "yellow" :
                  nft.metadata?.rank === "Silver" ? "gray" :
                    nft.metadata?.rank === "Bronze" ? "orange" : "purple"
              }>
                {typeof nft.metadata?.rank === "string" ? nft.metadata.rank : "Unknown"}
              </Badge>
            </Box>
          </SimpleGrid>
          <Box paddingBottom={"50px"}>
            <SimpleGrid columns={2} spacing={4}>
              {Object.entries(nft?.metadata.attributes || {}).map(
                ([key, value]) => {
                  const trait = value as { trait_type: string; value: string | number };
                  return (
                    <Flex
                      key={key}
                      direction={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderWidth={1}
                      p={"8px"}
                      borderRadius={"4px"}
                    >
                      <Text fontSize={"small"}>{trait.trait_type}</Text>
                      <Text fontSize={"small"} fontWeight={"bold"}>
                        {trait.value}
                      </Text>
                    </Flex>
                  );
                })}
            </SimpleGrid>
          </Box>
        </Stack>

        <Stack spacing={"20px"}>
          {/* Back Button */}
          <Box>
            <Button onClick={() => router.back()} colorScheme="gray" size="sm">
              ← Back
            </Button>
          </Box>

          {contractMetadata && (
            <Flex alignItems={"center"}>
              <Box borderRadius={"4px"} overflow={"hidden"} mr={"10px"}>
                <MediaRenderer
                  src={contractMetadata.image}
                  height="32px"
                  width="32px"
                />
              </Box>
              <Text fontWeight={"bold"}>{contractMetadata.name}</Text>
            </Flex>
          )}

          <Box mx={2.5}>
            <Text fontSize={"4xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
            <Link href={`/profile/${nft.owner}`}>
              <Flex direction={"row"} alignItems={"center"}>
                <Avatar src='https://bit.ly/broken-link' h={"24px"} w={"24px"} mr={"10px"} />
                <Text fontSize={"small"}>{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</Text>
              </Flex>
            </Link>
          </Box>

          <Web3Button
            contractAddress={APP_CHARITY_CONTRACT_ADDRESS}
            action={togglePauseStatus}
          >
            {isPaused ? "Activate NFT" : "Pause NFT"}
          </Web3Button>

          <Box mt={4}>
            <Button
              colorScheme="green"
              onClick={handleDonate}
              isLoading={isDonating}
              loadingText="Processing..."
              isDisabled={nft.metadata?.status === "0"}
            >
              {`Donate ${ethers.utils.formatEther(String(nft.metadata?.pay || "0"))} ETH`}
            </Button>
            {nft.metadata?.status === "0" && (
              <Text mt={2} color="yellow.500">
                Donations are currently paused for this NFT
              </Text>
            )}
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;
  const sdk = new ThirdwebSDK("sepolia");

  let nft = null;
  let contractMetadata = null;

  try {
    const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);
    nft = await contract.erc721.get(tokenId);

    contractMetadata = await contract.metadata.get();
    contractMetadata = {
      ...contractMetadata,
      description: contractMetadata.description ?? "No description available",
      image: contractMetadata.image ?? null,
      name: contractMetadata.name ?? "Unnamed Collection",
    };
  } catch (e) {
    console.error("Error fetching NFT or metadata:", e);
  }

  return {
    props: {
      nft,
      contractMetadata,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK("sepolia");

  const contract = await sdk.getContract(CHARITY_NFT_COLLECTION_ADDRESS);
  const nfts = await contract.erc721.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: CHARITY_NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export default TokenPage;

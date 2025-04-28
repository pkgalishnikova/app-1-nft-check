
// import { Box, Container, Flex, Heading, Text, Stack, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
// import { useContract, useOwnedNFTs, useAddress } from "@thirdweb-dev/react";
// import React, { useState, useEffect } from "react";
// import { MARKETPLACE_ADDRESS, GYM_NFT_COLLECTION_ADDRESS, FOOD_NFT_COLLECTION_ADDRESS, CHARITY_NFT_COLLECTION_ADDRESS } from "../../const/addresses";
// import { useRouter } from "next/router";
// import NFTGrid from "../../components_new/NFTGrids/gym_NFTGrid";
// import { NFT } from "@thirdweb-dev/sdk";

// const ProfilePage: React.FC = () => {
//   const router = useRouter();
//   const address = useAddress();
//   const [activeTab, setActiveTab] = useState(0);

//   const { contract: gymCollection } = useContract(GYM_NFT_COLLECTION_ADDRESS);
//   const { contract: foodCollection } = useContract(FOOD_NFT_COLLECTION_ADDRESS);
//   const { contract: charityCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);
//   const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

//   const { data: gymNFTs, isLoading: loadingGymNfts } = useOwnedNFTs(
//     gymCollection,
//     router.query.address as string
//   );

//   const { data: foodNFTs, isLoading: loadingFoodNfts } = useOwnedNFTs(
//     foodCollection,
//     router.query.address as string
//   );

//   const { data: charityNFTs, isLoading: loadingCharityNfts } = useOwnedNFTs(
//     charityCollection,
//     router.query.address as string
//   );


//   return (
//     <Container maxW={"1200px"} p={5} py={"10px"} px={"40px"} paddingBottom={"50px"}>
//       <Stack align={"baseline"} spacing={4}>
//         <Heading>{"Favourites"}</Heading>
//         <Text>Browse and manage NFTs that you saved.</Text>

      
//         <Flex direction="row" justify="space-between" align="center" width="100%">
//           <Heading flex="1">{"Owned NFT(s)"}</Heading>
//           <Tabs onChange={(index) => setActiveTab(index)}>
//             <TabList>
//               <Tab>Gym</Tab>
//               <Tab>Food delivery</Tab>
//               <Tab>Charity</Tab>
//             </TabList>
//           </Tabs>
//         </Flex>

//         <Text>Browse and manage your NFTs from this collection.</Text>

//         <Tabs index={activeTab} onChange={setActiveTab} isLazy>
//           <TabPanels>
//             <TabPanel>
//               <NFTGrid
//                 data={gymNFTs}
//                 isLoading={loadingGymNfts}
//                 emptyText={"You do not own any NFTs yet from gym collection"}
//               />
//             </TabPanel>
//             <TabPanel>
//               <NFTGrid
//                 data={foodNFTs}
//                 isLoading={loadingFoodNfts}
//                 emptyText={"You do not own any NFTs yet from food delivery collection"}
//               />
//             </TabPanel>
//             <TabPanel>
//               <NFTGrid
//                 data={charityNFTs}
//                 isLoading={loadingCharityNfts}
//                 emptyText={"You do not own any NFTs yet from charity collection"}
//               />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Stack>
//     </Container>
//   );
// };

// export default ProfilePage;

// import { Box, Container, Flex, Heading, Text, Stack, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
// import { useContract, useOwnedNFTs, useAddress } from "@thirdweb-dev/react";
// import React, { useState, useEffect } from "react";
// import { MARKETPLACE_ADDRESS, GYM_NFT_COLLECTION_ADDRESS, FOOD_NFT_COLLECTION_ADDRESS, CHARITY_NFT_COLLECTION_ADDRESS } from "../../const/addresses";
// import { useRouter } from "next/router";
// import NFTGrid from "../../components_new/NFTGrids/gym_NFTGrid";
// import { NFT } from "@thirdweb-dev/sdk";

// type FavoriteNFT = {
//   id: string;
//   name: string;
//   image: string;
//   contractAddress: string;
// };

// const ProfilePage: React.FC = () => {
//   const router = useRouter();
//   const address = useAddress();
//   const [activeTab, setActiveTab] = useState(0);
//   const [favorites, setFavorites] = useState<Record<string, FavoriteNFT>>({});

//   const { contract: gymCollection } = useContract(GYM_NFT_COLLECTION_ADDRESS);
//   const { contract: foodCollection } = useContract(FOOD_NFT_COLLECTION_ADDRESS);
//   const { contract: charityCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);
//   const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

//   const { data: gymNFTs, isLoading: loadingGymNfts } = useOwnedNFTs(
//     gymCollection,
//     router.query.address as string
//   );

//   const { data: foodNFTs, isLoading: loadingFoodNfts } = useOwnedNFTs(
//     foodCollection,
//     router.query.address as string
//   );

//   const { data: charityNFTs, isLoading: loadingCharityNfts } = useOwnedNFTs(
//         charityCollection,
//         router.query.address as string
//       );

//   useEffect(() => {
//     if (address) {
//       const favs = JSON.parse(localStorage.getItem(`favorites_${address}`) || '{}');
//       setFavorites(favs);
//     }
//   }, [address]);

//   const favoriteNFTs = Object.values(favorites).map(fav => ({
//     metadata: {
//       id: fav.id,
//       name: fav.name,
//       image: fav.image,
//     },
//     owner: address,
//     type: "ERC721",
//     supply: "1"
//   })) as unknown as NFT[];

//   return (
//     <Container maxW={"1200px"} p={5} py={"10px"} px={"40px"}>
//       <Stack align={"baseline"} spacing={4}>
//         <Heading>{"Favourites"}</Heading>
//         <Text>Browse and manage NFTs that you saved.</Text>
        
//         <NFTGrid
//           data={favoriteNFTs}
//           isLoading={false}
//           emptyText={"You haven't favorited any NFTs yet"}
//         />

//         <Flex direction="row" justify="space-between" align="center" width="100%">
//           <Heading flex="1">{"Owned NFT(s)"}</Heading>
//           <Tabs onChange={(index) => setActiveTab(index)}>
//             <TabList>
//               <Tab>Gym</Tab>
//               <Tab>Food delivery</Tab>
//               <Tab>Charity</Tab>
//             </TabList>
//           </Tabs>
//         </Flex>
      
//         <Text>Browse and manage your NFTs from this collection.</Text>

//         <Tabs index={activeTab} onChange={setActiveTab} isLazy>
//           <TabPanels>
//             <TabPanel>
//               <NFTGrid
//                 data={gymNFTs}
//                 isLoading={loadingGymNfts}
//                 emptyText={"You do not own any NFTs yet from this collection"}
//               />
//             </TabPanel>
//             <TabPanel>
//               <NFTGrid
//                 data={foodNFTs}
//                 isLoading={loadingFoodNfts}
//                 emptyText={"You do not own any NFTs yet from this collection"}
//               />
//             </TabPanel>
//             <TabPanel>
//             <NFTGrid
//                 data={charityNFTs}
//                 isLoading={loadingCharityNfts}
//                 emptyText={"You do not own any NFTs yet from this collection"}
//               />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Stack>
//     </Container>
//   );
// };

// export default ProfilePage;


// import { Box, Container, Flex, Heading, Text, Stack, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
// import { useContract, useOwnedNFTs, useAddress } from "@thirdweb-dev/react";
// import React, { useState, useEffect } from "react";
// import { MARKETPLACE_ADDRESS, GYM_NFT_COLLECTION_ADDRESS, FOOD_NFT_COLLECTION_ADDRESS, CHARITY_NFT_COLLECTION_ADDRESS } from "../../const/addresses";
// import { useRouter } from "next/router";
// import GymNFTGrid from "../../components_new/NFTGrids/gym_NFTGrid";
// import FoodNFTGrid from "../../components_new/NFTGrids/food_NFTGrid";
// import CharityNFTGrid from "../../components_new/NFTGrids/charity_NFTGrid";

// type FavoriteNFT = {
//     id: string;
//     name: string;
//     image: string;
//     contractAddress: string;
// };

// const ProfilePage: React.FC = () => {
//     const router = useRouter();
//     const address = useAddress();
//     const [activeTab, setActiveTab] = useState(0);
//     const [favorites, setFavorites] = useState<Record<string, FavoriteNFT>>({});

//     const { contract: gymCollection } = useContract(GYM_NFT_COLLECTION_ADDRESS);
//     const { contract: foodCollection } = useContract(FOOD_NFT_COLLECTION_ADDRESS);
//     const { contract: charityCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);
//     const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

//     const { data: gymNFTs, isLoading: loadingGymNfts } = useOwnedNFTs(
//         gymCollection,
//         router.query.address as string
//     );

//     const { data: foodNFTs, isLoading: loadingFoodNfts } = useOwnedNFTs(
//         foodCollection,
//         router.query.address as string
//     );

//     const { data: charityNFTs, isLoading: loadingCharityNfts } = useOwnedNFTs(
//         charityCollection,
//         router.query.address as string
//     );

//     useEffect(() => {
//         if (address) {
//             const favs = JSON.parse(localStorage.getItem(`favorites_${address}`) || '{}');
//             setFavorites(favs);
//         }
//     }, [address]);

//     return (
//         <Container maxW={"1200px"} p={5} py={"10px"} px={"40px"}>
//             <Stack align={"baseline"} spacing={4}>
//                 <Heading>{"Favourites"}</Heading>
//                 <Text>Browse and manage NFTs that you saved.</Text>
                
//                 {/* <FavoriteNFTGrid
//                     data={Object.values(favorites)}
//                     emptyText={"You haven't favorited any NFTs yet"}
//                 /> */}

//                 <Flex direction="row" justify="space-between" align="center" width="100%">
//                     <Heading flex="1">{"Owned NFT(s)"}</Heading>
//                     <Tabs onChange={(index) => setActiveTab(index)}>
//                         <TabList>
//                             <Tab>Gym</Tab>
//                             <Tab>Food delivery</Tab>
//                             <Tab>Charity</Tab>
//                         </TabList>
//                     </Tabs>
//                 </Flex>
              
//                 <Text>Browse and manage your NFTs from this collection.</Text>

//                 <Tabs index={activeTab} onChange={setActiveTab} isLazy>
//                     <TabPanels>
//                         <TabPanel>
//                             <GymNFTGrid
//                                 data={gymNFTs}
//                                 isLoading={loadingGymNfts}
//                                 emptyText={"You do not own any NFTs yet from this collection"}
//                             />
//                         </TabPanel>
//                         <TabPanel>
//                             <FoodNFTGrid
//                                 data={foodNFTs}
//                                 isLoading={loadingFoodNfts}
//                                 emptyText={"You do not own any NFTs yet from this collection"}
//                             />
//                         </TabPanel>
//                         <TabPanel>
//                             <CharityNFTGrid
//                                 data={charityNFTs}
//                                 isLoading={loadingCharityNfts}
//                                 emptyText={"You do not own any NFTs yet from this collection"}
//                             />
//                         </TabPanel>
//                     </TabPanels>
//                 </Tabs>
//             </Stack>
//         </Container>
//     );
// };

// export default ProfilePage;

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  useContract,
  useOwnedNFTs,
  useAddress,
} from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GymNFTGrid from "../../components_new/NFTGrids/gym_NFTGrid";
import FoodNFTGrid from "../../components_new/NFTGrids/food_NFTGrid";
import CharityNFTGrid from "../../components_new/NFTGrids/charity_NFTGrid";
import FavoriteNFTGrid from "../../components_new/NFTGrids/FavoriteNFTGrid";

import {
  MARKETPLACE_ADDRESS,
  GYM_NFT_COLLECTION_ADDRESS,
  FOOD_NFT_COLLECTION_ADDRESS,
  CHARITY_NFT_COLLECTION_ADDRESS,
} from "../../const/addresses";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const address = useAddress();
  const [activeTab, setActiveTab] = useState(0);

  const { contract: gymCollection } = useContract(GYM_NFT_COLLECTION_ADDRESS);
  const { contract: foodCollection } = useContract(FOOD_NFT_COLLECTION_ADDRESS);
  const { contract: charityCollection } = useContract(CHARITY_NFT_COLLECTION_ADDRESS);
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const { data: gymNFTs, isLoading: loadingGymNfts } = useOwnedNFTs(
    gymCollection,
    router.query.address as string
  );
  const { data: foodNFTs, isLoading: loadingFoodNfts } = useOwnedNFTs(
    foodCollection,
    router.query.address as string
  );
  const { data: charityNFTs, isLoading: loadingCharityNfts } = useOwnedNFTs(
    charityCollection,
    router.query.address as string
  );

  return (
    <Container maxW={"1200px"} p={5} py={"10px"} px={"40px"}>
      <Stack spacing={6}>
        <Box>
          <Heading>Favorites</Heading>
          <Text>Browse and manage NFTs that you saved.</Text>
          <FavoriteNFTGrid />
        </Box>

        <Box>
          <Flex direction="row" justify="space-between" align="center" width="100%" mt={10}>
            <Heading flex="1">Owned NFTs</Heading>
            <Tabs onChange={(index) => setActiveTab(index)}>
              <TabList>
                <Tab>Gym</Tab>
                <Tab>Food delivery</Tab>
                <Tab>Charity</Tab>
              </TabList>
            </Tabs>
          </Flex>

          <Text mt={2}>Browse and manage your NFTs from this collection.</Text>

          <Tabs index={activeTab} onChange={setActiveTab} isLazy>
            <TabPanels>
              <TabPanel>
                <GymNFTGrid
                  data={gymNFTs}
                  isLoading={loadingGymNfts}
                  emptyText={"You do not own any NFTs yet from this collection"}
                />
              </TabPanel>
              <TabPanel>
                <FoodNFTGrid
                  data={foodNFTs}
                  isLoading={loadingFoodNfts}
                  emptyText={"You do not own any NFTs yet from this collection"}
                />
              </TabPanel>
              <TabPanel>
                <CharityNFTGrid
                  data={charityNFTs}
                  isLoading={loadingCharityNfts}
                  emptyText={"You do not own any NFTs yet from this collection"}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Container>
  );
};

export default ProfilePage;

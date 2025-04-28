import { useContract, useContractEvents } from '@thirdweb-dev/react';
import styles from '../../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { STATUS_CONTRACT_ADDRESS } from "../../../const/addresses";
import EventCard from '../../../components_new/feed/eventCard';
import { useEffect, useState } from 'react';

export default function AcountFeed() {
    const router = useRouter();
    const { walletAddress } = router.query;

    const [isLoading, setIsLoading] = useState(true);

    const {
        contract
    } = useContract(STATUS_CONTRACT_ADDRESS);

    const {
        data: userEvents,
        isLoading: isUserEventsLoading,
    } = useContractEvents(
        contract,
        "StatusUpdated",
        {
            subscribe: true,
            queryFilter: {
                filters: {
                    user: walletAddress,
                }
            }
        }
    );

    const [postNum, setPostNum] = useState(3); // Default number of posts dislplayed

    function handleClick() {
        setPostNum(prevPostNum => prevPostNum + 3) // 3 is the number of posts you want to load per click
    }

    useEffect(() => {
        // Set a timeout for 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        // Cleanup the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    const sortedEvents = userEvents
        ? [...userEvents].sort((a, b) => {
            const timestampA = Number(a.data.timestamp);
            const timestampB = Number(b.data.timestamp);
            return timestampB - timestampA; // Newest first
        })
        : null;

    if (isLoading) {
        return (
            <div className={styles.pageLoading}>
                {/* <div>
                    <Lottie
                        animationData={loadingLottie}
                        loop={true}
                    />
                </div> */}
            </div>
        );
    };

    return (
        <div style={{ width: "100%", maxWidth: "1400px", padding: "0 1rem", margin: "0 auto", marginLeft: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem", marginRight: "3rem" }}>
                <h1 style={{ fontSize: "3rem", lineHeight: "1.15", textAlign: "left" }}>Account Feed</h1>
                <button
                    onClick={() => router.back()}
                    style={{
                        backgroundColor: "#ededed",
                        color: "black",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        fontSize: "1.1rem",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.15s ease",
                    }}
                >
                    Back
                </button>
            </div>
            <p style={{ fontSize: "1rem", textAlign: "left", marginTop: "0.5rem", marginBottom: "0.5rem" }}>{walletAddress}</p>
            <h3 style={{ textAlign: "left", marginBottom: "0.5rem", fontSize: "2rem" }}>Latest Updates:</h3>

            <div style={{ marginRight: "2rem", paddingBottom: '40px' }}>
                {!isUserEventsLoading && sortedEvents && (
                    <>
                        {sortedEvents.slice(0, postNum).map((event, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "#ededed",
                                    color: "white",
                                    textAlign: "left",
                                    borderRadius: "10px",
                                    padding: "1rem",
                                    marginBottom: "20px",
                                    maxWidth: "1400px",
                                    overflow: "none",
                                    border: "none",
                                    transition: "opacity 0.15s ease",
                                }}
                            >
                                <EventCard
                                    walletAddress={event.data.user}
                                    newstatus={event.data.newstatus}
                                    timeStamp={event.data.timestamp}
                                />
                            </div>
                        ))}

                        {sortedEvents.length > postNum && (
                            <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
                                <button
                                    onClick={handleClick}
                                    style={{
                                        backgroundColor: "#ededed",
                                        color: "black",
                                        borderRadius: "5px",
                                        padding: "0.75rem 1.5rem",
                                        fontSize: "1rem",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background-color 0.15s ease",
                                        fontWeight: "400",
                                        marginBottom: "2rem",
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#BDBDBD"}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ededed"}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
};
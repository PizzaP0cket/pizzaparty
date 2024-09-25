
const fetchProfile = async (accessToken) => {
    const profileParameters = {
        method: "GET",
        headers: {
            "Content-Type": "applicaiton/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        const response = await fetch(
            `https://api.spotify.com/v1/me`, profileParameters
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error("Failed to fetch profile", error);
    }
};

export default fetchProfile;
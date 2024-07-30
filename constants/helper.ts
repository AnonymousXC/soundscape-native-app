import { Share } from "react-native";
import TrackPlayer from "react-native-track-player";

async function togglePlay() {
    const state = await TrackPlayer.getPlaybackState();
    if (state.state === "playing") await TrackPlayer.pause();
    else await TrackPlayer.play();
}

function share() {
    Share.share({
        message: "Song",
    });
}

export { togglePlay, share };

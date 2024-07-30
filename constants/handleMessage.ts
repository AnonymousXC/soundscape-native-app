import TrackPlayer from "react-native-track-player";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import setupPlayer from "./playerSetup";
import { Dispatch, RefObject, SetStateAction } from "react";
import { togglePlay } from "./helper";
import fetchSongSuggestion from "./fetchSuggestions";

type Props = {
    event: WebViewMessageEvent;
    playerInitialized: boolean;
    setPlayerInitialized: Dispatch<SetStateAction<boolean>>;
    webview: RefObject<WebView>;
    setFavourite: Dispatch<SetStateAction<boolean>>;
};

const handleMesssage = async ({
    event,
    playerInitialized,
    setPlayerInitialized,
    webview,
    setFavourite,
}: Props) => {
    if (playerInitialized === false) {
        setupPlayer();
        setPlayerInitialized(true);
    }

    const data = JSON.parse(event.nativeEvent.data);
    if (data.eventType === "newSong") {
        const activeTrack = await TrackPlayer.getActiveTrack();
        if (activeTrack?.id === data.id) return;

        await TrackPlayer.reset();
        await TrackPlayer.add({
            title: data.name,
            url: data.downloadUrl[4].link,
            artist: data.primaryArtists,
            artwork: data.image[2].link,
            duration: data.duration,
            date: data.releaseDate,
            id: data.id,
        });

        await TrackPlayer.play();
        webview.current?.injectJavaScript("window.playSongRN()");

        await TrackPlayer.removeUpcomingTracks();
        const songSuggestion = (await fetchSongSuggestion(data.id)).data;
        const toAdd: Array<any> = [];
        for (let index = 0; index < 10; index++) {
            const element = songSuggestion[index];
            toAdd.push({
                url: element.downloadUrl[4].url,
                artwork: element.image[2].url,
                title: element.name,
                artist: element.artists.primary[0].name,
                id: element.id,
            });
        }
        await TrackPlayer.add(toAdd);
    } else if (data.eventType === "togglePlay") {
        togglePlay();
    } else if (data.eventType === "favourite-check") {
        setFavourite(data.isFavourite);
    }
};

export default handleMesssage;

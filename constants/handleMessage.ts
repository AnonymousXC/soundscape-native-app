import TrackPlayer from "react-native-track-player"
import WebView, { WebViewMessageEvent } from "react-native-webview"
import setupPlayer from "./playerSetup"
import { Dispatch, RefObject, SetStateAction } from "react"
import { togglePlay } from "./helper"

type Props = {
    event: WebViewMessageEvent,
    playerInitialized: boolean,
    setPlayerInitialized: Dispatch<SetStateAction<boolean>>,
    webview: RefObject<WebView>
}

const handleMesssage = async ({ event, playerInitialized, setPlayerInitialized, webview }: Props) => {

    if (playerInitialized === false) {
        setupPlayer()
        setPlayerInitialized(true)
    }

    const data = JSON.parse(event.nativeEvent.data)
    if (data.eventType === "newSong") {
        await TrackPlayer.reset()
        await TrackPlayer.add({
            title: data.name,
            url: data.downloadUrl[4].link,
            artist: data.primaryArtists,
            artwork: data.image[2].link,
            duration: data.duration,
            date: data.releaseDate,
            id: data.id
        })

        await TrackPlayer.play()

        webview.current?.injectJavaScript("window.playSongRN()")
    }
    else if (data.eventType === "togglePlay") {
        togglePlay()
    }
    else if (data.eventType === "songSuggestion") {
        await TrackPlayer.removeUpcomingTracks()
        const toAdd = []
        for (let index = 0; index < 10; index++) {
            const element = data[index];
            toAdd.push({
                url: element.downloadUrl[4].link,
                artwork: element.image[2].link,
                title: element.name,
                artist: element.primaryArtists,
                id: element.id
            })
        }
        await TrackPlayer.add(toAdd)
    }
}

export default handleMesssage;
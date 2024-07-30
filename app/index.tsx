import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { createRef, useEffect, useState } from "react";
import setupPlayer from "@/constants/playerSetup";
import handleMesssage from "@/constants/handleMessage";
import Player from "@/components/Player";
import WebViewContext from "@/contexts/webviewContext";

export default function Index() {
    const [loaded, setLoaded] = useState(false);
    const [playerInitialized, setPlayerInitialized] = useState(false);
    const webviewRef = createRef<WebView>();

    useEffect(() => {
        (async () => {
            if (playerInitialized === false) {
                setupPlayer();
                setPlayerInitialized(true);
            }
        })();
    });

    return (
        <WebViewContext.Provider value={webviewRef.current}>
            <View
                style={{
                    flex: 1,
                    paddingTop: StatusBar.currentHeight,
                    backgroundColor: "#121212",
                }}>
                <WebView
                    ref={webviewRef}
                    source={{ uri: process.env.EXPO_PUBLIC_SITE_URL + "" }}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                    cacheEnabled={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    cacheMode="LOAD_CACHE_ELSE_NETWORK"
                    onLoadEnd={() => {
                        setLoaded(true);
                    }}
                    onMessage={(event: WebViewMessageEvent) => {
                        handleMesssage({
                            event,
                            playerInitialized,
                            setPlayerInitialized,
                            webview: webviewRef,
                        });
                    }}
                />
                <View
                    style={{
                        ...styles.loadingScreenDiv,
                        display: loaded === false ? "flex" : "none",
                    }}>
                    <Text>Loading the app...</Text>
                </View>
                <Player webview={webviewRef} />
            </View>
        </WebViewContext.Provider>
    );
}

const styles = StyleSheet.create({
    loadingScreenDiv: {
        position: "absolute",
        top: 0,
        flex: 1,
        backgroundColor: "pink",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        marginTop: StatusBar.currentHeight,
        zIndex: 1000,
        justifyContent: "center",
        alignItems: "center",
    },
});

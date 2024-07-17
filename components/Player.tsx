import { RefObject, useContext, useEffect, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import Slider, { SliderBase, SliderComponent } from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";
import TrackPlayer, { useProgress, Event, PlaybackState, PlaybackActiveTrackChangedEvent } from "react-native-track-player";
import { Path, Svg } from "react-native-svg";
import { share, togglePlay } from "@/constants/helper";
import Loop from "./icons/Loop";
import Love from "./icons/Love";
import Share from "./icons/Share";

type Props = {
    webview: RefObject<WebView>,
}

function Player({ webview }: Props) {

    const songProgress = useProgress()
    const [playing, setPlaying] = useState(false)
    const [song, setSong] = useState<PlaybackActiveTrackChangedEvent>()

    useEffect(() => {
        TrackPlayer.addEventListener(Event.PlaybackState, (event: PlaybackState) => {
            if (event.state === 'playing') {
                setPlaying(true)
                webview.current?.injectJavaScript("window.playSongRN()")
            }
            else if (event.state === 'paused') {
                setPlaying(false)
                webview.current?.injectJavaScript("window.pauseSongRN()")
            }
        })
        TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (event : PlaybackActiveTrackChangedEvent) => {
            setSong(event)
            webview.current?.injectJavaScript(`window.changeSong(${event.track?.id})`)
        })
    }, [webview])

    return (
        <View style={styles.playerDiv}>
            <View style={styles.songDataView}>
                <LinearGradient colors={['#B5179E', '#7209B7']} style={styles.linearGrad}>
                    <Animated.View style={{ transform: [{ rotate: '0deg' }] }}>
                        <Image source={{ uri: song?.track?.artwork || process.env.EXPO_PUBLIC_SONG_DEFAULT_IMAGE }} style={styles.songImage} />
                    </Animated.View>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                    <Text style={styles.songName} numberOfLines={1}> {song?.track?.title} </Text>
                    <Text style={styles.artistName} numberOfLines={1}> {song?.track?.artist} </Text>
                </View>
                <View style={styles.metaButtonsView}>
                    <TouchableOpacity style={styles.metaButton}>
                        <Loop isActive={false} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.metaButton}>
                        <Love isActive={false} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.metaButton} onPress={share}>
                        <Share />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.controlButtonView}>
                <TouchableOpacity style={styles.button} onPress={async () => {
                    await TrackPlayer.seekBy(-10)
                }}>
                    <Svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                        <Path d="M20.0032 11.9046C20.0039 12.1003 19.9513 12.2925 19.851 12.4605C19.7507 12.6286 19.6066 12.7661 19.434 12.8584C19.2643 12.96 19.0703 13.0137 18.8725 13.0137C18.6747 13.0137 18.4807 12.96 18.311 12.8584L10.4964 7.78191C10.3439 7.68457 10.2184 7.55039 10.1315 7.39177C10.0446 7.23314 9.99902 7.05518 9.99902 6.8743C9.99902 6.69342 10.0446 6.51545 10.1315 6.35683C10.2184 6.1982 10.3439 6.06403 10.4964 5.96669L18.311 0.859479C18.4807 0.757805 18.6747 0.704102 18.8725 0.704102C19.0703 0.704102 19.2643 0.757805 19.434 0.859479C19.6066 0.951732 19.7507 1.08927 19.851 1.25731C19.9513 1.42535 20.0039 1.61755 20.0032 1.81324V11.9046Z" fill="white" />
                        <Path d="M10.0041 11.9046C10.0049 12.1003 9.95229 12.2925 9.85201 12.4605C9.75173 12.6286 9.60755 12.7661 9.43497 12.8584C9.26532 12.96 9.07126 13.0137 8.87348 13.0137C8.6757 13.0137 8.48164 12.96 8.31199 12.8584L0.497344 7.78191C0.344889 7.68457 0.219409 7.55039 0.132487 7.39177C0.0455647 7.23314 1.90735e-06 7.05518 1.90735e-06 6.8743C1.90735e-06 6.69342 0.0455647 6.51545 0.132487 6.35683C0.219409 6.1982 0.344889 6.06403 0.497344 5.96669L8.31199 0.859479C8.48164 0.757805 8.6757 0.704102 8.87348 0.704102C9.07126 0.704102 9.26532 0.757805 9.43497 0.859479C9.603 0.949228 9.74422 1.08195 9.84421 1.2441C9.94421 1.40625 9.99939 1.59203 10.0041 1.78247V11.9046Z" fill="white" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} 
                onPress={async () => {
                    await TrackPlayer.skipToPrevious()
                }}>
                    <Svg width="15" height="19" viewBox="0 0 15 19" fill="none">
                        <Path d="M0.999756 1V17.3222" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M13.9746 15.0119C13.9753 15.2378 13.9149 15.4597 13.8 15.6541C13.6851 15.8486 13.5199 16.0084 13.3218 16.1168C13.1309 16.227 12.9144 16.285 12.694 16.285C12.4736 16.285 12.2571 16.227 12.0662 16.1168L3.0388 10.2157C2.86258 10.1019 2.7177 9.94576 2.61737 9.76153C2.51705 9.57729 2.46449 9.37086 2.46449 9.16108C2.46449 8.9513 2.51705 8.74487 2.61737 8.56064C2.7177 8.3764 2.86258 8.22024 3.0388 8.10642L12.0913 2.25555C12.2822 2.14536 12.4987 2.08734 12.7191 2.08734C12.9395 2.08734 13.156 2.14536 13.3469 2.25555C13.545 2.36397 13.7102 2.52382 13.8251 2.71828C13.94 2.91273 14.0004 3.13457 13.9998 3.36044L13.9746 15.0119Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    togglePlay()
                }}>
                    {
                        playing === false ?
                            <Svg width="16" height="18" viewBox="0 0 14 16" fill="white">
                                <Path d="M13.5 7.13397C14.1667 7.51887 14.1667 8.48113 13.5 8.86603L1.5 15.7942C0.833334 16.1791 2.11047e-07 15.698 2.01867e-07 14.9282L3.66308e-08 1.0718C2.7451e-08 0.301997 0.833333 -0.179129 1.5 0.205771L13.5 7.13397Z" fill={'white'} />
                            </Svg>
                            :
                            <Svg width="15" height="16" viewBox="0 0 12 13" fill="white">
                                <Path d="M3.69409 0.829285H1.47339C0.98281 0.829285 0.585114 1.22698 0.585114 1.71756V11.4886C0.585114 11.9792 0.98281 12.3769 1.47339 12.3769H3.69409C4.18467 12.3769 4.58237 11.9792 4.58237 11.4886V1.71756C4.58237 1.22698 4.18467 0.829285 3.69409 0.829285Z" fill="white" />
                                <Path d="M10.2822 0.829346H8.06147C7.57088 0.829346 7.17319 1.22704 7.17319 1.71763V11.4887C7.17319 11.9793 7.57088 12.377 8.06147 12.377H10.2822C10.7727 12.377 11.1704 11.9793 11.1704 11.4887V1.71763C11.1704 1.22704 10.7727 0.829346 10.2822 0.829346Z" fill="white" />
                            </Svg>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} 
                onPress={async () => {
                    await TrackPlayer.skipToNext()
                }}>
                    <Svg width="15" height="19" viewBox="0 0 15 19" fill="none">
                        <Path d="M13.9998 1V17.3222" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M1.02487 15.0119C1.02426 15.2378 1.08458 15.4597 1.19948 15.6541C1.31438 15.8486 1.47961 16.0084 1.67776 16.1168C1.86863 16.227 2.08514 16.285 2.30553 16.285C2.52593 16.285 2.74244 16.227 2.93331 16.1168L11.9607 10.2157C12.1369 10.1019 12.2818 9.94576 12.3821 9.76153C12.4825 9.57729 12.535 9.37086 12.535 9.16108C12.535 8.9513 12.4825 8.74487 12.3821 8.56064C12.2818 8.3764 12.1369 8.22024 11.9607 8.10642L2.9082 2.25555C2.71733 2.14536 2.50082 2.08734 2.28042 2.08734C2.06003 2.08734 1.84351 2.14536 1.65265 2.25555C1.4545 2.36397 1.28927 2.52382 1.17437 2.71828C1.05947 2.91273 0.999144 3.13457 0.999761 3.36044L1.02487 15.0119Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={async () => {
                    await TrackPlayer.seekBy(10)
                }}>
                    <Svg width="21" height="14" viewBox="0 0 21 14" fill="none">
                        <Path d="M0.28785 11.9046C0.287105 12.1003 0.3397 12.2925 0.439983 12.4605C0.540266 12.6286 0.684446 12.7661 0.857027 12.8584C1.02667 12.96 1.22073 13.0137 1.41851 13.0137C1.61629 13.0137 1.81036 12.96 1.98 12.8584L9.79465 7.78191C9.9471 7.68457 10.0726 7.55039 10.1595 7.39177C10.2464 7.23314 10.292 7.05518 10.292 6.8743C10.292 6.69342 10.2464 6.51545 10.1595 6.35683C10.0726 6.1982 9.9471 6.06403 9.79465 5.96669L1.98 0.859479C1.81036 0.757805 1.61629 0.704102 1.41851 0.704102C1.22073 0.704102 1.02667 0.757805 0.857027 0.859479C0.684446 0.951732 0.540266 1.08927 0.439983 1.25731C0.3397 1.42535 0.287105 1.61755 0.28785 1.81324V11.9046Z" fill="white" />
                        <Path d="M10.2869 11.9046C10.2861 12.1003 10.3387 12.2925 10.439 12.4605C10.5393 12.6286 10.6835 12.7661 10.8561 12.8584C11.0257 12.96 11.2198 13.0137 11.4175 13.0137C11.6153 13.0137 11.8094 12.96 11.979 12.8584L19.7937 7.78191C19.9461 7.68457 20.0716 7.55039 20.1585 7.39177C20.2455 7.23314 20.291 7.05518 20.291 6.8743C20.291 6.69342 20.2455 6.51545 20.1585 6.35683C20.0716 6.1982 19.9461 6.06403 19.7937 5.96669L11.979 0.859479C11.8094 0.757805 11.6153 0.704102 11.4175 0.704102C11.2198 0.704102 11.0257 0.757805 10.8561 0.859479C10.688 0.949228 10.5468 1.08195 10.4468 1.2441C10.3468 1.40625 10.2916 1.59203 10.2869 1.78247V11.9046Z" fill="white" />
                    </Svg>
                </TouchableOpacity>
            </View>
            <View>
                <Slider
                minimumValue={0}
                maximumValue={songProgress.duration}
                value={songProgress.position}
                minimumTrackTintColor="#B5179E"
                maximumTrackTintColor="#464646"
                thumbTintColor="#7209B7"
                onValueChange={async (_val) => {
                    await TrackPlayer.seekTo(_val)
                }} />
                    <View style={styles.time}>
                        <Text style={styles.timeText}>{(songProgress.position / 60).toFixed(0) + ':' + (songProgress.position % 60).toFixed(0).padStart(2, '0')}</Text>
                        <Text style={styles.timeText}> {(songProgress.duration / 60).toFixed(0) + ':' + (songProgress.duration % 60).toFixed(0).padStart(2, '0')} </Text>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    playerDiv: {
        position: 'absolute',
        height: 132,
        width: Dimensions.get('screen').width,
        bottom: 62,
        backgroundColor: '#121212',
        display: 'flex',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        gap: 6,
        // shadowColor: '#fff',
        // shadowOffset: { width: 0, height: -120 },
        // shadowOpacity: 0.8,
        // shadowRadius: 10,
        // elevation: 6,
    },
    songDataView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderColor: 'transparent',
        borderWidth: 2,
        backgroundColor: 'black',
    },
    songName: {
        color: 'white',
        maxWidth: 300,
        fontSize: 16,
        fontWeight: "700",
    },
    artistName: {
        color: '#B8B8B8',
        fontSize: 12
    },
    linearGrad: {
        borderRadius: 100,
        width: 53,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlIcons: {
        color: 'white',
        padding: 5
    },
    controlButtonView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    progressBar: {
        zIndex: 1000
    },
    button: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 35
    },
    metaButtonsView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16
    },
    metaButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2
    },
    timeText: {
        color: '#B8B8B8',
        fontSize: 12
    }
})

export default Player;
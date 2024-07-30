import TrackPlayer, { Event, RemoteSeekEvent } from "react-native-track-player";

module.exports = async function () {
    try {
        TrackPlayer.addEventListener(Event.RemotePlay, async () => {
            await TrackPlayer.play();
        });

        TrackPlayer.addEventListener(Event.RemotePause, async () => {
            await TrackPlayer.pause();
        });

        TrackPlayer.addEventListener(Event.RemoteNext, async () => {
            await TrackPlayer.skipToNext();
        });

        TrackPlayer.addEventListener(Event.RemotePrevious, () => {
            TrackPlayer.skipToPrevious();
        });

        TrackPlayer.addEventListener(
            Event.RemoteSeek,
            async (event: RemoteSeekEvent) => {
                await TrackPlayer.seekTo(event.position);
            }
        );

        TrackPlayer.addEventListener(Event.RemoteJumpBackward, async () => {
            await TrackPlayer.seekBy(-10);
        });

        TrackPlayer.addEventListener(Event.RemoteJumpForward, async () => {
            await TrackPlayer.seekBy(10);
        });
    } catch (error) {
        console.log(error);
    }
};

import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from "react-native-track-player"


async function setupPlayer() {
    TrackPlayer.registerPlaybackService(() => require('./Service'))
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
        backwardJumpInterval: 10,
        forwardJumpInterval: 10,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SeekTo,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.JumpBackward,
            Capability.JumpForward,
        ],
        android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
        }
    })
} 

export default setupPlayer;
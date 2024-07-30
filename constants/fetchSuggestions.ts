async function fetchSongSuggestion(id: string) {
    const fetchData = await fetch(
        process.env.EXPO_PUBLIC_SONG_BACKEND_URL + id + "/suggestions"
    );
    const data = await fetchData.json();
    return data;
}

export default fetchSongSuggestion;

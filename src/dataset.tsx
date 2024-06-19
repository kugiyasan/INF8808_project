export interface Entry {
  "": number;
  acousticness: number;
  album_name: string;
  artists: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  explicit: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  popularity: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_genre: string;
  track_id: string;
  track_name: string;
  valence: number;
}

export const preprocessDataset = (df: d3.DSVRowArray): Entry[] => {
  return df.map((row) => {
    return {
      ...row,
      acousticness: Number(row["acousticness"]),
      danceability: Number(row["danceability"]),
      duration_ms: Number(row["duration_ms"]),
      energy: Number(row["energy"]),
      explicit: row["explicit"] === "True" ? 1 : 0,
      instrumentalness: Number(row["instrumentalness"]),
      key: Number(row["key"]),
      liveness: Number(row["liveness"]),
      loudness: Number(row["loudness"]),
      mode: Number(row["mode"]),
      popularity: Number(row["popularity"]) / 100,
      speechiness: Number(row["speechiness"]),
      tempo: Number(row["tempo"]),
      time_signature: Number(row["time_signature"]),
      valence: Number(row["valence"]),
    } as Entry;
  });
};

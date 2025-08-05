export interface SpeakerSegment {
  start: string;
  end: string;
  startSeconds: number;
  endSeconds: number;
  duration: number;
  durationFormatted: string;
}

export interface Speaker {
  name: string;
  totalDuration: number;
  totalDurationFormatted: string;
  speakingPercentage: string;
  segments: SpeakerSegment[];
}

export interface KonusmaciAnaliziData {
  speakers: Speaker[];
}

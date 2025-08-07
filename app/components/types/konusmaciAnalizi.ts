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

export interface MeetingInfo {
  totalMeetingDuration: number;
  totalMeetingDurationFormatted: string;
  totalSpeakingDuration: number;
  totalSpeakingDurationFormatted: string;
  speakingToMeetingRatio: string;
  totalSpeakers: number;
  meetingStartTime: string;
  meetingEndTime: string;
}

export interface KonusmaciAnaliziData {
  speakers: Speaker[];
  meetingInfo: MeetingInfo;
}

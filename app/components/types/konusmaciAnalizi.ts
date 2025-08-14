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
  enter_time?: string;
  exit_time?: string;
  video_send_statistics?: number;
  presentation_send_statistics?: number;
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

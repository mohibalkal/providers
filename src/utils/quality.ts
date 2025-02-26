import { Stream, FileBasedStream, isFileStream } from '../providers/streams';

export interface Quality {
  quality: string;
  url: string;
}

export function getStreamQualities(stream: Stream): Quality[] {
  if (!isFileStream(stream)) return [];

  return [{
    quality: 'default',
    url: stream.file
  }];
}

export function setStreamQuality(stream: Stream, quality: string): Stream {
  if (!isFileStream(stream)) return stream;

  return {
    ...stream,
    file: quality
  };
}

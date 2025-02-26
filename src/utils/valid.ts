import { Stream, HlsBasedStream, FileBasedStream, isHlsStream, isFileStream } from '../providers/streams';

export function validateStream(stream: Stream): Stream | null {
  if (!stream) return null;

  if (isHlsStream(stream)) {
    if (!stream.playlist) return null;
    return stream;
  }

  if (isFileStream(stream)) {
    if (!stream.file) return null;
    return stream;
  }

  return null;
}

import { Stream, HlsBasedStream, FileBasedStream, isHlsStream, isFileStream } from '../providers/streams';
import { FeatureMap } from '../entrypoint/utils/targets';

function proxyUrl(url: string, depth: number = 1): string {
  return `https://proxy.example.com/proxy/${depth}/${encodeURIComponent(url)}`;
}

export function requiresProxy(stream: Stream): boolean {
  return stream.features?.['ip-locked'] ?? false;
}

export function setupProxy(stream: Stream, depth: number = 1): Stream {
  if (isHlsStream(stream)) {
    return {
      ...stream,
      playlist: proxyUrl(stream.playlist, depth),
      proxyDepth: depth,
    };
  }

  if (isFileStream(stream)) {
    return {
      ...stream,
      file: proxyUrl(stream.file, depth),
      proxyDepth: depth,
    };
  }

  return stream;
}

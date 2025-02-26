import { FeatureMap } from '../entrypoint/utils/targets';

export interface BaseStream {
  type: string;
  features?: FeatureMap;
  proxyDepth?: number;
}

export interface HlsBasedStream extends BaseStream {
  type: 'hls';
  playlist: string;
}

export interface FileBasedStream extends BaseStream {
  type: 'file';
  file: string;
}

export type Stream = HlsBasedStream | FileBasedStream;

export function isHlsStream(stream: Stream): stream is HlsBasedStream {
  return stream.type === 'hls';
}

export function isFileStream(stream: Stream): stream is FileBasedStream {
  return stream.type === 'file';
}

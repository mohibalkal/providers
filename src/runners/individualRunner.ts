import { IEmbed, ISourcerer, EmbedOutput, SourcererOutput } from '../providers/base';
import { Stream, HlsBasedStream, FileBasedStream, isHlsStream, isFileStream } from '../providers/streams';
import { FeatureMap } from '../entrypoint/utils/targets';
import { UseableFetcher } from '../fetchers/types';
import { validateStream } from '../utils/valid';
import { requiresProxy, setupProxy } from '../utils/proxy';
import { NotFoundError } from '../utils/errors';

export interface IndividualRunnerOptions {
  url: string;
  id: string;
  features: FeatureMap;
  proxyUrl?: string;
  proxiedFetcher: UseableFetcher;
  fetcher: UseableFetcher;
  progress: (percent: number) => void;
  events?: {
    onEmbedFound?: (embedId: string) => void;
    onStreamFound?: (stream: Stream) => void;
    onStreamProcessed?: (stream: Stream) => void;
  };
}

export async function runIndividualEmbed(
  embed: IEmbed,
  options: IndividualRunnerOptions
): Promise<Stream | null> {
  try {
    if (options.events?.onEmbedFound) {
      options.events.onEmbedFound(options.id);
    }

    const output = await embed.scrape({
      url: options.url,
      features: options.features,
      proxiedFetcher: options.proxiedFetcher,
      fetcher: options.fetcher,
      progress: options.progress
    });

    if (!output.stream) {
      return null;
    }

    if (options.events?.onStreamFound) {
      options.events.onStreamFound(output.stream);
    }

    const validatedStream = validateStream(output.stream);
    if (!validatedStream) {
      throw new NotFoundError('Stream validation failed');
    }

    const finalStream = requiresProxy(validatedStream) ? setupProxy(validatedStream) : validatedStream;

    if (options.events?.onStreamProcessed) {
      options.events.onStreamProcessed(finalStream);
    }

    return finalStream;
  } catch (err) {
    const error = err as Error;
    console.error('Error running individual embed:', error.message);
    return null;
  }
}

export async function runIndividualSourcerer(
  sourcerer: ISourcerer,
  options: IndividualRunnerOptions
): Promise<Stream | null> {
  try {
    const output = await sourcerer.scrape({
      url: options.url,
      features: options.features,
      proxiedFetcher: options.proxiedFetcher,
      fetcher: options.fetcher,
      progress: options.progress
    });

    if (!output.stream?.[0]) {
      return null;
    }

    const validatedStream = validateStream(output.stream[0]);
    if (!validatedStream) {
      throw new NotFoundError('Stream validation failed');
    }

    const finalStream = requiresProxy(validatedStream) ? setupProxy(validatedStream) : validatedStream;

    return finalStream;
  } catch (err) {
    const error = err as Error;
    console.error('Error running individual sourcerer:', error.message);
    return null;
  }
}

import { IEmbed, ISourcerer, EmbedOutput, SourcererOutput, ScrapeContext } from '../providers/base';
import { Stream } from '../providers/streams';
import { FeatureMap } from '../entrypoint/utils/targets';
import { UseableFetcher } from '../fetchers/types';
import { validateStream } from '../utils/valid';
import { NotFoundError } from '../utils/errors';

export interface RunnerOptions {
  features: FeatureMap;
  proxyUrl?: string;
  proxiedFetcher: UseableFetcher;
  fetcher: UseableFetcher;
  progress: (percent: number) => void;
}

export interface RunOutput {
  stream?: Stream;
  embedId?: string;
  sourceId?: string;
  error?: string;
}

export async function runEmbed(
  embed: IEmbed,
  url: string,
  options: RunnerOptions
): Promise<RunOutput> {
  try {
    const output = await embed.scrape({
      url,
      features: options.features,
      proxiedFetcher: options.proxiedFetcher,
      fetcher: options.fetcher,
      progress: options.progress
    });

    if (output.stream) {
      const validatedStream = validateStream(output.stream, options);
      if (!validatedStream) {
        throw new NotFoundError('Stream validation failed');
      }
      output.stream = validatedStream;
    }

    return {
      stream: output.stream,
      embedId: output.embedId
    };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}

export async function runSourcerer(
  sourcerer: ISourcerer,
  url: string,
  options: RunnerOptions
): Promise<RunOutput> {
  try {
    const output = await sourcerer.scrape({
      url,
      features: options.features,
      proxiedFetcher: options.proxiedFetcher,
      fetcher: options.fetcher,
      progress: options.progress
    });

    if (output.stream?.[0]) {
      const validatedStream = validateStream(output.stream[0], options);
      if (!validatedStream) {
        throw new NotFoundError('Stream validation failed');
      }
      output.stream[0] = validatedStream;
    }

    return {
      stream: output.stream?.[0],
      sourceId: output.sourceId
    };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}

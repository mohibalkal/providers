import { getCaptionTypeFromUrl, labelToLanguageCode } from '@/providers/captions';
import { FileBasedStream } from '@/providers/streams';
import { NotFoundError } from '@/utils/errors';
import { getQualityFromKey } from '@/utils/quality';

function generateRandomFavs(): string {
  const randomHex = () => Math.floor(Math.random() * 16).toString(16);
  const generateSegment = (length: number) => Array.from({ length }, randomHex).join('');

  return `${generateSegment(8)}-${generateSegment(4)}-${generateSegment(4)}-${generateSegment(4)}-${generateSegment(
    12,
  )}`;
}

function parseSubtitleLinks(inputString?: string | boolean): FileBasedStream['captions'] {
  if (!inputString || typeof inputString === 'boolean') return [];
  const linksArray = inputString.split(',');
  const captions: FileBasedStream['captions'] = [];

  linksArray.forEach((link) => {
    const match = link.match(/\[([^\]]+)\](https?:\/\/\S+?)(?=,\[|$)/);

    if (match) {
      const type = getCaptionTypeFromUrl(match[2]);
      const language = labelToLanguageCode(match[1]);
      if (!type || !language) return;

      captions.push({
        id: match[2],
        language,
        hasCorsRestrictions: false,
        type,
        url: match[2],
      });
    }
  });

  return captions;
}

function parseVideoLinks(inputString?: string): FileBasedStream['qualities'] {
  if (!inputString) throw new NotFoundError('No video links found');
  const linksArray = inputString.split(',');
  const result: FileBasedStream['qualities'] = {};

  linksArray.forEach((link) => {
    const match = link.match(/\[([^]+)](https?:\/\/[^\s,]+\.mp4)/);
    if (match) {
      const qualityText = match[1];
      const mp4Url = match[2];

      const quality = qualityText.toLowerCase().replace('p', '');
      result[quality] = {
        type: 'mp4',
        url: mp4Url,
      };
    }
  });

  if (Object.keys(result).length === 0) throw new NotFoundError('No video links found');
  return result;
}

function extractTitleAndYear(input: string): { title: string; year?: number } {
  const match = input.match(/^(.*?)(?:\s+\((\d{4})\))?$/);
  if (!match) return { title: input };

  const [, title, year] = match;
  return {
    title: title.trim(),
    ...(year && { year: parseInt(year, 10) }),
  };
}

export { extractTitleAndYear, parseSubtitleLinks, parseVideoLinks, generateRandomFavs };

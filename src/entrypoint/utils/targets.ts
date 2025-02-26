export type FeatureFlags = 'cors-allowed' | 'ip-locked';

export interface Target {
  features: FeatureFlags[];
}

export const targets = {
  BROWSER: {
    features: ['cors-allowed'] as FeatureFlags[]
  },
  NODE: {
    features: ['cors-allowed', 'ip-locked'] as FeatureFlags[]
  },
  ANY: {
    features: [] as FeatureFlags[]
  }
} as const;

export function flagsAllowedInFeatures(features: FeatureFlags[], flags?: FeatureFlags[]): boolean {
  if (!flags) return true;
  return flags.every((flag) => features.includes(flag));
}

export const flags = {
  CORS_ALLOWED: 'cors-allowed' as FeatureFlags,
  IP_LOCKED: 'ip-locked' as FeatureFlags,
} as const;

export type Targets = typeof targets;

export function getTargetFeatures(target: keyof Targets): FeatureFlags[] {
  return targets[target].features;
}

export interface FeatureMap {
  'cors-allowed': boolean;
  'ip-locked': boolean;
}

export function mapToFeatureFlags(map: FeatureMap): FeatureFlags[] {
  const flags: FeatureFlags[] = [];
  if (map['cors-allowed']) flags.push('cors-allowed');
  if (map['ip-locked']) flags.push('ip-locked');
  return flags;
}

export function mapFromFeatureFlags(flags: FeatureFlags[]): FeatureMap {
  return {
    'cors-allowed': flags.includes('cors-allowed'),
    'ip-locked': flags.includes('ip-locked')
  };
}

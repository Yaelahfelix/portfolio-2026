export type SceneKey = 'hero' | 'skills' | 'experience' | 'education' | 'projects' | 'achievements'

/**
 * Live values every backdrop scene reads each frame. Held in a ref so the
 * director can retune a scene mid-scroll without re-rendering the WebGL tree.
 */
export interface SceneLive {
  speed: number
  intensity: number
  hue: number
  /** Master alpha — keeps backdrops from fighting the copy layered on top. */
  opacity: number
  /** Transient click impulse, decays to 0 every frame. */
  pulse: number
  /** Target shape index for the nebula scene. */
  shape: number
}

export type LiveRef = { current: SceneLive }

/** Per-section tuning. The hero runs at full strength; the rest sit back. */
export const SCENE_PRESETS: Record<SceneKey, Omit<SceneLive, 'pulse'>> = {
  hero: { speed: 1, intensity: 0.75, hue: 0, opacity: 1, shape: 0 },
  skills: { speed: 0.75, intensity: 0.7, hue: 0, opacity: 0.85, shape: 3 },
  experience: { speed: 0.65, intensity: 0.6, hue: 0.8, opacity: 0.9, shape: 0 },
  education: { speed: 0.5, intensity: 0.55, hue: -0.6, opacity: 0.65, shape: 0 },
  projects: { speed: 0.85, intensity: 0.85, hue: 1.5, opacity: 0.8, shape: 1 },
  achievements: { speed: 0.7, intensity: 0.65, hue: 2.4, opacity: 0.85, shape: 2 },
}

/**
 * Nudges each scene into the section's empty space so the visual never sits
 * directly behind the paragraph it has to compete with.
 */
export const SCENE_OFFSETS: Record<SceneKey, [number, number, number]> = {
  hero: [0, 0, 0],
  skills: [2.9, -0.2, 0],
  experience: [0, -0.2, 0],
  education: [0, 0, 0],
  projects: [2.6, 0.5, 0],
  achievements: [-2.8, -0.3, 0],
}

/**
 * Sections whose content spans the full width get an oversized scene so the
 * visual wraps around the cards instead of hiding behind them.
 */
export const SCENE_SCALES: Record<SceneKey, number> = {
  hero: 1,
  skills: 1,
  experience: 2,
  education: 1,
  projects: 1,
  achievements: 1.25,
}

export const DEFAULT_LIVE: SceneLive = { ...SCENE_PRESETS.hero, pulse: 0 }

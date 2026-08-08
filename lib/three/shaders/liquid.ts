import { SIMPLEX_3D, UTILS } from '../glsl'

/**
 * Noise-displaced sphere with analytically rebuilt normals. Shared by the hero
 * core and the lab's liquid mode.
 *
 * Uniforms: uTime, uDistort, uSpeed, uPulse, uPointer,
 *           uColorA, uColorB, uColorC, uHue
 */
export const liquidVertex = /* glsl */ `
uniform float uTime;
uniform float uDistort;
uniform float uSpeed;
uniform float uPulse;
uniform vec3 uPointer;

varying vec3 vWorldPos;
varying vec3 vNormalW;
varying float vNoise;

${SIMPLEX_3D}

float shape(vec3 p) {
  float t = uTime * uSpeed;
  float n = snoise(p * 1.3 + vec3(0.0, t * 0.5, 0.0)) * 0.55;
  n += snoise(p * 2.85 - vec3(t * 0.31)) * 0.27;
  n += snoise(p * 5.7 + vec3(t * 0.19)) * 0.11;
  return n;
}

// n is handed back so the caller can reuse the centre sample instead of
// re-running shape() — three snoise evaluations per vertex are not free.
vec3 displace(vec3 p, out float n) {
  vec3 dir = normalize(p);
  n = shape(p);
  float pointerDist = distance(dir, normalize(uPointer));
  float bulge = smoothstep(1.1, 0.0, pointerDist) * 0.4;
  return p + dir * (n * uDistort + bulge + uPulse);
}

void main() {
  vec3 n0 = normalize(normal);

  // Tangent frame so normals can be rebuilt after displacement
  vec3 helper = abs(n0.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent = normalize(cross(helper, n0));
  vec3 bitangent = normalize(cross(n0, tangent));

  float eps = 0.04;
  float centreNoise;
  float scratch;
  vec3 p0 = displace(position, centreNoise);
  vec3 p1 = displace(position + tangent * eps, scratch);
  vec3 p2 = displace(position + bitangent * eps, scratch);

  vec3 newNormal = normalize(cross(p1 - p0, p2 - p0));
  if (dot(newNormal, n0) < 0.0) newNormal = -newNormal;

  vNoise = centreNoise;
  vNormalW = normalize(mat3(modelMatrix) * newNormal);

  vec4 world = modelMatrix * vec4(p0, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

export const liquidFragment = /* glsl */ `
uniform float uTime;
uniform float uHue;
uniform float uOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying vec3 vWorldPos;
varying vec3 vNormalW;
varying float vNoise;

${UTILS}

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vWorldPos);
  float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);

  vec3 L = normalize(vec3(0.65, 1.0, 0.55));
  float diffuse = clamp(dot(N, L), 0.0, 1.0);
  float specular = pow(clamp(dot(reflect(-L, N), V), 0.0, 1.0), 52.0);

  vec3 iridescent = palette(
    dot(N, V) * 0.8 + uTime * 0.028 + vNoise * 0.45,
    vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.33, 0.67)
  );

  vec3 base = mix(uColorA, uColorB, smoothstep(-0.5, 0.5, vNoise));
  vec3 color = base * (0.14 + diffuse * 0.42);
  color += iridescent * fresnel * 1.2;
  color += uColorC * specular * 0.85;
  color += uColorA * pow(fresnel, 5.0) * 1.5;

  gl_FragColor = vec4(hueShift(color, uHue), uOpacity);
}
`

/** Back-side atmosphere shell rendered around the liquid body. */
export const glowVertex = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vWorldPos;

void main() {
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

export const glowFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uIntensity;
uniform float uHue;

varying vec3 vNormalW;
varying vec3 vWorldPos;

${UTILS}

void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vWorldPos);

  // Back faces only: 1 directly behind the body, 0 at the shell silhouette.
  // Fading to zero at the edge is what keeps the halo from reading as a disc.
  float depth = clamp(dot(-N, V), 0.0, 1.0);
  float falloff = pow(depth, 2.6);

  vec3 color = mix(uColorB, uColorA, depth);
  gl_FragColor = vec4(hueShift(color, uHue), falloff * uIntensity * 0.8);
}
`

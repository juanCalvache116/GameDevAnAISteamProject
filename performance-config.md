# 🌊 Drowned Heart - Performance Configuration Guide

## Quick Performance Fixes

If you're experiencing lag or performance issues, here are the settings you can adjust:

### 1. Disable WebGL Shader (Fastest Fix)

Open `src/index.html` and find this line (around line 708):

```javascript
const ENABLE_SHADER = true; // Set to false to disable shader for better performance
```

Change it to:

```javascript
const ENABLE_SHADER = false; // Set to false to disable shader for better performance
```

This will use a lightweight CSS gradient background instead of the WebGL shader.

### 2. Lower Shader Quality

If you want to keep the shader but reduce performance impact, find this line:

```javascript
const SHADER_QUALITY = 'medium'; // 'low', 'medium', 'high'
```

Change it to:

```javascript
const SHADER_QUALITY = 'low'; // 'low', 'medium', 'high'
```

### 3. System Requirements Check

**Minimum Requirements:**
- **GPU**: DirectX 11 compatible
- **WebGL**: Version 1.0 support
- **RAM**: 4GB
- **CPU**: Dual-core 2.0GHz

**Recommended Requirements:**
- **GPU**: Dedicated graphics card with WebGL 2.0 support
- **RAM**: 8GB+
- **CPU**: Quad-core 2.5GHz+

## Performance Comparison

| Setting | Performance | Visual Quality | Compatibility |
|---------|-------------|----------------|---------------|
| `ENABLE_SHADER = false` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| `SHADER_QUALITY = 'low'` | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| `SHADER_QUALITY = 'medium'` | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| `SHADER_QUALITY = 'high'` | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |

## Troubleshooting

### Issue: App won't start with "electron-reload" error
**Solution**: Run `npm install` to install all dependencies including electron-reload.

### Issue: Black screen instead of background
**Solution**: Your system doesn't support WebGL. Set `ENABLE_SHADER = false`.

### Issue: Lag during splash → menu transition  
**Solution**: 
1. Set `ENABLE_SHADER = false` for immediate fix
2. Or wait - the new lightweight shader should be much faster

### Issue: Audio doesn't play
**Solution**: This is often a browser security feature. The audio should start playing after you interact with the app.

## Advanced Performance Tuning

For developers who want to further optimize:

### Reduce Fractal Noise Iterations
In the shader code (around line 758), reduce the loop iterations:

```glsl
for(int i = 0; i < 2; i++) { // Was 3, now 2 for better performance
    value += amp * noise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
}
```

### Adjust Animation Speed
Slower animation = better performance. In the shader, modify these values:

```glsl
// Slower movement = less GPU work
vec2 p = uv * 2.0 + u_time * 0.05; // Was 3.0 and 0.1
float n1 = fbm(p + vec2(u_time * 0.03, 0.0)); // Was 0.05
float n2 = fbm(p + vec2(0.0, u_time * 0.04)); // Was 0.08
```

## Automatic Performance Detection

The app includes basic performance monitoring. Check the browser console for timing logs like:

```
⚡ Transition started: 1250.42ms
⚡ Background initialization started: 1550.73ms  
⚡ Background visible: 1580.91ms
⚡ Menu visible: 1850.15ms
```

If you see any timing > 100ms between Background initialization and visible, consider disabling the shader.

## Reporting Performance Issues

When reporting performance issues, please include:

1. **System specs** (CPU, GPU, RAM)
2. **Browser/Electron version**
3. **Console logs** (press F12 to open dev tools)
4. **Settings tried** (shader enabled/disabled, quality level)

---

*Remember: The game should be playable even with the shader disabled. The visual quality will still be good with the CSS gradient fallback!*

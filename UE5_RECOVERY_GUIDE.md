# Create backup directory
mkdir -p ~/UE5_Backup_$(date +%Y%m%d)
BACKUP_DIR=~/UE5_Backup_$(date +%Y%m%d)

# In UE5 Content Browser:
# Select all assets → Right-click → Asset Actions → Export
# Export to: $BACKUP_DIR/assets/
```

**What to Export:**
- **Meshes/Models**: .fbx, .obj, .gltf
- **Animations**: .fbx animation files
- **Blueprints**: Export as Python via Developer Tools
- **Materials/Textures**: .png, .jpg, .tga
- **Project**: File → Package Project → For [Platform]

### Priority 2: Extract Automation Logic (1 hour)

UE5 automation can be extracted as portable code:

```bash
# Export Blueprints as Python
# Window → Developer Tools → Blueprint to Python

# Manual extraction of custom logic
# Most UE5 automation uses:
# - Unreal Automation Tool (UAT) - command line
# - Python scripting
# - Blueprint graphs (exportable)
```

**Key Files to Preserve:**
- `/Content/Python/` - Your Python scripts
- `/Plugins/` - Custom plugins
- `/Source/` - C++ source (if any)
- Automation batch files (`.bat`, `.sh`)

## 🚀 Recovery Options (Ranked by Feasibility)

### Option 1: Headless UE5 Server (⭐⭐⭐⭐⭐ Most Feasible)

Run UE5 without GUI on any machine with working UE5:

```bash
# Linux/Windows command line
/path/to/UnrealEngine/Engine/Binaries/Linux/UE5Editor \
  /path/to/project.uproject \
  -RunAutomation \
  -Scripts=/path/to/extracted/python/scripts \
  -Output=/safe/output/directory \
  -NullRHI  # Headless rendering
```

**Advantages:**
- Preserves 100% of your automation
- No GUI dependencies (Xcode not needed)
- Can run on servers/cloud instances
- Command-line output files work with any system

**Setup Steps:**
1. Install UE5 on a stable machine (Linux VM, Windows server)
2. Copy your extracted scripts/assets
3. Run headless for automated 3D generation

### Option 2: Alternative 3D Engines (⭐⭐⭐⭐⭐ Quick Implementation)

Replace UE5 with engines that don't have Xcode drama:

#### Three.js (Web-based 3D)
```bash
npm install three @types/three
mkdir threejs-project
cd threejs-project

# Basic setup for 3D scenes
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Load your exported FBX assets
const loader = new THREE.FBXLoader();
loader.load('path/to/exported/model.fbx', (object) => {
    scene.add(object);
});
```

**Perfect for:**
- Real estate virtual tours
- Web-based 3D visualization
- No compilation/XCode needed
- Can import your UE5 exports

#### Babylon.js (Enterprise Web 3D)
```bash
npm install babylonjs
```

Similar to Three.js but more features for complex scenes.

#### Godot Engine (Standalone Game Engine)
```bash
brew install godot
# No Xcode needed - download and run
```

- Import FBX assets from UE5
- GDScript/Python for logic
- Much simpler than UE5
- Cross-platform builds

### Option 3: Containerized UE5 (⭐⭐⭐ Complex but Powerful)

Epic doesn't provide official Docker images, but community approaches exist:

```dockerfile
# Dockerfile approach (experimental)
FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    libgtk-3-0 \
    libgbm1 \
    libasound2 \
    # ... other UE5 dependencies

# Download and extract UE5 Linux build
RUN wget https://github.com/EpicGames/UnrealEngine/releases/download/5.3.2/UE5.3.2-Linux.zip
RUN unzip UE5.3.2-Linux.zip -d /opt

# Your project
COPY ./your-exported-project /project

# Run headless
CMD ["/opt/UnrealEngine/Engine/Binaries/Linux/UE5Editor", "/project/project.uproject", "-RunAutomation"]
```

**Challenges:**
- UE5 licensing for containers
- Complex dependency management
- Large image sizes

### Option 4: VM Isolation (⭐⭐⭐⭐ Solid Fallback)

Run UE5 in a VM to isolate from macOS Xcode changes:

```bash
# Using UTM or Parallels
# Install Windows 11 Pro VM
# Install UE5 Epic Launcher in VM
# Copy your work to VM storage
```

**Advantages:**
- UE5 works in VM regardless of host macOS/Xcode
- Can backup/restore entire VM
- Isolated from macOS updates

## 📋 Action Checklist

### Immediate (Before Xcode Changes)
- [ ] Export all assets (FBX, OBJ, materials)
- [ ] Export blueprints as Python
- [ ] Copy all automation scripts
- [ ] Document all custom workflows
- [ ] Create ZIP backup of entire project

### Short-term (This Week)
- [ ] Set up headless UE5 on stable machine/VM
- [ ] Test automation scripts run command-line
- [ ] Export 3D animations as reusable assets
- [ ] Evaluate Three.js for web visualization needs

### Long-term (Future-proof)
- [ ] Implement container strategy for UE5
- [ ] Build web-based 3D viewer with Three.js
- [ ] Create abstraction layer so 3D engine is swappable
- [ ] Integrate with MCP for multi-engine support

## 🎯 Integration with Autonomous Factory

Your UE5 work fits perfectly as the **visualization/rendering component**:

```
Voice Agent → Contract Processing → UE5 Rendering → 3D Tours
                                            ↓
                                    Alternative: Three.js Web Viewer
```

**The 3D capabilities are too valuable to lose—preserve them through exports and portable formats.**

## 💡 Pro Tips

1. **Blueprints → Python**: Most UE5 logic can be exported as Python and run anywhere
2. **Assets are Portable**: FBX/OBJ files work in any 3D engine
3. **Automation Scripts**: Pure Python logic can be containerized or web-ified
4. **Web-first Approach**: Consider Three.js for real estate tours (no Xcode needed)

## 🎊 The Win

**You invested 6 months in something that WORKS.** Don't rebuild—**repurpose**. Your automation logic and 3D assets are the valuable parts. The runtime (UE5) is just the current vehicle.

**Let's extract and preserve the gold from your 6-month masterpiece!** 🏆💎

*Last updated: January 2026*
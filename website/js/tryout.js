const scene = document.getElementById('scene');
const code = document.getElementById('code');
const desc = document.getElementById('desc');

const SCENES = {
  'scene1': `SCENE scene {
    LIGHT light {
        .position = (0, 0, 0),
        .intensity = (0.9, 0.9, 0.9)
    }

    MATERIAL mat {
        .color = (0, 255, 255), 
    }

    RECTANGLE rect {
        .v0 = (-6, -6, -6),
        .v1 = (6, -6, 6),
        .material = mat,
        .inverted = false,
    }

    CONTROLLER controller {
        .mouse_movement = true,
        .keyboard_movement = true,
    }

    CAMERA cam {
        .position = (0, 0, 0),
        .direction = (0, 0, 0),
        .event_handler = controller,
    }

    ACTIVE active {
        .camera = cam
    }
}`, 'scene2': `SCENE scene {
    LIGHT light {
        .position = (0, 0, 0),
        .intensity = (0.9, 0.9, 0.9),
    }

    MATERIAL mat {
        .color = (255, 0, 0)
    }

    SPHERE sphere {
        .position = (3, 0, 0),
        .radius = 1,
        .material = mat
    }

    CONTROLLER controller {
        .mouse_movement = true,
        .keyboard_movement = true,
    }

    CAMERA cam {
        .position = (0, 0, 0),
        .direction = (0, 0, 0),
        .event_handler = controller,
    }

    ACTIVE active {
        .camera = cam
    }
}`, 'scene3': `coming soon`
}

descriptions = {
  'scene1': 'A simple scene with a blue rectangle',
  'scene2': 'A simple scene with a red sphere',
  'scene3': 'coming soon'
}

scene.addEventListener('click', function() {
  var curr = ''
  // Split SCENES[scene.value] into lines, add line numbers, and join into curr
  let lines = SCENES[scene.value].split('\n');
  let digit_count = Math.floor(Math.log10(lines.length)) + 1;

  for (let i = 0; i < lines.length; i++) {
    let spaces = ' '.repeat(digit_count - Math.floor(Math.log10(i + 1)) + 1);
    curr += `${spaces}${i + 1}  | ${lines[i]}\n`;
  }

  code.innerText = curr;
  desc.innerText = descriptions[scene.value];
});

async function post() {
    if (scene.value === 'scene3') {
        alert('Coming soon');
        return;
    }

    const response = await fetch(`/tryout/${scene.value}`, {});

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    alert(url)

    const a = document.createElement('a');
    a.href = url;
    let filename = scene.value;

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

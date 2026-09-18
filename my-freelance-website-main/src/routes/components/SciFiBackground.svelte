<script lang="ts">
  import { onMount } from 'svelte';
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationId: number;


  
  const cubeSize = 3;
  const dotsPerEdge = 18;
  const dotRadius = 5;
  const dotColor = 'rgba(0,180,255,0.85)';
  const glowColor = 'rgba(0,180,255,0.25)';

  
  const gridDivisions = 4; 
  const vertices = [];
  for (let xi = 0; xi < gridDivisions; xi++) {
    for (let yi = 0; yi < gridDivisions; yi++) {
      for (let zi = 0; zi < gridDivisions; zi++) {
        const x = (xi / (gridDivisions - 1)) * 2 - 1;
        const y = (yi / (gridDivisions - 1)) * 2 - 1;
        const z = (zi / (gridDivisions - 1)) * 2 - 1;
        vertices.push([x, y, z]);
      }
    }
  }

  
  const edges = [];
  function idx(x, y, z) {
    return x * gridDivisions * gridDivisions + y * gridDivisions + z;
  }
  for (let xi = 0; xi < gridDivisions; xi++) {
    for (let yi = 0; yi < gridDivisions; yi++) {
      for (let zi = 0; zi < gridDivisions; zi++) {
        if (xi < gridDivisions - 1) edges.push([idx(xi, yi, zi), idx(xi + 1, yi, zi)]);
        if (yi < gridDivisions - 1) edges.push([idx(xi, yi, zi), idx(xi, yi + 1, zi)]);
        if (zi < gridDivisions - 1) edges.push([idx(xi, yi, zi), idx(xi, yi, zi + 1)]);
      }
    }
  }

  function project([x, y, z]: number[], angleX: number, angleY: number, angleZ: number) {
   
    let rx = x * Math.cos(angleZ) - y * Math.sin(angleZ);
    let ry = x * Math.sin(angleZ) + y * Math.cos(angleZ);
    let rz = z;
    
    let ry2 = ry * Math.cos(angleX) - rz * Math.sin(angleX);
    let rz2 = ry * Math.sin(angleX) + rz * Math.cos(angleX);
    
    let rx2 = rx * Math.cos(angleY) + rz2 * Math.sin(angleY);
    let rz3 = -rx * Math.sin(angleY) + rz2 * Math.cos(angleY);
    
    const perspective = 320 / (rz3 + 8);
    return [rx2 * cubeSize * perspective, ry2 * cubeSize * perspective];
  }


 
  let cubePosition = { x: 0, y: 0, rotOffset: 0 };
  function setCubePosition() {
    cubePosition = { x: 0, y: 0, rotOffset: 0 };
  }

  let lastFrame = 0;
  const FRAME_INTERVAL = 1000 / 144; // 30fps
  function draw(t: number) {
    if (t - lastFrame < FRAME_INTERVAL) {
      animationId = requestAnimationFrame(draw);
      return;
    }
    lastFrame = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const { x, y, rotOffset } = cubePosition;
    ctx.save();
    ctx.translate(canvas.width / 2 + x, canvas.height / 2 + y);
    
    const angleX = t * 0.0005 + 0.7 + rotOffset;
    const angleY = t * 0.0005 + 0.7 + rotOffset * 0.7;
    const angleZ = t * 0.0005 + 0.7 + rotOffset * 0.3;
    
    const points = vertices.map(([x, y, z]) => project([x, y, z], angleX, angleY, angleZ));
    
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.0)';
    ctx.shadowColor = 'rgba(0,180,255,0.5)';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 3;
    for (const [a, b] of edges) {
      ctx.beginPath();
      ctx.moveTo(points[a][0], points[a][1]);
      ctx.lineTo(points[b][0], points[b][1]);
      ctx.stroke();
    }
    ctx.restore();
   
    ctx.save();
    ctx.strokeStyle = 'rgba(0,180,255,0.85)';
    ctx.lineWidth = 1.2;
    for (const [a, b] of edges) {
      ctx.beginPath();
      ctx.moveTo(points[a][0], points[a][1]);
      ctx.lineTo(points[b][0], points[b][1]);
      ctx.stroke();
    }
    ctx.restore();
    ctx.restore();
    animationId = requestAnimationFrame(draw);
  }

  onMount(() => {
    const context = canvas.getContext('2d');
    if (!context) return;
    ctx = context;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCubePosition();
    }
    resize();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  });
</script>

<canvas bind:this={canvas} class="fixed inset-0 w-full h-full z-0 pointer-events-none" style="background:black;"></canvas>

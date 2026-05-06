import * as THREE from 'three';

// --- 1. 基本設定 ---
const stages = [
  { name: "室蘭", goal: 5000 },
  { name: "富良野", goal: 7000 },
  { name: "札幌", goal: 10000 },
  { name: "稚内", goal: 15000 },
  { name: "礼文島", goal: 20000 }
];

const state = {
  running: false,
  score: 0,
  stage: 0,
  health: 3,
};

// --- 2. 画面の準備 ---
// HTML側の <canvas id="game"></canvas> を探す
const canvas = document.getElementById('game');
if (!canvas) {
    console.error("エラー: canvasが見つかりません。HTMLのidが'game'になっているか確認してください。");
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 主人公の代わり（赤い箱）
const hero = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(hero);
camera.position.z = 5;

// --- 3. ゲームを動かす関数 ---
function updateHud() {
  const scoreEl = document.getElementById('score');
  const heartsEl = document.getElementById('hearts');
  const stageNameEl = document.getElementById('stageName');
  
  if (scoreEl) scoreEl.textContent = state.score;
  if (heartsEl) heartsEl.textContent = "♥".repeat(state.health);
  if (stageNameEl) stageNameEl.textContent = stages[state.stage].name;
}

function animate() {
  if (!state.running) return;
  requestAnimationFrame(animate);
  
  // 動作確認用に箱を回す
  hero.rotation.x += 0.01;
  hero.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

// --- 4. ボタンを押した時の動き ---
const startBtn = document.getElementById('startButton');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        state.running = true;
        const panel = document.getElementById('startPanel');
        if (panel) panel.classList.add('hidden');
        animate();
    });
}

// 初期表示
updateHud();

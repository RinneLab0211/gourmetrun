import * as THREE from 'three';

// --- 1. 基本設定とデータ ---
const stages = [
  { name: "室蘭", goal: 5000 },
  { name: "富良野", goal: 7000 },
  { name: "札幌", goal: 10000 },
  { name: "稚内", goal: 15000 },
  { name: "礼文島", goal: 20000 },
  { name: "沖縄", goal: 50000 }
];

const stageLength = 180;
const badNurseKind = "悪い看護師";
const bestScoreKey = "hokkaidoGourmetRunBestScore";
const collectionKey = "hokkaidoGourmetRunCollection";

// --- 2. 状態管理 (state) ---
function createCollectionState() {
  return stages.map(() => new Set());
}

function loadCollectionState() {
  try {
    const saved = JSON.parse(localStorage.getItem(collectionKey) || "[]");
    return stages.map((_, index) => new Set(Array.isArray(saved[index]) ? saved[index] : []));
  } catch {
    return createCollectionState();
  }
}

const state = {
  running: false,
  score: 0,
  stageScore: 0,
  stage: 0,
  health: 3,
  comboTimer: 0,
  speedBoost: 0,
  collected: [],
  collection: loadCollectionState(), // ここで初期化
  controls: new Set(),
};

function saveCollectionState() {
  localStorage.setItem(collectionKey, JSON.stringify(state.collection.map((set) => [...set])));
}

// --- 3. Three.js セットアップ ---
const canvas = document.getElementById('game');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// ヒーロー（仮の姿）
const hero = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff4444 }));
scene.add(hero);
camera.position.set(0, 3, 10);
camera.lookAt(0, 0, 0);

// --- 4. ゲーム関数 ---
const startPanel = document.getElementById('startPanel');

function updateHud() {
  const scoreEl = document.getElementById('score');
  const heartsEl = document.getElementById('hearts');
  const stageNameEl = document.getElementById('stageName');
  if (scoreEl) scoreEl.textContent = state.score;
  if (heartsEl) heartsEl.textContent = "♥".repeat(Math.max(0, state.health));
  if (stageNameEl) stageNameEl.textContent = stages[state.stage].name;
}

function initGame(stage = 0) {
  state.stage = stage;
  state.speedBoost = 0;
  state.score = (stage === 0) ? 0 : state.score;
  state.collected = (stage === 0) ? [] : state.collected;
  
  if (stage === 0 && state.score === 0) {
    state.collection = createCollectionState();
  }
  
  hero.position.set(0, 0, 1.8);
  hero.visible = true;
  state.running = true;
  startPanel.classList.add("hidden");
  updateHud();
  animate();
}

function animate() {
  if (!state.running) return;
  requestAnimationFrame(animate);
  hero.rotation.y += 0.02; // とりあえず動かす
  renderer.render(scene, camera);
}

// --- 5. イベント設定 ---
document.getElementById('startButton').addEventListener('click', () => initGame(0));

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 初期表示
updateHud();

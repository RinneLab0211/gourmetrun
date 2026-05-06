import * as THREE from 'three';

// --- 設定と状態 ---
const stageLength = 180;
const collectionKey = "hokkaidoGourmetRunCollection";

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
    collection: stages.map(() => new Set()),
    controls: new Set(),
};

// --- 初期化 (Three.js) ---
const canvas = document.getElementById('game');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // 青空

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// 仮のヒーロー（赤い箱）
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const hero = new THREE.Mesh(geometry, material);
scene.add(hero);
hero.position.set(0, 0, 5);
camera.position.z = 10;

// --- 関数 ---
function updateHud() {
    document.getElementById('score').textContent = state.score;
    document.getElementById('hearts').textContent = "♥".repeat(state.health);
    document.getElementById('stageName').textContent = stages[state.stage].name;
}

function startGame() {
    state.running = true;
    state.health = 3;
    state.score = 0;
    document.getElementById('startPanel').classList.add('hidden');
    updateHud();
    animate();
}

function animate() {
    if (!state.running) return;
    requestAnimationFrame(animate);
    
    // 3Dの描画更新（とりあえずヒーローを回転させる）
    hero.rotation.x += 0.01;
    hero.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// --- イベントリスナー ---
document.getElementById('startButton').addEventListener('click', startGame);

// ウィンドウサイズ変更対応
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 起動時の更新
updateHud();

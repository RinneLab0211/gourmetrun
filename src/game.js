import * as THREE from 'three';

// 必須のデータ定義
const stages = [{ name: "室蘭", goal: 5000 }, { name: "富良野", goal: 7000 }];
const state = { running: false, score: 0, health: 3, stage: 0 };

// 画面の初期化
const canvas = document.getElementById('game');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 主人公
const hero = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(hero);

function animate() {
  if (!state.running) return;
  requestAnimationFrame(animate);
  hero.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// ボタン設定
document.getElementById('startButton').addEventListener('click', () => {
  state.running = true;
  document.getElementById('startPanel').classList.add('hidden');
  animate();
});

// UI更新
document.getElementById('score').textContent = state.score;
document.getElementById('hearts').textContent = "♥♥♥";
document.getElementById('stageName').textContent = stages[0].name;

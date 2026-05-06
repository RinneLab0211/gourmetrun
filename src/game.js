
const stageLength = 180;
const badNurseKind = "\u60aa\u3044\u770b\u8b77\u5e2b";
const bestScoreKey = "hokkaidoGourmetRunBestScore";
const collectionKey = "hokkaidoGourmetRunCollection";

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

function saveCollectionState() {
  localStorage.setItem(collectionKey, JSON.stringify(state.collection.map((set) => [...set])));
}

const state = {
  running: false,
  score: 0,
  comboTimer: 0,
  speedBoost: 0,
  collected: [],
  collection: createCollectionState(),
  collection: loadCollectionState(),
  controls: new Set(),
};

  state.speedBoost = 0;
  state.score = stage === 0 ? 0 : state.score;
  state.collected = stage === 0 ? [] : state.collected;
  if (stage === 0 && state.score === 0) state.collection = createCollectionState();
  hero.position.set(0, 0, 1.8);
  hero.visible = true;
  updateHud();
}

function renderCollection(stageIndex, target, titleEl = null, allStages = false) {
  if (titleEl) titleEl.textContent = allStages ? "全ステージのコレクション" : `${stages[stageIndex].name}のコレクション`;
  if (titleEl) titleEl.textContent = allStages ? "全ステージの累計コレクション" : `${stages[stageIndex].name}の累計コレクション`;
  const stageIndexes = allStages ? stages.map((_, index) => index) : [stageIndex];
  target.innerHTML = stageIndexes
    .map((index) => {
  state.stageScore += points;
  state.collected.push({ name: item.userData.name, emoji: item.userData.emoji });
  state.collection[state.stage].add(item.userData.name);
  saveCollectionState();
  showFloatingScore(points);
  saveBestScore();
  updateHud();
  state.stageScore = 0;
  state.health = 3;
  state.collected = [];
  state.collection = createCollectionState();
  state.running = false;
  updateHud();
  startPanel.classList.add("hidden");

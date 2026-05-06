
const mapPanel = document.querySelector("#mapPanel");
const mapButton = document.querySelector("#mapButton");
const mapHero = document.querySelector("#mapHero");
const collectionTitle = document.querySelector("#collectionTitle");
const collectionList = document.querySelector("#collectionList");
const countdownEl = document.querySelector("#countdown");
const floatLayer = document.querySelector("#floatLayer");
const message = document.querySelector("#message");
const messageTitle = document.querySelector("#messageTitle");
const messageText = document.querySelector("#messageText");
const messageCollection = document.querySelector("#messageCollection");
const nextButton = document.querySelector("#nextButton");

const stages = [
const badNurseKind = "\u60aa\u3044\u770b\u8b77\u5e2b";
const bestScoreKey = "hokkaidoGourmetRunBestScore";

function createCollectionState() {
  return stages.map(() => new Set());
}

const state = {
  running: false,
  score: 0,
  comboTimer: 0,
  speedBoost: 0,
  collected: [],
  collection: createCollectionState(),
  controls: new Set(),
};

  state.speedBoost = 0;
  state.score = stage === 0 ? 0 : state.score;
  state.collected = stage === 0 ? [] : state.collected;
  if (stage === 0 && state.score === 0) state.collection = createCollectionState();
  hero.position.set(0, 0, 1.8);
  hero.visible = true;
  updateHud();
  state.running = false;
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageCollection.innerHTML = "";
  message.classList.remove("hidden");
  nextButton.onclick = () => {
    message.classList.add("hidden");
  updateHud();
}

function renderCollection(stageIndex, target, titleEl = null, allStages = false) {
  if (titleEl) titleEl.textContent = allStages ? "全ステージのコレクション" : `${stages[stageIndex].name}のコレクション`;
  const stageIndexes = allStages ? stages.map((_, index) => index) : [stageIndex];
  target.innerHTML = stageIndexes
    .map((index) => {
      const owned = state.collection[index];
      return stages[index].items
        .map(([name, emoji, points]) => {
          const got = owned.has(name);
          const label = allStages ? `${stages[index].name}: ${name}` : name;
          return `<div class="collectionItem ${got ? "" : "missing"}"><span>${got ? emoji : "?"}</span><span>${label}</span><small>${points}</small></div>`;
        })
        .join("");
    })
    .join("");
}

function showFloatingScore(points) {
  const el = document.createElement("div");
  el.className = "floatScore";
    mapHero.style.left = style.left;
    mapHero.style.top = style.top;
  }
  renderCollection(state.stage, collectionList, collectionTitle);
}

function showMap() {

function nextStage() {
  saveBestScore();
  if (state.stage === 4) {
    state.stage = 5;
    showMap();
  const clearedStage = state.stage;
  if (clearedStage === 5) {
    showMessage("完全クリア！", `最終スコアは${state.score}点です。取れたものと逃したものを確認しましょう。`, () => {
      state.stage = 0;
      startPanel.classList.remove("hidden");
    });
    renderCollection(0, messageCollection, null, true);
    return;
  }
  if (state.stage === 5) {
    showMessage("完全クリア", `集めた特産品は${state.collected.length}個、スコアは${state.score}点です。`, () => { state.stage = 0; startPanel.classList.remove("hidden"); });
    return;
  }
  state.stage += 1;
  showMap();
  const next = clearedStage === 4 ? 5 : clearedStage + 1;
  showMessage(`${stages[clearedStage].name}クリア！`, `目標ポイント達成。次は${stages[next].name}へ進みます。`, () => {
    state.stage = next;
    showMap();
  });
  renderCollection(clearedStage, messageCollection);
}

function handleControls(delta) {
  state.score += points;
  state.stageScore += points;
  state.collected.push({ name: item.userData.name, emoji: item.userData.emoji });
  state.collection[state.stage].add(item.userData.name);
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

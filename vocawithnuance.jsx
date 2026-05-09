import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ───── embedded demo data (40 tier-1 words) ───── */
const WORDS=[{"id":4212,"w":"geographical","m":"지리학적인; 지리상의; 지형적인","p":"/ˌdʒiːəˈɡræfɪkəl/","e":["The region has unique geographical features.","We studied the geographical distribution of species."],"s":["topographic","cartographic","physiographic"],"a":["non-geographical"],"et":"접두사 'geo-'는 그리스어 'gē'에서 유래하여 '지구, 땅'을 의미합니다."},{"id":119421,"w":"fan","m":"부채, 선풍기 (명사); 팬, 열광자 (명사); 부채질하다 (동사)","p":"/fæn/","e":["The ceiling fan helped to cool the room.","She's a huge fan of classical music."],"s":["ventilator","blower","admirer"],"a":["detractor","opponent"],"et":"From Old English 'fann', from Latin 'vannus'."},{"id":176548,"w":"urging","m":"재촉함, 강력히 권유함 (동명사)","p":"/ˈɜːrdʒɪŋ/","e":["He was urging his colleagues to support the proposal.","The urging of the crowd grew louder."],"s":["encouraging","pressing","exhorting"],"a":["discouraging","deterring"],"et":"From 'urge' (Latin 'urgere' - to press, drive)."},{"id":183155,"w":"written","m":"쓰다의 과거분사; 글로 표현되거나 기록된 (형)","p":"/ˈrɪtən/","e":["The letter was written in haste.","This book is exceptionally well written."],"s":["composed","penned","inscribed"],"a":["spoken","oral"],"et":"From Old English *writen*, past participle of *wrītan*."},{"id":324069,"w":"lookout","m":"감시하기 위해 배치된 사람; 감시를 하는 장소; 전망.","p":"/ˈlʊkaʊt/","e":["The sailor was assigned to lookout duty.","The old tower served as a perfect lookout point."],"s":["sentinel","guard","watchman"],"a":[],"et":"'look' + 'out'의 합성어."},{"id":326551,"w":"limb","m":"1. 팔다리. 2. 나무의 큰 가지. 3. 천체의 가장자리.","p":"/lɪm/","e":["He broke a limb playing football.","The old oak tree had many strong limbs."],"s":["extremity","appendage","branch"],"a":["trunk","body"],"et":"From Old English 'lim' (limb of the body)."},{"id":51954,"w":"consuming","m":"소모하는; 압도적인, 사로잡는 (형용사)","p":"/kənˈsuːmɪŋ/","e":["Her consuming passion for art left her little time.","The fire was consuming the old building."],"s":["absorbing","engrossing","overwhelming"],"a":["trivial","superficial"],"et":"접두사 'con-' (완전히) + 어근 'sumere' (취하다)."},{"id":13294,"w":"healthy","m":"건강한; 건강에 좋은; 상당한 양의 (형용사)","p":"/ˈhɛlθi/","e":["She maintains a healthy lifestyle.","Eating vegetables is a healthy habit."],"s":["well","fit","robust"],"a":["unhealthy","ill"],"et":"From Old English 'hǣlþ' + '-y'."},{"id":229380,"w":"trinity","m":"삼위일체; 3명 또는 3가지로 이루어진 그룹","p":"/ˈtrɪnɪti/","e":["The doctrine of the Holy Trinity is fundamental.","The three friends formed an inseparable trinity."],"s":["Godhead","Triune God"],"a":["duo","pair"],"et":"From Latin *trinitas* 'the number three'."},{"id":54545,"w":"complaints","m":"불평, 불만; 고통, 질병 (복수형)","p":"/kəmˈpleɪnts/","e":["The department received numerous complaints.","He had several minor complaints."],"s":["grievances","protests","objections"],"a":["praises","commendations"],"et":"Prefix 'com-' + Root 'plangere' (to lament)."},{"id":339983,"w":"elsewhere","m":"다른 곳에; 다른 장소에 (부사)","p":"/ˈɛlswɛər/","e":["He decided to look for his keys elsewhere.","Try elsewhere for the book."],"s":["in another place","somewhere else"],"a":["here","locally"],"et":"From Old English 'elles' + 'hwær'."},{"id":242806,"w":"sacks","m":"자루 (복수형); 해고하다; 약탈하다 (동사)","p":"/sæks/","e":["The farmer filled many sacks with corn.","The company sacks underperformers."],"s":["bags","pouches","dismisses"],"a":["hires","employs"],"et":"From Old English *sacc*, from Latin *saccus*."},{"id":310405,"w":"laps","m":"궤도의 회로; 혀로 액체를 마시다 (동사)","p":"/ˈlæps/","e":["The runner completed five laps.","The cat laps milk from the saucer."],"s":["circuits","rounds","stages"],"a":["pours","gushes"],"et":"From Old English 'lapian' (to drink)."},{"id":117106,"w":"fiat","m":"명령, 칙령; 허가; 법정 화폐 (명사)","p":"/ˈfiːæt/","e":["The dictator ruled by fiat.","The court issued a fiat for release."],"s":["decree","edict","order"],"a":["request","suggestion"],"et":"From Latin *fiat*, 'let it be done'."},{"id":13062,"w":"heavily","m":"무겁게, 강하게; 심하게; 슬픈 기분으로 (부사)","p":"/ˈhɛvili/","e":["The rain fell heavily throughout the night.","He sighed heavily."],"s":["ponderously","forcefully","severely"],"a":["lightly","gently"],"et":"From Old English 'hefig' + '-ly'."},{"id":318628,"w":"jaguar","m":"재규어, 표범 (명사)","p":"/ˈdʒæɡwɑːr/","e":["The jaguar is an apex predator.","Its coat helps it blend into shadows."],"s":["panther","big cat","feline"],"a":[],"et":"From Tupi 'yaguara', meaning 'wild beast'."},{"id":184222,"w":"womb","m":"자궁; 발생지, 원천 (명사)","p":"/wuːm/","e":["The baby grew safely within its mother's womb.","Scientists study fetal development in the womb."],"s":["uterus","matrix"],"a":["birth","outside"],"et":"From Old English 'wamb' (belly, womb)."},{"id":175838,"w":"vacant","m":"비어 있는; 점유되지 않은; 생각이 없는 (형)","p":"/ˈveɪkənt/","e":["The apartment has been vacant for months.","He had a vacant stare."],"s":["empty","unoccupied","blank"],"a":["occupied","full"],"et":"From Latin 'vacare' (비어 있다, 자유롭다)."},{"id":128940,"w":"enforcing","m":"법률이나 규칙의 준수를 강제하는 행위","p":"/ɪnˈfɔːrsɪŋ/","e":["The police enforce traffic laws.","Enforcing safety regulations is crucial."],"s":["implementing","applying","compelling"],"a":["neglecting","ignoring"],"et":"Prefix 'en-' + Root 'force'."},{"id":254908,"w":"installation","m":"설치; 설비; 임명식; 설치 미술 작품 (명사)","p":"/ˌɪnstəˈleɪʃən/","e":["The software installation took hours.","The gallery has a new installation."],"s":["setup","fitting","placement"],"a":["removal","uninstallation"],"et":"'in-' (안에) + 'stall' (세우다) + '-ation'."},{"id":326885,"w":"lifetime","m":"출생부터 사망까지의 기간; 존재 기간 (명사)","p":"/ˈlaɪfˌtaɪm/","e":["He achieved more in his short lifetime than most.","Designed to last a lifetime."],"s":["existence","duration","span of life"],"a":["moment","instant"],"et":"'life' + 'time' 합성어."},{"id":133740,"w":"push","m":"밀다; 힘을 가해 멀어지게 하다 (동사/명사)","p":"/pʊʃ/","e":["She had to push the heavy door open.","Don't push me."],"s":["shove","propel","thrust"],"a":["pull","draw"],"et":"From Old French 'pousser', from Latin 'pulsare'."},{"id":219579,"w":"terrestrial","m":"지구의; 육상의; 지상의 (형용사)","p":"/təˈrɛstriəl/","e":["Humans are terrestrial beings.","The terrestrial environment is diverse."],"s":["earthly","telluric"],"a":["aquatic","aerial"],"et":"어근: 'terra-' (라틴어: earth, land) + '-ial'."},{"id":78626,"w":"alternatives","m":"다른 선택지나 옵션; 다른 가능성들 (복수형)","p":"/ɔːlˈtɜːrnətɪvz/","e":["Consider all possible alternatives.","Several alternatives for funding were presented."],"s":["options","choices","possibilities"],"a":["necessities","requirements"],"et":"어근 'alter-' (둘 중 다른 하나) + '-ative' + '-s'."},{"id":14328,"w":"harmful","m":"해를 끼치거나 손상을 입힐 수 있는","p":"/ˈhɑːrmfəl/","e":["Smoking is harmful to your health.","Direct sunlight can be harmful."],"s":["detrimental","damaging","injurious"],"a":["harmless","beneficial"],"et":"From Old English 'hearm' + '-ful'."},{"id":21779,"w":"minds","m":"마음, 정신 (복수); 신경 쓰다 (동사 3인칭)","p":"/maɪndz/","e":["Great minds often think alike.","She minds her own business."],"s":["intellects","brains","attends"],"a":["bodies","disregards"],"et":"From Old English 'gemynd' (기억, 생각)."},{"id":115366,"w":"flag","m":"깃발 (명사); 표시하다 (동사); 기운이 없어지다","p":"/flæɡ/","e":["The national flag waved proudly.","Please flag any errors."],"s":["banner","standard","ensign"],"a":["ignore","overlook"],"et":"From Old Norse 'flagga' (to droop)."},{"id":186122,"w":"whisper","m":"속삭이다 (동사); 속삭임 (명사)","p":"/ˈwɪspər/","e":["She leaned in to whisper a secret.","The wind made a soft whisper."],"s":["murmur","breathe","mutter"],"a":["shout","yell"],"et":"From Old English 'hwispran' (속삭이다)."},{"id":77862,"w":"amend","m":"수정하다; 더 낫게 만들기 위해 변경하다 (동사)","p":"/əˈmɛnd/","e":["Congress voted to amend the Constitution.","Please amend your report."],"s":["revise","alter","modify"],"a":["leave unchanged","preserve"],"et":"From Latin 'emendare' (to correct)."},{"id":254747,"w":"instrumental","m":"중요한 역할을 하는, 악기의 (형용사)","p":"/ˌɪnstrəˈmɛntəl/","e":["His advice was instrumental in my decision.","An instrumental version of the song."],"s":["crucial","pivotal","essential"],"a":["inconsequential","irrelevant"],"et":"From Latin 'instrumentalis'."},{"id":121267,"w":"export","m":"다른 나라로 상품을 보내다 (동); 수출품 (명)","p":"/ɪkˈspɔːrt/","e":["The company exports products to Asia.","Oil is a major export."],"s":["ship abroad","sell overseas"],"a":["import","buy in"],"et":"'ex-' (밖으로) + 'portare' (나르다)."},{"id":167689,"w":"slave","m":"노예; 지나치게 의존하는 사람 (명사)","p":"/sleɪv/","e":["The movement fought to free every slave.","He felt like a slave to his job."],"s":["bondman","thrall","serf"],"a":["master","freeman"],"et":"From Medieval Latin 'sclavus'."},{"id":184880,"w":"wire","m":"금속 줄 (명사); 전선으로 연결하다 (동사)","p":"/ˈwaɪər/","e":["A thin copper wire repaired the circuit.","The electrician wired the new house."],"s":["cable","strand","filament"],"a":["disconnect"],"et":"From Old English 'wīr'."},{"id":136799,"w":"provoked","m":"도발된 (형); 자극했다 (동사 과거형)","p":"/prəˈvəʊkt/","e":["His provoked anger led to an outburst.","The incident provoked a strong reaction."],"s":["incited","aroused","stimulated"],"a":["calmed","appeased"],"et":"'pro-' (앞으로) + 'vocare' (부르다) + '-ed'."},{"id":299837,"w":"suitcase","m":"여행용 손잡이 달린 직사각형 케이스","p":"/ˈsuːtkeɪs/","e":["He packed a small suitcase for the trip.","Her vintage leather suitcase was prized."],"s":["valise","grip","bag"],"a":[],"et":"'suit' + 'case' 결합 (19세기)."},{"id":353430,"w":"chicks","m":"병아리; 젊은 여성 (명사)","p":"/ˈtʃɪks/","e":["The hen led her brood of chicks."],"s":["fledglings","young birds"],"a":["roosters","hens"],"et":"Shortened from 'chicken', Old English 'cicen'."},{"id":152681,"w":"sharia","m":"이슬람 율법; 꾸란에서 유래한 법적 원칙","p":"/ʃəˈriːə/","e":["Many countries incorporate Sharia into their systems.","Sharia guides daily life for devout Muslims."],"s":["Islamic law","divine law"],"a":["secular law"],"et":"From Arabic sharīʿa (شريعة), 'path to the watering place'."},{"id":186894,"w":"westminster","m":"영국 런던의 구역; 영국 의회를 지칭","p":"/ˈwɛstmɪnstər/","e":["The PM addressed the House in Westminster.","Many countries adopted the Westminster system."],"s":["Parliament","British government"],"a":[],"et":"'West-' + 'Minster' (수도원)."},{"id":83311,"w":"ae","m":"æ 이중문자; 모음음을 나타내는 기호","p":"/eɪ/, /iː/","e":["In 'curriculum vitae,' the 'ae' is pronounced /iː/.","Older texts use 'ae' as a ligature."],"s":["ever","always"],"a":["never"],"et":"From Latin ae (ligature)."},{"id":187477,"w":"wed","m":"결혼하다; 밀접하게 결합하다 (동사)","p":"/wɛd/","e":["They plan to wed next summer.","The companies wed their resources."],"s":["marry","espouse","unite"],"a":["divorce","separate"],"et":"From Old English 'weddian' (결혼하다, 서약하다)."}];

const TIER_INFO = {
  1: { label: "Tier 1", count: "14,611", desc: "핵심 고빈도", color: "#2B5F8A" },
  2: { label: "Tier 2", count: "19,844", desc: "중급 필수", color: "#7B4A8D" },
  3: { label: "Tier 3", count: "25,859", desc: "고급 확장", color: "#9B4D5A" },
  4: { label: "Tier 4", count: "33,490", desc: "전문 심화", color: "#6B7B3A" },
  5: { label: "Tier 5", count: "275,650", desc: "전체 마스터", color: "#5A6B7B" },
};

/* ───── persistent storage helpers ───── */
async function loadBookmarks() {
  try {
    const r = await window.storage.get("vwn-bookmarks");
    return r ? JSON.parse(r.value) : {};
  } catch { return {}; }
}
async function saveBookmarks(bm) {
  try { await window.storage.set("vwn-bookmarks", JSON.stringify(bm)); } catch {}
}
async function loadLearnState() {
  try {
    const r = await window.storage.get("vwn-learn-state");
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}
async function saveLearnState(state) {
  try { await window.storage.set("vwn-learn-state", JSON.stringify(state)); } catch {}
}

/* ───── seeded shuffle (stable order per seed) ───── */
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  const rand = () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ───── main app ───── */
export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedTier, setSelectedTier] = useState(1);
  const [bookmarks, setBookmarks] = useState({});
  const [learnIdx, setLearnIdx] = useState(0);
  const [learnOrder, setLearnOrder] = useState([]); // stable word order
  const [knownWords, setKnownWords] = useState({}); // { word: true }
  const [showDetail, setShowDetail] = useState(false);
  const [quizWords, setQuizWords] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [fadeIn, setFadeIn] = useState(true);
  const [stateLoaded, setStateLoaded] = useState(false);
  const searchRef = useRef(null);

  /* load all saved state on mount */
  useEffect(() => {
    (async () => {
      const bm = await loadBookmarks();
      setBookmarks(bm);
      const ls = await loadLearnState();
      if (ls) {
        setLearnIdx(ls.idx || 0);
        setLearnOrder(ls.order || []);
        setKnownWords(ls.known || {});
      }
      setStateLoaded(true);
    })();
  }, []);

  /* persist learn state whenever it changes */
  const persistLearn = useCallback((idx, order, known) => {
    saveLearnState({ idx, order, known });
  }, []);

  const navigate = useCallback((s) => {
    setFadeIn(false);
    setTimeout(() => { setScreen(s); setFadeIn(true); }, 180);
  }, []);

  const toggleBookmark = useCallback((word) => {
    setBookmarks(prev => {
      const next = { ...prev };
      if (next[word.w]) delete next[word.w];
      else next[word.w] = { id: word.id, w: word.w, m: word.m, p: word.p, e: word.e, s: word.s, a: word.a, et: word.et };
      saveBookmarks(next);
      return next;
    });
  }, []);

  const markKnown = useCallback((wordStr) => {
    setKnownWords(prev => {
      const next = { ...prev, [wordStr]: true };
      return next;
    });
  }, []);

  /* build learn list: stable seeded order, filter out known */
  const learnWords = useMemo(() => {
    if (learnOrder.length > 0) {
      // reconstruct word objects from saved ID order
      const idMap = {};
      WORDS.forEach(w => { idMap[w.id] = w; });
      return learnOrder.map(id => idMap[id]).filter(Boolean);
    }
    // first time: create stable order with seed=42
    return seededShuffle(WORDS, 42);
  }, [learnOrder]);

  /* remaining (not-yet-known) words for display */
  const remainingWords = useMemo(() => {
    return learnWords.filter(w => !knownWords[w.w]);
  }, [learnWords, knownWords]);

  const knownCount = Object.keys(knownWords).length;
  const totalCount = WORDS.length;

  /* start/resume learn */
  const startLearn = useCallback((fromScratch = false) => {
    if (fromScratch) {
      const newOrder = seededShuffle(WORDS, Date.now() % 100000);
      const orderIds = newOrder.map(w => w.id);
      setLearnOrder(orderIds);
      setLearnIdx(0);
      setKnownWords({});
      setShowDetail(false);
      persistLearn(0, orderIds, {});
      navigate("learn");
    } else {
      // if no saved order yet, create one
      if (learnOrder.length === 0) {
        const newOrder = seededShuffle(WORDS, 42);
        const orderIds = newOrder.map(w => w.id);
        setLearnOrder(orderIds);
        persistLearn(learnIdx, orderIds, knownWords);
      }
      setShowDetail(false);
      navigate("learn");
    }
  }, [learnOrder, learnIdx, knownWords, navigate, persistLearn]);

  /* quiz setup */
  const startQuiz = useCallback(() => {
    const qw = shuffle(WORDS).slice(0, 10).map(w => {
      const wrongPool = WORDS.filter(x => x.id !== w.id);
      const wrongs = shuffle(wrongPool).slice(0, 3).map(x => x.m);
      const options = shuffle([w.m, ...wrongs]);
      return { ...w, options, correctIdx: options.indexOf(w.m) };
    });
    setQuizWords(qw);
    setQuizIdx(0);
    setQuizAnswer(null);
    setQuizScore({ correct: 0, total: 0 });
    navigate("quiz");
  }, [navigate]);

  /* bookmarked words list */
  const bookmarkedWords = useMemo(() => Object.values(bookmarks), [bookmarks]);

  const filteredBookmarks = useMemo(() => {
    if (!searchQuery.trim()) return bookmarkedWords;
    const q = searchQuery.toLowerCase();
    return bookmarkedWords.filter(w =>
      w.w.toLowerCase().includes(q) || (w.m && w.m.toLowerCase().includes(q))
    );
  }, [bookmarkedWords, searchQuery]);

  /* search all words */
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return WORDS.filter(w => w.w.toLowerCase().includes(q)).slice(0, 20);
  }, [searchQuery]);

  const currentLearnWord = remainingWords[learnIdx] || remainingWords[0];
  const currentQuizWord = quizWords[quizIdx];

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Noto+Serif+KR:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F0E8; }
        ::selection { background: rgba(123,74,141,0.2); }
        input::placeholder { color: #B0A99A; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .card-enter { animation: slideUp 0.4s ease-out; }
        .fade-screen { animation: fadeIn 0.35s ease-out; }
        .bookmark-pulse { animation: pulse 0.3s ease-out; }
      `}</style>

      <div style={{ ...styles.screenWrap, opacity: fadeIn ? 1 : 0, transition: "opacity 0.18s" }}>

        {/* ═══ HOME ═══ */}
        {screen === "home" && (
          <div className="fade-screen" style={styles.homeContainer}>
            <div style={styles.logoArea}>
              <div style={styles.logoMark}>W</div>
              <h1 style={styles.appTitle}>voca<span style={{ color: "#7B4A8D" }}>with</span>nuance</h1>
              <p style={styles.subtitle}>뉘앙스와 함께 배우는 어휘</p>
            </div>

            {/* progress summary */}
            {knownCount > 0 && (
              <div style={styles.progressSummary}>
                <div style={styles.progressSummaryBar}>
                  <div style={{ ...styles.progressSummaryFill, width: `${(knownCount / totalCount) * 100}%` }} />
                </div>
                <div style={styles.progressSummaryText}>
                  학습 완료 <span style={{ color: "#2B5F8A", fontWeight: 600 }}>{knownCount}</span> / {totalCount}단어
                  {remainingWords.length > 0 && (
                    <span style={{ marginLeft: 8, color: "#9A9288" }}>· 남은 {remainingWords.length}단어</span>
                  )}
                </div>
              </div>
            )}

            <div style={styles.tierGrid}>
              {[1, 2, 3, 4, 5].map(t => (
                <button
                  key={t}
                  onClick={() => { setSelectedTier(t); }}
                  style={{
                    ...styles.tierCard,
                    borderLeft: `3px solid ${TIER_INFO[t].color}`,
                    background: selectedTier === t ? "rgba(43,95,138,0.06)" : "transparent",
                  }}
                >
                  <div style={{ ...styles.tierLabel, color: TIER_INFO[t].color }}>{TIER_INFO[t].label}</div>
                  <div style={styles.tierCount}>{TIER_INFO[t].count}단어</div>
                  <div style={styles.tierDesc}>{TIER_INFO[t].desc}</div>
                </button>
              ))}
            </div>

            <div style={styles.actionRow}>
              {knownCount > 0 && remainingWords.length > 0 ? (
                <>
                  <button style={styles.primaryBtn} onClick={() => startLearn(false)}>
                    <span style={styles.btnIcon}>本</span> 이어서 학습하기
                  </button>
                  <button style={{ ...styles.secondaryBtn, color: "#6A6258", borderColor: "#D8D0C4" }} onClick={() => startLearn(true)}>
                    처음부터 다시 시작
                  </button>
                </>
              ) : knownCount > 0 && remainingWords.length === 0 ? (
                <>
                  <div style={styles.completeBanner}>모든 단어를 학습했습니다!</div>
                  <button style={styles.primaryBtn} onClick={() => startLearn(true)}>
                    <span style={styles.btnIcon}>本</span> 처음부터 다시 학습
                  </button>
                </>
              ) : (
                <button style={styles.primaryBtn} onClick={() => startLearn(false)}>
                  <span style={styles.btnIcon}>本</span> 학습하기
                </button>
              )}
              <button style={styles.secondaryBtn} onClick={startQuiz}>
                <span style={styles.btnIcon}>試</span> 테스트
              </button>
              <button style={styles.tertiaryBtn} onClick={() => { setSearchQuery(""); navigate("review"); }}>
                <span style={styles.btnIcon}>★</span> 다시보기
                {bookmarkedWords.length > 0 && (
                  <span style={styles.badge}>{bookmarkedWords.length}</span>
                )}
              </button>
            </div>

            <div style={styles.demoNote}>
              데모 버전 · Tier 1에서 40단어 체험
            </div>
          </div>
        )}

        {/* ═══ LEARN ═══ */}
        {screen === "learn" && !currentLearnWord && (
          <div className="fade-screen" style={styles.resultContainer}>
            <div style={styles.resultCircle}>
              <div style={styles.resultScore}>{knownCount}</div>
              <div style={styles.resultTotal}>/ {totalCount}</div>
            </div>
            <h2 style={styles.resultTitle}>학습 완료!</h2>
            <p style={styles.resultSub}>모든 단어를 학습했습니다.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button style={styles.primaryBtn} onClick={() => startLearn(true)}>처음부터 다시</button>
              <button style={styles.secondaryBtn} onClick={() => navigate("home")}>홈으로</button>
            </div>
          </div>
        )}
        {screen === "learn" && currentLearnWord && (
          <div className="fade-screen" style={styles.learnContainer}>
            <div style={styles.topBar}>
              <button style={styles.backBtn} onClick={() => {
                persistLearn(learnIdx, learnOrder.length ? learnOrder : learnWords.map(w=>w.id), knownWords);
                navigate("home");
              }}>← 홈</button>
              <span style={styles.counter}>{learnIdx + 1} / {remainingWords.length}</span>
              <button
                style={{ ...styles.starBtn, color: bookmarks[currentLearnWord.w] ? "#9B4D5A" : "#C8C0B4" }}
                onClick={() => toggleBookmark(currentLearnWord)}
              >★</button>
            </div>

            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${((knownCount) / totalCount) * 100}%` }} />
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: "#9A9288", marginTop: -18, marginBottom: 16 }}>
              전체 {knownCount}/{totalCount} 완료
            </div>

            <div className="card-enter" key={currentLearnWord.id} style={styles.wordCard}>
              <div style={styles.wordMain}>{currentLearnWord.w}</div>
              <div style={styles.wordPron}>{currentLearnWord.p}</div>

              {!showDetail ? (
                <button style={styles.revealBtn} onClick={() => setShowDetail(true)}>
                  뜻 보기
                </button>
              ) : (
                <div style={styles.detailArea} className="card-enter">
                  <div style={styles.meaningBox}>
                    <div style={styles.sectionTag}>의미</div>
                    <div style={styles.meaningText}>{currentLearnWord.m}</div>
                  </div>

                  {currentLearnWord.s?.length > 0 && (
                    <div style={styles.tagRow}>
                      <span style={styles.tagLabel}>유의어</span>
                      {currentLearnWord.s.map((s, i) => (
                        <span key={i} style={styles.synTag}>{s}</span>
                      ))}
                    </div>
                  )}

                  {currentLearnWord.a?.length > 0 && (
                    <div style={styles.tagRow}>
                      <span style={styles.tagLabel}>반의어</span>
                      {currentLearnWord.a.map((a, i) => (
                        <span key={i} style={styles.antTag}>{a}</span>
                      ))}
                    </div>
                  )}

                  {currentLearnWord.e?.length > 0 && (
                    <div style={styles.exampleBox}>
                      <div style={styles.sectionTag}>예문</div>
                      {currentLearnWord.e.map((ex, i) => (
                        <p key={i} style={styles.exampleText}>"{ex}"</p>
                      ))}
                    </div>
                  )}

                  {currentLearnWord.et && (
                    <div style={styles.etymBox}>
                      <div style={styles.sectionTag}>어원</div>
                      <p style={styles.etymText}>{currentLearnWord.et}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={styles.learnActions}>
              <button
                style={styles.knowBtn}
                onClick={() => {
                  const word = currentLearnWord;
                  markKnown(word.w);
                  setShowDetail(false);
                  // after marking known, remainingWords will shrink
                  // so keep learnIdx the same (next word slides in) or cap it
                  setLearnIdx(i => {
                    const nextRemaining = remainingWords.filter(w => w.w !== word.w);
                    const nextIdx = Math.min(i, nextRemaining.length - 1);
                    const finalIdx = Math.max(0, nextIdx);
                    const order = learnOrder.length ? learnOrder : learnWords.map(w=>w.id);
                    const nextKnown = { ...knownWords, [word.w]: true };
                    persistLearn(finalIdx, order, nextKnown);
                    if (nextRemaining.length === 0) {
                      setTimeout(() => navigate("home"), 300);
                    }
                    return finalIdx;
                  });
                }}
              >알아요 →</button>
              <button
                style={styles.dontKnowBtn}
                onClick={() => {
                  if (!bookmarks[currentLearnWord.w]) toggleBookmark(currentLearnWord);
                  setShowDetail(false);
                  setLearnIdx(i => {
                    const nextIdx = Math.min(i + 1, remainingWords.length - 1);
                    const order = learnOrder.length ? learnOrder : learnWords.map(w=>w.id);
                    persistLearn(nextIdx, order, knownWords);
                    return nextIdx;
                  });
                }}
              >몰라요 ★</button>
            </div>
          </div>
        )}

        {/* ═══ QUIZ ═══ */}
        {screen === "quiz" && (
          <div className="fade-screen" style={styles.learnContainer}>
            <div style={styles.topBar}>
              <button style={styles.backBtn} onClick={() => navigate("home")}>← 홈</button>
              <span style={styles.counter}>
                {quizScore.correct}/{quizScore.total} 정답
              </span>
              <span style={styles.counter}>{quizIdx + 1}/{quizWords.length}</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${((quizIdx + 1) / quizWords.length) * 100}%`, background: "#7B4A8D" }} />
            </div>

            {currentQuizWord ? (
              <div className="card-enter" key={currentQuizWord.id + "-q" + quizIdx} style={styles.wordCard}>
                <div style={styles.wordMain}>{currentQuizWord.w}</div>
                <div style={styles.wordPron}>{currentQuizWord.p}</div>

                <div style={styles.quizOptions}>
                  {currentQuizWord.options.map((opt, i) => {
                    let bg = "transparent";
                    let border = "1px solid #D8D0C4";
                    let color = "#4A4035";
                    if (quizAnswer !== null) {
                      if (i === currentQuizWord.correctIdx) { bg = "rgba(107,123,58,0.12)"; border = "1px solid #6B7B3A"; color = "#4A5A2A"; }
                      else if (i === quizAnswer && i !== currentQuizWord.correctIdx) { bg = "rgba(155,77,90,0.12)"; border = "1px solid #9B4D5A"; color = "#7B3040"; }
                    }
                    return (
                      <button
                        key={i}
                        style={{ ...styles.quizOption, background: bg, borderColor: border.split(" ")[2], color }}
                        onClick={() => {
                          if (quizAnswer !== null) return;
                          setQuizAnswer(i);
                          const correct = i === currentQuizWord.correctIdx;
                          setQuizScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
                          if (!correct && !bookmarks[currentQuizWord.w]) toggleBookmark(currentQuizWord);
                        }}
                      >
                        <span style={styles.optionNum}>{String.fromCharCode(65 + i)}</span>
                        <span style={styles.optionText}>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizAnswer !== null && (
                  <button
                    style={styles.nextQuizBtn}
                    onClick={() => {
                      if (quizIdx < quizWords.length - 1) {
                        setQuizIdx(i => i + 1);
                        setQuizAnswer(null);
                      } else {
                        navigate("quizResult");
                      }
                    }}
                  >
                    {quizIdx < quizWords.length - 1 ? "다음 →" : "결과 보기"}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* ═══ QUIZ RESULT ═══ */}
        {screen === "quizResult" && (
          <div className="fade-screen" style={styles.resultContainer}>
            <div style={styles.resultCircle}>
              <div style={styles.resultScore}>{quizScore.correct}</div>
              <div style={styles.resultTotal}>/ {quizScore.total}</div>
            </div>
            <h2 style={styles.resultTitle}>
              {quizScore.correct === quizScore.total ? "완벽해요!" :
               quizScore.correct >= quizScore.total * 0.7 ? "잘했어요!" : "더 노력해봐요!"}
            </h2>
            <p style={styles.resultSub}>
              {quizScore.total - quizScore.correct > 0
                ? `틀린 ${quizScore.total - quizScore.correct}개 단어가 ★에 저장되었습니다.`
                : "모든 단어를 맞추셨습니다!"}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button style={styles.primaryBtn} onClick={startQuiz}>다시 도전</button>
              <button style={styles.secondaryBtn} onClick={() => navigate("home")}>홈으로</button>
            </div>
          </div>
        )}

        {/* ═══ REVIEW / BOOKMARKS ═══ */}
        {screen === "review" && (
          <div className="fade-screen" style={styles.reviewContainer}>
            <div style={styles.topBar}>
              <button style={styles.backBtn} onClick={() => navigate("home")}>← 홈</button>
              <span style={styles.counter}>★ {bookmarkedWords.length}단어</span>
            </div>

            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                ref={searchRef}
                style={styles.searchInput}
                placeholder="단어 검색 (전체 목록에서 추가 가능)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button style={styles.clearBtn} onClick={() => setSearchQuery("")}>✕</button>
              )}
            </div>

            {/* Search results from all words (to add new bookmarks) */}
            {searchQuery.length >= 2 && searchResults.length > 0 && (
              <div style={styles.searchResults}>
                <div style={styles.searchResultsTitle}>전체 검색 결과</div>
                {searchResults.map(w => (
                  <div key={w.id} style={styles.searchResultItem}>
                    <div style={{ flex: 1 }}>
                      <span style={styles.srWord}>{w.w}</span>
                      <span style={styles.srMeaning}>{w.m}</span>
                    </div>
                    <button
                      style={{ ...styles.miniStar, color: bookmarks[w.w] ? "#9B4D5A" : "#C8C0B4" }}
                      onClick={() => toggleBookmark(w)}
                    >★</button>
                  </div>
                ))}
              </div>
            )}

            {/* Bookmarked words */}
            <div style={styles.bookmarkList}>
              {filteredBookmarks.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>★</div>
                  <p style={styles.emptyText}>
                    {bookmarkedWords.length === 0
                      ? "아직 저장한 단어가 없습니다.\n학습이나 테스트에서 모르는 단어를 저장해보세요."
                      : "검색 결과가 없습니다."}
                  </p>
                </div>
              ) : (
                filteredBookmarks.map((w, idx) => (
                  <ReviewCard
                    key={w.w}
                    word={w}
                    isBookmarked={!!bookmarks[w.w]}
                    onToggle={() => toggleBookmark(w)}
                    delay={idx * 40}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── review card sub-component ───── */
function ReviewCard({ word, isBookmarked, onToggle, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ ...styles.reviewCard, animationDelay: `${delay}ms` }}
      className="card-enter"
    >
      <div style={styles.reviewCardHeader} onClick={() => setOpen(!open)}>
        <div style={{ flex: 1 }}>
          <span style={styles.reviewWord}>{word.w}</span>
          <span style={styles.reviewPron}>{word.p}</span>
        </div>
        <button
          style={{ ...styles.miniStar, color: isBookmarked ? "#9B4D5A" : "#C8C0B4" }}
          onClick={e => { e.stopPropagation(); onToggle(); }}
        >★</button>
        <span style={{ ...styles.chevron, transform: open ? "rotate(90deg)" : "rotate(0)" }}>›</span>
      </div>
      {open && (
        <div style={styles.reviewDetail} className="card-enter">
          <p style={styles.reviewMeaning}>{word.m}</p>
          {word.s?.length > 0 && (
            <div style={styles.tagRow}>
              <span style={styles.tagLabel}>유</span>
              {word.s.map((s, i) => <span key={i} style={styles.synTag}>{s}</span>)}
            </div>
          )}
          {word.a?.length > 0 && (
            <div style={styles.tagRow}>
              <span style={styles.tagLabel}>반</span>
              {word.a.map((a, i) => <span key={i} style={styles.antTag}>{a}</span>)}
            </div>
          )}
          {word.e?.length > 0 && word.e.map((ex, i) => (
            <p key={i} style={styles.reviewExample}>"{ex}"</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───── styles ───── */
const font = "'Cormorant Garamond', 'Noto Serif KR', Georgia, serif";
const sans = "'Noto Serif KR', -apple-system, sans-serif";

const styles = {
  container: {
    minHeight: "100vh",
    background: "#F5F0E8",
    fontFamily: sans,
    color: "#3A3530",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  screenWrap: {
    minHeight: "100vh",
    transition: "opacity 0.18s ease",
  },

  /* HOME */
  homeContainer: { padding: "40px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center" },
  logoArea: { textAlign: "center", marginBottom: 36 },
  logoMark: {
    fontFamily: font,
    fontSize: 56,
    fontWeight: 300,
    fontStyle: "italic",
    color: "#2B5F8A",
    lineHeight: 1,
    marginBottom: 8,
    background: "linear-gradient(135deg, #2B5F8A 0%, #7B4A8D 50%, #9B4D5A 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  appTitle: {
    fontFamily: font,
    fontSize: 26,
    fontWeight: 400,
    color: "#4A5A6A",
    letterSpacing: "-0.5px",
    marginBottom: 4,
  },
  subtitle: { fontSize: 13, color: "#8A8078", fontWeight: 300, letterSpacing: "2px" },

  tierGrid: { width: "100%", display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 },
  tierCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    background: "transparent",
    border: "none",
    borderLeft: "3px solid",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s",
    borderRadius: "0 6px 6px 0",
    fontFamily: sans,
  },
  tierLabel: { fontSize: 14, fontWeight: 600, minWidth: 52 },
  tierCount: { fontSize: 12, color: "#7A7268", flex: 1 },
  tierDesc: { fontSize: 12, color: "#9A9288" },

  actionRow: { display: "flex", flexDirection: "column", gap: 10, width: "100%" },
  primaryBtn: {
    padding: "14px 24px",
    background: "#2B5F8A",
    color: "#F5F0E8",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: sans,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "all 0.2s",
    position: "relative",
  },
  secondaryBtn: {
    padding: "14px 24px",
    background: "transparent",
    color: "#7B4A8D",
    border: "1px solid #7B4A8D",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: sans,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  tertiaryBtn: {
    padding: "14px 24px",
    background: "transparent",
    color: "#9B4D5A",
    border: "1px solid #D8D0C4",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: sans,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    position: "relative",
  },
  btnIcon: { fontSize: 18, fontFamily: font, fontWeight: 300 },
  badge: {
    position: "absolute",
    right: 16,
    background: "#9B4D5A",
    color: "#F5F0E8",
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 10,
    padding: "2px 8px",
    minWidth: 20,
    textAlign: "center",
  },
  demoNote: {
    marginTop: 24,
    fontSize: 11,
    color: "#B0A99A",
    textAlign: "center",
    letterSpacing: "0.5px",
  },
  progressSummary: {
    width: "100%",
    marginBottom: 20,
    padding: "14px 16px",
    background: "rgba(255,253,248,0.7)",
    borderRadius: 8,
    border: "1px solid rgba(216,208,196,0.5)",
  },
  progressSummaryBar: {
    width: "100%",
    height: 4,
    background: "#E8E2D8",
    borderRadius: 2,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressSummaryFill: {
    height: "100%",
    background: "linear-gradient(90deg, #2B5F8A, #7B4A8D)",
    borderRadius: 2,
    transition: "width 0.4s ease",
  },
  progressSummaryText: {
    fontSize: 13,
    color: "#6A6258",
  },
  completeBanner: {
    padding: "14px",
    background: "rgba(107,123,58,0.08)",
    border: "1px solid rgba(107,123,58,0.2)",
    borderRadius: 8,
    fontSize: 14,
    color: "#5A6B3A",
    textAlign: "center",
    fontWeight: 500,
  },

  /* LEARN */
  learnContainer: { padding: "16px 20px", minHeight: "100vh" },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#7A7268",
    fontSize: 14,
    cursor: "pointer",
    fontFamily: sans,
    padding: "4px 0",
  },
  counter: { fontSize: 13, color: "#9A9288", fontFamily: font },
  starBtn: {
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    transition: "all 0.2s",
    padding: "4px",
  },
  progressBar: {
    width: "100%",
    height: 2,
    background: "#E8E2D8",
    borderRadius: 1,
    marginBottom: 28,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#2B5F8A",
    borderRadius: 1,
    transition: "width 0.4s ease",
  },

  wordCard: {
    background: "rgba(255,253,248,0.7)",
    borderRadius: 12,
    padding: "36px 24px 28px",
    textAlign: "center",
    boxShadow: "0 1px 8px rgba(58,53,48,0.06)",
    border: "1px solid rgba(216,208,196,0.5)",
    marginBottom: 20,
  },
  wordMain: {
    fontFamily: font,
    fontSize: 38,
    fontWeight: 400,
    color: "#2A2520",
    letterSpacing: "-1px",
    marginBottom: 6,
    lineHeight: 1.2,
  },
  wordPron: {
    fontFamily: font,
    fontSize: 15,
    fontStyle: "italic",
    color: "#8A8078",
    marginBottom: 24,
  },
  revealBtn: {
    padding: "12px 40px",
    background: "transparent",
    border: "1px solid #C8C0B4",
    borderRadius: 24,
    color: "#6A6258",
    fontSize: 14,
    cursor: "pointer",
    fontFamily: sans,
    transition: "all 0.2s",
    letterSpacing: "1px",
  },

  detailArea: { textAlign: "left" },
  meaningBox: {
    background: "rgba(43,95,138,0.04)",
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 16,
    borderLeft: "2px solid #2B5F8A",
  },
  sectionTag: {
    fontSize: 10,
    fontWeight: 600,
    color: "#9A9288",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  meaningText: { fontSize: 15, lineHeight: 1.7, color: "#3A3530" },

  tagRow: { display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 12 },
  tagLabel: {
    fontSize: 11,
    color: "#9A9288",
    fontWeight: 500,
    minWidth: 36,
    letterSpacing: "1px",
  },
  synTag: {
    fontSize: 12,
    background: "rgba(107,123,58,0.1)",
    color: "#5A6B3A",
    padding: "3px 10px",
    borderRadius: 12,
    border: "1px solid rgba(107,123,58,0.2)",
  },
  antTag: {
    fontSize: 12,
    background: "rgba(155,77,90,0.08)",
    color: "#8B4050",
    padding: "3px 10px",
    borderRadius: 12,
    border: "1px solid rgba(155,77,90,0.15)",
  },

  exampleBox: {
    background: "rgba(123,74,141,0.03)",
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 12,
    borderLeft: "2px solid #7B4A8D",
  },
  exampleText: {
    fontSize: 13,
    lineHeight: 1.7,
    color: "#5A5348",
    fontStyle: "italic",
    fontFamily: font,
    marginBottom: 6,
  },
  etymBox: {
    background: "rgba(155,77,90,0.03)",
    borderRadius: 8,
    padding: "14px 16px",
    borderLeft: "2px solid #9B4D5A",
  },
  etymText: { fontSize: 13, lineHeight: 1.6, color: "#6A6258" },

  learnActions: {
    display: "flex",
    gap: 12,
  },
  knowBtn: {
    flex: 1,
    padding: "14px",
    background: "#6B7B3A",
    color: "#F5F0E8",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: sans,
  },
  dontKnowBtn: {
    flex: 1,
    padding: "14px",
    background: "transparent",
    color: "#9B4D5A",
    border: "1px solid #9B4D5A",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: sans,
  },

  /* QUIZ */
  quizOptions: { display: "flex", flexDirection: "column", gap: 10, marginTop: 24, textAlign: "left" },
  quizOption: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 16px",
    background: "transparent",
    border: "1px solid #D8D0C4",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: sans,
    fontSize: 14,
    lineHeight: 1.5,
    transition: "all 0.2s",
    textAlign: "left",
  },
  optionNum: {
    fontFamily: font,
    fontSize: 16,
    fontWeight: 500,
    color: "#9A9288",
    minWidth: 20,
    marginTop: 1,
  },
  optionText: { flex: 1, color: "#4A4035" },
  nextQuizBtn: {
    marginTop: 20,
    padding: "14px 32px",
    background: "#7B4A8D",
    color: "#F5F0E8",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: sans,
    width: "100%",
  },

  /* RESULT */
  resultContainer: {
    padding: "60px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    justifyContent: "center",
  },
  resultCircle: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    border: "3px solid #7B4A8D",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  resultScore: { fontFamily: font, fontSize: 48, fontWeight: 300, color: "#7B4A8D" },
  resultTotal: { fontFamily: font, fontSize: 18, color: "#9A9288" },
  resultTitle: { fontFamily: sans, fontSize: 22, fontWeight: 500, color: "#3A3530", marginBottom: 8 },
  resultSub: { fontSize: 14, color: "#7A7268", textAlign: "center", lineHeight: 1.6 },

  /* REVIEW */
  reviewContainer: { padding: "16px 20px", minHeight: "100vh" },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,253,248,0.7)",
    border: "1px solid #D8D0C4",
    borderRadius: 8,
    padding: "10px 14px",
    marginBottom: 16,
  },
  searchIcon: { fontSize: 16, opacity: 0.5 },
  searchInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontSize: 14,
    fontFamily: sans,
    color: "#3A3530",
    outline: "none",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#9A9288",
    fontSize: 16,
    cursor: "pointer",
    padding: 4,
  },

  searchResults: {
    background: "rgba(43,95,138,0.03)",
    border: "1px solid rgba(43,95,138,0.1)",
    borderRadius: 8,
    padding: "8px 0",
    marginBottom: 16,
    maxHeight: 200,
    overflowY: "auto",
  },
  searchResultsTitle: {
    fontSize: 11,
    color: "#2B5F8A",
    fontWeight: 600,
    letterSpacing: "1px",
    padding: "4px 14px 8px",
  },
  searchResultItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
    gap: 8,
    borderBottom: "1px solid rgba(216,208,196,0.3)",
  },
  srWord: { fontFamily: font, fontSize: 15, fontWeight: 500, marginRight: 8, color: "#3A3530" },
  srMeaning: { fontSize: 12, color: "#7A7268" },
  miniStar: {
    background: "none",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    padding: 2,
    transition: "all 0.2s",
  },

  bookmarkList: { display: "flex", flexDirection: "column", gap: 8 },
  reviewCard: {
    background: "rgba(255,253,248,0.7)",
    border: "1px solid rgba(216,208,196,0.5)",
    borderRadius: 8,
    overflow: "hidden",
  },
  reviewCardHeader: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px",
    cursor: "pointer",
    gap: 8,
  },
  reviewWord: { fontFamily: font, fontSize: 18, fontWeight: 500, color: "#2A2520", marginRight: 10 },
  reviewPron: { fontFamily: font, fontSize: 13, fontStyle: "italic", color: "#9A9288" },
  chevron: {
    fontSize: 20,
    color: "#B0A99A",
    transition: "transform 0.2s",
    fontFamily: "monospace",
  },
  reviewDetail: { padding: "0 16px 16px" },
  reviewMeaning: { fontSize: 14, lineHeight: 1.7, color: "#4A4035", marginBottom: 12 },
  reviewExample: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#6A6258",
    fontStyle: "italic",
    fontFamily: font,
    marginBottom: 4,
  },

  emptyState: { textAlign: "center", padding: "60px 20px" },
  emptyIcon: { fontSize: 40, color: "#D8D0C4", marginBottom: 16 },
  emptyText: { fontSize: 14, color: "#9A9288", lineHeight: 1.8, whiteSpace: "pre-line" },
};

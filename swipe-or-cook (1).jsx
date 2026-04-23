import { useState, useEffect } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const DINING_HALL_MENUS = {
  lunch: {
    period: "Lunch",
    time: "11am – 2pm",
    stations: [
      {
        name: "Grill",
        items: [
          { name: "Grilled Chicken Bowl", desc: "herb-marinated chicken thigh over cilantro-lime rice with black beans & roasted corn", protein: 38, cal: 520, tags: ["high-protein", "balanced"] },
          { name: "BBQ Bacon Cheeseburger", desc: "1/3 lb patty, cheddar, applewood bacon, brioche bun", protein: 32, cal: 680, tags: ["heavy"] },
        ],
      },
      {
        name: "Global Kitchen",
        items: [
          { name: "Tofu Teriyaki Stir-Fry", desc: "crispy tofu, broccoli, snap peas, brown rice", protein: 22, cal: 440, tags: ["vegan", "balanced", "energy"] },
          { name: "Chicken Tikka Masala", desc: "tender chicken in creamy tomato sauce, basmati rice, naan", protein: 30, cal: 590, tags: ["high-protein"] },
        ],
      },
      {
        name: "Salad Bar",
        items: [
          { name: "Build-Your-Own Power Bowl", desc: "greens, grilled chicken, quinoa, chickpeas, feta, lemon tahini", protein: 35, cal: 480, tags: ["high-protein", "balanced", "energy"] },
        ],
      },
      {
        name: "Comfort",
        items: [
          { name: "Mac & Cheese", desc: "four-cheese baked mac, breadcrumb top", protein: 14, cal: 620, tags: ["heavy", "comfort"] },
          { name: "Pepperoni Pizza (2 slices)", desc: "classic pepperoni on thin crust", protein: 18, cal: 540, tags: ["heavy"] },
        ],
      },
    ],
  },
  dinner: {
    period: "Dinner",
    time: "5pm – 9pm",
    stations: [
      {
        name: "Grill",
        items: [
          { name: "Salmon Fillet", desc: "pan-seared atlantic salmon, roasted sweet potato, steamed asparagus", protein: 42, cal: 510, tags: ["high-protein", "balanced", "energy", "omega-3"] },
          { name: "Philly Cheesesteak", desc: "shaved steak, provolone, peppers & onions, hoagie roll", protein: 28, cal: 640, tags: ["heavy"] },
        ],
      },
      {
        name: "Global Kitchen",
        items: [
          { name: "Veggie Pad Thai", desc: "rice noodles, tofu, crushed peanuts, lime", protein: 16, cal: 480, tags: ["vegan", "energy"] },
          { name: "Beef Bulgogi Bowl", desc: "marinated beef, pickled veg, steamed rice, gochujang", protein: 34, cal: 550, tags: ["high-protein", "balanced"] },
        ],
      },
      {
        name: "Comfort",
        items: [
          { name: "Chicken Tenders & Fries", desc: "breaded tenders, seasoned fries, honey mustard", protein: 24, cal: 700, tags: ["heavy", "comfort"] },
        ],
      },
    ],
  },
};

const COOK_RECIPES = [
  {
    name: "Garlic Butter Chicken & Rice",
    time: "20 min",
    cost: "$4.80",
    costNum: 4.8,
    store: "Target on University Ave",
    protein: 36,
    cal: 490,
    tags: ["high-protein", "balanced", "energy"],
    ingredients: ["chicken breast ($2.50)", "instant rice ($0.80)", "butter ($0.50)", "garlic ($0.30)", "frozen broccoli ($0.70)"],
    steps: ["Season & pan-sear chicken breast 6 min per side", "Microwave instant rice", "Melt butter + minced garlic, pour over chicken", "Microwave broccoli, plate everything together"],
    vibe: "honestly better than most dining hall chicken",
  },
  {
    name: "Loaded Black Bean Quesadilla",
    time: "12 min",
    cost: "$3.20",
    costNum: 3.2,
    store: "Target on University Ave",
    protein: 24,
    cal: 420,
    tags: ["balanced", "budget", "vegetarian"],
    ingredients: ["flour tortillas ($0.60)", "canned black beans ($0.80)", "shredded cheese ($0.90)", "salsa ($0.50)", "frozen corn ($0.40)"],
    steps: ["Drain & mash half the black beans", "Layer beans, corn, cheese on tortilla, fold", "Pan-fry 3 min per side until crispy", "Top with salsa, eat immediately"],
    vibe: "crunchy, filling, costs less than a coffee",
  },
  {
    name: "Peanut Noodle Bowl",
    time: "15 min",
    cost: "$3.50",
    costNum: 3.5,
    store: "Target on University Ave",
    protein: 18,
    cal: 460,
    tags: ["vegan", "energy", "budget"],
    ingredients: ["ramen noodles - just the noodle ($0.30)", "peanut butter ($0.80)", "soy sauce ($0.40)", "frozen edamame ($1.20)", "sriracha ($0.30)", "lime ($0.50)"],
    steps: ["Boil ramen noodles (toss the packet)", "Mix peanut butter + soy sauce + sriracha + lime juice", "Microwave edamame", "Toss noodles in sauce, top with edamame"],
    vibe: "restaurant-level flavor for pocket change",
  },
  {
    name: "Egg Fried Rice",
    time: "15 min",
    cost: "$2.90",
    costNum: 2.9,
    store: "Target on University Ave",
    protein: 20,
    cal: 410,
    tags: ["budget", "energy", "balanced"],
    ingredients: ["eggs x3 ($0.90)", "instant rice ($0.80)", "frozen peas & carrots ($0.60)", "soy sauce ($0.30)", "sesame oil ($0.30)"],
    steps: ["Microwave rice, let it cool a bit", "Scramble eggs in hot pan, set aside", "Stir-fry frozen veg 2 min, add rice on high heat", "Add soy sauce + sesame oil, toss in eggs"],
    vibe: "the classic broke-but-eating-well move",
  },
  {
    name: "Mediterranean Tuna Wrap",
    time: "8 min",
    cost: "$4.10",
    costNum: 4.1,
    store: "Target on University Ave",
    protein: 32,
    cal: 380,
    tags: ["high-protein", "balanced", "budget"],
    ingredients: ["canned tuna ($1.50)", "flour tortilla ($0.60)", "hummus ($0.80)", "cucumber ($0.50)", "feta crumbles ($0.70)"],
    steps: ["Drain tuna, mix with a squeeze of lemon if you have it", "Spread hummus on tortilla", "Layer tuna, sliced cucumber, feta", "Wrap tight, eat with one hand like a boss"],
    vibe: "meal prep energy without the meal prep",
  },
];

const SWIPE_MESSAGES = [
  "dining hall's going off today 🔥",
  "they cooked (literally)",
  "this is a swipe-worthy day fr",
  "the menu actually looks good??",
  "rare dining hall W incoming",
];

const COOK_MESSAGES = [
  "save that swipe — here's a better move 🍳",
  "dining hall menu is mid today, cook instead",
  "your kitchen > their kitchen tonight",
  "skip it, you can do better for cheaper",
  "swipe not worth it today tbh",
];

const GOAL_MAP = {
  protein: { label: "Eat more protein", tags: ["high-protein"], icon: "💪" },
  energy: { label: "Stop feeling sluggish after lunch", tags: ["energy", "balanced"], icon: "⚡" },
  balanced: { label: "Eat more balanced meals", tags: ["balanced"], icon: "🥗" },
  budget: { label: "Spend less on food", tags: ["budget"], icon: "💰" },
  workout: { label: "Fuel for workouts", tags: ["high-protein", "energy"], icon: "🏋️" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMealPeriod() {
  const h = new Date().getHours();
  if (h < 15) return "lunch";
  return "dinner";
}

function scoreItem(item, goalTags) {
  let s = 0;
  for (const t of goalTags) {
    if (item.tags.includes(t)) s += 2;
  }
  if (item.protein >= 30) s += 1;
  if (item.tags.includes("heavy")) s -= 1;
  return s;
}

function getVerdict(goal) {
  const period = getMealPeriod();
  const menu = DINING_HALL_MENUS[period];
  const goalTags = GOAL_MAP[goal]?.tags || ["balanced"];

  const allItems = menu.stations.flatMap((s) =>
    s.items.map((i) => ({ ...i, station: s.name }))
  );

  const scored = allItems
    .map((i) => ({ ...i, score: scoreItem(i, goalTags) }))
    .sort((a, b) => b.score - a.score);
  const bestItem = scored[0];
  const bestScore = bestItem?.score || 0;

  const cookScored = COOK_RECIPES.map((r) => ({
    ...r,
    score: r.tags.reduce((s, t) => s + (goalTags.includes(t) ? 2 : 0), 0) + (goal === "budget" ? 2 : 0),
  })).sort((a, b) => b.score - a.score);
  const bestRecipe = cookScored[0];

  const shouldSwipe = bestScore >= 3;

  return {
    shouldSwipe,
    period: menu.period,
    time: menu.time,
    topPick: bestItem,
    recipe: bestRecipe,
    message: shouldSwipe
      ? SWIPE_MESSAGES[Math.floor(Math.random() * SWIPE_MESSAGES.length)]
      : COOK_MESSAGES[Math.floor(Math.random() * COOK_MESSAGES.length)],
    menu,
  };
}

// ─── Components ──────────────────────────────────────────────────────────────

function GoalPicker({ current, onChange }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button style={styles.goalToggle} onClick={() => setOpen(true)}>
        {GOAL_MAP[current].icon} {GOAL_MAP[current].label}
        <span style={styles.goalToggleHint}>tap to change</span>
      </button>
    );
  }

  return (
    <div style={styles.goalPicker}>
      {Object.entries(GOAL_MAP).map(([key, val]) => (
        <button
          key={key}
          style={{
            ...styles.goalOption,
            ...(current === key ? styles.goalOptionActive : {}),
          }}
          onClick={() => { onChange(key); setOpen(false); }}
        >
          <span>{val.icon}</span> {val.label}
        </button>
      ))}
    </div>
  );
}

function SwipeCard({ verdict, onShowDetails, onShowRecipe, onShowMenu, animKey }) {
  const { shouldSwipe, period, time, topPick, recipe, message } = verdict;
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [animKey]);

  return (
    <>
      {/* Verdict Card */}
      <div
        style={{
          ...styles.verdictCard,
          background: shouldSwipe
            ? "linear-gradient(135deg, #FF7F6E 0%, #FFA07A 100%)"
            : "linear-gradient(135deg, #5B8A72 0%, #7AB89B 100%)",
          transform: entered ? "translateY(0)" : "translateY(30px)",
          opacity: entered ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div style={styles.verdictType}>
          {shouldSwipe ? "🍽️ swipe today" : "🍳 cook tonight"}
        </div>
        <div style={styles.verdictMessage}>{message}</div>

        {shouldSwipe ? (
          <>
            <div style={styles.verdictPick}>
              <div style={styles.pickName}>{topPick.name}</div>
              <div style={styles.pickStation}>from the {topPick.station} station</div>
            </div>
            <button style={styles.detailsBtn} onClick={onShowDetails}>
              why this? + meal details →
            </button>
          </>
        ) : (
          <>
            <div style={styles.verdictPick}>
              <div style={styles.pickName}>{recipe.name}</div>
              <div style={styles.pickStation}>
                {recipe.time} · {recipe.cost} · {recipe.store}
              </div>
            </div>
            <button style={styles.detailsBtn} onClick={onShowRecipe}>
              see recipe →
            </button>
          </>
        )}
      </div>

      {/* Secondary action */}
      <div
        style={{
          ...styles.altSection,
          opacity: entered ? 1 : 0,
          transition: "opacity 0.3s ease 0.2s",
        }}
      >
        {shouldSwipe ? (
          <button style={styles.altBtn} onClick={onShowRecipe}>
            🍳 rather cook? here's a backup for {recipe.cost}
          </button>
        ) : (
          <button style={styles.altBtn} onClick={onShowMenu}>
            🍽️ still wanna check the menu?
          </button>
        )}
      </div>

      {/* Quick context */}
      <div
        style={{
          ...styles.contextCard,
          opacity: entered ? 1 : 0,
          transition: "opacity 0.3s ease 0.3s",
        }}
      >
        <div style={styles.contextTitle}>today's dining hall vibe</div>
        <div style={styles.contextItems}>
          {verdict.menu.stations.map((s) => (
            <div key={s.name} style={styles.contextStation}>
              <span style={styles.contextStationName}>{s.name}:</span>{" "}
              {s.items.map((i) => i.name).join(", ")}
            </div>
          ))}
        </div>
        <button style={styles.menuLink} onClick={onShowMenu}>
          see full menu with scores →
        </button>
      </div>
    </>
  );
}

function MealDetail({ item, onBack }) {
  return (
    <div style={styles.detailPage}>
      <button style={styles.backBtn} onClick={onBack}>← back</button>
      <h2 style={styles.detailTitle}>{item.name}</h2>
      <p style={styles.detailDesc}>{item.desc}</p>
      <div style={styles.detailStats}>
        <div style={styles.statBox}>
          <div style={styles.statNum}>{item.protein}g</div>
          <div style={styles.statLabel}>protein</div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statNum}>{item.cal}</div>
          <div style={styles.statLabel}>calories</div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statNum}>{item.station}</div>
          <div style={styles.statLabel}>station</div>
        </div>
      </div>
      <div style={styles.detailTip}>
        <strong>pro tip:</strong> grab a side salad or fruit to round this out. dining hall salad bar is free with your swipe.
      </div>
    </div>
  );
}

function RecipeDetail({ recipe, onBack }) {
  return (
    <div style={styles.detailPage}>
      <button style={styles.backBtn} onClick={onBack}>← back</button>
      <h2 style={styles.detailTitle}>{recipe.name}</h2>
      <div style={styles.recipeMeta}>
        <span style={styles.recipeTag}>⏱ {recipe.time}</span>
        <span style={styles.recipeTag}>💵 {recipe.cost}</span>
        <span style={styles.recipeTag}>💪 {recipe.protein}g protein</span>
      </div>
      <p style={styles.recipeVibe}>"{recipe.vibe}"</p>

      <div style={styles.recipeSection}>
        <h3 style={styles.recipeSectionTitle}>grab from {recipe.store}</h3>
        {recipe.ingredients.map((ing, i) => (
          <div key={i} style={styles.ingredientRow}>
            <span style={styles.ingredientDot}>•</span> {ing}
          </div>
        ))}
      </div>

      <div style={styles.recipeSection}>
        <h3 style={styles.recipeSectionTitle}>how to make it</h3>
        {recipe.steps.map((step, i) => (
          <div key={i} style={styles.stepRow}>
            <span style={styles.stepNum}>{i + 1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div style={styles.detailTip}>
        <strong>math check:</strong> a dining hall swipe costs ~$12-15. this meal is {recipe.cost}. that's ${(14 - recipe.costNum).toFixed(2)} saved. 🧠
      </div>
    </div>
  );
}

function FullMenu({ verdict, goal, onBack, onSelectItem }) {
  const goalTags = GOAL_MAP[goal]?.tags || ["balanced"];
  return (
    <div style={styles.detailPage}>
      <button style={styles.backBtn} onClick={onBack}>← back</button>
      <h2 style={styles.detailTitle}>{verdict.period} Menu</h2>
      <p style={styles.detailDesc}>scored against your goal: {GOAL_MAP[goal]?.label}</p>
      {verdict.menu.stations.map((station) => (
        <div key={station.name} style={styles.menuStation}>
          <h3 style={styles.menuStationName}>{station.name}</h3>
          {station.items.map((item) => {
            const s = scoreItem(item, goalTags);
            const isTop = item.name === verdict.topPick?.name;
            return (
              <button
                key={item.name}
                style={{
                  ...styles.menuItem,
                  ...(isTop ? styles.menuItemTop : {}),
                }}
                onClick={() => onSelectItem({ ...item, station: station.name })}
              >
                <div style={styles.menuItemHeader}>
                  <span style={styles.menuItemName}>
                    {isTop && "⭐ "}{item.name}
                  </span>
                  <span style={styles.menuItemScore}>
                    {s >= 3 ? "great pick" : s >= 1 ? "decent" : "meh"}
                  </span>
                </div>
                <div style={styles.menuItemDesc}>{item.desc}</div>
                <div style={styles.menuItemMeta}>{item.protein}g protein</div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [goal, setGoal] = useState("protein");
  const [verdict, setVerdict] = useState(() => getVerdict("protein"));
  const [detailItem, setDetailItem] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [homeKey, setHomeKey] = useState(0);

  const handleGoalChange = (newGoal) => {
    setGoal(newGoal);
    setVerdict(getVerdict(newGoal));
    setHomeKey((k) => k + 1);
  };

  const navigateHome = () => {
    setDetailItem(null);
    setShowRecipe(false);
    setShowMenu(false);
    setHomeKey((k) => k + 1);
  };

  const isHome = !detailItem && !showRecipe && !showMenu;

  return (
    <div style={styles.app}>
      <div style={styles.phone}>
        {isHome && (
          <div style={styles.homeWrap}>
            {/* Header */}
            <div style={styles.homeHeader}>
              <span style={styles.periodLabel}>{verdict.period}</span>
              <span style={styles.timeLabel}> · {verdict.time}</span>
            </div>

            {/* Goal picker */}
            <GoalPicker current={goal} onChange={handleGoalChange} />

            {/* Verdict + context */}
            <SwipeCard
              verdict={verdict}
              animKey={homeKey}
              onShowDetails={() => setDetailItem(verdict.topPick)}
              onShowRecipe={() => setShowRecipe(true)}
              onShowMenu={() => setShowMenu(true)}
            />
          </div>
        )}

        {detailItem && (
          <MealDetail item={detailItem} onBack={navigateHome} />
        )}

        {showRecipe && verdict && (
          <RecipeDetail recipe={verdict.recipe} onBack={navigateHome} />
        )}

        {showMenu && verdict && (
          <FullMenu
            verdict={verdict}
            goal={goal}
            onBack={navigateHome}
            onSelectItem={(item) => {
              setShowMenu(false);
              setDetailItem(item);
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const CORAL = "#FF7F6E";
const SAGE = "#5B8A72";
const CHARCOAL = "#2D2D2D";
const WARM_BG = "#FBF8F4";
const CARD_BG = "#FFFFFF";
const MUTED = "#8E8E93";

const styles = {
  app: {
    minHeight: "100vh",
    background: "#E8E4DE",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "12px 0",
    fontFamily: "'Nunito', 'Quicksand', -apple-system, sans-serif",
  },
  phone: {
    width: "100%",
    maxWidth: 420,
    minHeight: "calc(100vh - 24px)",
    background: WARM_BG,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },

  // Home
  homeWrap: {
    padding: "20px 20px 40px",
  },
  homeHeader: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: 14,
  },
  periodLabel: {
    fontSize: 18,
    fontWeight: 800,
    color: CHARCOAL,
    textTransform: "lowercase",
  },
  timeLabel: {
    fontSize: 14,
    color: MUTED,
    fontWeight: 600,
  },

  // Goal picker
  goalToggle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    padding: "12px 16px",
    border: `2px solid #E0DCD6`,
    borderRadius: 14,
    background: CARD_BG,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    color: CHARCOAL,
    fontFamily: "inherit",
    textAlign: "left",
    marginBottom: 16,
  },
  goalToggleHint: {
    marginLeft: "auto",
    fontSize: 12,
    color: MUTED,
    fontWeight: 500,
  },
  goalPicker: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 16,
  },
  goalOption: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    border: `2px solid #E0DCD6`,
    borderRadius: 14,
    background: CARD_BG,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    color: CHARCOAL,
    fontFamily: "inherit",
    textAlign: "left",
    transition: "all 0.15s ease",
  },
  goalOptionActive: {
    borderColor: CORAL,
    background: "#FFF5F3",
  },

  // Verdict card
  verdictCard: {
    borderRadius: 24,
    padding: "28px 24px 22px",
    color: "#fff",
    marginBottom: 16,
  },
  verdictType: {
    fontSize: 14,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    opacity: 0.9,
    marginBottom: 6,
  },
  verdictMessage: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1.25,
    marginBottom: 20,
  },
  verdictPick: {
    background: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    padding: "16px",
    marginBottom: 14,
    backdropFilter: "blur(10px)",
  },
  pickName: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 4,
  },
  pickStation: {
    fontSize: 13,
    opacity: 0.85,
    fontWeight: 600,
  },
  detailsBtn: {
    background: "rgba(255,255,255,0.25)",
    border: "none",
    borderRadius: 12,
    padding: "12px 18px",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    width: "100%",
    textAlign: "center",
  },

  // Alt section
  altSection: {
    marginBottom: 16,
  },
  altBtn: {
    width: "100%",
    padding: "16px",
    border: `2px dashed #D4D0C9`,
    borderRadius: 16,
    background: "transparent",
    color: CHARCOAL,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "center",
  },

  // Context card
  contextCard: {
    background: CARD_BG,
    borderRadius: 20,
    padding: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  contextTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  contextItems: {
    marginBottom: 12,
  },
  contextStation: {
    fontSize: 14,
    color: CHARCOAL,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  contextStationName: {
    fontWeight: 800,
  },
  menuLink: {
    background: "none",
    border: "none",
    color: CORAL,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
  },

  // Detail pages
  detailPage: {
    padding: "20px 20px 40px",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: CORAL,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    padding: "8px 0",
    marginBottom: 12,
    fontFamily: "inherit",
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: 800,
    color: CHARCOAL,
    margin: "0 0 8px",
    lineHeight: 1.2,
  },
  detailDesc: {
    fontSize: 15,
    color: MUTED,
    lineHeight: 1.5,
    margin: "0 0 24px",
    fontWeight: 500,
  },
  detailStats: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    background: CARD_BG,
    borderRadius: 16,
    padding: "16px 12px",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  statNum: {
    fontSize: 22,
    fontWeight: 800,
    color: CHARCOAL,
  },
  statLabel: {
    fontSize: 12,
    color: MUTED,
    fontWeight: 600,
    marginTop: 2,
  },
  detailTip: {
    background: "#FFF8E7",
    borderRadius: 16,
    padding: "16px",
    fontSize: 14,
    color: CHARCOAL,
    lineHeight: 1.5,
    fontWeight: 500,
  },

  // Recipe
  recipeMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  recipeTag: {
    fontSize: 13,
    fontWeight: 700,
    background: "#EDEAE5",
    padding: "6px 12px",
    borderRadius: 100,
    color: CHARCOAL,
  },
  recipeVibe: {
    fontSize: 16,
    fontStyle: "italic",
    color: SAGE,
    fontWeight: 600,
    margin: "0 0 24px",
  },
  recipeSection: {
    marginBottom: 24,
  },
  recipeSectionTitle: {
    fontSize: 14,
    fontWeight: 800,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    margin: "0 0 12px",
  },
  ingredientRow: {
    fontSize: 15,
    color: CHARCOAL,
    padding: "6px 0",
    fontWeight: 500,
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  },
  ingredientDot: {
    color: CORAL,
    fontWeight: 800,
  },
  stepRow: {
    display: "flex",
    gap: 14,
    padding: "10px 0",
    fontSize: 15,
    color: CHARCOAL,
    lineHeight: 1.5,
    fontWeight: 500,
  },
  stepNum: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    background: SAGE,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 800,
    flexShrink: 0,
  },

  // Full menu
  menuStation: {
    marginBottom: 24,
  },
  menuStationName: {
    fontSize: 14,
    fontWeight: 800,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    margin: "0 0 10px",
  },
  menuItem: {
    display: "block",
    width: "100%",
    background: CARD_BG,
    border: `2px solid #EDEAE5`,
    borderRadius: 16,
    padding: "14px 16px",
    marginBottom: 8,
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    transition: "border-color 0.15s ease",
  },
  menuItemTop: {
    borderColor: CORAL,
    background: "#FFF9F7",
  },
  menuItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 15,
    fontWeight: 800,
    color: CHARCOAL,
  },
  menuItemScore: {
    fontSize: 12,
    fontWeight: 700,
    color: SAGE,
  },
  menuItemDesc: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.4,
    fontWeight: 500,
  },
  menuItemMeta: {
    fontSize: 12,
    color: CORAL,
    fontWeight: 700,
    marginTop: 6,
  },
};

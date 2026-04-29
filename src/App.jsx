import { useState, useEffect } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────

const T = {
  bg: "#fff8f6",
  onBg: "#211a17",
  primary: "#924b25",
  onPrimary: "#ffffff",
  primaryContainer: "#e08a5e",
  secondary: "#40674d",
  onSecondary: "#ffffff",
  secondaryContainer: "#bfeaca",
  onSecondaryContainer: "#446b51",
  surfaceLowest: "#ffffff",
  surfaceLow: "#fff1eb",
  surface: "#faebe5",
  surfaceHigh: "#f4e5df",
  surfaceHighest: "#efdfd9",
  onSurface: "#211a17",
  onSurfaceVariant: "#54433c",
  outline: "#87736a",
  outlineVariant: "#d9c2b8",
  sageGrad: "linear-gradient(135deg, #7FA88B 0%, #A5C2A0 100%)",
  terracottaGrad: "linear-gradient(135deg, #E08A5E 0%, #D4734A 100%)",
  font: "'Plus Jakarta Sans', -apple-system, sans-serif",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DINING_HALL_MENUS = {
  lunch: {
    period: "Lunch",
    time: "11am – 2pm",
    stations: [
      {
        name: "The Grill",
        icon: "restaurant",
        items: [
          { name: "Grilled Chicken Bowl", desc: "herb-marinated chicken thigh over cilantro-lime rice with black beans & roasted corn", protein: 38, carbs: 45, fats: 12, cal: 520, tags: ["high-protein", "balanced"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop" },
          { name: "BBQ Bacon Cheeseburger", desc: "1/3 lb patty, cheddar, applewood bacon, brioche bun", protein: 32, carbs: 42, fats: 28, cal: 680, tags: ["heavy"], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop" },
        ],
      },
      {
        name: "Global Kitchen",
        icon: "public",
        items: [
          { name: "Tofu Teriyaki Stir-Fry", desc: "crispy tofu, broccoli, snap peas, brown rice", protein: 22, carbs: 55, fats: 12, cal: 440, tags: ["vegan", "balanced", "energy"], image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=600&h=450&fit=crop" },
          { name: "Chicken Tikka Masala", desc: "tender chicken in creamy tomato sauce, basmati rice, naan", protein: 30, carbs: 48, fats: 18, cal: 590, tags: ["high-protein"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=450&fit=crop" },
        ],
      },
      {
        name: "Salad Bar",
        icon: "eco",
        items: [
          { name: "Build-Your-Own Power Bowl", desc: "greens, grilled chicken, quinoa, chickpeas, feta, lemon tahini", protein: 35, carbs: 40, fats: 15, cal: 480, tags: ["high-protein", "balanced", "energy"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop" },
        ],
      },
      {
        name: "Comfort",
        icon: "dinner_dining",
        items: [
          { name: "Mac & Cheese", desc: "four-cheese baked mac, breadcrumb top", protein: 14, carbs: 72, fats: 22, cal: 620, tags: ["heavy", "comfort"], image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=450&fit=crop" },
          { name: "Pepperoni Pizza (2 slices)", desc: "classic pepperoni on thin crust", protein: 18, carbs: 52, fats: 20, cal: 540, tags: ["heavy"], image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=600&h=450&fit=crop" },
        ],
      },
    ],
  },
  dinner: {
    period: "Dinner",
    time: "5pm – 9pm",
    stations: [
      {
        name: "The Grill",
        icon: "restaurant",
        items: [
          { name: "Salmon Fillet", desc: "pan-seared atlantic salmon, roasted sweet potato, steamed asparagus", protein: 42, carbs: 35, fats: 18, cal: 510, tags: ["high-protein", "balanced", "energy"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop" },
          { name: "Philly Cheesesteak", desc: "shaved steak, provolone, peppers & onions, hoagie roll", protein: 28, carbs: 44, fats: 22, cal: 640, tags: ["heavy"], image: "https://images.unsplash.com/photo-1555939594-58d7cb561581?w=600&h=450&fit=crop" },
        ],
      },
      {
        name: "Global Kitchen",
        icon: "public",
        items: [
          { name: "Veggie Pad Thai", desc: "rice noodles, tofu, crushed peanuts, lime", protein: 16, carbs: 65, fats: 12, cal: 480, tags: ["vegan", "energy"], image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=600&h=450&fit=crop" },
          { name: "Beef Bulgogi Bowl", desc: "marinated beef, pickled veg, steamed rice, gochujang", protein: 34, carbs: 50, fats: 14, cal: 550, tags: ["high-protein", "balanced"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop" },
        ],
      },
      {
        name: "Comfort",
        icon: "dinner_dining",
        items: [
          { name: "Chicken Tenders & Fries", desc: "breaded tenders, seasoned fries, honey mustard", protein: 24, carbs: 58, fats: 28, cal: 700, tags: ["heavy", "comfort"], image: "https://images.unsplash.com/photo-1573871556308-be91247ead0a?w=600&h=450&fit=crop" },
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
    restaurantPrice: 13,
    store: "Target on University Ave",
    protein: 36, carbs: 46, fats: 14,
    cal: 490,
    tags: ["high-protein", "balanced", "energy"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=450&fit=crop",
    pkgNote: "Packages cover 2–3 meals",
    ingredients: [
      { name: "Chicken Breast (1 lb)", price: "$4.99", qty: "5 oz" },
      { name: "Instant Rice (8-srv box)", price: "$2.49", qty: "1 cup cooked" },
      { name: "Butter (1 lb, 4 sticks)", price: "$3.89", qty: "1 tbsp" },
      { name: "Minced Garlic (jar)", price: "$2.79", qty: "1 tsp" },
      { name: "Frozen Broccoli (12 oz)", price: "$2.29", qty: "1 cup" },
    ],
    steps: [
      "Season & pan-sear chicken breast 6 min per side until golden.",
      "Microwave instant rice according to package.",
      "Melt butter with minced garlic in the same pan, pour over chicken.",
      "Microwave broccoli, plate everything and dig in.",
    ],
    vibe: "High-protein option with minimal ingredients",
  },
  {
    name: "Loaded Black Bean Quesadilla",
    time: "12 min",
    cost: "$3.20",
    costNum: 3.2,
    restaurantPrice: 10,
    store: "Target on University Ave",
    protein: 24, carbs: 48, fats: 14,
    cal: 420,
    tags: ["balanced", "budget", "vegetarian"],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=450&fit=crop",
    pkgNote: "Packages cover 3–4 meals",
    ingredients: [
      { name: "Flour Tortillas (10-ct bag)", price: "$3.49", qty: "1 large tortilla" },
      { name: "Canned Black Beans (15 oz)", price: "$1.29", qty: "½ cup" },
      { name: "Shredded Cheese (8 oz bag)", price: "$3.49", qty: "¼ cup (1 oz)" },
      { name: "Salsa (16 oz jar)", price: "$3.99", qty: "3 tbsp" },
      { name: "Frozen Corn (12 oz bag)", price: "$1.79", qty: "¼ cup" },
    ],
    steps: [
      "Drain & mash half the black beans.",
      "Layer beans, corn, cheese on tortilla, fold in half.",
      "Pan-fry 3 min per side until crispy and golden.",
      "Top with salsa, eat while hot.",
    ],
    vibe: "Budget-friendly meal that's filling and balanced",
  },
  {
    name: "Peanut Noodle Bowl",
    time: "15 min",
    cost: "$3.50",
    costNum: 3.5,
    restaurantPrice: 12,
    store: "Target on University Ave",
    protein: 18, carbs: 58, fats: 15,
    cal: 460,
    tags: ["vegan", "energy", "budget"],
    image: "https://images.unsplash.com/photo-1610554666975-339e1f736bc8?w=600&h=450&fit=crop",
    pkgNote: "Packages cover 4–6 meals",
    ingredients: [
      { name: "Ramen Noodles (6-pack)", price: "$2.99", qty: "1 packet (noodles only)" },
      { name: "Peanut Butter (16 oz jar)", price: "$4.49", qty: "1½ tbsp" },
      { name: "Soy Sauce (10 oz bottle)", price: "$2.49", qty: "1 tbsp" },
      { name: "Frozen Edamame (12 oz)", price: "$2.99", qty: "½ cup shelled" },
      { name: "Sriracha (17 oz bottle)", price: "$3.49", qty: "1 tsp" },
    ],
    steps: [
      "Boil ramen noodles, toss the flavor packet.",
      "Mix peanut butter + soy sauce + sriracha + lime juice into a sauce.",
      "Microwave edamame until warm.",
      "Toss noodles in sauce, top with edamame and extra sriracha.",
    ],
    vibe: "Affordable meal with good protein and energy",
  },
  {
    name: "Egg Fried Rice",
    time: "15 min",
    cost: "$2.90",
    costNum: 2.9,
    restaurantPrice: 11,
    store: "Target on University Ave",
    protein: 20, carbs: 50, fats: 12,
    cal: 410,
    tags: ["budget", "energy", "balanced"],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=450&fit=crop",
    pkgNote: "Packages cover 3–4 meals",
    ingredients: [
      { name: "Eggs (12-count carton)", price: "$3.49", qty: "2 large eggs" },
      { name: "Instant Rice (8-srv box)", price: "$2.49", qty: "1 cup cooked" },
      { name: "Frozen Peas & Carrots (12 oz)", price: "$2.29", qty: "½ cup" },
      { name: "Soy Sauce (10 oz bottle)", price: "$2.49", qty: "1 tbsp" },
      { name: "Sesame Oil (8 oz bottle)", price: "$4.99", qty: "½ tsp" },
    ],
    steps: [
      "Microwave rice, let it cool slightly.",
      "Scramble eggs in a hot pan, set aside.",
      "Stir-fry frozen veg 2 min, add rice on high heat.",
      "Add soy sauce + sesame oil, fold in eggs.",
    ],
    vibe: "Quick, affordable meal with balanced macros",
  },
  {
    name: "Mediterranean Tuna Wrap",
    time: "8 min",
    cost: "$4.10",
    costNum: 4.1,
    restaurantPrice: 13,
    store: "Target on University Ave",
    protein: 32, carbs: 35, fats: 10,
    cal: 380,
    tags: ["high-protein", "balanced", "budget"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=450&fit=crop",
    pkgNote: "Packages cover 2–3 meals",
    ingredients: [
      { name: "Canned Tuna (5 oz, 2-pack)", price: "$3.99", qty: "1 can (5 oz)" },
      { name: "Flour Tortillas (10-ct bag)", price: "$3.49", qty: "1 large tortilla" },
      { name: "Hummus (10 oz container)", price: "$3.99", qty: "2 tbsp" },
      { name: "Cucumber (each)", price: "$0.99", qty: "¼ cup sliced" },
      { name: "Feta Crumbles (4 oz)", price: "$3.49", qty: "2 tbsp" },
    ],
    steps: [
      "Drain tuna, mix with a squeeze of lemon if you have it.",
      "Spread hummus generously on the tortilla.",
      "Layer tuna, sliced cucumber, feta.",
      "Wrap tight and eat right away.",
    ],
    vibe: "High-protein wrap that's ready in minutes",
  },
];

const GOAL_MAP = {
  protein: { label: "eat more protein", tags: ["high-protein"], color: T.secondary },
  energy: { label: "stop feeling sluggish", tags: ["energy", "balanced"], color: T.primaryContainer },
  budget: { label: "spend less", tags: ["budget"], color: T.primary },
  balanced: { label: "eat balanced", tags: ["balanced"], color: T.secondary },
  workout: { label: "fuel for workouts", tags: ["high-protein", "energy"], color: T.secondaryContainer },
};

const COOK_QUIPS = [
  "cooking's the move tonight",
  "your wallet will thank you",
  "way better than waiting 45 min",
  "delivery fees? not today",
  "fresh > frozen delivery",
];

const SWIPE_QUIPS = [
  "dining hall's going off today 🔥",
  "solid spread today, use that swipe",
  "your meal plan is earning its keep",
  "hall's actually hitting today",
  "this one's worth the walk",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMealPeriod() {
  return new Date().getHours() < 15 ? "lunch" : "dinner";
}

function scoreItem(item, goalTags) {
  let s = 0;
  for (const t of goalTags) if (item.tags.includes(t)) s += 2;
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

  const cookScored = COOK_RECIPES.map((r) => ({
    ...r,
    score:
      r.tags.reduce((s, t) => s + (goalTags.includes(t) ? 2 : 0), 0) +
      (goal === "budget" ? 2 : 0),
  })).sort((a, b) => b.score - a.score);

  const shouldSwipe = (bestItem?.score || 0) >= 3;

  return {
    shouldSwipe,
    period: menu.period,
    time: menu.time,
    topPick: bestItem,
    recipe: cookScored[0],
    menu,
  };
}

function getDDBreakdown(recipe) {
  const menuItem = recipe.restaurantPrice;
  const serviceFee = 3.5;
  const deliveryFee = 2.5;
  const tip = 4.0;
  const subtotal = menuItem + serviceFee + deliveryFee + tip;
  const savings = subtotal - recipe.costNum;
  return { menuItem, serviceFee, deliveryFee, tip, subtotal, savings };
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Shared Components ────────────────────────────────────────────────────────

function Icon({ name, size = 24, fill = 0, style = {} }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      {name}
    </span>
  );
}

function TopNavFull({ onSavings, onMenu }) {
  return (
    <header style={s.topNavFull}>
      <button style={s.navIconBtn} onClick={onMenu}>
        <Icon name="menu" size={24} style={{ color: T.primary }} />
      </button>
      <span style={s.navLogo}>BiteBank</span>
      <button style={s.navAvatarBtn} onClick={onSavings}>
        <Icon name="savings" size={20} fill={1} style={{ color: T.primary }} />
      </button>
    </header>
  );
}

function TopNavBack({ title, onBack, rightIcon, onRight }) {
  return (
    <header style={s.topNavBack}>
      <button style={s.navBackBtn} onClick={onBack}>
        <Icon name="arrow_back" size={20} style={{ color: T.onSurface }} />
      </button>
      {title ? (
        <div style={{ textAlign: "center" }}>
          <div style={s.navBackTitle}>{title}</div>
        </div>
      ) : (
        <span style={s.navLogo}>BiteBank</span>
      )}
      <button style={s.navBackBtn} onClick={onRight}>
        {rightIcon && <Icon name={rightIcon} size={20} style={{ color: T.onSurface }} />}
      </button>
    </header>
  );
}

function BottomNav({ active, onHome, onIntake, onVerdict, onSavings }) {
  const tabs = [
    { key: "home",    icon: "home",       iconFill: 1 },
    { key: "intake",  icon: "nutrition",  iconFill: 1 },
    { key: "verdict", icon: "restaurant", iconFill: 1 },
    { key: "savings", icon: "savings",    iconFill: 1 },
  ];
  const handlers = { home: onHome, intake: onIntake, verdict: onVerdict, savings: onSavings };

  return (
    <nav style={s.bottomNav}>
      {tabs.map(({ key, icon, iconFill }) => {
        const isActive = active === key;
        return (
          <button key={key} style={{ ...s.navTab, ...(isActive ? s.navTabActive : {}) }} onClick={handlers[key]}>
            <Icon name={icon} size={24} fill={isActive ? iconFill : 0}
              style={{ color: isActive ? "#fff" : "#a8a29e" }} />
          </button>
        );
      })}
    </nav>
  );
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────

function HomeScreen({ goal, totalSaved, cookCount, onHungry, onGoalChange, onMenu, bottomNavProps }) {
  const [appeared, setAppeared] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAppeared(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ ...s.screen, background: T.bg }}>
      <TopNavFull onSavings={bottomNavProps?.onSavings} onMenu={onMenu} />
      <main style={s.homeMain}>
        <div style={{ opacity: appeared ? 1 : 0, transform: appeared ? "none" : "translateY(20px)", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          {/* Headline */}
          <h1 style={s.homeHeadline}>what are we doing tonight?</h1>

          {/* Food image */}
          <div style={s.homeImageWrap}>
            <div style={s.homeImageBg} />
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=600&fit=crop"
              alt="fresh ingredients"
              style={s.homeImage}
            />
          </div>

          {/* Savings badge */}
          {totalSaved > 0 && (
            <button style={s.savingsBadge} onClick={bottomNavProps?.onSavings}>
              <Icon name="savings" size={16} fill={1} style={{ color: T.onSecondaryContainer }} />
              <span style={s.savingsBadgeText}>
                ${totalSaved.toFixed(2)} saved this week · {cookCount} {cookCount === 1 ? "order" : "orders"} skipped
              </span>
            </button>
          )}

          {/* CTA */}
          <button style={s.hungryBtn} onClick={onHungry}>
            I'm hungry
          </button>

          {/* Goal chips */}
          <div style={s.goalChips}>
            {Object.entries(GOAL_MAP).map(([key, val]) => (
              <button
                key={key}
                style={{ ...s.goalChip, ...(goal === key ? s.goalChipActive : {}) }}
                onClick={() => onGoalChange(goal === key ? null : key)}
              >
                {goal !== key && <span style={{ ...s.goalChipDot, background: val.color }} />}
                {val.label}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Ambient blobs */}
      <div style={s.blob1} />
      <div style={s.blob2} />

      <BottomNav {...bottomNavProps} />
    </div>
  );
}

// ─── Screen: Cook Verdict ──────────────────────────────────────────────────────

function CookVerdictScreen({ verdict, goal, onSeeRecipe, onSeeMenu, onMenu, bottomNavProps }) {
  const { recipe } = verdict;
  const dd = getDDBreakdown(recipe);
  const [appeared, setAppeared] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAppeared(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ ...s.screen, background: T.bg }}>
      <TopNavFull onSavings={bottomNavProps?.onSavings} onMenu={onMenu} />
      <main style={s.verdictMain}>
        {/* Hero card */}
        <div
          style={{
            ...s.verdictHeroCard,
            background: T.sageGrad,
            opacity: appeared ? 1 : 0,
            transform: appeared ? "none" : "translateY(24px)",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Background decal */}
          <div style={s.heroDecal}>
            <Icon name="restaurant" size={220} fill={1} style={{ color: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Top pills */}
          <div style={s.heroPills}>
            <span style={s.heroPill}>{recipe.time}</span>
            <span style={s.heroPill}>{recipe.cost}</span>
          </div>

          {/* Big headline */}
          <h1 style={s.heroTitle}>Cook<br />tonight.</h1>

          {/* Recipe name + thumbnail */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={s.heroRecipeName}>{recipe.name}</h3>
            <div style={s.heroThumb}>
              <img src={recipe.image} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* DoorDash breakdown */}
        <div
          style={{
            ...s.ddCard,
            opacity: appeared ? 1 : 0,
            transition: "opacity 0.3s ease 0.2s",
          }}
        >
          <div style={s.ddCardInner}>
            <div style={{ flex: 1 }}>
              <p style={s.ddLabel}>DoorDash Equivalent</p>
              <ul style={s.ddList}>
                {[
                  ["Menu Item:", `$${dd.menuItem.toFixed(2)}`],
                  ["Service Fee:", `$${dd.serviceFee.toFixed(2)}`],
                  ["Delivery Fee:", `$${dd.deliveryFee.toFixed(2)}`],
                  ["Estimated Tip:", `$${dd.tip.toFixed(2)}`],
                ].map(([label, val]) => (
                  <li key={label} style={s.ddRow}>
                    <span style={s.ddRowLabel}>{label}</span>
                    <span style={s.ddRowVal}>{val}</span>
                  </li>
                ))}
                <li style={s.ddSubtotalRow}>
                  <span>Subtotal:</span>
                  <span style={s.ddStrike}>${dd.subtotal.toFixed(2)}</span>
                </li>
              </ul>
            </div>
            <div style={s.ddSavedBox}>
              <p style={s.ddSavedLabel}>Total Saved</p>
              <p style={s.ddSavedAmount}>${dd.savings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ ...s.fixedCTA, opacity: appeared ? 1 : 0, transition: "opacity 0.3s ease 0.25s" }}>
          <p style={s.smarter}>Smarter Student Living</p>
          <button style={s.primaryBtn} onClick={onSeeRecipe}>
            Tap to see recipe
            <Icon name="arrow_forward" size={20} style={{ color: "#fff" }} />
          </button>
        </div>
      </main>

      <BottomNav {...bottomNavProps} />
    </div>
  );
}

// ─── Screen: Swipe Verdict ────────────────────────────────────────────────────

function SwipeVerdictScreen({ verdict, goal, onBack, onSeeMenu, onSeeRecipes }) {
  const { topPick } = verdict;
  const quip = rand(SWIPE_QUIPS);
  const [appeared, setAppeared] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAppeared(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ ...s.screen, background: T.bg }}>
      <TopNavBack onBack={onBack} rightIcon={null} />
      <main style={s.verdictMain}>
        {/* Hero card */}
        <div
          style={{
            ...s.verdictHeroCard,
            background: T.terracottaGrad,
            opacity: appeared ? 1 : 0,
            transform: appeared ? "none" : "translateY(24px)",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div style={s.heroDecal}>
            <Icon name="restaurant" size={220} fill={1} style={{ color: "rgba(255,255,255,0.15)" }} />
          </div>
          <h1 style={{ ...s.heroTitle, fontSize: 64 }}>Swipe<br />today.</h1>
        </div>

        {/* Item details */}
        <div
          style={{
            ...s.swipeDetails,
            opacity: appeared ? 1 : 0,
            transition: "opacity 0.3s ease 0.2s",
          }}
        >
          <div style={s.swipeItemHeader}>
            <div style={{ flex: 1 }}>
              <span style={s.swipeStation}>{topPick?.station}</span>
              <h2 style={s.swipeItemName}>{topPick?.name}</h2>
            </div>
            <div style={s.swipeCalBox}>
              <span style={s.swipeCalNum}>{topPick?.cal}</span>
              <span style={s.swipeCalLabel}>kcal</span>
            </div>
          </div>
          <p style={s.swipeQuip}>"{quip}"</p>
          <div style={s.macroGrid}>
            {[
              ["PROTEIN", `${topPick?.protein}g`],
              ["CARBS", `${topPick?.carbs}g`],
              ["FATS", `${topPick?.fats}g`],
            ].map(([label, val]) => (
              <div key={label} style={s.macroBox}>
                <span style={s.macroLabel}>{label}</span>
                <span style={s.macroVal}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed CTA */}
        <div style={s.fixedCTASwipe}>
          <button style={{ ...s.primaryBtn, background: T.terracottaGrad, marginBottom: 12 }} onClick={onSeeMenu}>
            Tap to see full menu
            <Icon name="expand_less" size={20} style={{ color: "#fff" }} />
          </button>
          <button style={s.cookInsteadBtn} onClick={onSeeRecipes}>
            <Icon name="skillet" size={18} style={{ color: T.secondary }} />
            Rather cook tonight? See recipes
            <Icon name="arrow_forward" size={16} style={{ color: T.secondary }} />
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── Screen: Recipe Detail ────────────────────────────────────────────────────

function RecipeDetailScreen({ recipe, onBack, onMadeThis }) {
  const [made, setMade] = useState(false);
  const dd = getDDBreakdown(recipe);

  const handleMadeThis = () => {
    setMade(true);
    setTimeout(() => onMadeThis(dd.savings, recipe), 1800);
  };

  return (
    <div style={{ ...s.screen, background: T.bg, overflowY: "auto" }}>
      <TopNavBack onBack={onBack} rightIcon="favorite" onRight={() => {}} />

      {/* Hero image */}
      <div style={s.recipeImageWrap}>
        <img src={recipe.image} alt={recipe.name} style={s.recipeImage} />
        <div style={s.recipeImageOverlay} />
      </div>

      <article style={s.recipeArticle}>
        {/* Title & tags */}
        <h1 style={s.recipeTitle}>{recipe.name}</h1>
        <div style={s.recipeTags}>
          <span style={s.recipeTagChip}>
            <Icon name="schedule" size={14} style={{ color: T.onSecondaryContainer }} />
            {recipe.time}
          </span>
          <span style={{ ...s.recipeTagChip, background: `${T.primaryContainer}22`, color: T.primary }}>
            <Icon name="payments" size={14} style={{ color: T.primary }} />
            {recipe.cost}
          </span>
        </div>

        {/* Nutrition stats */}
        <div style={s.recipeNutritionRow}>
          {[
            { label: "CALORIES", value: recipe.cal, unit: "kcal" },
            { label: "PROTEIN",  value: recipe.protein, unit: "g" },
            { label: "CARBS",    value: recipe.carbs,   unit: "g" },
            { label: "FATS",     value: recipe.fats,    unit: "g" },
          ].map(({ label, value, unit }, i, arr) => (
            <div key={label} style={{ ...s.recipeNutritionCell, borderRight: i < arr.length - 1 ? `1px solid ${T.outlineVariant}` : "none" }}>
              <span style={s.recipeNutritionVal}>{value}</span>
              <span style={s.recipeNutritionUnit}>{unit}</span>
              <span style={s.recipeNutritionLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* Store */}
        <div style={s.storeRow}>
          <div style={s.storeIcon}>
            <Icon name="storefront" size={20} style={{ color: "#fff" }} />
          </div>
          <div>
            <p style={s.storeLabel}>Nearest store</p>
            <p style={s.storeName}>{recipe.store}</p>
          </div>
          <Icon name="chevron_right" size={20} style={{ color: T.outline, marginLeft: "auto" }} />
        </div>

        {/* Ingredients */}
        <section style={s.recipeSection}>
          <div style={s.sectionHeader}>
            <h2 style={s.sectionTitle}>Ingredients</h2>
            <span style={s.sectionMeta}>Target prices</span>
          </div>
          <div style={s.pkgNoteBanner}>
            <Icon name="info" size={14} style={{ color: T.secondary, flexShrink: 0 }} />
            <span style={s.pkgNoteText}>{recipe.pkgNote} · ~${recipe.cost}/meal</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recipe.ingredients.map((ing) => (
              <div key={ing.name} style={s.ingredientRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={s.ingredientDot} />
                  <div>
                    <span style={s.ingredientName}>{ing.name}</span>
                    {ing.qty && <span style={s.ingredientQty}>{ing.qty}</span>}
                  </div>
                </div>
                <span style={s.ingredientPrice}>{ing.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section style={{ ...s.recipeSection, marginBottom: 120 }}>
          <h2 style={s.sectionTitle}>Let's Cook</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 24 }}>
            {recipe.steps.map((step, i) => (
              <div key={i} style={s.stepRow}>
                <span style={s.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <p style={s.stepText}>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Fixed bottom CTA */}
      <div style={s.recipeCTAWrap}>
        {made ? (
          <div style={s.madeItCelebration}>
            +${dd.savings.toFixed(2)} saved — nice work 🎉
          </div>
        ) : (
          <button style={s.primaryBtn} onClick={handleMadeThis}>
            <Icon name="restaurant" size={20} fill={1} style={{ color: "#fff" }} />
            I made this
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Full Menu ────────────────────────────────────────────────────────

function FullMenuScreen({ verdict, goal, prefs, onBack, onSelectItem, onLockIn }) {
  const goalTags = GOAL_MAP[goal]?.tags || ["balanced"];
  const [planning, setPlanning] = useState(false);
  const [trayItems, setTrayItems] = useState([]);
  const [locked, setLocked] = useState(false);

  function badge(score) {
    if (score >= 3) return { label: "GREAT PICK", bg: T.secondaryContainer, color: T.onSecondaryContainer };
    if (score >= 1) return { label: "DECENT", bg: T.surfaceHighest, color: T.onSurfaceVariant };
    return { label: "SKIP", bg: T.surfaceHigh, color: T.outline };
  }

  function toggleItem(item) {
    setTrayItems(prev =>
      prev.find(i => i.name === item.name)
        ? prev.filter(i => i.name !== item.name)
        : [...prev, item]
    );
  }

  const trayMacros = trayItems.reduce(
    (acc, item) => ({
      protein: acc.protein + (item.protein || 0),
      carbs: acc.carbs + (item.carbs || 0),
      fats: acc.fats + (item.fats || 0),
      cal: acc.cal + (item.cal || 0),
    }),
    { protein: 0, carbs: 0, fats: 0, cal: 0 }
  );

  function goalMatch() {
    if (trayItems.length === 0) return null;
    if (goal === "protein" && trayMacros.protein >= 30) return { label: "Hits your protein goal", icon: "fitness_center", good: true };
    if (goal === "budget") return { label: "Meal plan — zero extra cost", icon: "savings", good: true };
    if (goal === "energy" && !trayItems.some(i => i.tags.includes("heavy"))) return { label: "Good energy combo", icon: "bolt", good: true };
    if (goal === "balanced" && trayMacros.protein >= 20 && trayMacros.carbs >= 30) return { label: "Balanced macro split", icon: "balance", good: true };
    if (goal === "workout" && trayMacros.protein >= 30) return { label: "Fueled for your workout", icon: "sports_gymnastics", good: true };
    return { label: "Not quite aligned to your goal", icon: "info", good: false };
  }

  const match = goalMatch();

  function handleLockIn() {
    setLocked(true);
    if (onLockIn) onLockIn(trayItems);
    setTimeout(() => {
      setLocked(false);
      setPlanning(false);
      setTrayItems([]);
    }, 1400);
  }

  return (
    <div style={{ ...s.screen, background: "#FAF7F2", overflowY: "auto" }}>
      <header style={s.menuNavBar}>
        <button style={s.menuNavBtn} onClick={onBack}>
          <Icon name="arrow_back" size={22} style={{ color: T.onSurface }} />
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={s.menuNavTitle}>Campus Commons</div>
          <div style={s.menuNavSub}>Lunch Menu · Today</div>
        </div>
        <button style={s.menuNavBtn}>
          <Icon name="more_vert" size={22} style={{ color: T.onSurface }} />
        </button>
      </header>

      <main style={{ ...s.menuMain, paddingBottom: planning ? 280 : 48 }}>
        <section style={{ marginBottom: 40 }}>
          <h1 style={s.menuHeadline}>What's Cooking?</h1>
          <p style={s.menuSubline}>
            {planning ? "Tap items to add them to your tray." : "Your guide to the best bites at the hall today."}
          </p>
        </section>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {verdict.menu.stations.map((station) => (
            <section key={station.name}>
              <div style={s.stationHeader}>
                <Icon name={station.icon} size={20} style={{ color: T.primary }} />
                <h3 style={s.stationName}>{station.name}</h3>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", margin: 0, padding: 0 }}>
                {station.items.map((item) => {
                  const score = scoreItem(item, goalTags);
                  const b = badge(score);
                  const tagStr = item.tags.filter(t => t !== "heavy" && t !== "comfort").join(" · ").toUpperCase();
                  const selected = trayItems.find(i => i.name === item.name);
                  return (
                    <li
                      key={item.name}
                      style={{
                        ...s.menuItem,
                        ...(planning && selected ? s.menuItemSelected : {}),
                        outline: planning && selected ? `2px solid ${T.secondary}` : "2px solid transparent",
                        transition: "all 0.15s ease",
                      }}
                      onClick={() => planning ? toggleItem({ ...item, station: station.name }) : onSelectItem({ ...item, station: station.name })}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={s.menuItemName}>{item.name}</div>
                        <div style={s.menuItemMeta}>{tagStr || item.tags[0]?.toUpperCase()} · {item.cal} KCAL</div>
                      </div>
                      {planning ? (
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          border: `2px solid ${selected ? T.secondary : T.outlineVariant}`,
                          background: selected ? T.secondary : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.15s ease",
                          marginLeft: 10,
                        }}>
                          {selected && <Icon name="check" size={16} style={{ color: "#fff" }} />}
                        </div>
                      ) : (
                        <span style={{ ...s.menuBadge, background: b.bg, color: b.color }}>{b.label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {!planning && (
          <section style={{ marginTop: 48 }}>
            <button style={{ ...s.primaryBtn, borderRadius: 16 }} onClick={() => setPlanning(true)}>
              <Icon name="checklist" size={20} style={{ color: "#fff" }} />
              Plan My Meal
            </button>
            <p style={s.menuFooter}>MENU UPDATED 14 MINUTES AGO</p>
          </section>
        )}
      </main>

      {/* Plan tray bottom sheet */}
      {planning && (
        <div style={s.traySheet}>
          {locked ? (
            <div style={s.trayLockedMsg}>
              <Icon name="check_circle" size={28} fill={1} style={{ color: T.secondary }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: T.onSurface }}>Meal plan locked in!</span>
            </div>
          ) : (
            <>
              {/* Sheet header */}
              <div style={s.trayHeader}>
                <span style={s.trayTitle}>
                  My Tray {trayItems.length > 0 && <span style={s.trayCount}>{trayItems.length}</span>}
                </span>
                <button style={s.trayCancelBtn} onClick={() => { setPlanning(false); setTrayItems([]); }}>
                  <Icon name="close" size={20} style={{ color: T.onSurfaceVariant }} />
                </button>
              </div>

              {/* Macros */}
              {trayItems.length > 0 ? (
                <>
                  <div style={s.trayMacroRow}>
                    {[
                      ["PROTEIN", `${trayMacros.protein}g`],
                      ["CARBS", `${trayMacros.carbs}g`],
                      ["FATS", `${trayMacros.fats}g`],
                      ["CAL", `${trayMacros.cal}`],
                    ].map(([label, val]) => (
                      <div key={label} style={s.trayMacroBox}>
                        <span style={s.trayMacroLabel}>{label}</span>
                        <span style={s.trayMacroVal}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {match && (
                    <div style={{ ...s.trayMatchChip, background: match.good ? `${T.secondaryContainer}80` : `${T.surfaceHighest}` }}>
                      <Icon name={match.icon} size={16} style={{ color: match.good ? T.secondary : T.outline }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: match.good ? T.onSecondaryContainer : T.onSurfaceVariant }}>
                        {match.label}
                      </span>
                    </div>
                  )}

                  {/* Daily goal progress bars */}
                  {prefs && (prefs.protein > 0 || prefs.calories > 0) && (
                    <div style={s.trayGoalSection}>
                      <p style={s.trayGoalLabel}>Daily Goal Progress</p>
                      {[
                        { label: "Protein", current: trayMacros.protein, goal: prefs.protein, unit: "g" },
                        { label: "Carbs",   current: trayMacros.carbs,   goal: prefs.carbs,   unit: "g" },
                        { label: "Calories",current: trayMacros.cal,     goal: prefs.calories,unit: "kcal" },
                      ].filter(row => row.goal > 0).map(({ label, current, goal: g, unit }) => {
                        const pct = Math.min(100, Math.round((current / g) * 100));
                        const over = pct >= 100;
                        const barColor = over ? "#ba1a1a" : pct >= 60 ? T.secondary : T.primaryContainer;
                        return (
                          <div key={label} style={s.trayGoalRow}>
                            <div style={s.trayGoalMeta}>
                              <span style={s.trayGoalName}>{label}</span>
                              <span style={{ ...s.trayGoalPct, color: over ? "#ba1a1a" : T.onSurfaceVariant }}>
                                {current}{unit} / {g}{unit}
                              </span>
                            </div>
                            <div style={s.trayGoalBar}>
                              <div style={{ ...s.trayGoalFill, width: `${pct}%`, background: barColor }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button style={{ ...s.primaryBtn, background: T.sageGrad, boxShadow: "0 8px 24px rgba(64,103,77,0.25)" }} onClick={handleLockIn}>
                    <Icon name="lock" size={18} style={{ color: "#fff" }} />
                    Lock It In
                  </button>
                </>
              ) : (
                <p style={{ fontSize: 14, color: T.onSurfaceVariant, textAlign: "center", margin: "8px 0 0" }}>
                  Tap items above to add them to your tray.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Screen: Savings ──────────────────────────────────────────────────────────

function SavingsScreen({ totalSaved, cookHistory, onBack, onCookFromPantry, bottomNavProps }) {
  return (
    <div style={{ ...s.screen, background: T.bg, overflowY: "auto" }}>
      <header style={s.savingsNav}>
        <button style={s.navBackBtn} onClick={onBack}>
          <Icon name="arrow_back" size={20} style={{ color: T.onSurface }} />
        </button>
        <div style={{ flex: 1 }} />
        <button style={s.navBackBtn}>
          <Icon name="ios_share" size={20} style={{ color: T.onSurface }} />
        </button>
      </header>

      <main style={s.savingsMain}>
        {/* Hero */}
        <header style={{ marginBottom: 40 }}>
          <p style={s.lifetimeLabel}>Lifetime Impact</p>
          <h1 style={s.lifetimeAmount}>
            ${totalSaved.toFixed(2)} <span style={{ color: T.onSecondaryContainer }}>saved</span>
          </h1>
          <p style={s.lifetimeDesc}>
            {cookHistory.length > 0
              ? `You've skipped ${cookHistory.length} delivery fee${cookHistory.length !== 1 ? "s" : ""} and avoided retail markups this month.`
              : "Start cooking to see your savings add up here."}
          </p>
        </header>

        {/* Level card */}
        {cookHistory.length > 0 && (
          <section style={s.levelCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={s.levelIconBox}>
                <Icon name="savings" size={28} fill={1} style={{ color: T.onSecondaryContainer }} />
              </div>
              <span style={s.levelBadge}>+12% vs last month</span>
            </div>
            <h3 style={s.levelTitle}>Smart Chef Level</h3>
            <p style={s.levelDesc}>You're in the top 5% of student savers.</p>
            <div style={s.levelBigIcon}>
              <Icon name="savings" size={120} fill={1} style={{ color: "rgba(68,107,81,0.1)" }} />
            </div>
          </section>
        )}

        {/* History list */}
        {cookHistory.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <div style={s.historyHeader}>
              <h2 style={s.historyTitle}>Cooked vs. Ordered</h2>
              <button style={s.seeAllBtn}>SEE ALL</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cookHistory.slice().reverse().map((entry, i) => (
                <div key={i} style={s.historyRow}>
                  <div style={s.historyThumb}>
                    <img src={entry.image} alt={entry.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={s.historyName}>{entry.name}</div>
                    <div style={s.historyDate}>Cooked today</div>
                  </div>
                  <div style={s.historySavings}>
                    <div style={s.historySavingsAmt}>+${entry.savings.toFixed(2)}</div>
                    <div style={s.historySavingsLabel}>vs DoorDash</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tip card */}
        <section style={s.tipCard}>
          <div style={s.tipIconBox}>
            <Icon name="lightbulb" size={24} style={{ color: "#fb923c" }} />
          </div>
          <h3 style={s.tipTitle}>
            {totalSaved > 0 ? `Want to save another $15?` : `Your first save is one cook away`}
          </h3>
          <p style={s.tipDesc}>
            {totalSaved > 0
              ? "Based on your pantry, you can make Egg Fried Rice tonight."
              : "Tap 'I'm hungry' and cook your first meal to start your streak."}
          </p>
          <button style={s.tipBtn} onClick={onCookFromPantry}>
            {totalSaved > 0 ? "Cook from Pantry" : "Let's go"}
          </button>
        </section>
      </main>

      <BottomNav {...bottomNavProps} />
    </div>
  );
}

// ─── Screen: Recipe Browse ────────────────────────────────────────────────────

function RecipeBrowseScreen({ goal, onBack, onSelectRecipe, onScanPantry }) {
  const goalTags = GOAL_MAP[goal]?.tags || ["balanced"];

  const scored = COOK_RECIPES.map(r => ({
    ...r,
    score: r.tags.reduce((s, t) => s + (goalTags.includes(t) ? 2 : 0), 0),
  })).sort((a, b) => b.score - a.score);

  return (
    <div style={{ ...s.screen, background: T.bg, overflowY: "auto" }}>
      <TopNavBack title="Cook Tonight" onBack={onBack} />
      <main style={{ padding: "80px 24px 48px" }}>

        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.primary, margin: "0 0 6px" }}>
            Based on your goal
          </p>
          <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", color: T.onBg, margin: "0 0 16px", lineHeight: 1.1 }}>
            Recipes for you
          </h1>
          <button style={s.pantryBtn} onClick={onScanPantry}>
            <Icon name="document_scanner" size={18} style={{ color: T.secondary }} />
            <span>Scan my pantry for matches</span>
            <Icon name="arrow_forward" size={16} style={{ color: T.secondary, marginLeft: "auto" }} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {scored.map((recipe) => (
            <div key={recipe.name} style={s.recipeCard} onClick={() => onSelectRecipe(recipe)}>
              <div style={s.recipeCardThumb}>
                <img src={recipe.image} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={s.recipeCardBody}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                  {recipe.tags.slice(0, 2).map(t => (
                    <span key={t} style={s.recipeCardTag}>{t}</span>
                  ))}
                  {goalTags.some(gt => recipe.tags.includes(gt)) && (
                    <span style={{ ...s.recipeCardTag, background: `${T.secondaryContainer}99`, color: T.secondary }}>
                      goal match
                    </span>
                  )}
                </div>
                <h3 style={s.recipeCardName}>{recipe.name}</h3>
                <div style={s.recipeCardMeta}>
                  <span style={s.recipeCardMetaItem}>
                    <Icon name="schedule" size={13} style={{ color: T.outline }} />
                    {recipe.time}
                  </span>
                  <span style={s.recipeCardMetaItem}>
                    <Icon name="payments" size={13} style={{ color: T.outline }} />
                    {recipe.cost}/meal
                  </span>
                  <span style={s.recipeCardMetaItem}>
                    <Icon name="exercise" size={13} style={{ color: T.outline }} />
                    {recipe.protein}g protein
                  </span>
                </div>
              </div>
              <Icon name="chevron_right" size={20} style={{ color: T.outlineVariant, alignSelf: "center", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ─── Screen: Pantry Scanner ───────────────────────────────────────────────────

const FAKE_PANTRY = [
  { name: "Eggs", icon: "egg" },
  { name: "Instant Rice", icon: "rice_bowl" },
  { name: "Soy Sauce", icon: "water_drop" },
  { name: "Peanut Butter", icon: "nutrition" },
  { name: "Black Beans", icon: "grocery" },
  { name: "Frozen Peas", icon: "ac_unit" },
];

const PANTRY_RECIPES = ["Egg Fried Rice", "Peanut Noodle Bowl", "Loaded Black Bean Quesadilla"];

function PantryScannerScreen({ onBack, onSelectRecipe }) {
  const [phase, setPhase] = useState("scanning"); // scanning | detected
  const [detected, setDetected] = useState([]);
  const [scanY, setScanY] = useState(0);

  useEffect(() => {
    let frame;
    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) % 2000;
      setScanY(Math.sin((elapsed / 2000) * Math.PI) * 100);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "scanning") return;
    const timeout = setTimeout(() => setPhase("revealing"), 2200);
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "revealing") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < FAKE_PANTRY.length) {
        setDetected(prev => [...prev, FAKE_PANTRY[i]]);
        i++;
      } else {
        setPhase("done");
        clearInterval(interval);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [phase]);

  const suggested = COOK_RECIPES.filter(r => PANTRY_RECIPES.includes(r.name));

  return (
    <div style={{ ...s.screen, background: "#0f0e0d", overflowY: "auto" }}>
      <header style={{ ...s.topNavBack, background: "rgba(15,14,13,0.85)", borderBottom: "none" }}>
        <button style={{ ...s.navBackBtn, background: "rgba(255,255,255,0.1)", border: "none" }} onClick={onBack}>
          <Icon name="arrow_back" size={20} style={{ color: "#fff" }} />
        </button>
        <span style={{ ...s.navLogo, color: "#fff" }}>Pantry Scanner</span>
        <div style={{ width: 40 }} />
      </header>

      {/* Viewfinder */}
      <div style={s.viewfinder}>
        <div style={s.scanFrame}>
          {/* Corner brackets */}
          {["tl","tr","bl","br"].map(corner => (
            <div key={corner} style={{ ...s.corner, ...s[`corner_${corner}`] }} />
          ))}
          {/* Scan line */}
          <div style={{ ...s.scanLine, top: `${scanY}%` }} />
          <p style={s.scanHint}>
            {phase === "scanning" ? "Scanning your pantry…" : "Pantry detected"}
          </p>
        </div>
      </div>

      {/* Results */}
      <div style={s.pantryResults}>
        {detected.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <p style={s.pantryResultsLabel}>
              {phase === "done" ? `${detected.length} items found` : "Detecting…"}
            </p>
            <div style={s.pantryChips}>
              {detected.map(item => (
                <div key={item.name} style={s.pantryChip}>
                  <Icon name={item.icon} size={14} style={{ color: T.secondary }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {phase === "done" && (
          <section>
            <p style={s.pantryResultsLabel}>You can make these tonight</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {suggested.map(recipe => (
                <div key={recipe.name} style={s.pantryRecipeRow} onClick={() => onSelectRecipe(recipe)}>
                  <div style={s.pantryRecipeThumb}>
                    <img src={recipe.image} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...s.recipeCardName, color: "#f5f0ec", fontSize: 15 }}>{recipe.name}</div>
                    <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 2 }}>{recipe.time} · {recipe.cost}/meal</div>
                  </div>
                  <Icon name="chevron_right" size={20} style={{ color: "#a8a29e", flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Daily Intake ────────────────────────────────────────────────────

function CalRing({ current, goal, size = 180 }) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = goal > 0 ? Math.min(1, current / goal) : 0;
  const over = goal > 0 && current > goal;
  const color = over ? "#ba1a1a" : pct >= 0.6 ? T.secondary : T.primaryContainer;

  return (
    <svg width={size} height={size} style={{ display: "block" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.surfaceHigh} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${pct * circ} ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.34,1.56,0.64,1)" }}
      />
      <text x={size / 2} y={size / 2 - 10} textAnchor="middle"
        style={{ fontSize: 28, fontWeight: 800, fill: T.onSurface, fontFamily: T.font }}>
        {current}
      </text>
      <text x={size / 2} y={size / 2 + 12} textAnchor="middle"
        style={{ fontSize: 12, fontWeight: 600, fill: T.onSurfaceVariant, fontFamily: T.font }}>
        of {goal} kcal
      </text>
      <text x={size / 2} y={size / 2 + 30} textAnchor="middle"
        style={{ fontSize: 11, fontWeight: 700, fill: color, fontFamily: T.font }}>
        {goal > 0 ? `${Math.round(pct * 100)}%` : "—"}
      </text>
    </svg>
  );
}

function MacroBar({ label, current, goal, color }) {
  const pct = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;
  const over = goal > 0 && current > goal;
  const barColor = over ? "#ba1a1a" : color;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.onSurface }}>{label}</span>
        <span style={{ fontSize: 12, color: over ? "#ba1a1a" : T.onSurfaceVariant, fontWeight: 500 }}>
          {current}g{goal > 0 ? ` / ${goal}g` : ""} {goal > 0 && <span style={{ color: barColor }}>· {pct}%</span>}
        </span>
      </div>
      <div style={{ height: 8, background: T.surfaceHigh, borderRadius: 9999, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, background: barColor, borderRadius: 9999,
          transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        }} />
      </div>
    </div>
  );
}

function DailyIntakeScreen({ dailyLog, prefs, onBack, onHome, onIntake, onVerdict, onSavings }) {
  const totals = dailyLog.reduce(
    (acc, e) => ({ cal: acc.cal + e.cal, protein: acc.protein + e.protein, carbs: acc.carbs + e.carbs, fats: acc.fats + e.fats }),
    { cal: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const remaining = Math.max(0, prefs.calories - totals.cal);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <div style={{ ...s.screen, background: T.bg, overflowY: "auto" }}>
      <header style={s.intakeNav}>
        <div>
          <p style={s.intakeNavLabel}>Today</p>
          <h1 style={s.intakeNavDate}>{today}</h1>
        </div>
        <button style={s.navBackBtn} onClick={onBack}>
          <Icon name="close" size={18} style={{ color: T.onSurfaceVariant }} />
        </button>
      </header>

      <main style={s.intakeMain}>

        {/* Calorie ring + remaining */}
        <div style={s.intakeRingRow}>
          <CalRing current={totals.cal} goal={prefs.calories} size={180} />
          <div style={s.intakeRingStats}>
            <div style={s.intakeStatBox}>
              <span style={s.intakeStatNum}>{totals.cal}</span>
              <span style={s.intakeStatLabel}>eaten</span>
            </div>
            <div style={{ height: 1, background: T.outlineVariant, margin: "10px 0" }} />
            <div style={s.intakeStatBox}>
              <span style={{ ...s.intakeStatNum, color: remaining > 0 ? T.secondary : "#ba1a1a" }}>
                {remaining}
              </span>
              <span style={s.intakeStatLabel}>remaining</span>
            </div>
          </div>
        </div>

        {/* Macro bars */}
        <div style={s.intakeMacroCard}>
          <p style={s.intakeCardLabel}>Macros</p>
          <MacroBar label="Protein" current={totals.protein} goal={prefs.protein} color={T.secondary} />
          <MacroBar label="Carbs"   current={totals.carbs}   goal={prefs.carbs}   color={T.primaryContainer} />
          <MacroBar label="Fats"    current={totals.fats}    goal={prefs.fats}    color="#e08a5e" />
        </div>

        {/* Meal log */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={s.intakeCardLabel}>Today's Meals</p>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.onSurfaceVariant }}>
              {dailyLog.length} logged
            </span>
          </div>

          {dailyLog.length === 0 ? (
            <div style={s.intakeEmptyState}>
              <Icon name="nutrition" size={48} style={{ color: T.outlineVariant, marginBottom: 16 }} />
              <p style={s.intakeEmptyTitle}>Nothing logged yet</p>
              <p style={s.intakeEmptyDesc}>
                Lock in your dining hall tray or cook a recipe — it'll show up here automatically.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {dailyLog.map((entry) => (
                <div key={entry.id} style={s.intakeMealRow}>
                  <div style={s.intakeMealThumb}>
                    {entry.image
                      ? <img src={entry.image} alt={entry.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <Icon name={entry.type === "cooked" ? "skillet" : "restaurant"} size={22} style={{ color: T.onSurfaceVariant }} />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={s.intakeMealName}>{entry.name}</div>
                    <div style={s.intakeMealMeta}>
                      {entry.protein}g protein · {entry.carbs}g carbs · {entry.fats}g fat
                    </div>
                    <div style={s.intakeMealTime}>{entry.time}</div>
                  </div>
                  <div style={s.intakeMealCal}>
                    <span style={s.intakeMealCalNum}>{entry.cal}</span>
                    <span style={s.intakeMealCalLabel}>kcal</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav active="intake" onHome={onHome} onIntake={onIntake} onVerdict={onVerdict} onSavings={onSavings} />
    </div>
  );
}

// ─── Preferences Panel ───────────────────────────────────────────────────────

const ALLERGY_OPTIONS = ["Gluten", "Dairy", "Nuts", "Shellfish", "Soy", "Eggs", "Vegetarian", "Vegan"];

const GOAL_PRESETS = [
  { key: "lose",     label: "Lose weight",   icon: "monitor_weight", calories: 1700, protein: 130, desc: "Moderate deficit" },
  { key: "muscle",   label: "Build muscle",  icon: "fitness_center",  calories: 2500, protein: 180, desc: "High protein" },
  { key: "maintain", label: "Maintain",      icon: "balance",         calories: 2000, protein: 120, desc: "Steady as you go" },
  { key: "energy",   label: "More energy",   icon: "bolt",            calories: 2200, protein: 110, desc: "Carb-fueled" },
];

function deriveMacros(calories, protein) {
  const proteinCals = protein * 4;
  const remaining = Math.max(0, calories - proteinCals);
  const carbs = Math.round((remaining * 0.55) / 4);
  const fats = Math.round((remaining * 0.35) / 9);
  return { carbs, fats };
}

function PreferencesPanel({ prefs, onSave, onClose }) {
  const [local, setLocal] = useState({ ...prefs });
  const [activePreset, setActivePreset] = useState(null);

  function toggleAllergy(a) {
    setLocal(prev => ({
      ...prev,
      allergies: prev.allergies.includes(a)
        ? prev.allergies.filter(x => x !== a)
        : [...prev.allergies, a],
    }));
  }

  function adjust(field, delta) {
    setLocal(prev => ({ ...prev, [field]: Math.max(0, (prev[field] || 0) + delta) }));
  }

  function applyPreset(preset) {
    setActivePreset(preset.key);
    const { carbs, fats } = deriveMacros(preset.calories, preset.protein);
    setLocal(prev => ({ ...prev, calories: preset.calories, protein: preset.protein, carbs, fats }));
  }

  function handleSave() {
    const { carbs, fats } = deriveMacros(local.calories, local.protein);
    onSave({ ...local, carbs, fats });
  }

  const derived = deriveMacros(local.calories, local.protein);

  return (
    <div style={s.prefsWrap}>
      <div style={s.prefsBackdrop} onClick={onClose} />
      <div style={s.prefsPanel}>
        <div style={s.prefsHandle} />

        {/* Header */}
        <div style={s.prefsProfileRow}>
          <div style={s.prefsAvatarCircle}>
            <Icon name="person" size={28} fill={1} style={{ color: T.primary }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={s.prefsProfileName}>Your Profile</div>
            <div style={s.prefsProfileSub}>Tap a goal to get started</div>
          </div>
          <button style={s.prefsCloseBtn} onClick={onClose}>
            <Icon name="close" size={18} style={{ color: T.onSurfaceVariant }} />
          </button>
        </div>

        <div style={s.prefsDivider} />

        {/* Goal presets */}
        <p style={s.prefsSectionLabel}>What's your main goal?</p>
        <div style={s.prefsPresetGrid}>
          {GOAL_PRESETS.map(preset => {
            const active = activePreset === preset.key;
            return (
              <button
                key={preset.key}
                style={{ ...s.prefsPresetCard, ...(active ? s.prefsPresetCardActive : {}) }}
                onClick={() => applyPreset(preset)}
              >
                <Icon name={preset.icon} size={22} fill={active ? 1 : 0}
                  style={{ color: active ? T.secondary : T.onSurfaceVariant }} />
                <span style={{ ...s.prefsPresetLabel, color: active ? T.onSecondaryContainer : T.onSurface }}>
                  {preset.label}
                </span>
                <span style={{ ...s.prefsPresetDesc, color: active ? T.secondary : T.onSurfaceVariant }}>
                  {preset.desc}
                </span>
              </button>
            );
          })}
        </div>

        <div style={s.prefsDivider} />

        {/* Simple inputs: only calories + protein */}
        <p style={s.prefsSectionLabel}>Fine-tune (optional)</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
          {[
            { field: "calories", label: "Calories", unit: "kcal", step: 50,  hint: "total daily intake" },
            { field: "protein",  label: "Protein",  unit: "g",    step: 5,   hint: "~0.7–1g per lb of bodyweight" },
          ].map(({ field, label, unit, step, hint }) => (
            <div key={field} style={s.prefsRow}>
              <div>
                <div style={s.prefsRowLabel}>{label}</div>
                <div style={s.prefsRowHint}>{hint}</div>
              </div>
              <div style={s.prefsStepper}>
                <button style={s.prefsStepBtn} onClick={() => adjust(field, -step)}>
                  <Icon name="remove" size={16} style={{ color: T.onSurfaceVariant }} />
                </button>
                <span style={s.prefsStepVal}>
                  {local[field]}<span style={s.prefsStepUnit}> {unit}</span>
                </span>
                <button style={s.prefsStepBtn} onClick={() => adjust(field, step)}>
                  <Icon name="add" size={16} style={{ color: T.primary }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Auto-derived note */}
        <div style={s.prefsDerivedNote}>
          <Icon name="auto_awesome" size={14} style={{ color: T.secondary, flexShrink: 0 }} />
          <span>
            Carbs & fats are set automatically —
            <strong style={{ color: T.onSecondaryContainer }}> ~{derived.carbs}g carbs</strong> and
            <strong style={{ color: T.onSecondaryContainer }}> ~{derived.fats}g fat</strong> based on your goals.
          </span>
        </div>

        {/* TDEE nudge */}
        <a
          href="https://tdeecalculator.net"
          target="_blank"
          rel="noopener noreferrer"
          style={s.tdeeLinkRow}
        >
          <div style={s.tdeeLinkIcon}>
            <Icon name="calculate" size={18} style={{ color: T.primary }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={s.tdeeLinkTitle}>Want to get more precise?</div>
            <div style={s.tdeeLinkSub}>Calculate your TDEE — takes 30 seconds</div>
          </div>
          <Icon name="open_in_new" size={16} style={{ color: T.outline }} />
        </a>

        <div style={s.prefsDivider} />

        {/* Allergies */}
        <p style={{ ...s.prefsSectionLabel, marginTop: 4 }}>Dietary Restrictions</p>
        <div style={s.prefsAllergyGrid}>
          {ALLERGY_OPTIONS.map(a => {
            const active = local.allergies.includes(a);
            return (
              <button
                key={a}
                style={{ ...s.prefsAllergyChip, ...(active ? s.prefsAllergyActive : {}) }}
                onClick={() => toggleAllergy(a)}
              >
                {active && <Icon name="check" size={12} style={{ color: T.secondary }} />}
                {a}
              </button>
            );
          })}
        </div>

        <button style={s.prefsSaveBtn} onClick={handleSave}>
          <Icon name="check" size={18} style={{ color: "#fff" }} />
          Save Preferences
        </button>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home");
  const [goal, setGoal] = useState("protein");
  const [verdict, setVerdict] = useState(() => getVerdict("protein"));
  const [totalSaved, setTotalSaved] = useState(0);
  const [cookHistory, setCookHistory] = useState([]);
  const [browseRecipe, setBrowseRecipe] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prefs, setPrefs] = useState({ calories: 2000, protein: 150, carbs: 200, fats: 65, allergies: [] });
  const [dailyLog, setDailyLog] = useState([]);

  function logMeals(items) {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const entries = items.map(item => ({
      id: Date.now() + Math.random(),
      name: item.name,
      cal: item.cal || 0,
      protein: item.protein || 0,
      carbs: item.carbs || 0,
      fats: item.fats || 0,
      type: "dining",
      time: now,
      image: item.image || null,
    }));
    setDailyLog(prev => [...prev, ...entries]);
  }

  function logRecipe(recipe) {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setDailyLog(prev => [...prev, {
      id: Date.now(),
      name: recipe.name,
      cal: recipe.cal || 0,
      protein: recipe.protein || 0,
      carbs: recipe.carbs || 0,
      fats: recipe.fats || 0,
      type: "cooked",
      time: now,
      image: recipe.image || null,
    }]);
  }

  const goHome = () => setScreen("home");

  const handleHungry = () => {
    const v = getVerdict(goal);
    setVerdict(v);
    setScreen(v.shouldSwipe ? "swipeVerdict" : "cookVerdict");
  };

  const handleGoalChange = (newGoal) => {
    setGoal(newGoal);
  };

  const handleMadeThis = (savings, recipe) => {
    setTotalSaved((prev) => prev + savings);
    setCookHistory((prev) => [...prev, { name: recipe.name, savings, image: recipe.image }]);
    logRecipe(recipe);
    setScreen("savings");
  };

  const bottomNavProps = {
    onHome: goHome,
    onIntake: () => setScreen("intake"),
    onVerdict: () => { const v = getVerdict(goal); setVerdict(v); setScreen(v.shouldSwipe ? "swipeVerdict" : "cookVerdict"); },
    onSavings: () => setScreen("savings"),
  };

  const openMenu = () => setMenuOpen(true);

  return (
    <div style={s.app}>
      <div style={s.phone}>
        {screen === "home" && (
          <HomeScreen
            goal={goal}
            totalSaved={totalSaved}
            cookCount={cookHistory.length}
            onHungry={handleHungry}
            onGoalChange={handleGoalChange}
            onMenu={openMenu}
            bottomNavProps={{ ...bottomNavProps, active: "home" }}
          />
        )}
        {screen === "cookVerdict" && (
          <CookVerdictScreen
            verdict={verdict}
            goal={goal}
            onSeeRecipe={() => setScreen("recipe")}
            onSeeMenu={() => setScreen("menu")}
            onMenu={openMenu}
            bottomNavProps={{ ...bottomNavProps, active: "verdict" }}
          />
        )}
        {screen === "swipeVerdict" && (
          <SwipeVerdictScreen
            verdict={verdict}
            goal={goal}
            onBack={goHome}
            onSeeMenu={() => setScreen("menu")}
            onSeeRecipes={() => setScreen("recipes")}
          />
        )}
        {screen === "recipe" && (
          <RecipeDetailScreen
            recipe={browseRecipe || verdict.recipe}
            onBack={() => setScreen(browseRecipe ? "recipes" : "cookVerdict")}
            onMadeThis={(savings, recipe) => { setBrowseRecipe(null); handleMadeThis(savings, recipe); }}
          />
        )}
        {screen === "recipes" && (
          <RecipeBrowseScreen
            goal={goal}
            onBack={() => setScreen("swipeVerdict")}
            onSelectRecipe={(recipe) => { setBrowseRecipe(recipe); setScreen("recipe"); }}
            onScanPantry={() => setScreen("pantry")}
          />
        )}
        {screen === "pantry" && (
          <PantryScannerScreen
            onBack={() => setScreen("recipes")}
            onSelectRecipe={(recipe) => { setBrowseRecipe(recipe); setScreen("recipe"); }}
          />
        )}
        {screen === "menu" && (
          <FullMenuScreen
            verdict={verdict}
            goal={goal}
            prefs={prefs}
            onBack={() => setScreen(verdict.shouldSwipe ? "swipeVerdict" : "cookVerdict")}
            onSelectItem={() => {}}
            onLockIn={(items) => { logMeals(items); setScreen("intake"); }}
          />
        )}
        {screen === "savings" && (
          <SavingsScreen
            totalSaved={totalSaved}
            cookHistory={cookHistory}
            onBack={goHome}
            onCookFromPantry={handleHungry}
            bottomNavProps={{ ...bottomNavProps, active: "savings" }}
          />
        )}
        {screen === "intake" && (
          <DailyIntakeScreen
            dailyLog={dailyLog}
            prefs={prefs}
            onBack={() => setScreen("home")}
            {...bottomNavProps}
            active="intake"
          />
        )}

        {/* Preferences panel — rendered on top of all screens */}
        {menuOpen && (
          <PreferencesPanel
            prefs={prefs}
            onSave={(updated) => { setPrefs(updated); setMenuOpen(false); }}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  // Shell
  app: {
    minHeight: "100vh",
    background: "#e6d7d1",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "12px 0",
    fontFamily: T.font,
  },
  phone: {
    width: "100%",
    maxWidth: 420,
    minHeight: "calc(100vh - 24px)",
    background: T.bg,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  screen: {
    minHeight: "calc(100vh - 24px)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },

  // Top nav - full (hamburger + logo + avatar)
  topNavFull: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px 14px",
    background: "rgba(255,248,246,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  navIconBtn: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "50%",
  },
  navAvatarBtn: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "50%",
  },
  navLogo: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "#c2440a",
    fontFamily: T.font,
  },

  // Top nav - back
  topNavBack: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px 14px",
    background: "rgba(255,248,246,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  navBackBtn: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: T.surfaceLowest,
    border: "none",
    cursor: "pointer",
    borderRadius: "50%",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  navBackTitle: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: T.onSurface,
  },

  // Bottom nav
  bottomNav: {
    position: "fixed",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "rgba(28,25,23,0.9)",
    backdropFilter: "blur(16px)",
    borderRadius: 9999,
    padding: "8px 10px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  navTab: {
    width: 52,
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "50%",
    transition: "background 0.2s ease",
  },
  navTabActive: {
    background: "rgba(255,255,255,0.15)",
  },

  // Home screen
  homeMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "96px 24px 48px",
  },
  homeHeadline: {
    fontSize: 40,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: T.onBg,
    margin: "0 0 24px",
    textAlign: "center",
  },
  homeImageWrap: {
    position: "relative",
    width: 280,
    height: 280,
    margin: "0 auto 24px",
  },
  homeImageBg: {
    position: "absolute",
    inset: 0,
    background: T.secondaryContainer,
    borderRadius: 40,
    transform: "rotate(3deg)",
    opacity: 0.25,
  },
  homeImage: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 40,
    boxShadow: "0 20px 60px rgba(33,26,23,0.12)",
  },
  savingsBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: `${T.secondaryContainer}4D`,
    borderRadius: 9999,
    padding: "10px 18px",
    border: "none",
    cursor: "pointer",
    marginBottom: 16,
    fontFamily: T.font,
  },
  savingsBadgeText: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.onSecondaryContainer,
  },
  hungryBtn: {
    width: "100%",
    height: 56,
    background: T.primary,
    color: "#fff",
    border: "none",
    borderRadius: 9999,
    fontSize: 18,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: T.font,
    boxShadow: "0 8px 24px rgba(146,75,37,0.3)",
    transition: "transform 0.15s ease",
    marginBottom: 20,
  },
  goalChips: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  goalChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: 9999,
    border: `1px solid ${T.outlineVariant}`,
    background: "transparent",
    color: T.onSurfaceVariant,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: T.font,
    transition: "all 0.15s ease",
  },
  goalChipActive: {
    background: T.primary,
    borderColor: T.primary,
    color: "#ffffff",
  },
  goalChipDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  blob1: {
    position: "fixed",
    top: "25%",
    left: -80,
    width: 240,
    height: 240,
    background: `${T.primary}0D`,
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  blob2: {
    position: "fixed",
    bottom: "25%",
    right: -80,
    width: 240,
    height: 240,
    background: `${T.secondary}0D`,
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
    zIndex: 0,
  },

  // Verdict screens shared
  verdictMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px 24px 220px",
    gap: 20,
    overflowY: "auto",
  },
  verdictHeroCard: {
    width: "100%",
    maxWidth: 380,
    aspectRatio: "3/4",
    borderRadius: 40,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(91,138,114,0.2)",
  },
  heroDecal: {
    position: "absolute",
    top: -20,
    right: -20,
    pointerEvents: "none",
    zIndex: 0,
  },
  heroPills: {
    display: "flex",
    gap: 8,
    position: "relative",
    zIndex: 1,
  },
  heroPill: {
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 9999,
    padding: "8px 16px",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#fff",
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 0.95,
    color: "#fff",
    margin: 0,
    position: "relative",
    zIndex: 1,
  },
  heroRecipeName: {
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 16px",
    lineHeight: 1.3,
    position: "relative",
    zIndex: 1,
  },
  heroThumb: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
    border: "2px solid rgba(255,255,255,0.3)",
    transform: "rotate(3deg)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    position: "relative",
    zIndex: 1,
  },

  // DoorDash breakdown card
  ddCard: {
    width: "100%",
    maxWidth: 380,
  },
  ddCardInner: {
    display: "flex",
    alignItems: "flex-start",
    background: T.surfaceLowest,
    padding: 24,
    borderRadius: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    border: `1px solid ${T.surfaceLow}`,
  },
  ddLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    marginBottom: 12,
  },
  ddList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  ddRow: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 160,
    fontSize: 12,
    fontWeight: 500,
    color: T.onSurfaceVariant,
  },
  ddRowLabel: { color: T.onSurfaceVariant },
  ddRowVal: { color: T.onSurface, fontWeight: 600 },
  ddSubtotalRow: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 160,
    fontSize: 13,
    fontWeight: 700,
    color: T.onSurface,
    paddingTop: 8,
    borderTop: `1px solid ${T.surfaceLow}`,
    marginTop: 4,
  },
  ddStrike: {
    textDecoration: "line-through",
    fontSize: 15,
    color: "#ba1a1a",
    opacity: 0.7,
  },
  ddSavedBox: {
    textAlign: "right",
    marginLeft: 16,
    flexShrink: 0,
  },
  ddSavedLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.secondary,
    marginBottom: 4,
  },
  ddSavedAmount: {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: T.secondary,
    lineHeight: 1,
  },

  // Swipe verdict detail
  swipeDetails: {
    width: "100%",
    maxWidth: 380,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  swipeItemHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },
  swipeStation: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.primary,
    display: "block",
    marginBottom: 4,
  },
  swipeItemName: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: T.onSurface,
    margin: 0,
    lineHeight: 1.2,
  },
  swipeCalBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    flexShrink: 0,
  },
  swipeCalNum: {
    fontSize: 28,
    fontWeight: 700,
    color: T.secondary,
  },
  swipeCalLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
  },
  swipeQuip: {
    fontSize: 17,
    fontStyle: "italic",
    color: T.onSurfaceVariant,
    lineHeight: 1.5,
    margin: 0,
  },
  macroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
  },
  macroBox: {
    padding: 16,
    background: T.surfaceLow,
    borderRadius: 16,
    border: `1px solid ${T.outlineVariant}4D`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    marginBottom: 4,
    display: "block",
  },
  macroVal: {
    fontSize: 17,
    fontWeight: 600,
    color: T.onSurface,
  },

  // Fixed CTAs
  fixedCTA: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    padding: "0 24px 108px",
    background: "linear-gradient(to top, #fff8f6 75%, transparent)",
    zIndex: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  fixedCTASwipe: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    padding: "0 24px 108px",
    background: "linear-gradient(to top, #fff8f6 75%, transparent)",
    zIndex: 40,
  },
  smarter: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    textAlign: "center",
  },
  primaryBtn: {
    width: "100%",
    height: 56,
    background: T.primary,
    color: "#fff",
    border: "none",
    borderRadius: 9999,
    fontSize: 18,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: T.font,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 8px 24px rgba(146,75,37,0.3)",
    transition: "transform 0.15s ease",
  },

  // Recipe detail
  recipeImageWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "4/3",
    overflow: "hidden",
    marginTop: 60,
  },
  recipeImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  recipeImageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, #fff8f6 5%, transparent)",
    opacity: 0.7,
  },
  recipeArticle: {
    padding: "0 16px",
    marginTop: -48,
    position: "relative",
    zIndex: 1,
  },
  recipeTitle: {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: T.onBg,
    margin: "0 0 16px",
  },
  recipeTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 32,
  },
  recipeTagChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    background: `${T.secondaryContainer}80`,
    color: T.onSecondaryContainer,
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
  },
  recipeNutritionRow: {
    display: "flex",
    justifyContent: "space-between",
    background: T.surfaceHigh,
    borderRadius: 16,
    padding: "16px 8px",
    marginBottom: 20,
  },
  recipeNutritionCell: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    borderRight: `1px solid ${T.outlineVariant}`,
    padding: "0 4px",
  },
  recipeNutritionVal: {
    fontSize: 22,
    fontWeight: 800,
    color: T.onSurface,
    lineHeight: 1,
    fontFamily: T.font,
  },
  recipeNutritionUnit: {
    fontSize: 10,
    fontWeight: 600,
    color: T.onSurfaceVariant,
    letterSpacing: "0.04em",
    fontFamily: T.font,
  },
  recipeNutritionLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: T.outline,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: T.font,
    marginTop: 2,
  },
  storeRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "16px 18px",
    background: T.surfaceLow,
    borderRadius: 20,
    marginBottom: 40,
    border: `1px solid ${T.primaryContainer}33`,
  },
  storeIcon: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: T.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  storeLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    marginBottom: 2,
  },
  storeName: {
    fontSize: 15,
    fontWeight: 700,
    color: T.onSurface,
  },
  recipeSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: T.onBg,
    margin: 0,
  },
  sectionMeta: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.outline,
  },
  ingredientRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.5)",
    borderRadius: 12,
    border: `1px solid transparent`,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: `${T.secondary}99`,
    flexShrink: 0,
  },
  ingredientName: {
    fontSize: 15,
    fontWeight: 500,
    color: T.onSurface,
    display: "block",
  },
  ingredientQty: {
    fontSize: 12,
    fontWeight: 600,
    color: T.secondary,
    display: "block",
    marginTop: 1,
    letterSpacing: "0.02em",
  },
  ingredientPrice: {
    fontSize: 15,
    fontWeight: 600,
    color: T.onSurfaceVariant,
  },
  stepRow: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },
  stepNum: {
    fontSize: 40,
    fontWeight: 800,
    color: `${T.primary}1A`,
    lineHeight: 1,
    flexShrink: 0,
    letterSpacing: "-0.02em",
    minWidth: 48,
  },
  stepText: {
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.6,
    color: T.onSurface,
    margin: 0,
    paddingTop: 8,
  },
  recipeCTAWrap: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    padding: "0 16px 24px",
    paddingTop: 48,
    background: "linear-gradient(to top, #fff8f6 70%, transparent)",
    zIndex: 40,
  },
  madeItCelebration: {
    width: "100%",
    height: 56,
    background: T.secondaryContainer,
    color: T.onSecondaryContainer,
    borderRadius: 9999,
    fontSize: 17,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  // Full menu screen
  menuNavBar: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "rgba(250,247,242,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${T.surfaceHigh}33`,
  },
  menuNavBtn: {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: T.surfaceLowest,
    border: `1px solid ${T.outlineVariant}33`,
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  menuNavTitle: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: T.onSurface,
  },
  menuNavSub: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: T.outline,
    textAlign: "center",
    marginTop: 2,
  },
  menuMain: {
    padding: "32px 20px 48px",
  },
  menuHeadline: {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: T.onSurface,
    margin: "0 0 10px",
  },
  menuSubline: {
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.5,
    color: T.onSurfaceVariant,
    maxWidth: 280,
    margin: 0,
  },
  stationHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
    paddingBottom: 10,
    borderBottom: `1px solid ${T.outlineVariant}66`,
  },
  stationName: {
    fontSize: 22,
    fontWeight: 700,
    color: T.onSurface,
    margin: 0,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    background: T.surfaceLowest,
    borderRadius: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
    cursor: "pointer",
    listStyle: "none",
  },
  menuItemName: {
    fontSize: 15,
    fontWeight: 600,
    color: T.onSurface,
    marginBottom: 6,
  },
  menuItemMeta: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: T.outline,
  },
  menuBadge: {
    padding: "4px 10px",
    borderRadius: 9999,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.06em",
    flexShrink: 0,
    marginLeft: 10,
  },
  menuFooter: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: `${T.outline}99`,
  },

  // Savings screen
  savingsNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px 12px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,248,246,0.85)",
    backdropFilter: "blur(12px)",
  },
  savingsMain: {
    padding: "32px 24px 160px",
  },
  lifetimeLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    marginBottom: 8,
  },
  lifetimeAmount: {
    fontSize: 40,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: T.onSurface,
    margin: "0 0 12px",
  },
  lifetimeDesc: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.5,
    color: T.onSurfaceVariant,
    maxWidth: 280,
    margin: 0,
  },
  levelCard: {
    padding: 24,
    borderRadius: 40,
    background: `${T.secondaryContainer}33`,
    border: `1px solid ${T.secondaryContainer}66`,
    position: "relative",
    overflow: "hidden",
    marginBottom: 40,
    aspectRatio: "1.6/1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  levelIconBox: {
    width: 56,
    height: 56,
    background: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  levelBadge: {
    background: T.onSecondaryContainer,
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 9999,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
  levelTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: T.onSecondaryContainer,
    margin: "0 0 4px",
  },
  levelDesc: {
    fontSize: 14,
    color: `${T.onSecondaryContainer}CC`,
    margin: 0,
  },
  levelBigIcon: {
    position: "absolute",
    right: -16,
    bottom: -16,
    pointerEvents: "none",
  },
  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: T.onSurface,
    margin: 0,
  },
  seeAllBtn: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.primary,
    background: `${T.primary}0D`,
    border: "none",
    borderRadius: 9999,
    padding: "6px 12px",
    cursor: "pointer",
    fontFamily: T.font,
  },
  historyRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: T.surfaceLowest,
    padding: 12,
    borderRadius: 28,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  historyThumb: {
    width: 64,
    height: 64,
    borderRadius: 16,
    overflow: "hidden",
    flexShrink: 0,
  },
  historyName: {
    fontSize: 15,
    fontWeight: 700,
    color: T.onSurface,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: 400,
    color: T.onSurfaceVariant,
  },
  historySavings: {
    textAlign: "right",
    paddingRight: 8,
    flexShrink: 0,
  },
  historySavingsAmt: {
    fontSize: 16,
    fontWeight: 600,
    color: T.onSecondaryContainer,
    marginBottom: 2,
  },
  historySavingsLabel: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
  },
  tipCard: {
    padding: 28,
    borderRadius: 40,
    background: "#1c1917",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  tipIconBox: {
    width: 56,
    height: 56,
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 8px",
  },
  tipDesc: {
    fontSize: 14,
    color: "#a8a29e",
    margin: "0 0 24px",
    maxWidth: 240,
    lineHeight: 1.5,
  },
  tipBtn: {
    width: "100%",
    padding: "16px",
    background: "#f26419",
    color: "#fff",
    border: "none",
    borderRadius: 9999,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: T.font,
    boxShadow: "0 4px 16px rgba(242,100,25,0.3)",
    transition: "transform 0.15s ease",
  },

  // Daily Intake screen
  intakeNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px 24px 16px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,248,246,0.9)",
    backdropFilter: "blur(12px)",
  },
  intakeNavLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.primary,
    margin: "0 0 4px",
  },
  intakeNavDate: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: T.onSurface,
    margin: 0,
  },
  intakeMain: {
    padding: "16px 20px 160px",
  },
  intakeRingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    marginBottom: 20,
    padding: "20px 0",
  },
  intakeRingStats: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  intakeStatBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  intakeStatNum: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: T.onSurface,
    lineHeight: 1,
  },
  intakeStatLabel: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: T.onSurfaceVariant,
    marginTop: 2,
  },
  intakeMacroCard: {
    background: T.surfaceLowest,
    borderRadius: 24,
    padding: "20px 20px 6px",
    marginBottom: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    border: `1px solid ${T.surfaceHigh}`,
  },
  intakeCardLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    margin: "0 0 16px",
  },
  intakeMealRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: T.surfaceLowest,
    borderRadius: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  intakeMealThumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    flexShrink: 0,
    background: T.surfaceLow,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  intakeMealName: {
    fontSize: 14,
    fontWeight: 700,
    color: T.onSurface,
    marginBottom: 3,
    lineHeight: 1.3,
  },
  intakeMealMeta: {
    fontSize: 11,
    color: T.onSurfaceVariant,
    fontWeight: 500,
  },
  intakeMealTime: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: T.outline,
    marginTop: 4,
    textTransform: "uppercase",
  },
  intakeMealCal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    flexShrink: 0,
    paddingRight: 4,
  },
  intakeMealCalNum: {
    fontSize: 18,
    fontWeight: 700,
    color: T.onSurface,
    lineHeight: 1,
  },
  intakeMealCalLabel: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    marginTop: 2,
  },
  intakeEmptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "48px 24px",
    background: T.surfaceLow,
    borderRadius: 24,
    border: `1px dashed ${T.outlineVariant}`,
  },
  intakeEmptyTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: T.onSurface,
    margin: "0 0 8px",
  },
  intakeEmptyDesc: {
    fontSize: 14,
    color: T.onSurfaceVariant,
    lineHeight: 1.6,
    maxWidth: 240,
    margin: 0,
  },

  // Package note banner
  pkgNoteBanner: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    background: `${T.secondaryContainer}40`,
    borderRadius: 10,
    marginBottom: 14,
  },
  pkgNoteText: {
    fontSize: 12,
    fontWeight: 600,
    color: T.onSecondaryContainer,
  },

  // Cook Instead button
  cookInsteadBtn: {
    width: "100%",
    height: 48,
    background: `${T.secondaryContainer}50`,
    border: `1px solid ${T.secondaryContainer}`,
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 600,
    color: T.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    fontFamily: T.font,
  },

  // Recipe Browse screen
  pantryBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: `${T.secondaryContainer}30`,
    border: `1px solid ${T.secondaryContainer}`,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: 600,
    color: T.secondary,
    cursor: "pointer",
    fontFamily: T.font,
  },
  recipeCard: {
    display: "flex",
    alignItems: "stretch",
    gap: 14,
    background: T.surfaceLowest,
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    cursor: "pointer",
    padding: 12,
  },
  recipeCardThumb: {
    width: 88,
    height: 88,
    borderRadius: 14,
    overflow: "hidden",
    flexShrink: 0,
  },
  recipeCardBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  recipeCardTag: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: 9999,
    background: T.surfaceHigh,
    color: T.onSurfaceVariant,
  },
  recipeCardName: {
    fontSize: 16,
    fontWeight: 700,
    color: T.onSurface,
    margin: "0 0 6px",
    lineHeight: 1.3,
  },
  recipeCardMeta: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  recipeCardMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: T.onSurfaceVariant,
    fontWeight: 500,
  },

  // Pantry scanner screen
  viewfinder: {
    marginTop: 60,
    padding: "24px 32px",
    display: "flex",
    justifyContent: "center",
  },
  scanFrame: {
    width: "100%",
    maxWidth: 320,
    aspectRatio: "1/1",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 24,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 20,
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: T.secondary,
    borderStyle: "solid",
  },
  corner_tl: { top: 16, left: 16, borderWidth: "2px 0 0 2px", borderRadius: "6px 0 0 0" },
  corner_tr: { top: 16, right: 16, borderWidth: "2px 2px 0 0", borderRadius: "0 6px 0 0" },
  corner_bl: { bottom: 16, left: 16, borderWidth: "0 0 2px 2px", borderRadius: "0 0 0 6px" },
  corner_br: { bottom: 16, right: 16, borderWidth: "0 2px 2px 0", borderRadius: "0 0 6px 0" },
  scanLine: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 2,
    background: `linear-gradient(to right, transparent, ${T.secondary}, transparent)`,
    borderRadius: 1,
    transition: "top 0.05s linear",
    boxShadow: `0 0 8px ${T.secondary}80`,
  },
  scanHint: {
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    margin: 0,
    position: "relative",
    zIndex: 1,
  },
  pantryResults: {
    padding: "8px 24px 48px",
  },
  pantryResultsLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    marginBottom: 12,
  },
  pantryChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  pantryChip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 500,
    color: "#f5f0ec",
    fontFamily: T.font,
  },
  pantryRecipeRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: 12,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
  },
  pantryRecipeThumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    flexShrink: 0,
  },

  // Plan My Meal tray sheet
  menuItemSelected: {
    background: `${T.secondaryContainer}33`,
  },
  traySheet: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 420,
    background: T.surfaceLowest,
    borderRadius: "28px 28px 0 0",
    padding: "20px 24px 36px",
    boxShadow: "0 -8px 40px rgba(33,26,23,0.12)",
    border: `1px solid ${T.outlineVariant}33`,
    zIndex: 60,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  trayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trayTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: T.onSurface,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: T.font,
  },
  trayCount: {
    background: T.secondary,
    color: "#fff",
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
    padding: "2px 8px",
  },
  trayCancelBtn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: T.surfaceHigh,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trayMacroRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 8,
  },
  trayMacroBox: {
    background: T.surfaceLow,
    borderRadius: 14,
    padding: "10px 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  trayMacroLabel: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
  },
  trayMacroVal: {
    fontSize: 16,
    fontWeight: 700,
    color: T.onSurface,
  },
  trayMatchChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    borderRadius: 12,
  },
  trayLockedMsg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "12px 0",
  },

  // Tray goal progress
  trayGoalSection: {
    borderTop: `1px solid ${T.surfaceHigh}`,
    paddingTop: 14,
  },
  trayGoalLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    margin: "0 0 10px",
  },
  trayGoalRow: {
    marginBottom: 10,
  },
  trayGoalMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 5,
  },
  trayGoalName: {
    fontSize: 12,
    fontWeight: 600,
    color: T.onSurface,
  },
  trayGoalPct: {
    fontSize: 11,
    fontWeight: 500,
  },
  trayGoalBar: {
    height: 6,
    background: T.surfaceHigh,
    borderRadius: 9999,
    overflow: "hidden",
  },
  trayGoalFill: {
    height: "100%",
    borderRadius: 9999,
    transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1)",
  },

  // Preferences panel
  prefsWrap: {
    position: "absolute",
    inset: 0,
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  prefsBackdrop: {
    position: "absolute",
    inset: 0,
    background: "rgba(33,26,23,0.5)",
    backdropFilter: "blur(4px)",
  },
  prefsPanel: {
    position: "relative",
    zIndex: 1,
    background: T.surfaceLowest,
    borderRadius: "28px 28px 0 0",
    padding: "12px 24px 40px",
    maxHeight: "88%",
    overflowY: "auto",
    boxShadow: "0 -8px 40px rgba(33,26,23,0.15)",
  },
  prefsHandle: {
    width: 36,
    height: 4,
    background: T.outlineVariant,
    borderRadius: 9999,
    margin: "0 auto 20px",
  },
  prefsProfileRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  prefsAvatarCircle: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: `${T.primaryContainer}30`,
    border: `1px solid ${T.primaryContainer}66`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  prefsProfileName: {
    fontSize: 18,
    fontWeight: 700,
    color: T.onSurface,
    marginBottom: 2,
  },
  prefsProfileSub: {
    fontSize: 13,
    color: T.onSurfaceVariant,
  },

  // Goal preset cards
  prefsPresetGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 20,
  },
  prefsPresetCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    padding: "14px 16px",
    background: T.surfaceLow,
    border: `2px solid transparent`,
    borderRadius: 18,
    cursor: "pointer",
    fontFamily: T.font,
    textAlign: "left",
    transition: "all 0.15s ease",
  },
  prefsPresetCardActive: {
    background: `${T.secondaryContainer}50`,
    borderColor: T.secondary,
  },
  prefsPresetLabel: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  prefsPresetDesc: {
    fontSize: 11,
    fontWeight: 500,
  },

  // Derived note
  prefsDerivedNote: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    padding: "12px 14px",
    background: `${T.secondaryContainer}30`,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 13,
    color: T.onSurfaceVariant,
    lineHeight: 1.5,
  },

  // TDEE link
  tdeeLinkRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    background: T.surfaceLow,
    borderRadius: 16,
    marginBottom: 20,
    textDecoration: "none",
    border: `1px solid ${T.outlineVariant}66`,
  },
  tdeeLinkIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: `${T.primaryContainer}30`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tdeeLinkTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: T.onSurface,
    marginBottom: 2,
  },
  tdeeLinkSub: {
    fontSize: 12,
    color: T.onSurfaceVariant,
  },

  // Hint text under label
  prefsRowHint: {
    fontSize: 11,
    color: T.onSurfaceVariant,
    fontWeight: 400,
    marginTop: 2,
  },
  prefsCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: T.surfaceHigh,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginLeft: "auto",
  },
  prefsDivider: {
    height: 1,
    background: T.surfaceHigh,
    margin: "0 0 20px",
  },
  prefsSectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.onSurfaceVariant,
    margin: "0 0 14px",
  },
  prefsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    background: T.surfaceLow,
    borderRadius: 14,
    marginBottom: 4,
  },
  prefsRowLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: T.onSurface,
  },
  prefsStepper: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  prefsStepBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: T.surfaceLowest,
    border: `1px solid ${T.outlineVariant}`,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  prefsStepVal: {
    fontSize: 16,
    fontWeight: 700,
    color: T.onSurface,
    minWidth: 72,
    textAlign: "center",
  },
  prefsStepUnit: {
    fontSize: 12,
    fontWeight: 500,
    color: T.onSurfaceVariant,
  },
  prefsAllergyGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 28,
  },
  prefsAllergyChip: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "8px 14px",
    background: T.surfaceLow,
    border: `1px solid ${T.outlineVariant}`,
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 600,
    color: T.onSurfaceVariant,
    cursor: "pointer",
    fontFamily: T.font,
    transition: "all 0.15s ease",
  },
  prefsAllergyActive: {
    background: `${T.secondaryContainer}60`,
    borderColor: T.secondary,
    color: T.onSecondaryContainer,
  },
  prefsSaveBtn: {
    width: "100%",
    height: 52,
    background: T.primary,
    color: "#fff",
    border: "none",
    borderRadius: 9999,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: T.font,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 8px 24px rgba(146,75,37,0.25)",
  },
};

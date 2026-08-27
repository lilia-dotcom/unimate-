import {
  Wallet,
  TrendingDown,
  PiggyBank,
  Plus,
  Coffee,
  Bus,
  BookOpen,
  Utensils,
  Gamepad2,
  Target,
  Flame,
  Sparkles,
  Trash2,
  X,
  CalendarDays,
  Zap,
  CircleDollarSign,
  ChevronRight,
  Pencil,
  Check,
  ShoppingBag,
  Trophy,
  ShieldCheck,
  ArrowUpRight,
  Star,
  Award,
} from "lucide-react";

import { useMemo, useState } from "react";

function Budget() {
  /* =====================================================
     DATA
  ===================================================== */

  const [monthlyBudget, setMonthlyBudget] = useState(600);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Coffee",
      amount: 5,
      category: "Coffee",
      date: "Today",
    },
    {
      id: 2,
      name: "University supplies",
      amount: 32,
      category: "Study",
      date: "Yesterday",
    },
    {
      id: 3,
      name: "Lunch",
      amount: 18,
      category: "Food",
      date: "Yesterday",
    },
    {
      id: 4,
      name: "Bus card",
      amount: 12,
      category: "Transport",
      date: "Monday",
    },
  ]);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "New Headphones",
      current: 120,
      target: 200,
      icon: "🎧",
    },
    {
      id: 2,
      title: "New Laptop",
      current: 450,
      target: 1200,
      icon: "💻",
    },
  ]);

  const [showExpense, setShowExpense] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [showMoney, setShowMoney] = useState(null);
  const [showBudget, setShowBudget] = useState(false);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] =
    useState("Food");

  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalIcon, setGoalIcon] = useState("🎯");

  const [moneyAmount, setMoneyAmount] = useState("");
  const [newBudget, setNewBudget] = useState("");

  const [noSpendDays, setNoSpendDays] = useState(2);
  const noSpendTarget = 3;

  /* =====================================================
     CATEGORY ICONS
  ===================================================== */

  const categoryIcons = {
    Food: Utensils,
    Transport: Bus,
    Study: BookOpen,
    Coffee: Coffee,
    Fun: Gamepad2,
    Shopping: ShoppingBag,
    Other: Wallet,
  };

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }, [expenses]);

  const remaining = Math.max(
    monthlyBudget - totalSpent,
    0
  );

  const spendingPercentage =
    monthlyBudget > 0
      ? Math.min(
          Math.round(
            (totalSpent / monthlyBudget) * 100
          ),
          100
        )
      : 0;

  const remainingPercentage =
    monthlyBudget > 0
      ? Math.max(
          Math.round(
            (remaining / monthlyBudget) * 100
          ),
          0
        )
      : 0;

  const daysLeft = Math.max(
    30 - new Date().getDate() + 1,
    1
  );

  const dailyLimit = Math.round(
    remaining / daysLeft
  );

  const averageDailySpend =
    totalSpent > 0
      ? Math.round(
          totalSpent /
            Math.max(new Date().getDate(), 1)
        )
      : 0;

  /* =====================================================
     GOALS
  ===================================================== */

  const totalGoalProgress = useMemo(() => {
    if (!goals.length) return 0;

    const current = goals.reduce(
      (sum, goal) => sum + goal.current,
      0
    );

    const target = goals.reduce(
      (sum, goal) => sum + goal.target,
      0
    );

    return target > 0
      ? Math.round((current / target) * 100)
      : 0;
  }, [goals]);

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categoryTotals = useMemo(() => {
    const totals = {
      Food: 0,
      Transport: 0,
      Study: 0,
      Coffee: 0,
      Fun: 0,
      Shopping: 0,
      Other: 0,
    };

    expenses.forEach((expense) => {
      if (totals[expense.category] !== undefined) {
        totals[expense.category] += expense.amount;
      }
    });

    return totals;
  }, [expenses]);

  const categories = Object.entries(categoryTotals)
    .filter(([, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => ({
      name,
      amount,
      icon: categoryIcons[name],
    }));

  const topCategory =
    categories.length > 0
      ? categories[0]
      : null;

  /* =====================================================
     MONEY HEALTH
  ===================================================== */

  const moneyScore =
    spendingPercentage <= 40
      ? 95
      : spendingPercentage <= 60
      ? 85
      : spendingPercentage <= 75
      ? 72
      : spendingPercentage <= 90
      ? 58
      : 40;

  const moneyStatus =
    moneyScore >= 85
      ? "Excellent"
      : moneyScore >= 70
      ? "Good"
      : moneyScore >= 55
      ? "Careful"
      : "Needs attention";

  /* =====================================================
     SMART INSIGHT
  ===================================================== */

  const insight = useMemo(() => {
    if (totalSpent === 0) {
      return {
        title: "Your money journey starts here ✨",
        text:
          "Add your first expense and UniMate will start learning your spending habits.",
      };
    }

    if (spendingPercentage >= 90) {
      return {
        title: "Slow down a little 🚨",
        text:
          "You've used almost all of your monthly budget. Keep your next purchases essential.",
      };
    }

    if (topCategory?.name === "Coffee") {
      return {
        title: "Coffee is adding up ☕",
        text:
          "Small daily purchases can quietly become a big monthly expense.",
      };
    }

    if (topCategory) {
      return {
        title: `${topCategory.name} is your biggest category`,
        text:
          `${topCategory.amount} is currently going toward ${topCategory.name}. Keep an eye on it to protect your savings.`,
      };
    }

    return {
      title: "You're on a good track 💜",
      text:
        "Your spending is still manageable. Keep checking your budget before non-essential purchases.",
    };
  }, [
    totalSpent,
    spendingPercentage,
    topCategory,
  ]);

  /* =====================================================
     SAVING PROJECTION
  ===================================================== */

  const laptopGoal = goals.find(
    (goal) => goal.title === "New Laptop"
  );

  const laptopRemaining = laptopGoal
    ? Math.max(
        laptopGoal.target - laptopGoal.current,
        0
      )
    : 0;

  const projectedMonths =
    remaining > 0 && laptopRemaining > 0
      ? Math.ceil(
          laptopRemaining / remaining
        )
      : 0;

  /* =====================================================
     ACHIEVEMENTS
  ===================================================== */

  const achievements = [
    {
      icon: "🌱",
      title: "First Step",
      text: "Track your first expense",
      unlocked: expenses.length > 0,
    },
    {
      icon: "💰",
      title: "Saver",
      text: "Keep money available",
      unlocked: remaining >= monthlyBudget * 0.5,
    },
    {
      icon: "🔥",
      title: "7 Day Streak",
      text: "Stay under your daily target",
      unlocked: noSpendDays >= 3,
    },
    {
      icon: "🎯",
      title: "Goal Setter",
      text: "Create a savings goal",
      unlocked: goals.length > 0,
    },
  ];

  const unlockedAchievements =
    achievements.filter(
      (achievement) => achievement.unlocked
    ).length;

  /* =====================================================
     ADD EXPENSE
  ===================================================== */

  const addExpense = () => {
    const amount = Number(expenseAmount);

    if (
      !expenseName.trim() ||
      !amount ||
      amount <= 0
    ) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName.trim(),
      amount,
      category: expenseCategory,
      date: "Today",
    };

    setExpenses((previous) => [
      newExpense,
      ...previous,
    ]);

    setExpenseName("");
    setExpenseAmount("");
    setExpenseCategory("Food");
    setShowExpense(false);
  };

  /* =====================================================
     QUICK EXPENSE
  ===================================================== */

  const quickExpense = (
    name,
    amount,
    category
  ) => {
    setExpenses((previous) => [
      {
        id: Date.now(),
        name,
        amount,
        category,
        date: "Today",
      },
      ...previous,
    ]);
  };

  /* =====================================================
     DELETE EXPENSE
  ===================================================== */

  const deleteExpense = (id) => {
    setExpenses((previous) =>
      previous.filter(
        (expense) => expense.id !== id
      )
    );
  };

  /* =====================================================
     ADD GOAL
  ===================================================== */

  const addGoal = () => {
    const target = Number(goalTarget);

    if (
      !goalTitle.trim() ||
      !target ||
      target <= 0
    ) {
      return;
    }

    setGoals((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: goalTitle.trim(),
        current: 0,
        target,
        icon: goalIcon,
      },
    ]);

    setGoalTitle("");
    setGoalTarget("");
    setGoalIcon("🎯");
    setShowGoal(false);
  };

  /* =====================================================
     ADD MONEY
  ===================================================== */

  const addMoneyToGoal = () => {
    const amount = Number(moneyAmount);

    if (
      !amount ||
      amount <= 0 ||
      !showMoney
    ) {
      return;
    }

    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== showMoney) {
          return goal;
        }

        return {
          ...goal,
          current: Math.min(
            goal.current + amount,
            goal.target
          ),
        };
      })
    );

    setMoneyAmount("");
    setShowMoney(null);
  };

  /* =====================================================
     UPDATE BUDGET
  ===================================================== */

  const updateBudget = () => {
    const amount = Number(newBudget);

    if (!amount || amount <= 0) {
      return;
    }

    setMonthlyBudget(amount);
    setNewBudget("");
    setShowBudget(false);
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="page money-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header money-hero">

        <div>
          <span className="eyebrow">
            STUDENT MONEY HUB
          </span>

          <h1>
            Your money,
            <br />
            under control. ✨
          </h1>

          <p>
            Track your spending, protect your
            budget and build better money habits.
          </p>
        </div>

        <div className="money-header-actions">

          <button
            className="secondary-button"
            onClick={() =>
              setShowBudget(true)
            }
          >
            <Pencil size={15} />
            Edit budget
          </button>

          <button
            className="primary-button"
            onClick={() =>
              setShowExpense(true)
            }
          >
            <Plus size={17} />
            Add expense
          </button>

        </div>

      </div>

      {/* =================================================
          HEALTH + OVERVIEW
      ================================================= */}

      <section className="money-overview">

        <div className="money-card main-money-card">

          <div className="money-card-icon">
            <Wallet size={21} />
          </div>

          <div>
            <span>AVAILABLE</span>

            <strong>
              ${remaining}
            </strong>

            <small>
              of ${monthlyBudget} monthly budget
            </small>
          </div>

          <div className="money-card-badge">
            {remainingPercentage}% left
          </div>

        </div>

        <div className="money-card">

          <div className="money-card-icon">
            <TrendingDown size={20} />
          </div>

          <div>
            <span>SPENT THIS MONTH</span>

            <strong>
              ${totalSpent}
            </strong>

            <small>
              {spendingPercentage}% used
            </small>
          </div>

        </div>

        <div className="money-card">

          <div className="money-card-icon">
            <PiggyBank size={20} />
          </div>

          <div>
            <span>SAVINGS POTENTIAL</span>

            <strong>
              ${remaining}
            </strong>

            <small>
              If you stay on track
            </small>
          </div>

        </div>

      </section>

      {/* =================================================
          MONEY HEALTH
      ================================================= */}

      <section className="money-health">

        <div className="health-main">

          <div className="health-icon">
            <ShieldCheck size={22} />
          </div>

          <div>
            <span className="card-label">
              MONEY HEALTH
            </span>

            <h2>
              {moneyStatus}
            </h2>

            <p>
              Your spending habits are currently
              {moneyScore >= 80
                ? " looking strong."
                : " worth watching a little more."}
            </p>
          </div>

        </div>

        <div className="health-score">
          <strong>
            {moneyScore}
          </strong>
          <span>/100</span>
        </div>

        <div className="health-bar">
          <div
            style={{
              width: `${moneyScore}%`,
            }}
          />
        </div>

      </section>

      {/* =================================================
          MINI STATS
      ================================================= */}

      <div className="money-mini-grid">

        <div className="money-mini-card">

          <div className="mini-icon">
            <CalendarDays size={17} />
          </div>

          <div>
            <span>DAILY LIMIT</span>
            <strong>${dailyLimit}</strong>
            <small>Suggested for today</small>
          </div>

        </div>

        <div className="money-mini-card">

          <div className="mini-icon">
            <TrendingDown size={17} />
          </div>

          <div>
            <span>DAILY AVERAGE</span>
            <strong>${averageDailySpend}</strong>
            <small>Average spending</small>
          </div>

        </div>

        <div className="money-mini-card">

          <div className="mini-icon">
            <Target size={17} />
          </div>

          <div>
            <span>GOAL PROGRESS</span>
            <strong>{totalGoalProgress}%</strong>
            <small>Across your goals</small>
          </div>

        </div>

        <div className="money-mini-card">

          <div className="mini-icon">
            <Award size={17} />
          </div>

          <div>
            <span>ACHIEVEMENTS</span>
            <strong>
              {unlockedAchievements}/
              {achievements.length}
            </strong>
            <small>Unlocked</small>
          </div>

        </div>

      </div>

      {/* =================================================
          BUDGET PROGRESS
      ================================================= */}

      <section className="money-challenge">

        <div className="challenge-left">

          <div className="challenge-icon">
            <Target size={21} />
          </div>

          <div>
            <span className="card-label">
              MONTHLY BUDGET
            </span>

            <h2>
              ${totalSpent} spent of $
              {monthlyBudget}
            </h2>

            <p>
              {remaining > 0
                ? `$${remaining} left for this month.`
                : "You've reached your budget."}
            </p>
          </div>

        </div>

        <div className="challenge-progress">

          <div className="challenge-progress-top">

            <strong>
              {spendingPercentage}%
            </strong>

            <span>
              ${monthlyBudget}
            </span>

          </div>

          <div className="money-progress">

            <div
              style={{
                width: `${spendingPercentage}%`,
              }}
            />

          </div>

          <small>
            Budget used
          </small>

        </div>

      </section>

      {/* =================================================
          QUICK ADD
      ================================================= */}

      <section className="quick-money-section">

        <div className="section-heading">

          <div>
            <span className="card-label">
              QUICK ADD
            </span>

            <h2>
              Log a small expense
            </h2>
          </div>

          <span className="quick-hint">
            One tap = done
          </span>

        </div>

        <div className="quick-money-grid">

          <button
            onClick={() =>
              quickExpense(
                "Coffee",
                5,
                "Coffee"
              )
            }
          >
            <Coffee size={17} />

            <span>
              Coffee
              <small>$5</small>
            </span>

            <ChevronRight size={15} />
          </button>

          <button
            onClick={() =>
              quickExpense(
                "Lunch",
                12,
                "Food"
              )
            }
          >
            <Utensils size={17} />

            <span>
              Lunch
              <small>$12</small>
            </span>

            <ChevronRight size={15} />
          </button>

          <button
            onClick={() =>
              quickExpense(
                "Bus",
                3,
                "Transport"
              )
            }
          >
            <Bus size={17} />

            <span>
              Bus
              <small>$3</small>
            </span>

            <ChevronRight size={15} />
          </button>

          <button
            onClick={() =>
              quickExpense(
                "Study",
                10,
                "Study"
              )
            }
          >
            <BookOpen size={17} />

            <span>
              Study
              <small>$10</small>
            </span>

            <ChevronRight size={15} />
          </button>

        </div>

      </section>

      {/* =================================================
          NO SPEND CHALLENGE
      ================================================= */}

      <section className="no-spend-card">

        <div className="no-spend-icon">
          <Flame size={22} />
        </div>

        <div className="no-spend-content">

          <span className="card-label">
            MINI CHALLENGE
          </span>

          <h2>
            No-Spend Challenge 🔥
          </h2>

          <p>
            Stay under your daily limit for
            {noSpendTarget} days.
          </p>

          <div className="challenge-dots">

            {Array.from({
              length: noSpendTarget,
            }).map((_, index) => (
              <button
                key={index}
                className={
                  index < noSpendDays
                    ? "challenge-dot active"
                    : "challenge-dot"
                }
                onClick={() =>
                  setNoSpendDays(
                    Math.min(
                      noSpendTarget,
                      index + 1
                    )
                  )
                }
              >
                {index < noSpendDays ? "✓" : index + 1}
              </button>
            ))}

          </div>

        </div>

        <div className="no-spend-reward">
          <Star size={16} />
          <strong>
            +50 XP
          </strong>
        </div>

      </section>

      {/* =================================================
          MAIN GRID
      ================================================= */}

      <div className="money-grid">

        {/* SPENDING */}

        <section className="money-section content-card">

          <div className="money-section-header">

            <div>
              <span className="card-label">
                SPENDING
              </span>

              <h2>
                Where did your money go?
              </h2>
            </div>

            <div className="spending-total">
              ${totalSpent}
            </div>

          </div>

          <div className="spending-list">

            {categories.length === 0 ? (
              <div className="empty-money">
                No expenses yet.
              </div>
            ) : (
              categories.map((category) => {

                const Icon = category.icon;

                const percentage =
                  totalSpent > 0
                    ? Math.round(
                        (category.amount /
                          totalSpent) *
                          100
                      )
                    : 0;

                return (
                  <div
                    className="spending-item"
                    key={category.name}
                  >

                    <div className="spending-icon">
                      <Icon size={17} />
                    </div>

                    <div className="spending-name">

                      <div className="spending-name-top">

                        <strong>
                          {category.name}
                        </strong>

                        <span>
                          {percentage}%
                        </span>

                      </div>

                      <div className="spending-bar">

                        <div
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                    <strong>
                      ${category.amount}
                    </strong>

                  </div>
                );
              })
            )}

          </div>

        </section>

        {/* SMART INSIGHT */}

        <section className="money-insight">

          <div className="insight-icon">
            <Sparkles size={21} />
          </div>

          <span className="card-label">
            SMART MONEY INSIGHT
          </span>

          <h2>
            {insight.title}
          </h2>

          <p>
            {insight.text}
          </p>

          <div className="insight-stat">

            <CircleDollarSign size={17} />

            <strong>
              ${remaining} remaining
            </strong>

          </div>

        </section>

      </div>

      {/* =================================================
          SAVING PROJECTION
      ================================================= */}

      <section className="saving-projection">

        <div className="projection-icon">
          <Zap size={22} />
        </div>

        <div className="projection-content">

          <span className="card-label">
            SMART SAVING PLAN
          </span>

          <h2>
            Your next big purchase
          </h2>

          <p>
            {laptopRemaining > 0
              ? `If you save your remaining monthly money, your laptop goal could take around ${projectedMonths} month${
                  projectedMonths === 1
                    ? ""
                    : "s"
                }.`
              : "You've reached your laptop goal! 🎉"}
          </p>

        </div>

        <div className="projection-number">

          <strong>
            {laptopRemaining > 0
              ? `$${laptopRemaining}`
              : "DONE"}
          </strong>

          <span>
            {laptopRemaining > 0
              ? "left to goal"
              : "goal reached"}
          </span>

        </div>

      </section>

      {/* =================================================
          RECENT EXPENSES
      ================================================= */}

      <section className="recent-expenses content-card">

        <div className="section-heading">

          <div>
            <span className="card-label">
              RECENT ACTIVITY
            </span>

            <h2>
              Latest expenses
            </h2>
          </div>

          <span className="expense-count">
            {expenses.length} transactions
          </span>

        </div>

        <div className="expense-list">

          {expenses.length === 0 ? (
            <div className="empty-money">
              Your expense list is empty.
            </div>
          ) : (
            expenses.map((expense) => {

              const Icon =
                categoryIcons[
                  expense.category
                ] || Wallet;

              return (
                <div
                  className="expense-row"
                  key={expense.id}
                >

                  <div className="expense-icon">
                    <Icon size={17} />
                  </div>

                  <div className="expense-info">

                    <strong>
                      {expense.name}
                    </strong>

                    <span>
                      {expense.category} ·{" "}
                      {expense.date}
                    </span>

                  </div>

                  <strong className="expense-amount">
                    -${expense.amount}
                  </strong>

                  <button
                    className="expense-delete"
                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }
                  >
                    <Trash2 size={15} />
                  </button>

                </div>
              );
            })
          )}

        </div>

      </section>

      {/* =================================================
          SAVINGS GOALS
      ================================================= */}

      <section className="savings-section">

        <div className="section-heading">

          <div>
            <span className="card-label">
              SAVINGS GOALS
            </span>

            <h2>
              Things you're saving for
            </h2>
          </div>

          <button
            className="secondary-button"
            onClick={() =>
              setShowGoal(true)
            }
          >
            <Plus size={16} />
            Add goal
          </button>

        </div>

        <div className="savings-grid">

          {goals.map((goal) => {

            const percentage =
              Math.min(
                Math.round(
                  (goal.current /
                    goal.target) *
                    100
                ),
                100
              );

            return (
              <div
                className="saving-card"
                key={goal.id}
              >

                <div className="saving-top">

                  <div className="saving-emoji">
                    {goal.icon}
                  </div>

                  <span>
                    {percentage}%
                  </span>

                </div>

                <h3>
                  {goal.title}
                </h3>

                <p>
                  ${goal.current} saved of $
                  {goal.target}
                </p>

                <div className="money-progress">

                  <div
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <button
                  className="saving-add"
                  onClick={() =>
                    setShowMoney(goal.id)
                  }
                  disabled={
                    goal.current >=
                    goal.target
                  }
                >

                  {goal.current >=
                  goal.target ? (
                    <>
                      <Check size={15} />
                      Goal reached
                    </>
                  ) : (
                    <>
                      <Plus size={15} />
                      Add money
                    </>
                  )}

                </button>

              </div>
            );
          })}

        </div>

      </section>

      {/* =================================================
          ACHIEVEMENTS
      ================================================= */}

      <section className="achievements-section">

        <div className="section-heading">

          <div>
            <span className="card-label">
              YOUR ACHIEVEMENTS
            </span>

            <h2>
              Build better money habits 🏆
            </h2>
          </div>

          <span className="expense-count">
            {unlockedAchievements} unlocked
          </span>

        </div>

        <div className="achievement-grid">

          {achievements.map(
            (achievement) => (
              <div
                className={
                  achievement.unlocked
                    ? "achievement-card unlocked"
                    : "achievement-card"
                }
                key={achievement.title}
              >

                <div className="achievement-icon">
                  {achievement.icon}
                </div>

                <div>
                  <h3>
                    {achievement.title}
                  </h3>

                  <p>
                    {achievement.text}
                  </p>
                </div>

                {achievement.unlocked && (
                  <Check size={17} />
                )}

              </div>
            )
          )}

        </div>

      </section>

      {/* =================================================
          MONEY STREAK
      ================================================= */}

      <section className="money-streak">

        <div className="streak-icon">
          <Flame size={21} />
        </div>

        <div>

          <span className="card-label">
            MONEY STREAK
          </span>

          <h3>
            {noSpendDays} days on track 🔥
          </h3>

          <p>
            Keep staying under your daily
            spending target.
          </p>

        </div>

        <strong>
          +50 XP
        </strong>

      </section>

      {/* =================================================
          ADD EXPENSE MODAL
      ================================================= */}

      {showExpense && (
        <div
          className="money-modal-overlay"
          onClick={() =>
            setShowExpense(false)
          }
        >

          <div
            className="money-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowExpense(false)
              }
            >
              <X size={18} />
            </button>

            <span className="card-label">
              NEW EXPENSE
            </span>

            <h2>
              Add an expense
            </h2>

            <p>
              Keep track of where your money goes.
            </p>

            <label>
              What did you spend on?
            </label>

            <input
              type="text"
              value={expenseName}
              onChange={(event) =>
                setExpenseName(
                  event.target.value
                )
              }
              placeholder="e.g. Lunch"
              autoFocus
            />

            <label>
              Amount
            </label>

            <input
              type="number"
              min="0"
              value={expenseAmount}
              onChange={(event) =>
                setExpenseAmount(
                  event.target.value
                )
              }
              placeholder="0.00"
            />

            <label>
              Category
            </label>

            <select
              value={expenseCategory}
              onChange={(event) =>
                setExpenseCategory(
                  event.target.value
                )
              }
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Study</option>
              <option>Coffee</option>
              <option>Fun</option>
              <option>Shopping</option>
              <option>Other</option>
            </select>

            <div className="money-modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setShowExpense(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={addExpense}
              >
                <Plus size={16} />
                Add expense
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          GOAL MODAL
      ================================================= */}

      {showGoal && (
        <div
          className="money-modal-overlay"
          onClick={() =>
            setShowGoal(false)
          }
        >

          <div
            className="money-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowGoal(false)
              }
            >
              <X size={18} />
            </button>

            <span className="card-label">
              SAVINGS GOAL
            </span>

            <h2>
              Create a savings goal
            </h2>

            <p>
              Give yourself something exciting
              to save for.
            </p>

            <label>
              Goal name
            </label>

            <input
              type="text"
              value={goalTitle}
              onChange={(event) =>
                setGoalTitle(
                  event.target.value
                )
              }
              placeholder="e.g. New iPad"
            />

            <label>
              Target amount
            </label>

            <input
              type="number"
              min="0"
              value={goalTarget}
              onChange={(event) =>
                setGoalTarget(
                  event.target.value
                )
              }
              placeholder="1000"
            />

            <label>
              Choose an icon
            </label>

            <div className="emoji-options">

              {[
                "🎯",
                "🎧",
                "💻",
                "📱",
                "✈️",
                "👟",
                "🎓",
                "💰",
              ].map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  className={
                    goalIcon === emoji
                      ? "emoji-option active"
                      : "emoji-option"
                  }
                  onClick={() =>
                    setGoalIcon(emoji)
                  }
                >
                  {emoji}
                </button>
              ))}

            </div>

            <div className="money-modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setShowGoal(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={addGoal}
              >
                <Plus size={16} />
                Create goal
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          ADD MONEY MODAL
      ================================================= */}

      {showMoney && (
        <div
          className="money-modal-overlay"
          onClick={() =>
            setShowMoney(null)
          }
        >

          <div
            className="money-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowMoney(null)
              }
            >
              <X size={18} />
            </button>

            <span className="card-label">
              ADD SAVINGS
            </span>

            <h2>
              Add money to your goal
            </h2>

            <p>
              Every little bit gets you closer.
            </p>

            <label>
              Amount
            </label>

            <input
              type="number"
              min="0"
              value={moneyAmount}
              onChange={(event) =>
                setMoneyAmount(
                  event.target.value
                )
              }
              placeholder="50"
              autoFocus
            />

            <div className="money-modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setShowMoney(null)
                }
              >
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={addMoneyToGoal}
              >
                <PiggyBank size={16} />
                Add to savings
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          BUDGET MODAL
      ================================================= */}

      {showBudget && (
        <div
          className="money-modal-overlay"
          onClick={() =>
            setShowBudget(false)
          }
        >

          <div
            className="money-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowBudget(false)
              }
            >
              <X size={18} />
            </button>

            <span className="card-label">
              MONTHLY PLAN
            </span>

            <h2>
              Set your monthly budget
            </h2>

            <p>
              Choose how much you want to spend
              this month.
            </p>

            <div className="budget-preview">

              <Wallet size={20} />

              <div>
                <span>
                  CURRENT BUDGET
                </span>

                <strong>
                  ${monthlyBudget}
                </strong>
              </div>

            </div>

            <label>
              New monthly budget
            </label>

            <input
              type="number"
              min="1"
              value={newBudget}
              onChange={(event) =>
                setNewBudget(
                  event.target.value
                )
              }
              placeholder={monthlyBudget}
              autoFocus
            />

            <div className="money-modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setShowBudget(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={updateBudget}
              >
                <Check size={16} />
                Save budget
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Budget;
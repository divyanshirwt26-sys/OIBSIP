
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

const options = {
  bases: [
    { name: "Classic Hand Tossed", price: 99 },
    { name: "Thin Crust", price: 109 },
    { name: "Whole Wheat", price: 119 },
    { name: "Cheese Burst", price: 149 },
    { name: "Gluten-Free", price: 159 }
  ],
  sauces: [
    { name: "Classic Tomato", price: 30 },
    { name: "Spicy Arrabbiata", price: 40 },
    { name: "Creamy Alfredo", price: 50 },
    { name: "BBQ Sauce", price: 45 },
    { name: "Pesto", price: 55 }
  ],
  cheeses: [
    { name: "Mozzarella", price: 60 },
    { name: "Cheddar", price: 70 },
    { name: "Parmesan", price: 80 },
    { name: "Vegan Cheese", price: 90 },
    { name: "Four Cheese Blend", price: 110 }
  ],
  vegetables: [
    { name: "Onions", price: 20 },
    { name: "Bell Peppers", price: 25 },
    { name: "Mushrooms", price: 30 },
    { name: "Olives", price: 35 },
    { name: "Sweet Corn", price: 20 },
    { name: "Jalapeños", price: 30 }
  ]
};

const initialCustom = {
  base: 0,
  sauce: 0,
  cheese: 0,
  vegetables: []
};

function App() {
  const [page, setPage] = useState("menu");
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState("");

  const [cart, setCart] = useState([]);
  const [custom, setCustom] = useState(initialCustom);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPizzas() {
      try {
        setMenuLoading(true);
        setMenuError("");

        const response = await fetch(`${API_URL}/api/pizzas`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pizzas");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid pizza data");
        }

        setPizzaMenu(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          setMenuError(
            "Unable to load the menu. Please check your backend."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setMenuLoading(false);
        }
      }
    }

    loadPizzas();

    return () => controller.abort();
  }, []);

  const customPrice =
    options.bases[custom.base].price +
    options.sauces[custom.sauce].price +
    options.cheeses[custom.cheese].price +
    custom.vegetables.reduce(
      (total, index) => total + options.vegetables[index].price,
      0
    );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function addToCart(pizza) {
    setOrderPlaced(false);

    setCart(previous => {
      const existing = previous.find(item => item.id === pizza.id);

      if (existing) {
        return previous.map(item =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...pizza, quantity: 1 }];
    });
  }

  function addCustomPizza() {
    const ingredients = [
      options.bases[custom.base].name,
      options.sauces[custom.sauce].name,
      options.cheeses[custom.cheese].name,
      ...custom.vegetables.map(
        index => options.vegetables[index].name
      )
    ];

    addToCart({
      id: `custom-${crypto.randomUUID()}`,
      name: "My Custom Pizza",
      description: ingredients.join(", "),
      price: customPrice,
      emoji: "🍕"
    });

    setCustom({
      base: 0,
      sauce: 0,
      cheese: 0,
      vegetables: []
    });

    navigate("cart");
  }

  function toggleVegetable(index) {
    setCustom(previous => ({
      ...previous,
      vegetables: previous.vegetables.includes(index)
        ? previous.vegetables.filter(i => i !== index)
        : [...previous.vegetables, index]
    }));
  }

  function changeQuantity(id, amount) {
    setCart(previous =>
      previous
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function completeDemoOrder() {
    setCart([]);
    setOrderPlaced(true);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container nav">
          <button
            className="logo"
            onClick={() => navigate("menu")}
          >
            🍕 Slice<span>Sync.</span>
          </button>

          <nav aria-label="Main navigation">
            <button onClick={() => navigate("menu")}>
              Menu
            </button>

            <button onClick={() => navigate("builder")}>
              Build Your Pizza
            </button>
          </nav>

          <button
            className="cart-button"
            onClick={() => navigate("cart")}
          >
            🛒 Cart <span>{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        {page === "menu" && (
          <>
            <section className="hero">
              <div className="container hero-grid">
                <div>
                  <p className="eyebrow">
                    FRESHLY MADE, JUST FOR YOU
                  </p>

                  <h1>
                    Great pizza.
                    <br />
                    <em>Great moments.</em>
                  </h1>

                  <p className="hero-description">
                    Explore delicious pizzas or create your own
                    masterpiece with your favourite ingredients.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => navigate("builder")}
                  >
                    Build Your Pizza →
                  </button>
                </div>

                <div className="hero-visual">
                  <span>🍕</span>
                  <div className="floating-label">
                    FRESH & DELICIOUS ✦
                  </div>
                </div>
              </div>
            </section>

            <section className="container section">
              <p className="eyebrow">
                HANDPICKED FAVOURITES
              </p>

              <h2>
                Explore our <em>menu.</em>
              </h2>

              <p className="section-description">
                Something delicious for every pizza lover.
              </p>

              {menuLoading && (
                <p role="status">Loading our delicious pizzas...</p>
              )}

              {menuError && (
                <p role="alert">{menuError}</p>
              )}

              {!menuLoading &&
                !menuError &&
                pizzaMenu.length === 0 && (
                  <p>No pizzas are currently available.</p>
                )}

              <div className="pizza-grid">
                {pizzaMenu.map(pizza => (
                  <article
                    className="pizza-card"
                    key={pizza._id}
                  >
                    <div className="pizza-image">
                      <span>{pizza.emoji || "🍕"}</span>
                      <small>{pizza.tag}</small>
                    </div>

                    <div className="pizza-details">
                      <h3>{pizza.name}</h3>
                      <p>{pizza.description}</p>

                      <div className="pizza-bottom">
                        <strong>₹{pizza.price}</strong>

                        <button
                          onClick={() =>
                            addToCart({
                              id: pizza._id,
                              name: pizza.name,
                              description: pizza.description,
                              price: pizza.price,
                              emoji: pizza.emoji || "🍕"
                            })
                          }
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "builder" && (
          <section className="container section">
            <p className="eyebrow">MADE YOUR WAY</p>

            <h2>
              Build your <em>perfect pizza.</em>
            </h2>

            <p className="section-description">
              Choose your base, sauce, cheese, and vegetables.
            </p>

            <div className="builder-layout">
              <div className="builder-options">
                {[
                  ["bases", "01", "Choose Your Base", "base"],
                  ["sauces", "02", "Choose Your Sauce", "sauce"],
                  ["cheeses", "03", "Choose Your Cheese", "cheese"]
                ].map(([group, number, title, field]) => (
                  <div
                    className="builder-group"
                    key={group}
                  >
                    <h3>
                      <span>{number}</span> {title}
                    </h3>

                    <div className="option-list">
                      {options[group].map((option, index) => (
                        <label
                          className="option"
                          key={option.name}
                        >
                          <input
                            type="radio"
                            name={group}
                            checked={custom[field] === index}
                            onChange={() =>
                              setCustom(previous => ({
                                ...previous,
                                [field]: index
                              }))
                            }
                          />

                          <span>{option.name}</span>
                          <strong>₹{option.price}</strong>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="builder-group">
                  <h3>
                    <span>04</span> Add Vegetables
                  </h3>

                  <p>Select as many as you like.</p>

                  <div className="option-list">
                    {options.vegetables.map(
                      (vegetable, index) => (
                        <label
                          className="option"
                          key={vegetable.name}
                        >
                          <input
                            type="checkbox"
                            checked={custom.vegetables.includes(
                              index
                            )}
                            onChange={() =>
                              toggleVegetable(index)
                            }
                          />

                          <span>{vegetable.name}</span>
                          <strong>
                            +₹{vegetable.price}
                          </strong>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>

              <aside className="builder-summary">
                <div className="summary-emoji">🍕</div>

                <p className="eyebrow">YOUR CREATION</p>

                <h3>My Custom Pizza</h3>

                <p>
                  {options.bases[custom.base].name}
                  <br />
                  {options.sauces[custom.sauce].name}
                  <br />
                  {options.cheeses[custom.cheese].name}
                </p>

                <p>
                  {custom.vegetables.length
                    ? custom.vegetables
                        .map(
                          index =>
                            options.vegetables[index].name
                        )
                        .join(", ")
                    : "No extra vegetables"}
                </p>

                <div className="summary-total">
                  <span>Total</span>
                  <strong>₹{customPrice}</strong>
                </div>

                <button
                  className="primary-button"
                  onClick={addCustomPizza}
                >
                  Add to Cart →
                </button>
              </aside>
            </div>
          </section>
        )}

        {page === "cart" && (
          <section className="container section cart-section">
            <p className="eyebrow">ALMOST THERE</p>

            <h2>
              Your <em>order summary.</em>
            </h2>

            {orderPlaced ? (
              <div className="empty-cart">
                <h3>Order preview completed!</h3>

                <p>
                  This is a frontend demonstration.
                  No payment or actual order was processed.
                </p>

                <button
                  className="primary-button"
                  onClick={() => {
                    setOrderPlaced(false);
                    navigate("menu");
                  }}
                >
                  Back to Menu
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="empty-cart">
                <h3>Your cart is empty.</h3>
                <p>Let's find something delicious!</p>

                <button
                  className="primary-button"
                  onClick={() => navigate("menu")}
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                <div className="cart-items">
                  {cart.map(item => (
                    <article
                      className="cart-item"
                      key={item.id}
                    >
                      <div className="cart-emoji">
                        {item.emoji || "🍕"}
                      </div>

                      <div className="cart-info">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <strong>₹{item.price}</strong>
                      </div>

                      <div className="quantity-controls">
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() =>
                            changeQuantity(item.id, -1)
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() =>
                            changeQuantity(item.id, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <aside className="order-total">
                  <h3>Order Summary</h3>
                  <p>Items: {cartCount}</p>

                  <div className="summary-total">
                    <span>Total</span>
                    <strong>₹{cartTotal}</strong>
                  </div>

                  <button
                    className="primary-button"
                    onClick={completeDemoOrder}
                  >
                    Complete Demo Order →
                  </button>

                  <small>
                    Demo only. No payment or backend
                    order submission yet.
                  </small>
                </aside>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <strong>🍕 SliceSync.</strong>
          <p>Fresh ideas. Better pizza.</p>
          <span>
            Oasis Infobyte · Level 3 Task 1
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;

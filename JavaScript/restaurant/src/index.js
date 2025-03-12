import "./styles.css";

const createElement = function (tag, options = {}) {
  const element = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key == "text") {
      element.textContent = value;
    } else if (key == "html") {
      element.innerHTML = value;
    } else if (key == "class") {
      element.classList.add(...value.split(" "));
    } else if (key == "attribute") {
      Object.entries(value).forEach(([attributeKey, attributeValue]) => {
        element.setAttribute(attributeKey, attributeValue);
      });
    } else if (key == "events") {
      Object.entries(value).forEach(([eventKey, eventValue]) => {
        element.addEventListener(eventKey, eventValue);
      });
    } else if (key == "childElements") {
      value.forEach((childElement) => element.appendChild(childElement));
    }
  });

  return element;
};

const body = document.body;
const container = createElement("main", { class: "container" });

const header = createElement("header", {
  class: "header",
  childElements: [
    createElement("button", {
      class: "header-btn",
      text: "Home",
      events: {
        click: renderHome,
      },
    }),
    createElement("button", {
      class: "header-btn",
      text: "Menu",
      events: {
        click: renderMenu,
      },
    }),
    createElement("button", {
      class: "header-btn",
      text: "Contact",
      events: {
        click: renderContact,
      },
    }),
  ],
});

function renderHome() {
  const home = createElement("section", {
    class: "home",
    childElements: [
      createElement("h1", {
        text: "🍽️ La Esquina Sabrosa",
      }),
      createElement("p", {
        text: "Nestled in the heart of the city, La Esquina Sabrosa is a cozy yet vibrant restaurant specializing in authentic Latin American cuisine. With a menu full of bold flavors, from Argentinian empanadas to Peruvian ceviche, every dish is crafted with passion. Our warm ambiance, paired with lively music and handcrafted cocktails, makes it the perfect spot for a casual dinner or a special celebration.",
      }),
      createElement("section", {
        class: "schedule",
        childElements: [
          createElement("h2", {
            class: "schedule-title",
            text: "🕒 Schedule:",
          }),
          createElement("div", {
            class: "schedule-datetime",
            childElements: [
              createElement("span", {
                class: "schedule-day",
                text: "Monday - Thursday:",
              }),
              createElement("span", {
                class: "schedule-time",
                text: "11:00 AM - 10:00 PM",
              }),
            ],
          }),
          createElement("div", {
            class: "schedule-datetime",
            childElements: [
              createElement("span", {
                class: "schedule-day",
                text: "Friday - Saturday:",
              }),
              createElement("span", {
                class: "schedule-time",
                text: "11:00 AM - 12:00 AM",
              }),
            ],
          }),
          createElement("div", {
            class: "schedule-datetime",
            childElements: [
              createElement("span", {
                class: "schedule-day",
                text: "Sunday:",
              }),
              createElement("span", {
                class: "schedule-time",
                text: "12:00 PM - 9:00 PM",
              }),
            ],
          }),
        ],
      }),
      createElement("section", {
        class: "location",
        childElements: [
          createElement("h2", {
            class: "location-title",
            text: "📍 Location:",
          }),
          createElement("p", {
            class: "location",
            text: "📌 123 Calle del Sabor, Ciudad Nueva, TX 78945",
          }),
        ],
      }),
    ],
  });

  container.innerHTML = "";
  container.appendChild(home);
}
function renderMenu() {
  const menu = createElement("section", {
    class: "menu",
    childElements: [
      createElement("h1", {
        class: "menu-title",
        text: "📜 Menu",
      }),
      createElement("div", {
        class: "menu-item",
        childElements: [
          createElement("h2", {
            class: "menu-item-title",
            text: "🥗 Ceviche de la Casa – $12.99",
          }),
          createElement("p", {
            class: "menu-item-description",
            text: "A refreshing Peruvian-style ceviche, featuring fresh white fish marinated in lime juice, mixed with red onions, cilantro, and a touch of aji amarillo. Served with sweet potatoes and toasted corn.",
          }),
        ],
      }),
      createElement("div", {
        class: "menu-item",
        childElements: [
          createElement("h2", {
            class: "menu-item-title",
            text: "🥟 Empanadas de la Abuela – $7.99",
          }),
          createElement("p", {
            class: "menu-item-description",
            text: "Handmade Argentinian-style empanadas, filled with seasoned beef, olives, and eggs, wrapped in a crispy golden crust. Served with a side of chimichurri sauce.",
          }),
        ],
      }),
      createElement("div", {
        class: "menu-item",
        childElements: [
          createElement("h2", {
            class: "menu-item-title",
            text: "🍲 Pabellón Criollo – $14.99",
          }),
          createElement("p", {
            class: "menu-item-description",
            text: "A Venezuelan classic! Slow-cooked shredded beef, served with black beans, white rice, and fried sweet plantains. A true taste of home-cooked Latin comfort food.",
          }),
        ],
      }),
      createElement("div", {
        class: "menu-item",
        childElements: [
          createElement("h2", {
            class: "menu-item-title",
            text: "🌮 Tacos al Pastor – $10.99",
          }),
          createElement("p", {
            class: "menu-item-description",
            text: "Three Mexican-style tacos filled with marinated pork, pineapple, and onions, all wrapped in soft corn tortillas. Served with fresh cilantro, lime wedges, and salsa verde.",
          }),
        ],
      }),
      createElement("div", {
        class: "menu-item",
        childElements: [
          createElement("h2", {
            class: "menu-item-title",
            text: "🥘 Bandeja Sabrosa – $17.99",
          }),
          createElement("p", {
            class: "menu-item-description",
            text: "A Colombian feast! A hearty plate featuring grilled steak, chorizo, fried pork belly (chicharrón), rice, red beans, plantains, avocado, and a fried egg on top. Perfect for the hungry traveler!",
          }),
        ],
      }),
    ],
  });

  container.innerHTML = "";
  container.appendChild(menu);
}
function renderContact() {
  const contact = createElement("section", {
    class: "contact",
    childElements: [
      createElement("h1", {
        text: "📞 Contact Us",
      }),
      createElement("div", {
        class: "contact-item",
        childElements: [
          createElement("span", {
            class: "contact-item-title",
            text: "📍 Address:",
          }),
          createElement("span", {
            class: "contact-item-description",
            text: "123 Calle del Sabor, Ciudad Nueva, TX 78945",
          }),
        ],
      }),
      createElement("div", {
        class: "contact-item",
        childElements: [
          createElement("span", {
            class: "contact-item-title",
            text: "📧 Email:",
          }),
          createElement("span", {
            class: "contact-item-description",
            text: "contact@laesquinasabrosa.com",
          }),
        ],
      }),
      createElement("div", {
        class: "contact-item",
        childElements: [
          createElement("span", {
            class: "contact-item-title",
            text: "📱 Phone:",
          }),
          createElement("span", {
            class: "contact-item-description",
            text: "(555) 987-6543",
          }),
        ],
      }),
      createElement("div", {
        class: "contact-item",
        childElements: [
          createElement("span", {
            class: "contact-item-title",
            text: "🌐 Website:",
          }),
          createElement("span", {
            class: "contact-item-description",
            text: "www.laesquinasabrosa.com",
          }),
        ],
      }),
      createElement("div", {
        class: "contact-item",
        childElements: [
          createElement("span", {
            class: "contact-item-title",
            text: "📅 Reservations:",
          }),
          createElement("span", {
            class: "contact-item-description",
            text: "Call us or book online through our website!",
          }),
        ],
      }),
    ],
  });

  container.innerHTML = "";
  container.appendChild(contact);
}

body.appendChild(header);
body.appendChild(container);

renderContact();

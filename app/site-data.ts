import processOneImage from "@/images/process 1.png";
import processTwoImage from "@/images/process 2.png";
import processThreeImage from "@/images/process 3.png";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Menu", href: "/menu" },
  { label: "Latest News", href: "/news" },
  { label: "Contact", href: "/contact" }
];

export const processSteps = [
  {
    title: "CHOOSE YOUR TOPPINGS",
    description: "Pick up a bowl and tongs, then choose your favorite ingredients.",
    image: processOneImage
  },
  {
    title: "WEIGHT & PAY",
    description: "All ingredients are priced by weight at $3.99 per 100g.",
    image: processTwoImage
  },
  {
    title: "CHOOSE YOUR BROTH",
    description:
      "Choose one soup base per bowl, and we'll cook it and bring it to you once it's ready.",
    image: processThreeImage
  }
];

export const newsArticles = [
  {
    slug: "plum-drink",
    title: "Plum Drink",
    date: "2026-05-05",
    excerpt:
      "A refreshing plum drink is now featured for guests looking for a bright, cooling pairing with their hot pot bowl.",
    mediaSrc: "/news-assets/plum-drink.pdf",
    mediaType: "pdf",
    mediaAlt: "Big Bowl Hot Pot plum drink poster",
    body: [
      "Our plum drink is a refreshing option for guests who want something bright, lightly sweet, and cooling alongside a warm hot pot bowl. It is especially easy to pair with spicy broths, savory ingredients, and richer add-ons.",
      "Look for it on the latest drink update and try it with your next custom bowl."
    ]
  },
  {
    slug: "limited-time-new-broth",
    title: "Limited-Time New Broth",
    date: "2026-03-06",
    excerpt:
      "A new seasonal broth is now available, bringing a gentler depth and a richer finish to your custom bowl.",
    mediaSrc: "/news-assets/limited-time-new-broth.pdf",
    mediaType: "pdf",
    mediaAlt: "Big Bowl Hot Pot limited-time broth poster",
    body: [
      "Our latest seasonal broth is designed for guests who want something warm, fragrant, and a little different from the regular rotation. It keeps the familiar comfort of a hot bowl while adding a softer, rounded flavor profile that works beautifully with vegetables, tofu, seafood, and sliced meats.",
      "If you like building a balanced bowl with plenty of texture, this is a great place to start. The new broth pairs especially well with lighter ingredients and gives you a more delicate alternative to the deeper spicy options on the menu."
    ]
  },
  {
    slug: "new-add-ons",
    title: "New Add-Ons",
    date: "2026-03-05",
    excerpt:
      "We have refreshed our add-on selection with a few guest favorites that make lunch, dinner, and sharing even better.",
    mediaSrc: "/news-assets/new-add-ons.pdf",
    mediaType: "pdf",
    mediaAlt: "Big Bowl Hot Pot add-ons and dry mix poster",
    body: [
      "We have expanded a few side and add-on choices to give guests more flexibility when building a full meal. These additions are meant to work alongside our self-serve bowls, whether you are visiting for a quick lunch or a longer group dinner.",
      "From crisp snacks to extra savory bites, the new add-ons make it easier to turn a single bowl into a more complete experience. If you have not checked the updated selection lately, this is a good time to take another look."
    ]
  },
  {
    slug: "appetizers",
    title: "Appetizers",
    date: "2026-03-05",
    excerpt:
      "A few crispy, shareable appetizers are now easier to spot on the menu, perfect for rounding out the table before the bowls arrive.",
    mediaSrc: "/news-assets/appetizers.pdf",
    mediaType: "pdf",
    mediaAlt: "Big Bowl Hot Pot appetizers poster",
    body: [
      "Appetizers are a small part of the menu, but they make a big difference when you are dining with friends or family. We are highlighting some easy shareable options so guests can start the meal with something crisp, warm, and familiar.",
      "They pair nicely with both mild and spicy broths, and they also help make the overall experience feel a little more complete for larger tables."
    ]
  },
  {
    slug: "drink-menu",
    title: "Drink Menu",
    date: "2026-03-05",
    excerpt:
      "Our drink selection is being organized more clearly so guests can find refreshing pairings for spicy, savory, or lighter bowls.",
    mediaSrc: "/news-assets/drink-menu.pdf",
    mediaType: "pdf",
    mediaAlt: "Big Bowl Hot Pot drink menu poster",
    body: [
      "The drink menu is being presented more clearly to make it easier to choose something that matches your bowl. Whether you want something cooling, lightly sweet, or simple and refreshing, the goal is to make pairing feel straightforward.",
      "As the menu continues to evolve, this section will also be a useful place for seasonal drinks, featured combinations, and future dining updates."
    ]
  }
];

export const menuHighlights = [
  "Over 60 ingredients including beef, seafood, vegetables, tofu, noodles, and mushrooms.",
  "9 signature soup bases so every bowl can match your spice level and flavor preference.",
  "Self-served format that makes lunch, dinner, and group visits easy to customize."
];

export const brothOptions = [
  "Classic Mala",
  "Tomato Broth",
  "Bone Broth",
  "Mushroom Broth",
  "Spicy Beef Tallow",
  "Pickled Vegetable Broth"
];

export const contactDetails = {
  phone: "403-999-5937",
  email: "bigbowlhotpot@gmail.com",
  address: "1211 Edmonton Trail #130, Calgary, AB T2E 6X4",
  hours: [
    { label: "Sunday-Thursday", value: "11:30 AM - 10:00 PM" },
    { label: "Friday-Saturday", value: "11:30 AM - 2:00 AM" },
    { label: "Last Call:", value: "40 minutes before closing" }
  ]
};

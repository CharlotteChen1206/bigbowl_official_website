export const siteConfig = {
  name: "Big Bowl Hot Pot",
  legalName: "Big Bowl Hot Pot",
  chineseName: "大碗麻辣烫",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bigbowlhotpot.com",
  description:
    "Big Bowl Hot Pot is a self-served MalaTang hot pot restaurant in Calgary with over 60 fresh ingredients and 9 soup bases.",
  phone: "403-999-5937",
  email: "bigbowlhotpot@gmail.com",
  address: "1211 Edmonton Trail #130, Calgary, AB T2E 6X4",
  social: {
    facebook: "https://www.facebook.com/bigbowlhotpot/",
    instagram: "https://www.instagram.com/bigbowlhotpot/",
    maps: "https://maps.app.goo.gl/XT5VxDfJjaa3ZZvo7"
  }
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

const deliveryPlatforms = [
  {
    name: "Uber Eats",
    logoText: "Uber Eats",
    className: "uber",
    href: "https://www.ubereats.com/ca/store/big-bowl-hot-pot-%E5%A4%A7%E7%A2%97%E9%BA%BB%E8%BE%A3%E7%83%AB/daj1eIWaW5aLODWr6BhDrQ?msockid=276144d7757860ef3616521c746e618f",
    logoSrc: "/delivery-logos/ubereats.png"
  },
  {
    name: "DoorDash",
    logoText: "DoorDash",
    className: "doordash",
    href: "https://www.doordash.com/store/bigbowl-hotpot-%E5%A4%A7%E7%A2%97%E9%BA%BB%E8%BE%A3%E7%83%AB-calgary-33601273/62693147/?msockid=276144d7757860ef3616521c746e618f",
    logoSrc: "/delivery-logos/doordash.png"
  },
  {
    name: "Fantuan",
    logoText: "Fantuan",
    className: "fantuan",
    href: "https://www.fantuanorder.com/store/big-bowl-hot-pot/ca-33433",
    logoSrc: "/delivery-logos/fantuan.png"
  },
  {
    name: "Zomi",
    logoText: "ZOMI",
    className: "zomi",
    href: "https://www.zomi.menu/shop/bigbowlhotpot",
    logoSrc: "/delivery-logos/zomi.png"
  }
];

const carPath =
  "M 8 30 L 13 18 C 16 10 24 6 34 6 L 48 6 C 58 6 66 14 69 26 L 72 30 C 76 31 78 35 77 39 L 76 42 L 4 42 L 3 38 C 2 34 4 31 8 30 Z";
const roadPath =
  "M -90 116 L 804 116 C 955 116 964 238 812 238 L 284 238 C 122 238 116 356 282 356 L 1290 356";
const mobileRoadPath =
  "M -70 110 L 286 110 C 374 110 374 250 286 250 L 104 250 C 20 250 20 415 104 415 L 460 415";

const routeStops = [
  { platform: deliveryPlatforms[0], x: "17%", y: "20%", mx: "24%", my: "13%", delay: "1.4s" },
  { platform: deliveryPlatforms[1], x: "48%", y: "20%", mx: "68%", my: "13%", delay: "4.0s" },
  { platform: deliveryPlatforms[2], x: "32%", y: "56%", mx: "26%", my: "42%", delay: "7.3s" },
  { platform: deliveryPlatforms[3], x: "60%", y: "80%", mx: "38%", my: "65%", delay: "10.0s" }
];

function PlatformStationLogo({ logoSrc, logoText }: { logoSrc: string; logoText: string }) {
  return (
    <span className="platform-logo-tile" aria-hidden="true">
      <img className="platform-logo-image" src={logoSrc} alt="" />
      <span className="platform-logo-fallback">{logoText}</span>
    </span>
  );
}

function DesktopMapBackground() {
  return (
    <g className="map-background-decorations">
      <path className="map-sand-hill top" d="M 0 0 H 1200 V 70 C 1020 30 870 92 710 54 C 510 8 365 88 180 48 C 95 30 42 48 0 68 Z" />
      <path className="map-sand-hill bottom" d="M 0 430 V 364 C 150 394 245 334 390 364 C 575 402 748 326 930 370 C 1040 396 1118 372 1200 346 V 430 Z" />
    </g>
  );
}

function MobileMapBackground() {
  return (
    <g className="map-background-decorations">
      <path className="map-sand-hill top" d="M 0 0 H 390 V 78 C 322 52 270 84 208 58 C 132 27 78 76 0 46 Z" />
      <path className="map-sand-hill bottom" d="M 0 590 V 500 C 70 526 128 494 190 520 C 266 552 322 500 390 530 V 590 Z" />
    </g>
  );
}

function Tree({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return (
    <g className={`map-tree${small ? " compact" : ""}`} transform={`translate(${x} ${y})`}>
      <line x1="0" y1={small ? "9" : "12"} x2="0" y2={small ? "26" : "32"} />
      <circle cx="0" cy={small ? "3" : "4"} r={small ? "12" : "15"} />
    </g>
  );
}

function Building() {
  return (
    <g className="map-building" transform="translate(930 18)">
      <rect width="86" height="112" rx="5" />
      <rect x="102" y="32" width="68" height="78" rx="5" />
      {[16, 42, 68].map((x) =>
        [18, 44, 70, 96].map((y) => <rect className="map-window" x={x} y={y} width="12" height="14" key={`${x}-${y}`} />)
      )}
      {[118, 144].map((x) =>
        [48, 74, 100].map((y) => <rect className="map-window" x={x} y={y} width="12" height="14" key={`${x}-${y}`} />)
      )}
    </g>
  );
}

function BigBowlSign({ mobile = false }: { mobile?: boolean }) {
  return (
    <g className={`map-sign big-bowl${mobile ? " mobile" : ""}`} transform={mobile ? "translate(224 318)" : "translate(996 250)"}>
      <line x1={mobile ? "30" : "34"} y1={mobile ? "46" : "48"} x2={mobile ? "30" : "34"} y2={mobile ? "82" : "92"} />
      <line x1={mobile ? "102" : "118"} y1={mobile ? "46" : "48"} x2={mobile ? "102" : "118"} y2={mobile ? "82" : "92"} />
      <rect width={mobile ? "132" : "152"} height={mobile ? "46" : "48"} rx="4" />
      <text x={mobile ? "66" : "76"} y={mobile ? "20" : "21"}>BIG BOWL</text>
      <text x={mobile ? "66" : "76"} y={mobile ? "36" : "38"}>HOTPOT</text>
    </g>
  );
}

function SpeedSign({ mobile = false }: { mobile?: boolean }) {
  return (
    <g className={`map-speed-sign${mobile ? " mobile" : ""}`} transform={mobile ? "translate(198 142)" : "translate(820 142)"}>
      <line x1={mobile ? "17" : "20"} y1={mobile ? "36" : "42"} x2={mobile ? "17" : "20"} y2={mobile ? "72" : "90"} />
      <circle cx={mobile ? "17" : "20"} cy={mobile ? "17" : "20"} r={mobile ? "17" : "20"} />
      <text x={mobile ? "17" : "20"} y={mobile ? "23" : "27"}>60</text>
    </g>
  );
}

function DesktopMapForeground() {
  return (
    <g className="map-foreground-decorations">
      {[86, 128, 170, 918, 960, 1002].map((x) => <Tree x={x} y={392} key={`bottom-tree-${x}`} />)}
      <Building />
      <BigBowlSign />
      <SpeedSign />
    </g>
  );
}

function MobileMapForeground() {
  return (
    <g className="map-foreground-decorations">
      {[56, 92, 330].map((x) => <Tree x={x} y={535} small key={`mobile-bottom-tree-${x}`} />)}
      <BigBowlSign mobile />
      <SpeedSign mobile />
    </g>
  );
}

function DeliveryCar() {
  return (
    <g className="delivery-car-svg">
      <animateTransform
        attributeName="transform"
        calcMode="discrete"
        dur="12s"
        keyTimes="0;0.4;0.72;1"
        repeatCount="indefinite"
        type="scale"
        values="1 1;-1 1;1 1;1 1"
      />
      <g transform="translate(-38 -24)">
        <path className="car-svg-body" d={carPath} />
        <path className="car-svg-window" d="M 30 11 L 45 11 C 51 11 56 16 58 24 L 29 24 Z" />
        <circle className="car-svg-wheel" cx="20" cy="43" r="7" />
        <circle className="car-svg-wheel" cx="60" cy="43" r="7" />
        <circle className="car-svg-hub" cx="20" cy="43" r="3" />
        <circle className="car-svg-hub" cx="60" cy="43" r="3" />
      </g>
    </g>
  );
}

export function OrderOnlineSection() {
  return (
    <section className="order-online-section delivery-route map-loop" id="order-online">
      <div className="route-copy">
        <span>Delivery Partners</span>
        <h2>Order Online</h2>
        <p>From our kitchen to your table, find exclusive delivery deals on your favorite app.</p>
      </div>

      <div className="delivery-road-scene" aria-label="Order online delivery partners">
        <svg className="road-svg road-svg-desktop" viewBox="0 0 1200 430" aria-hidden="true">
          <defs>
            <path id="home-delivery-road-path" d={roadPath} />
          </defs>
          <DesktopMapBackground />
          <use className="road-shadow" href="#home-delivery-road-path" />
          <use className="road-body" href="#home-delivery-road-path" />
          <use className="road-dashes" href="#home-delivery-road-path" />
          <DesktopMapForeground />
          <g>
            <animateMotion dur="12s" repeatCount="indefinite" rotate="0">
              <mpath href="#home-delivery-road-path" />
            </animateMotion>
            <DeliveryCar />
          </g>
        </svg>

        <svg className="road-svg road-svg-mobile" viewBox="0 0 390 590" aria-hidden="true">
          <defs>
            <path id="home-delivery-mobile-road-path" d={mobileRoadPath} />
          </defs>
          <MobileMapBackground />
          <use className="road-shadow" href="#home-delivery-mobile-road-path" />
          <use className="road-body" href="#home-delivery-mobile-road-path" />
          <use className="road-dashes" href="#home-delivery-mobile-road-path" />
          <MobileMapForeground />
          <g>
            <animateMotion dur="12s" repeatCount="indefinite" rotate="0">
              <mpath href="#home-delivery-mobile-road-path" />
            </animateMotion>
            <DeliveryCar />
          </g>
        </svg>

        {routeStops.map((stop) => (
          <Link
            className={`route-stop ${stop.platform.className}`}
            href={stop.platform.href}
            key={stop.platform.name}
            aria-label={`Order Big Bowl on ${stop.platform.name}`}
            target="_blank"
            rel="noreferrer"
            style={
              {
                "--station-x": stop.x,
                "--station-y": stop.y,
                "--station-mobile-x": stop.mx,
                "--station-mobile-y": stop.my,
                "--order-delay": stop.delay
              } as CSSProperties
            }
          >
            <span className="route-logo">
              <PlatformStationLogo logoSrc={stop.platform.logoSrc} logoText={stop.platform.logoText} />
              <span className="route-station-name">{stop.platform.name}</span>
            </span>
            <span className="route-order-button">Order Now</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

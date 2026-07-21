export const BRAND_COLORS = {
  bg: "#161B22",
  bgDeep: "#0B0E13",
  accent: "#C1401F",
  accentLight: "#E8703D",
  accentViolet: "#E7A93A",
  accentLavender: "#F0C675",
  warm: "#E7A93A",
  white: "#E6E1D2",
} as const;

export const HERO_BACKGROUND = `linear-gradient(180deg, ${BRAND_COLORS.bg} 0%, ${BRAND_COLORS.bgDeep} 100%)`;

export const GRADIENT_TEXT = `linear-gradient(135deg, ${BRAND_COLORS.accentLight} 0%, ${BRAND_COLORS.accentLavender} 100%)`;

export function gradientTextStyle(fontSize: number, fontWeight: number) {
  return {
    fontFamily: "Inter",
    fontSize,
    fontWeight,
    backgroundImage: GRADIENT_TEXT,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  } as const;
}

type AtmosphericBackgroundProps = {
  width: number;
  height: number;
};

export function AtmosphericBackground({
  width,
  height,
}: AtmosphericBackgroundProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        display: "flex",
        background: HERO_BACKGROUND,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: height * 0.18,
          left: width * 0.58,
          width: width * 0.72,
          height: height * 0.72,
          borderRadius: "50%",
          background: "rgba(193, 64, 31, 0.32)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: height * 0.42,
          left: width * 0.02,
          width: width * 0.58,
          height: height * 0.58,
          borderRadius: "50%",
          background: "rgba(231, 169, 58, 0.22)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: height * 0.08,
          left: width * 0.32,
          width: width * 0.5,
          height: height * 0.5,
          borderRadius: "50%",
          background: "rgba(193, 64, 31, 0.14)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}

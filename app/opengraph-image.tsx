import { ImageResponse } from "next/og";
import {
  AtmosphericBackground,
  BRAND_COLORS,
  gradientTextStyle,
} from "@/lib/brand-image";
import { INTER_FONT_FAMILY, loadInterFonts } from "@/lib/og-fonts";

export const alt = "PaceSplits — Find your exact race pace for any goal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fonts = await loadInterFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
          background: BRAND_COLORS.bg,
          fontFamily: INTER_FONT_FAMILY,
        }}
      >
        <AtmosphericBackground width={1200} height={630} />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontFamily: INTER_FONT_FAMILY,
                fontSize: 88,
                fontWeight: 700,
                color: BRAND_COLORS.white,
              }}
            >
              Pace
            </span>
            <span style={gradientTextStyle(88, 700)}>Splits</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              fontFamily: INTER_FONT_FAMILY,
              fontSize: 48,
              fontWeight: 600,
              color: BRAND_COLORS.white,
              lineHeight: 1.3,
              maxWidth: 980,
            }}
          >
            <span>Find your exact </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: INTER_FONT_FAMILY,
                background: "rgba(47, 111, 237, 0.2)",
                color: BRAND_COLORS.accentLight,
                borderRadius: 999,
                padding: "6px 22px",
                margin: "0 8px",
              }}
            >
              race pace
            </span>
            <span> for any goal.</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}

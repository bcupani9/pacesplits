import { ImageResponse } from "next/og";
import {
  AtmosphericBackground,
  BRAND_COLORS,
} from "@/lib/brand-image";
import { INTER_FONT_FAMILY, loadInterFonts } from "@/lib/og-fonts";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
  const fonts = await loadInterFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: BRAND_COLORS.bg,
          fontFamily: INTER_FONT_FAMILY,
        }}
      >
        <AtmosphericBackground width={512} height={512} />

        <div
          style={{
            position: "relative",
            display: "flex",
            height: 220,
            width: 220,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 56,
            background: `linear-gradient(135deg, ${BRAND_COLORS.accent} 0%, ${BRAND_COLORS.accentViolet} 100%)`,
            boxShadow: "0 12px 48px rgba(193, 64, 31, 0.55)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                height: 10,
                width: 72,
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.9)",
              }}
            />
            <div
              style={{
                height: 10,
                width: 96,
                borderRadius: 999,
                background: BRAND_COLORS.white,
              }}
            />
            <div
              style={{
                height: 10,
                width: 72,
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.9)",
              }}
            />
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

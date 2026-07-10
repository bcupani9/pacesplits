const INTER_WEIGHTS = [400, 600, 700] as const;

type InterWeight = (typeof INTER_WEIGHTS)[number];

async function fetchInterWeight(weight: InterWeight): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    }
  ).then((response) => response.text());

  const match = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
  );

  if (!match?.[1]) {
    throw new Error(`Failed to load Inter font weight ${weight}`);
  }

  return fetch(match[1]).then((response) => response.arrayBuffer());
}

export async function loadInterFonts() {
  const weights = await Promise.all(
    INTER_WEIGHTS.map((weight) => fetchInterWeight(weight))
  );

  return INTER_WEIGHTS.map((weight, index) => ({
    name: "Inter",
    data: weights[index],
    style: "normal" as const,
    weight,
  }));
}

export const INTER_FONT_FAMILY = "Inter";

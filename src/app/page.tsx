"use client";

import { Button } from "@/components/ui/button";
import { generateRandomString } from "@/lib/random";
import { TextWidthCalculator } from "@/lib/canvas";
import { FontInstance } from "@/models";
import { useRef, useState } from "react";

export default function Home() {
  const [data, setData] = useState<FontInstance[]>([]);
  const [font, setFont] = useState("12px sans-serif");
  const [maxTextLength, setMaxTextLength] = useState(50);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const generateFontData = (n: number) => {
    const calc = TextWidthCalculator.getInstance();
    let numAdded = 0;
    timer.current = setInterval(() => {
      if (numAdded >= n) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        return;
      }

      const l = Math.floor(Math.random() * maxTextLength);
      const s = generateRandomString(l);
      const width = calc.getTextWidth(s, font);
      if (!width) return;
      numAdded += 1;
      setData((d) =>
        d.concat({
          text: s,
          numCharacters: s.length,
          width,
        })
      );
    }, 10);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl">Font Width JS</h1>
      <p>Calculate the width of your font in pixels.</p>
      <p>Samples: {data.length}</p>
      <Button
        onClick={() => {
          generateFontData(100);
        }}
      >
        Generate 100 Fonts
      </Button>
    </main>
  );
}

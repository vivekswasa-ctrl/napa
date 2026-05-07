#!/usr/bin/env python3
"""Make solid/near-black pixels transparent in a PNG (for hero lung asset)."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def main() -> None:
    if len(sys.argv) < 2:
        print("usage: knockout_black_png.py <input.png> [output.png]", file=sys.stderr)
        sys.exit(1)
    inp = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else inp

    img = Image.open(inp).convert("RGBA")
    pixels = img.load()
    w, h = img.size

    # Background is black; lungs are light violet — fringe softening between sum bands.
    feather_lo = 48  # at/below: transparent
    feather_hi = 120  # at/above: opaque (preserve lung detail)

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            s = r + g + b
            if s <= feather_lo:
                pixels[x, y] = (r, g, b, 0)
            elif s < feather_hi:
                t = (s - feather_lo) / (feather_hi - feather_lo)
                na = int(round(a * t))
                pixels[x, y] = (r, g, b, na)
            else:
                pixels[x, y] = (r, g, b, a)

    img.save(out, optimize=True)


if __name__ == "__main__":
    main()

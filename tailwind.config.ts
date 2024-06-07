import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-bluu-next)", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        gtd: {
          primary: {
            10: "hsl(var(--gtd-primary-10))",
            20: "hsl(var(--gtd-primary-20))",
            30: "hsl(var(--gtd-primary-30))",
          },
          secondary: {
            10: "hsl(var(--gtd-secondary-10))",
            20: "hsl(var(--gtd-secondary-20))",
            30: "hsl(var(--gtd-secondary-30))",
          },
          tertiary: {
            10: "hsl(var(--gtd-tertiary-10))",
            20: "hsl(var(--gtd-tertiary-20))",
            30: "hsl(var(--gtd-tertiary-30))",
          },
          red: {
            primary: {
              bright: "hsl(var(--gtd-red-primary-bright))",
              dim: "hsl(var(--gtd-red-primary-dim))",
            },
            secondary: {
              bright: "hsl(var(--gtd-red-secondary-bright))",
              dim: "hsl(var(--gtd-red-secondary-dim))",
            },
          },
          green: {
            primary: {
              bright: "hsl(var(--gtd-green-primary-bright))",
              dim: "hsl(var(--gtd-green-primary-dim))",
            },
            secondary: {
              bright: "hsl(var(--gtd-green-secondary-bright))",
              dim: "hsl(var(--gtd-green-secondary-dim))",
            },
          },
          blue: {
            primary: {
              bright: "hsl(var(--gtd-blue-primary-bright))",
              dim: "hsl(var(--gtd-blue-primary-dim))",
            },
            secondary: {
              bright: "hsl(var(--gtd-blue-secondary-bright))",
              dim: "hsl(var(--gtd-blue-secondary-dim))",
            },
          },
          yellow: {
            primary: {
              bright: "hsl(var(--gtd-yellow-primary-bright))",
              dim: "hsl(var(--gtd-yellow-primary-dim))",
            },
            secondary: {
              bright: "hsl(var(--gtd-yellow-secondary-bright))",
              dim: "hsl(var(--gtd-yellow-secondary-dim))",
            },
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        infinite_scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        infinite_scroll: "infinite_scroll 10s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value as string,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
} satisfies Config;

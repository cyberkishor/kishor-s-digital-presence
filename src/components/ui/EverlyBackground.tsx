import { cn } from '@/lib/utils';

interface EverlyBackgroundProps {
  className?: string;
}

export function EverlyBackground({ className }: EverlyBackgroundProps) {
  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none z-1", className)}>
      {/* Soft Ambient Radial Glows (Diffuses behind the curves like the original mockup) */}
      <div className="absolute -top-24 -right-24 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-indigo-200/50 via-purple-100/30 to-transparent dark:from-indigo-900/20 dark:via-purple-900/10 dark:to-transparent blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-200/40 via-blue-100/25 to-transparent dark:from-indigo-950/25 dark:via-purple-950/15 dark:to-transparent blur-3xl" />

      {/* Top-Right Soft Lavender Organic Wave (Smooth and elegant, behind "Team working", NO harsh strokes) */}
      <svg
        className="absolute top-0 right-0 w-[55vw] max-w-[850px] h-[700px] opacity-90 dark:opacity-40"
        viewBox="0 0 850 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Outer gentle wash */}
          <linearGradient id="everlyTopWash" x1="850" y1="0" x2="250" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.14" />
            <stop offset="90%" stopColor="#c7d2fe" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          {/* Inner fluid curve layer */}
          <linearGradient id="everlyTopFluid" x1="850" y1="0" x2="400" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#a855f7" stopOpacity="0.16" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Layer 1: Sweeping outer fluid drape */}
        <path
          d="M 850 0 L 280 0 C 380 160, 500 290, 640 430 C 740 530, 800 620, 850 700 Z"
          fill="url(#everlyTopWash)"
        />

        {/* Layer 2: Soft organic wave passing behind "Team working" */}
        <path
          d="M 850 0 L 460 0 C 540 180, 640 310, 750 440 C 810 510, 835 600, 850 660 Z"
          fill="url(#everlyTopFluid)"
        />
      </svg>

      {/* Bottom-Left Lavender Curved Swell (Exact smooth mound from Crop 2, NO harsh strokes) */}
      <svg
        className="absolute bottom-0 left-0 w-[50vw] max-w-[750px] h-[550px] opacity-90 dark:opacity-40"
        viewBox="0 0 750 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="everlyBottomWash" x1="0" y1="550" x2="550" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.28" />
            <stop offset="55%" stopColor="#a5b4fc" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="everlyBottomInner" x1="0" y1="550" x2="400" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
            <stop offset="65%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer swelling curve */}
        <path
          d="M 0 550 L 0 180 C 180 200, 360 300, 500 420 C 580 480, 640 520, 750 550 Z"
          fill="url(#everlyBottomWash)"
        />

        {/* Inner corner curve */}
        <path
          d="M 0 550 L 0 300 C 130 320, 260 410, 380 550 Z"
          fill="url(#everlyBottomInner)"
        />
      </svg>
    </div>
  );
}

export default EverlyBackground;

import { BatteryMedium, Search, Wifi } from 'lucide-react';
import { AppleLogo } from './Glyphs';

const MENUS = ['File', 'Edit', 'View', 'Expect', 'Window', 'Help'];

export default function MenuBar({ active }: { active: boolean }) {
  return (
    <header className={`absolute inset-x-0 top-0 z-30 flex h-7 items-center justify-between bg-white/55 px-3 text-[13px] text-black/85 backdrop-blur-xl ${active ? 'animate-barIn' : 'opacity-0'}`}>
      <nav className="flex items-center gap-4">
        <button
          type="button"
          className="rounded px-1 py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black/60"
          aria-label="Apple menu"
        >
          <AppleLogo className="h-[15px] w-[15px]" />
        </button>
        <span className="font-semibold">Finder</span>
        {MENUS.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded px-1 py-0.5 hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black/60"
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3.5">
        <BatteryMedium className="h-[17px] w-[17px]" strokeWidth={1.6} />
        <Wifi className="h-[15px] w-[15px]" strokeWidth={2.1} />
        <span className="tabular-nums tracking-tight">9:41 AM</span>
        <Search className="h-[14px] w-[14px]" strokeWidth={2.2} />
        <span
          className="h-[15px] w-[15px] rounded-full"
          style={{
            background:
              'conic-gradient(from 210deg, #2f6fe0, #7b3fe4, #e0407a, #f0803c, #f2c33c, #3fbf6f, #2f6fe0)',
          }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}

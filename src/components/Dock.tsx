import type { LucideIcon } from 'lucide-react';
import {
  Aperture,
  BarChart3,
  BookUser,
  Compass,
  FileText,
  Folder,
  LayoutGrid,
  NotebookPen,
  Presentation,
  Smile,
  Terminal,
  Trash2,
  Wand2,
} from 'lucide-react';

type App = {
  name: string;
  Icon: LucideIcon;
  tile: string;
  ink: string;
  running?: boolean;
  round?: boolean;
};

const APPS: App[] = [
  {
    name: 'Finder',
    Icon: Smile,
    tile: 'linear-gradient(90deg,#2f7fd0 0 50%,#f4f7fb 50% 100%)',
    ink: '#1f2933',
    running: true,
  },
  {
    name: 'Launchpad',
    round: true,
    Icon: LayoutGrid,
    tile: 'radial-gradient(circle at 35% 30%,#4a3560,#1d1a2b 70%)',
    ink: '#e7d6f5',
  },
  {
    name: 'Safari',
    round: true,
    Icon: Compass,
    tile: 'radial-gradient(circle at 50% 35%,#eaf4fd 0 26%,#2f9fe4 27% 100%)',
    ink: '#16608f',
  },
  { name: 'Contacts', Icon: BookUser, tile: 'linear-gradient(180deg,#bfa46a,#93764a)', ink: '#fffaf0' },
  { name: 'Notes', Icon: NotebookPen, tile: 'linear-gradient(180deg,#fbe89a,#eed06a)', ink: '#6b5620' },
  { name: 'Pages', Icon: FileText, tile: 'linear-gradient(180deg,#ffffff,#e8e8ec)', ink: '#e08a2e' },
  { name: 'Numbers', Icon: BarChart3, tile: 'linear-gradient(180deg,#ffffff,#e8ecea)', ink: '#3aa65a' },
  {
    name: 'Photos',
    round: true,
    Icon: Aperture,
    tile: 'conic-gradient(from 200deg,#ef4b6b,#f0873c,#f2c93c,#49b96b,#3f8ae0,#8a4be0,#ef4b6b)',
    ink: '#ffffff',
  },
  { name: 'Keynote', Icon: Presentation, tile: 'linear-gradient(180deg,#54bdf0,#2a8fd6)', ink: '#ffffff' },
  { name: 'Terminal', Icon: Terminal, tile: 'linear-gradient(180deg,#0b2233,#03131f)', ink: '#5ad6ff', running: true },
  { name: 'Automator', Icon: Wand2, tile: 'linear-gradient(180deg,#8a5a1e,#4a2c0c)', ink: '#f6c27a' },
  {
    name: 'Preview',
    round: true,
    Icon: Aperture,
    tile: 'linear-gradient(180deg,#f2f3f5,#cbcdd2)',
    ink: '#3b414a',
  },
];

function Tile({ app, delay }: { app: App; delay: number }) {
  const { Icon } = app;
  return (
    <button
      type="button"
      aria-label={app.name}
      className="animate-dockIn group relative flex flex-col items-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-white/85 px-2 py-0.5 text-[12px] text-black/80 opacity-0 shadow backdrop-blur transition-opacity group-hover:opacity-100">
        {app.name}
      </span>
      <span
        className={`grid h-[52px] w-[52px] place-items-center shadow-[0_2px_6px_rgba(0,0,0,0.28)] transition-transform duration-150 group-hover:-translate-y-1.5 group-hover:scale-110 ${
          app.round ? 'rounded-full' : 'rounded-[12px]'
        }`}
        style={{ background: app.tile }}
      >
        <Icon className="h-[26px] w-[26px]" strokeWidth={1.9} style={{ color: app.ink }} />
      </span>
      <span
        className={`mt-[3px] h-[3px] w-[3px] rounded-full bg-black/55 ${
          app.running ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  );
}

export default function Dock() {
  return (
    <div className="absolute inset-x-0 bottom-1.5 z-20 flex justify-center">
      <div className="flex items-end gap-2.5 rounded-[20px] border border-white/40 bg-white/40 px-2.5 pb-1 pt-2 shadow-[0_8px_28px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
        {APPS.map((app, i) => (
          <Tile key={app.name} app={app} delay={420 + i * 35} />
        ))}

        <span className="mx-1 mb-3 h-[46px] w-px bg-black/20" aria-hidden="true" />

        <Tile
          app={{
            name: 'Downloads',
            Icon: Folder,
            tile: 'linear-gradient(180deg,#84cdfb,#5cb7f5)',
            ink: '#ffffff',
          }}
          delay={870}
        />
        <Tile
          app={{
            name: 'Trash',
            Icon: Trash2,
            tile: 'linear-gradient(180deg,#f0f1f4,#c9ccd2)',
            ink: '#4a4f58',
          }}
          delay={905}
        />
      </div>
    </div>
  );
}

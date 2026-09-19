import { useCallback, useState } from 'react';
import { folders, type FolderId } from '../content';
import useViewport from '../hooks/useViewport';
import DesktopIcons from './DesktopIcons';
import Dock from './Dock';
import FolderWindow, { type WindowState } from './FolderWindow';
import MenuBar from './MenuBar';
import Wallpaper from './Wallpaper';
import { play } from '../lib/sound';

/**
 * The desktop is always rendered at exactly one viewport in size. Scene scales
 * it down into the Macintosh screen and back up again, so nothing in here
 * needs to know about the zoom.
 */
export default function Desktop({ active }: { active: boolean }) {
  const vp = useViewport();
  const [wins, setWins] = useState<WindowState[]>([]);
  const [top, setTop] = useState(0);

  const open = useCallback(
    (id: FolderId) => {
      setWins((prev) => {
        const z = top + 1;
        setTop(z);
        const found = prev.find((w) => w.id === id);
        if (found) return prev.map((w) => (w.id === id ? { ...w, z } : w));
        play('open');

        const n = prev.length;
        return [
          ...prev,
          {
            id,
            z,
            x: Math.max(24, vp.w / 2 - 440 + n * 28),
            y: Math.max(vp.barH + 16, vp.h / 2 - 330 + n * 26),
          },
        ];
      });
    },
    [top, vp.w, vp.h, vp.barH]
  );

  const close = (id: FolderId) => {
    play('close');
    setWins((prev) => prev.filter((w) => w.id !== id));
  };

  const focus = (id: FolderId) =>
    setWins((prev) => {
      const z = top + 1;
      setTop(z);
      return prev.map((w) => (w.id === id ? { ...w, z } : w));
    });

  const move = (id: FolderId, x: number, y: number) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));

  const focused = wins.reduce<WindowState | null>(
    (best, w) => (!best || w.z > best.z ? w : best),
    null
  );
  const frontTitle = focused ? folders.find((f) => f.id === focused.id)?.name : undefined;

  return (
    <div className="relative h-full w-full overflow-hidden font-sf select-none">
      <Wallpaper />
      <MenuBar active={active} vp={vp} appName={frontTitle ?? 'Finder'} />
      <DesktopIcons active={active} vp={vp} onOpen={open} />

      {wins.map((w) => (
        <FolderWindow
          key={w.id}
          win={w}
          vp={vp}
          focused={focused?.id === w.id}
          onFocus={() => focus(w.id)}
          onClose={() => close(w.id)}
          onMove={(x, y) => move(w.id, x, y)}
          onNavigate={open}
        />
      ))}

      <Dock active={active} vp={vp} onOpen={open} openIds={wins.map((w) => w.id)} />
      <h1 className="sr-only">Archit Sagar Jain — operator, strategy and growth</h1>
    </div>
  );
}

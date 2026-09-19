import DesktopIcons from './DesktopIcons';
import Dock from './Dock';
import MenuBar from './MenuBar';
import Wallpaper from './Wallpaper';

/**
 * The desktop is always rendered at exactly one viewport in size. The Scene
 * scales it down into the Macintosh screen and back up again, so nothing in
 * here needs to know about the zoom.
 */
export default function Desktop({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden font-sf select-none">
      <Wallpaper />
      <MenuBar active={active} />
      <DesktopIcons active={active} />
      <Dock active={active} />
      <h1 className="sr-only">Archit Sagar Jain — portfolio</h1>
    </div>
  );
}

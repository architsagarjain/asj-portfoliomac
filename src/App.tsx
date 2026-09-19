import DesktopIcons from './components/DesktopIcons';
import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import Wallpaper from './components/Wallpaper';

export default function App() {
  return (
    <main className="relative h-screen w-screen overflow-hidden font-sf select-none">
      <Wallpaper />
      <MenuBar />
      <DesktopIcons />
      <Dock />
      <h1 className="sr-only">Archit Sagar Jain — portfolio</h1>
    </main>
  );
}

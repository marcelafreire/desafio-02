import { Button } from '../components/Button';
import { useMovies } from "../useMovie";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar() {
  const { genres, selectedGenreId, handleClickButton } = useMovies();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map((item: GenreResponseProps) => (
          <Button
            key={String(item.id)}
            title={item.title}
            iconName={item.name}
            onClick={() => handleClickButton(item.id)}
            selected={selectedGenreId === item.id}
          />
        ))}
      </div>
  </nav>
  );
}
import { ReactNode, useContext } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";

import { api } from './services/api';


interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }
  
  interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }
  
  interface MovieProvidersProps {
    children: ReactNode;
}

interface MovieContextData {
    movies: MovieProps[];
    genres: GenreResponseProps[];
    selectedGenreId: number;
    selectedGenre: GenreResponseProps;
    handleClickButton: (id: number) => void;
}

export const MovieContext = createContext<MovieContextData>({} as MovieContextData);;

export function MovieProvider({children} : MovieProvidersProps) {

    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    
    const state = {
      selectedGenreId,
      setSelectedGenreId
    }
  
    const [movies, setMovies] = useState<MovieProps[]>([]);
  
    useEffect(() => {
      api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
      });
    }, []);
  
    useEffect(() => {
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
        setMovies(response.data);
      });
  
      api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
      })
    }, [selectedGenreId]);
  
    function handleClickButton(id: number) {
      setSelectedGenreId(id);
    }

    return (
        <MovieContext.Provider value={{ movies, genres, selectedGenreId, selectedGenre, handleClickButton }}>
            {children}
        </MovieContext.Provider>
    )

}


export function useMovies() {
    const context = useContext(MovieContext);
    return context;
  }

interface BookFiltersProps {
  genre: string;
  type: string;
  onGenreChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function BookFilters({ genre, type, onGenreChange, onTypeChange }: BookFiltersProps) {
  return (
    <div className="filters-panel">
      <div>
        <label>Gênero</label>
        <select value={genre} onChange={(event) => onGenreChange(event.target.value)}>
          <option value="">Todos</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Distopia">Distopia</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Desenvolvimento pessoal">Desenvolvimento pessoal</option>
        </select>
      </div>

      <div>
        <label>Tipo</label>
        <select value={type} onChange={(event) => onTypeChange(event.target.value)}>
          <option value="">Todos</option>
          <option value="purchase">Compra</option>
          <option value="rental">Aluguel</option>
        </select>
      </div>
    </div>
  );
}

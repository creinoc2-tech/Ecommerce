export interface CategoriaInput {
  name: string;
  icone: string;
  color: string;
  descripcion: string;
  usuario_id: string;
}

export interface Categoria extends CategoriaInput {
  id: number;
  created_at?: string;
}

export interface CategoryWithChildren extends Categoria {
   productCount: number;   
}
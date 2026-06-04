import type { FC } from "react";

 interface Props {
   totalItems: number;
   page : number;
   setPage : React.Dispatch<React.SetStateAction<number>>;
   items?: number;
}

export const Pagination:  FC<Props> = ({ totalItems, page, setPage  , items}) => {
    const handleNextPage = () => {
		setPage(page + 1);
	};

	const handlePrevPage = () => {
		setPage(prevPage => Math.max(prevPage - 1, 1));
	};
    const itemsPerPage =  items ?? 10  ;

    const totalPages = totalItems
		? Math.ceil(totalItems / itemsPerPage)
		: 1;
	const isLastPage = page >= totalPages;

	const startItem = (page - 1) * itemsPerPage + 1; // 1 -> 11 -> 21
	const endItem = Math.min(page * itemsPerPage, totalItems);


  return (
    <div className='flex justify-between items-center mt-6 text-white'>
				<p className="text-xs font-medium tracking-wide flex items-center gap-1">
					<span className="uppercase text-[10px] text-gray-400 mr-2">Mostrando</span>
					<span className="font-bold text-[#bca789] text-sm">{startItem} - {endItem}</span>
					<span className="text-gray-400 mx-1">de</span>
					<span className="font-bold text-white text-sm">{totalItems}</span>
					<span className="text-gray-400 ml-1">productos</span>
				</p>
      
		<div className='flex gap-3'>
			<button
				className={`px-4 py-2 rounded border border-gray-600 bg-[#23232b] text-gray-200 font-semibold tracking-wide transition-all duration-200
					hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
				onClick={handlePrevPage}
				disabled={page === 1}
			>
				Anterior
			</button>

			<button
				className={`px-4 py-2 rounded border border-gray-600 bg-[#23232b] text-gray-200 font-semibold tracking-wide transition-all duration-200
					hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
				onClick={handleNextPage}
				disabled={isLastPage}
			>
				Siguiente
			</button>
		</div>
		</div>
	);
};
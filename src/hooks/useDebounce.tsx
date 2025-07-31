import { useRef } from "react";

// Digunakan untuk delay hit API saat melakukan pencarian (fitur Search)

const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: Function, delay: number) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current); // kalau ketik sesuatu maka akan diclear timeoutnya
    //   kalau tidak ketik sesuatu maka timeout akan terus berjalan sampai delay habis
    debounceTimeout.current = setTimeout(() => {
      func(); // fungsi ini akan jalan saat delay sudah habis
      debounceTimeout.current = null;
    }, delay);
  };

  return debounce;
};

export default useDebounce;

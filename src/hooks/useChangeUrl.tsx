import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCategory = router.query.category;
  const currentIsFeatured = router.query.isFeatured;
  const currentIsOnline = router.query.isOnline;

  const setUrl = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const setUrlExplore = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        category: currentCategory || "",
        isFeatured: currentIsFeatured || "",
        isOnline: currentIsOnline || "",
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page: page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT, // kalau limit diganti, maka page balik ke 1 lgi
      },
    });
  };

  const handleChangeCategory = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    router.push({
      query: {
        ...router.query,
        isFeatured,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    router.push({
      query: {
        ...router.query,
        isOnline,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search: search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,

    setUrl,
    setUrlExplore,

    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
  };
};

export default useChangeUrl;

import useChangeUrl from "@/hooks/useChangeUrl";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useBanner = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getBanners = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  // see Tanstack React Query docs
  const {
    data: dataBanner,
    isLoading: isLoadingBanner,
    isRefetching: isRefetchingBanner,
    refetch: refetchBanner,
  } = useQuery({
    queryKey: ["Categories", currentPage, currentLimit, currentSearch], //current.. ditaro disini supaya melakukan refetch kalau ada perubahan pada var tsb (sama kyk fn refetch)
    queryFn: () => getBanners(),
    enabled: router.isReady && !!currentPage && !!currentLimit, // fetch hanya jalan ketika kondisi ini ada (router ready, page ada, limit ada)
  });

  return {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,

    selectedId,
    setSelectedId,
  };
};

export default useBanner;

import useChangeUrl from "@/hooks/useChangeUrl";
import bannerServices from "@/services/banner.service";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getMemberTransactions = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

    const res = await orderServices.getMemberOrder(params);
    const { data } = res;
    return data;
  };

  // see Tanstack React Query docs
  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["MemberTransaction", currentPage, currentLimit, currentSearch], //current.. ditaro disini supaya melakukan refetch kalau ada perubahan pada var tsb (sama kyk fn refetch)
    queryFn: () => getMemberTransactions(),
    enabled: router.isReady && !!currentPage && !!currentLimit, // fetch hanya jalan ketika kondisi ini ada (router ready, page ada, limit ada)
  });

  return {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
  };
};

export default useTransaction;

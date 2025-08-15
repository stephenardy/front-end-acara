import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@nextui-org/react";

interface PropTypes {
  totalPages: number;
}

const EventFooter = (props: PropTypes) => {
  const { totalPages } = props;
  const { currentLimit, handleChangeLimit, currentPage, handleChangePage } =
    useChangeUrl();
  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
      <Select
        className="max-w-28"
        size="md"
        selectedKeys={[`${currentLimit}`]}
        selectionMode="single"
        onChange={handleChangeLimit}
        startContent={<p className="text-small">Show:</p>}
        disallowEmptySelection //gaboleh kosong
      >
        {LIMIT_LISTS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>

      {totalPages > 1 && (
        <Pagination
          isCompact
          showControls
          color="danger"
          page={Number(currentPage)}
          total={totalPages}
          onChange={handleChangePage}
          loop // balik ke page 1 lgi kalau klik "next" di page terakhir, dan sebaliknya
        />
      )}
    </div>
  );
};

export default EventFooter;

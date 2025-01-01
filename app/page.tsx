import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      itemCount={101}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
}

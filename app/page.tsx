import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination itemCount={101} pageSize={10} currentPage={11} />;
}

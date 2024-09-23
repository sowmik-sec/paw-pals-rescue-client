import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoaderSpinner from "../../../components/LoaderSpinner/LoaderSpinner";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

function MyAddedPets() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(""); // State for global filtering
  const [pageIndex, setPageIndex] = useState(0); // For pagination
  const navigate = useNavigate();

  const {
    data: myPets,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-pets?email=${user?.email}`);
      return res.data;
    },
  });

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((_, index) => index + 1, {
        id: "serial",
        header: "Serial",
      }),
      columnHelper.accessor("pet_name", {
        header: "Pet Name",
      }),
      columnHelper.accessor("pet_category", {
        header: "Category",
      }),
      columnHelper.accessor("pet_image", {
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="pet"
            className="w-12 h-12 rounded-full"
          />
        ),
      }),
      columnHelper.accessor(
        (row) =>
          row?.requestDetails?.status
            ? row?.requestDetails?.status
            : "available",
        {
          id: "adoptionStatus",
          header: "Adoption Status",
        }
      ),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="btn btn-primary"
              onClick={() => handleUpdate(row.original._id)}
            >
              Update
            </button>
            <button
              className="btn btn-danger"
              onClick={() => openDeleteModal(row.original)}
            >
              Delete
            </button>
            {!row.original.adopted && (
              <button
                className="btn btn-success"
                onClick={() => handleAdopted(row.original._id)}
              >
                Mark as Adopted
              </button>
            )}
          </div>
        ),
      }),
    ],
    [columnHelper]
  );

  // Filter pets based on global search
  const filteredData = useMemo(() => {
    if (!myPets) return [];
    return myPets.filter((pet) =>
      pet.pet_name.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [myPets, globalFilter]);

  // React Table setup
  const tableInstance = useReactTable({
    data: filteredData,
    columns,
    pageCount: Math.ceil(filteredData.length / 10), // Assuming 10 rows per page
    state: { pageIndex },
    onPaginationChange: setPageIndex,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  const {
    getHeaderGroups,
    getRowModel,
    getPageOptions,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageIndex: currentPageIndex,
  } = tableInstance;

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const handleUpdate = (petId) => {
    navigate(`/update-pet/${petId}`);
  };

  const handleAdopted = async (petId) => {
    await axiosSecure.patch(`/pets/${petId}`, { adopted: true });
    refetch();
  };

  const openDeleteModal = (pet) => {
    setSelectedPet(pet);
    setModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setModalIsOpen(false);
    setSelectedPet(null);
  };

  const handleDelete = async () => {
    await axiosSecure.delete(`/pets/${selectedPet._id}`);
    refetch();
    closeDeleteModal();
  };

  return (
    <div>
      {/* Search Input for Global Filtering */}
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search pets..."
        className="mb-4 p-2 border rounded"
      />

      <table className="table-auto w-full">
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  {...{
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                  className="cursor-pointer px-4" // Add padding here
                >
                  {header.column.columnDef.header}
                  <span>
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {" "}
                  {/* Add padding here */}
                  {cell.column.columnDef.cell(cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPageIndex + 1} of {getPageOptions().length}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>

      {/* Delete Modal */}
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeDeleteModal}>
        <h2>Are you sure you want to delete this pet?</h2>
        <p>{selectedPet?.pet_name}</p>
        <div className="flex justify-between mt-4">
          <button className="btn btn-danger" onClick={handleDelete}>
            Yes, Delete
          </button>
          <button className="btn btn-secondary" onClick={closeDeleteModal}>
            No, Cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default MyAddedPets;

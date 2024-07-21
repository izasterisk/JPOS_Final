import { Button } from "@nextui-org/button";
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";

import DefaultSaleLayout from "@/layouts/sale/default";
import { ContactResponse, getAllContactsResponse, updateOrderStatus } from "@/apis/order";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Manager = () => {
    const [data, setData] = useState<ContactResponse[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllContactsResponse({ page });

            if (result.status === 200) {
                setData(result.data.items);
                setTotal(result.data.totalPages);
            }
        };

        fetchApi();
    }, [page]);

    const acceptOrder = async (itemId: number) => {
        const response = await updateOrderStatus(itemId, "Accepted");

        toast.success("Accept order successfully");
    };
    const rejectOrder = async (itemId: number) => {
        const response = await updateOrderStatus(itemId, "Rejctted");

        toast.success("Reject order successfully");
    };

    return (
        <>
            <DefaultSaleLayout>
                <div className="mt-10 px-20">
                    <h1 className="mb-5">Manager</h1>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn width={50}>ID</TableColumn>
                            <TableColumn width={150}>NAME</TableColumn>
                            <TableColumn width={200}>EMAIL</TableColumn>
                            <TableColumn width={200}>PHONE NUMBER</TableColumn>
                            <TableColumn>MESSAGE</TableColumn>
                            <TableColumn width={200}>DATE</TableColumn>
                            <TableColumn width={100}>STATUS</TableColumn>
                            <TableColumn width={150}>ACTION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {data
                                ? data.map((item) => (
                                      <TableRow key={item.id}>
                                          <TableCell>{item.id}</TableCell>
                                          <TableCell>{item.fullname}</TableCell>
                                          <TableCell>{item.email}</TableCell>
                                          <TableCell>{item.phone}</TableCell>
                                          <TableCell>{item.message}</TableCell>
                                          <TableCell>
                                              {dayjs(item.time).format("DD/MM/YYYY HH:mm:ss").toString()}
                                          </TableCell>
                                          <TableCell>{item.status}</TableCell>
                                          <TableCell className="flex gap-5">
                                              <Button color="primary" onClick={() => acceptOrder(item.id)}>
                                                  Accept
                                              </Button>
                                              <Button color="danger" onClick={() => rejectOrder(item.id)}>
                                                  Reject
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : []}
                        </TableBody>
                    </Table>
                    <Pagination className="mt-5" initialPage={page} total={total} onChange={setPage} />
                </div>
            </DefaultSaleLayout>
        </>
    );
};

export default Manager;

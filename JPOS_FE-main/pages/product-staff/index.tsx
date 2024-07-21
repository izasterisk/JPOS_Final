import { Button } from "@nextui-org/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Pagination,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs,
    useDisclosure,
} from "@nextui-org/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { isAxiosUnprocessableEntityError, ResponseApi } from "@/utils/utils";
import DefaultSaleLayout from "@/layouts/sale/default";
import {
    ContactResponse,
    createOrderAPI,
    getAllContactsResponse,
    getContactList,
    Order,
    updateOrderStatus,
} from "@/apis/order";
import dayjs from "dayjs";

const ProductStaff = () => {
    const [data, setData] = useState<ContactResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [order, setOrder] = useState<{ name: string; email: string; phone_number: string; message: string }>();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllContactsResponse({ page, status: "ProducingComplete Designing" });

            if (result.status === 200) {
                setData(result.data.items);
                setTotalPage(result.data.totalPages);
            }
        };

        fetchApi();
    }, [page]);

    const onSubmit = async (_data: { name: string; email: string; phone_number: string; message: string }) => {
        try {
            const result = await createOrderAPI(_data);

            if (result.status === 200) {
                console.log(result.data);

                toast.success("Login successful");
            }
        } catch (err) {
            if (isAxiosUnprocessableEntityError<ResponseApi<{ email: string; password: string }>>(err)) {
                // const formError = err.response?.data.data;
                toast.error("Email/Phone number or Password is incorrect");
                // if (formError) {
                //   Object.keys(formError).forEach((key) => {
                //     setError(key as keyof LoginFormData, {
                //       message: formError[key as keyof LoginFormData],
                //       type: "Server",
                //     });
                //   });
                // }
            }
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<{ name: string; email: string; phone_number: string; message: string }>();

    const finishProduceProduct = async (item: any) => {
        const response = await updateOrderStatus(item.id, "Complete Producing");

        if (response.status === 200) {
            toast.success("Finish Producing");
        }
    };

    return (
        <>
            <DefaultSaleLayout>
                <div className="mt-10 px-20">
                    <h1 className="mb-5">Product Staff</h1>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn width={50}>ID</TableColumn>
                            <TableColumn width={200}>NAME</TableColumn>
                            <TableColumn width={200}>EMAIL</TableColumn>
                            <TableColumn width={150}>PHONE NUMBER</TableColumn>
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
                                          <TableCell>
                                              <Button color="primary" onPress={() => finishProduceProduct(item)}>
                                                  COMPLETE PRODUCING
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : []}
                        </TableBody>
                    </Table>
                    <Pagination className="mt-5" initialPage={page} total={totalPage} onChange={setPage} />
                </div>
            </DefaultSaleLayout>
        </>
    );
};

export default ProductStaff;

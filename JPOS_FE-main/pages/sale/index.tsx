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

import DefaultSaleLayout from "@/layouts/sale/default";
import { completeContact, Contact, contactResponse, createOrderAPI, getContactList } from "@/apis/order";
import dayjs from "dayjs";
import { Input } from "@nextui-org/input";

const Sale = () => {
    const [data, setData] = useState<Contact[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);
    const [modalType, setModalType] = useState<"create" | "complete">("create");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [orderid, setOrderid] = useState<number>(0);

    const [order, setOrder] = useState<{
        name: string;
        email: string;
        phone_number: string;
        message: string;
    }>();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getContactList(page, 10, "NewComplete Producing");

            if (result.status === 200) {
                setData(result.data.items);
                setTotalPage(result.data.totalPages);
            }
        };

        fetchApi();
    }, [page]);

    const onSubmit = async (_data: {
        contactId: number;
        name: string;
        email: string;
        phone_number: string;
        message: string;
    }) => {
        try {
            const result = await contactResponse({ contactId: _data.contactId, message: _data.message });

            if (result.status === 200) {
                console.log(result.data);
                toast.success("Successfully send to manager");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<{ contactId: number; name: string; email: string; phone_number: string; message: string }>();

    const createOrder = (item: any) => {
        if (item.status === "NEW") {
            setModalType("create");
        } else {
            setOrderid(item.contactId);
            setModalType("complete");
        }
        setOrder(item);
        setValue("contactId", item.contactId);
        setValue("name", item.fullname);
        setValue("email", item.email);
        setValue("phone_number", item.phone);
        setValue("message", item.message);
        onOpen();
    };

    const handleCompleteOrder = async () => {
        console.log(orderid, price);
        const response = await completeContact(orderid, price);

        if (response.status === 200) {
            toast.success("Complete order successfully");
        }
    };

    return (
        <>
            <DefaultSaleLayout>
                <div className="mt-10 px-20">
                    <h1 className="mb-5">Sale</h1>
                    <Tabs aria-label="Options">
                        <Tab key="me" title="My Contact Messages">
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
                                              <TableRow key={item.contactId}>
                                                  <TableCell>{item.contactId}</TableCell>
                                                  <TableCell>{item.fullname}</TableCell>
                                                  <TableCell>{item.email}</TableCell>
                                                  <TableCell>{item.phone}</TableCell>
                                                  <TableCell>{item.message}</TableCell>
                                                  <TableCell>
                                                      {dayjs(item.time).format("DD/MM/YYYY HH:mm:ss").toString()}
                                                  </TableCell>
                                                  <TableCell>{item.status}</TableCell>
                                                  <TableCell>
                                                      <Button
                                                          color={item.status === "NEW" ? "primary" : "success"}
                                                          onPress={() => createOrder(item)}
                                                      >
                                                          {item.status === "NEW" ? "Create Order" : "Complete Order"}
                                                      </Button>
                                                  </TableCell>
                                              </TableRow>
                                          ))
                                        : []}
                                </TableBody>
                            </Table>
                            <Pagination initialPage={page} total={totalPage} onChange={setPage} />
                        </Tab>
                    </Tabs>
                </div>
                <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {modalType === "create" ? "Create Order" : "Complete Order"}
                                </ModalHeader>
                                <ModalBody>
                                    {modalType === "create" ? (
                                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex flex-col gap-5">
                                                <div className="field-wrapper">
                                                    <label className="field-label" htmlFor="name">
                                                        Name
                                                    </label>
                                                    <input
                                                        className={classNames("field-input", {
                                                            "field-input--error": errors.name,
                                                        })}
                                                        id="name"
                                                        placeholder="Name"
                                                        type="text"
                                                        {...register("name")}
                                                        value={order?.name as string}
                                                        disabled
                                                        // onChange={(e) => setOrder({ ...order, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="field-wrapper">
                                                    <label className="field-label" htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input
                                                        className={classNames("field-input", {
                                                            "field-input--error": errors.email,
                                                        })}
                                                        id="email"
                                                        placeholder="Your Email"
                                                        type="text"
                                                        {...register("email")}
                                                        value={order?.email}
                                                        disabled
                                                        // onChange={(e) => setOrder({ ...order, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="field-wrapper">
                                                    <label className="field-label" htmlFor="phone_number">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        className={classNames("field-input", {
                                                            "field-input--error": errors.phone_number,
                                                        })}
                                                        id="phone_number"
                                                        placeholder="Your Phone Number"
                                                        type="text"
                                                        {...register("phone_number")}
                                                        value={order?.phone_number}
                                                        disabled
                                                        // onChange={(e) =>
                                                        //     setOrder({ ...order, phone_number: e.target.value })
                                                        // }
                                                    />
                                                </div>
                                                <div className="field-wrapper">
                                                    <label className="field-label" htmlFor="message">
                                                        Message
                                                    </label>
                                                    <textarea
                                                        className={classNames("textarea-input", {
                                                            "textarea-input--error": errors.message,
                                                        })}
                                                        id="message"
                                                        placeholder="Your Message"
                                                        {...register("message")}
                                                        value={order?.message}
                                                        onChange={(e) =>
                                                            setOrder({ ...order, message: e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-5 flex items-center justify-end">
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    Close
                                                </Button>
                                                <Button color="primary" type="submit">
                                                    Create
                                                </Button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div>
                                            <Input
                                                placeholder="Nhập Giá Tiền"
                                                label="Total Price"
                                                value={price.toString()}
                                                type="number"
                                                onChange={(e) => setPrice(parseInt(e.target.value))}
                                            />
                                            <Button color="primary" onClick={handleCompleteOrder} className="mt-5">
                                                Complete Order
                                            </Button>
                                        </div>
                                    )}
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </DefaultSaleLayout>
        </>
    );
};

export default Sale;

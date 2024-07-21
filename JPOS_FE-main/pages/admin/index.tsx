import { Button } from "@nextui-org/button";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { isAxiosUnprocessableEntityError, numberToVND, ResponseApi } from "@/utils/utils";
import DefaultSaleLayout from "@/layouts/sale/default";
import { Contact, getAllOrders, getContactList, getTotalPrice, Order } from "@/apis/order";
import { deleteUserHttpSend } from "../api/user";
import { getAllProduct, ProductType } from "@/apis/product";
import dayjs from "dayjs";
import { getAllUsers, UserType } from "@/apis/user";

const Admin = () => {
    const [products, setProduct] = useState<ProductType[]>([]);
    const [productPage, setProductPage] = useState<number>(1);
    const [productTotalPage, setProductTotalPage] = useState<number>(1);

    const [contact, setContact] = useState<Contact[]>([]);
    const [contactPage, setContactPage] = useState<number>(1);
    const [contactTotalPage, setContactTotalPage] = useState<number>(1);

    const [users, setUsers] = useState<UserType[]>([]);
    const [userPage, setUserPage] = useState<number>(1);
    const [userTotalPage, setUserTotalPage] = useState<number>(1);

    const [orders, setOrders] = useState<Order[]>([]);
    const [orderPage, setOrderPage] = useState<number>(1);
    const [orderTotalPage, setOrderTotalPage] = useState<number>(1);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [user, setUser] = useState<{
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        role: any;
    }>();

    useEffect(() => {
        const fetchApi = async () => {
            const productList = await getAllProduct(productPage, 10);

            if (productList.status === 200) {
                setProduct(productList.data.items);
                setProductPage(productList.data.page);
                setProductTotalPage(productList.data.totalPages);
            }
        };

        fetchApi();
    }, [productPage]);

    useEffect(() => {
        const fetchApi = async () => {
            const contactList = await getContactList(
                contactPage,
                10,
                "NewAcceptedRejecttedDesigningProducingCompleted",
            );

            if (contactList.status === 200) {
                setContact(contactList.data.items);
                setContactPage(contactList.data.page);
                setContactTotalPage(contactList.data.totalPages);
            }
        };

        fetchApi();
    }, [contactPage]);

    useEffect(() => {
        const fetchApi = async () => {
            const userList = await getAllUsers();

            if (userList.status === 200) {
                setUsers(userList.data.items);
                setUserPage(userList.data.page);
                setUserTotalPage(userList.data.totalPages);
            }
        };

        fetchApi();
    }, [userPage]);

    useEffect(() => {
        const fetchApi = async () => {
            const orderList = await getAllOrders({ page: orderPage, size: 10 });

            if (orderList.status === 200) {
                setOrders(orderList.data.items);
                setOrderPage(orderList.data.page);
                setOrderTotalPage(orderList.data.totalPages);
            }
        };

        fetchApi();
    }, [orderPage]);

    useEffect(() => {
        const fetchApi = async () => {
            const totalPrice = await getTotalPrice();

            setTotalPrice(totalPrice.data.item.totalPrice);
        };

        fetchApi();
    }, []);

    return (
        <>
            <DefaultSaleLayout>
                <div className="mt-10 px-20">
                    <h1 className="mb-5">Admin</h1>
                    <Tabs aria-label="Options">
                        <Tab key="products" title="Products">
                            <Card>
                                <CardBody>
                                    <Table aria-label="Example static collection table">
                                        <TableHeader>
                                            <TableColumn width={50}>ID</TableColumn>
                                            <TableColumn width={50}>IMAGE</TableColumn>
                                            <TableColumn width={250}>NAME</TableColumn>
                                            <TableColumn width={400}>DESCRIPTION</TableColumn>
                                            <TableColumn width={40}>PRICE</TableColumn>
                                            <TableColumn width={50}>CATEGORY</TableColumn>
                                            <TableColumn width={100}>STATUS</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {products
                                                ? products.map((item) => (
                                                      <TableRow key={item.id}>
                                                          <TableCell>{item.id}</TableCell>
                                                          <TableCell>
                                                              <Image src={item.image} />
                                                          </TableCell>
                                                          <TableCell>{item.name}</TableCell>
                                                          <TableCell>{item.description}</TableCell>
                                                          <TableCell>{item.price}</TableCell>
                                                          <TableCell>{item.cate_id}</TableCell>
                                                          <TableCell>{item.status}</TableCell>
                                                      </TableRow>
                                                  ))
                                                : []}
                                        </TableBody>
                                    </Table>
                                </CardBody>
                                <CardFooter>
                                    <Pagination
                                        initialPage={productPage}
                                        total={productTotalPage}
                                        onChange={setProductPage}
                                    />
                                </CardFooter>
                            </Card>
                        </Tab>
                        <Tab key="users" title="Users">
                            <Card>
                                <CardBody>
                                    <Table aria-label="Example static collection table">
                                        <TableHeader>
                                            <TableColumn width={50}>ID</TableColumn>
                                            <TableColumn width={200}>USERNAME</TableColumn>
                                            <TableColumn width={200}>FULLNAME</TableColumn>
                                            <TableColumn width={200}>EMAIL</TableColumn>
                                            <TableColumn width={150}>PHONE NUMBER</TableColumn>
                                            <TableColumn>ADDRESS</TableColumn>
                                            <TableColumn width={200}>ROLE</TableColumn>
                                            <TableColumn width={100}>STATUS</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {users
                                                ? users.map((item) => (
                                                      <TableRow key={item.id}>
                                                          <TableCell>{item.id}</TableCell>
                                                          <TableCell>{item.username}</TableCell>
                                                          <TableCell>{item.fullname}</TableCell>
                                                          <TableCell>{item.email}</TableCell>
                                                          <TableCell>{item.phone}</TableCell>
                                                          <TableCell>{item.address}</TableCell>
                                                          <TableCell>{item.role}</TableCell>
                                                          <TableCell>{item.status}</TableCell>
                                                      </TableRow>
                                                  ))
                                                : []}
                                        </TableBody>
                                    </Table>
                                </CardBody>
                                <CardFooter>
                                    <Pagination initialPage={userPage} total={userTotalPage} onChange={setUserPage} />
                                </CardFooter>
                            </Card>
                        </Tab>
                        <Tab key="orders" title="Orders">
                            <Card>
                                <CardHeader>Total Price: {numberToVND(totalPrice)}</CardHeader>
                                <CardBody>
                                    <Table aria-label="Example static collection table">
                                        <TableHeader>
                                            <TableColumn width={50}>ID</TableColumn>
                                            <TableColumn width={200}>CUSTOMER ID</TableColumn>
                                            <TableColumn width={200}>TOTAL PRICE</TableColumn>
                                            <TableColumn width={200}>DATE</TableColumn>
                                            <TableColumn width={100}>STATUS</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {orders
                                                ? orders.map((item) => (
                                                      <TableRow key={item.id}>
                                                          <TableCell>{item.id}</TableCell>
                                                          <TableCell>{item.customerId}</TableCell>
                                                          <TableCell>{numberToVND(item.totalPrice)}</TableCell>
                                                          <TableCell>
                                                              {dayjs(item.time)
                                                                  .format("DD/MM/YYYY HH:mm:ss")
                                                                  .toString()}
                                                          </TableCell>
                                                          <TableCell>{item.status}</TableCell>
                                                      </TableRow>
                                                  ))
                                                : []}
                                        </TableBody>
                                    </Table>
                                </CardBody>
                                <CardFooter>
                                    <Pagination
                                        initialPage={orderPage}
                                        total={orderTotalPage}
                                        onChange={setOrderTotalPage}
                                    />
                                </CardFooter>
                            </Card>
                        </Tab>
                        <Tab key="contact" title="Contacts">
                            <Card>
                                <CardBody>
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
                                            {contact
                                                ? contact.map((item) => (
                                                      <TableRow key={item.contactId}>
                                                          <TableCell>{item.contactId}</TableCell>
                                                          <TableCell>{item.fullname}</TableCell>
                                                          <TableCell>{item.email}</TableCell>
                                                          <TableCell>{item.phone}</TableCell>
                                                          <TableCell>{item.message}</TableCell>
                                                          <TableCell>
                                                              {dayjs(item.time)
                                                                  .format("DD/MM/YYYY HH:mm:ss")
                                                                  .toString()}
                                                          </TableCell>
                                                          <TableCell>{item.status}</TableCell>
                                                          <TableCell>
                                                              <Button color="primary">
                                                                  {item.status === "NEW"
                                                                      ? "Create Order"
                                                                      : "View Order"}
                                                              </Button>
                                                          </TableCell>
                                                      </TableRow>
                                                  ))
                                                : []}
                                        </TableBody>
                                    </Table>
                                </CardBody>
                                <CardFooter>
                                    <Pagination
                                        initialPage={contactPage}
                                        total={contactTotalPage}
                                        onChange={setContactPage}
                                    />
                                </CardFooter>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
                {/* <Modal isOpen={isOpen} size="3xl" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Create Order</ModalHeader>
                                <ModalBody>
                                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex flex-col gap-5">
                                            <div className="flex items-center justify-between gap-5">
                                                <div className="field-wrapper w-full">
                                                    <label className="field-label" htmlFor="first_name">
                                                        First Name
                                                    </label>
                                                    <input
                                                        className={classNames("field-input", {
                                                            "field-input--error": errors.first_name,
                                                        })}
                                                        id="first_name"
                                                        placeholder="Name"
                                                        type="text"
                                                        {...register("first_name")}
                                                        value={user?.first_name as string}
                                                        onChange={(e) =>
                                                            setUser({ ...user, first_name: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="field-wrapper w-full">
                                                    <label className="field-label" htmlFor="name">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        className={classNames("field-input", {
                                                            "field-input--error": errors.last_name,
                                                        })}
                                                        id="last_name"
                                                        placeholder="last_name"
                                                        type="text"
                                                        {...register("last_name")}
                                                        value={user?.last_name as string}
                                                        onChange={(e) =>
                                                            setUser({ ...user, last_name: e.target.value })
                                                        }
                                                    />
                                                </div>
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
                                                    value={user?.email}
                                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex justify-between gap-5">
                                                <div className="field-wrapper w-9/12">
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
                                                        value={user?.phone_number}
                                                        onChange={(e) =>
                                                            setUser({ ...user, phone_number: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="field-wrapper w-3/12">
                                                    <label className="field-label" htmlFor="role">
                                                        ROLE
                                                    </label>
                                                    <Select
                                                        aria-label="Select role"
                                                        {...register("role")}
                                                        value={user?.role}
                                                        onSelectionChange={(e) => setUser({ ...user, role: e })}
                                                    >
                                                        <SelectItem key={"ADMIN"}>ADMIN</SelectItem>
                                                        <SelectItem key={"STAFF"}>STAFF</SelectItem>
                                                        <SelectItem key={"PRODUCT STAFF"}>PRODUCT STAFF</SelectItem>
                                                        <SelectItem key={"USER"}>USER</SelectItem>
                                                        <SelectItem key={"SALE"}>SALE</SelectItem>
                                                        <SelectItem key={"MANAGER"}>MANAGER</SelectItem>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex items-center justify-end">
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" type="submit">
                                                Update
                                            </Button>
                                        </div>
                                    </form>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal> */}
            </DefaultSaleLayout>
        </>
    );
};

export default Admin;

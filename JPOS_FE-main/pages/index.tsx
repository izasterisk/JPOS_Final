import { Button } from "@nextui-org/button";
import { Image, Modal, ModalContent, useDisclosure, ModalHeader, ModalBody } from "@nextui-org/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";

import { ContactComponent } from "./contact";

import DefaultLayout from "@/layouts/default";
import { WhyChooseUsSection } from "@/components/introduce";
import { useEffect, useState } from "react";
import { getCategories, getProductsByCategory, ProductType } from "@/apis/product";

export default function IndexPage() {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [page, setPage] = useState<number>(1);
    const [necklaces, setNecklaces] = useState<ProductType[]>([]);
    const [earings, setEarings] = useState<ProductType[]>([]);
    const [bracelets, setBracelets] = useState<ProductType[]>([]);
    const [rings, setRings] = useState<ProductType[]>([]);
    const [brooches, setBrooches] = useState<ProductType[]>([]);
    const [other, setOther] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const categories = await getCategories(page, 10);

                setCategories(categories.data.items);
                categories.data.items.forEach(async (category) => {
                    const products = await getProductsByCategory(category.id, 1);

                    switch (category.name) {
                        case "Necklaces":
                            setNecklaces(products.data.items);
                            break;
                        case "Earrings":
                            setEarings(products.data.items);
                            break;
                        case "Bracelets":
                            setBracelets(products.data.items);
                            break;
                        case "Rings":
                            setRings(products.data.items);
                            break;
                        case "Brooches":
                            setBrooches(products.data.items);
                            break;
                        default:
                            setOther(products.data.items);
                    }
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchApi();
    }, []);

    const getAllNeckImageToList = () => {
        let arr = [];

        for (let i = 2; i <= 24; i++) {
            arr.push({ img: `/img/neck/${i}.png` });
        }

        return arr;
    };

    const getAllManjewelryImageToList = () => {
        let arr = [];

        for (let i = 2; i <= 24; i++) {
            arr.push({ img: `/img/manjewelry/${i}.png` });
        }

        return arr;
    };

    const getAllBraceletsImageToList = () => {
        let arr = [];

        for (let i = 2; i <= 24; i++) {
            arr.push({ img: `/img/bracelets/${i}.png` });
        }

        return arr;
    };

    const getAllEarringImageToList = () => {
        let arr = [];

        for (let i = 2; i <= 24; i++) {
            arr.push({ img: `/img/earring/${i}.png` });
        }

        return arr;
    };

    const showDemoList = [
        {
            img: "/img/bracelets/1.png",
        },
        {
            img: "/img/earring/1.png",
        },
        {
            img: "/img/neck/1.png",
        },
        {
            img: "/img/ring/1.png",
        },
    ];

    const list = [
        {
            title: "Orange",
            img: "/img/bracelets/1.png",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "/img/bracelets/2.png",
            price: "$3.00",
        },
        {
            title: "Raspberry",
            img: "/img/bracelets/3.png",
            price: "$10.00",
        },
        {
            title: "Lemon",
            img: "/img/bracelets/4.png",
            price: "$5.30",
        },
    ];

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const user_tmp_sected_img = "/img/bracelets/1.png";
    const user_tmp_sected_img_index = 0;

    return (
        <DefaultLayout>
            <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-[#FAFAFA] py-10">
                <div className="flex size-full rounded-lg bg-[#ec5360]">
                    <div className="mt-14 w-1/2 px-24">
                        <h1 className="mb-8 text-5xl text-white">Welcome to JPOS</h1>
                        <p className="text-xl text-white">
                            Your premier destination for luxurious and bespoke jewelry. Our talented artisans create
                            exquisite, unique designs, from stunning wedding rings to elegant necklaces. Let us turn
                            your vision into reality. Visit JPOS today for unmatched elegance and personalized service.
                        </p>
                    </div>
                    <div className="flex h-full w-1/2 items-center justify-center rounded-lg bg-red-400">
                        <Image alt={"ring"} src={"/img/band/ring.png"} />
                    </div>
                </div>

                <h2 className="">We make jewelry for you by you</h2>
                <div className="mt-2 w-full">
                    <div className="flex justify-between gap-8 px-20">
                        {showDemoList.map((item, index) => (
                            <div key={"demo" + (index + 1)} className="overflow-visible p-0">
                                <Image alt={""} className="rounded-none" src={item.img} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Necklace */}
                {categories &&
                    categories
                        .filter((cate) => cate.name !== "Others")
                        .map((category) => (
                            <>
                                <h2 key={category.id}>{category.name}</h2>
                                <Splide
                                    className=""
                                    options={{
                                        type: "loop",
                                        width: "100rem",
                                        fixedWidth: "20rem",
                                        autoplay: true,
                                        speed: 2000,
                                        interval: 2000,
                                    }}
                                >
                                    {category.name === "Necklaces" &&
                                        necklaces.map((item, index) => (
                                            <SplideSlide
                                                key={"" + (index + 1)}
                                                onClick={() => {
                                                    onOpen();
                                                    console.log("click");
                                                    console.log(item.image);
                                                    console.log("key: ", index);
                                                    // displayModal(item.img, index);
                                                    // return (
                                                    //     <Modal isOpen={true}>
                                                    //         <ModalContent>
                                                    //             <h1>{index+1}</h1>
                                                    //             <h1>Modal</h1>
                                                    //             <Image alt={""} src={item.img} />
                                                    //         </ModalContent>
                                                    //     </Modal>
                                                    // );
                                                }}
                                            >
                                                <Image
                                                    alt={""}
                                                    className="mb-10 size-96 bg-purple-500 hover:border-medium hover:border-red-700"
                                                    src={item.image}
                                                />
                                            </SplideSlide>
                                        ))}
                                    {category.name === "Earrings" &&
                                        earings.map((item, index) => (
                                            <SplideSlide
                                                key={"" + (index + 1)}
                                                onClick={() => {
                                                    onOpen();
                                                    console.log("click");
                                                    console.log(item.image);
                                                    console.log("key: ", index);
                                                    // displayModal(item.img, index);
                                                    // return (
                                                    //     <Modal isOpen={true}>
                                                    //         <ModalContent>
                                                    //             <h1>{index+1}</h1>
                                                    //             <h1>Modal</h1>
                                                    //             <Image alt={""} src={item.img} />
                                                    //         </ModalContent>
                                                    //     </Modal>
                                                    // );
                                                }}
                                            >
                                                <Image
                                                    alt={""}
                                                    className="mb-10 size-96 bg-purple-500 hover:border-medium hover:border-red-700"
                                                    src={item.image}
                                                />
                                            </SplideSlide>
                                        ))}
                                    {category.name === "Bracelets" &&
                                        bracelets.map((item, index) => (
                                            <SplideSlide
                                                key={"" + (index + 1)}
                                                onClick={() => {
                                                    onOpen();
                                                    console.log("click");
                                                    console.log(item.image);
                                                    console.log("key: ", index);
                                                    // displayModal(item.img, index);
                                                    // return (
                                                    //     <Modal isOpen={true}>
                                                    //         <ModalContent>
                                                    //             <h1>{index+1}</h1>
                                                    //             <h1>Modal</h1>
                                                    //             <Image alt={""} src={item.img} />
                                                    //         </ModalContent>
                                                    //     </Modal>
                                                    // );
                                                }}
                                            >
                                                <Image
                                                    alt={""}
                                                    className="mb-10 size-96 bg-purple-500 hover:border-medium hover:border-red-700"
                                                    src={item.image}
                                                />
                                            </SplideSlide>
                                        ))}
                                    {category.name === "Rings" &&
                                        rings.map((item, index) => (
                                            <SplideSlide
                                                key={"" + (index + 1)}
                                                onClick={() => {
                                                    onOpen();
                                                    console.log("click");
                                                    console.log(item.image);
                                                    console.log("key: ", index);
                                                    // displayModal(item.img, index);
                                                    // return (
                                                    //     <Modal isOpen={true}>
                                                    //         <ModalContent>
                                                    //             <h1>{index+1}</h1>
                                                    //             <h1>Modal</h1>
                                                    //             <Image alt={""} src={item.img} />
                                                    //         </ModalContent>
                                                    //     </Modal>
                                                    // );
                                                }}
                                            >
                                                <Image
                                                    alt={""}
                                                    className="mb-10 size-96 bg-purple-500 hover:border-medium hover:border-red-700"
                                                    src={item.image}
                                                />
                                            </SplideSlide>
                                        ))}
                                    {category.name === "Brooches" &&
                                        brooches.map((item, index) => (
                                            <SplideSlide
                                                key={"" + (index + 1)}
                                                onClick={() => {
                                                    onOpen();
                                                    console.log("click");
                                                    console.log(item.image);
                                                    console.log("key: ", index);
                                                    // displayModal(item.img, index);
                                                    // return (
                                                    //     <Modal isOpen={true}>
                                                    //         <ModalContent>
                                                    //             <h1>{index+1}</h1>
                                                    //             <h1>Modal</h1>
                                                    //             <Image alt={""} src={item.img} />
                                                    //         </ModalContent>
                                                    //     </Modal>
                                                    // );
                                                }}
                                            >
                                                <Image
                                                    alt={""}
                                                    className="mb-10 size-96 bg-purple-500 hover:border-medium hover:border-red-700"
                                                    src={item.image}
                                                />
                                            </SplideSlide>
                                        ))}
                                    {/* {category.name === "Others" &&
                                    other.map((item, index) => (
                                        <SplideSlide
                                            key={"" + (index + 1)}
                                            onClick={() => {
                                                onOpen();
                                                console.log("click");
                                                console.log(item.image);
                                                console.log("key: ", index);
                                                // displayModal(item.img, index);
                                                // return (
                                                //     <Modal isOpen={true}>
                                                //         <ModalContent>
                                                //             <h1>{index+1}</h1>
                                                //             <h1>Modal</h1>
                                                //             <Image alt={""} src={item.img} />
                                                //         </ModalContent>
                                                //     </Modal>
                                                // );
                                            }}
                                        >
                                            <Image
                                                alt={""}
                                                className="mb-10 size-96 bg-purple-500 hover:border-medium hover:border-red-700"
                                                src={item.image}
                                            />
                                        </SplideSlide>
                                    ))} */}
                                </Splide>
                                <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
                                    <ModalContent>
                                        <ModalHeader className="flex flex-col gap-1">{}</ModalHeader>
                                        <ModalBody className="flex flex-col gap-1">Modal Title</ModalBody>
                                    </ModalContent>
                                </Modal>
                            </>
                        ))}
            </section>

            <WhyChooseUsSection />

            <ContactComponent />

            {/* <WeHelpSection /> */}
        </DefaultLayout>
    );
}

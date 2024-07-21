/* eslint-disable tailwindcss/no-custom-classname */
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import PasswordInput from "@/components/PasswordInput";
import DefaultLayout from "@/layouts/default";
import { isAxiosUnprocessableEntityError, ResponseApi } from "@/utils/utils";
import { login } from "@/apis/user";
import http from "@/utils/http";

export default function LoginPage() {
    const router = useRouter();
    const onSubmit = async (_data: { email: string; password: string }) => {
        try {
            console.log(_data);
            const result = await login(_data);

            if (result.status === 200) {
                toast.success("Login successful");
                localStorage.setItem("user", JSON.stringify(result.data.item));
                localStorage.setItem("token", result.data.item.accessToken);
                const role = result.data.item.userRole;

                http.setToken(result.data.item.accessToken);

                if (role === "Customer") {
                    router.push("/");
                } else if (role === "Admin") {
                    router.push("/admin");
                } else if (role === "Sale Staff") {
                    router.push("/sale");
                } else if (role === "Manager") {
                    router.push("/manager");
                } else if (role === "Product Staff") {
                    router.push("/product-staff");
                } else if (role === "Design Staff") {
                    router.push("/design-staff");
                }
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
        control,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg justify-center text-center">
                    <div className="flex flex-col gap-2.5 text-center">
                        <h1>Welcome back!</h1>
                    </div>
                    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5">
                            <div className="field-wrapper">
                                <label className="field-label" htmlFor="email">
                                    E-mail
                                </label>
                                <input
                                    className={classNames("field-input", {
                                        "field-input--error": errors.email,
                                    })}
                                    id="email"
                                    placeholder="Your E-mail address"
                                    type="text"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^\S+@\S+$/i,
                                    })}
                                />
                            </div>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <PasswordInput
                                        error={errors.password}
                                        id="password"
                                        innerRef={field.ref}
                                        isInvalid={errors.password}
                                        placeholder="Your password"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                        </div>
                        <div className="mb-10 mt-4 flex flex-col items-center gap-6">
                            <button className="text-btn">Forgot Password?</button>
                            <button className="btn btn--primary w-full">Log In</button>
                        </div>
                    </form>
                </div>
            </section>
        </DefaultLayout>
    );
}

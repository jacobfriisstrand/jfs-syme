import { z } from "zod";
import { useState } from "react";
import type { FormEvent } from "react";
import Input from "./ui/Input";
import { StructuredText } from "react-datocms";
import UpRightArrow from "@/icons/UpRightArrow";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, "Invalid username format.")
    .min(1, "Username must not be empty")
    .max(30, "Username must not exceed 30 characters"),

  url: z.string().max(0, "This field must be empty"),
  compliance: z.any().refine((val) => val === true || val === "on", {
    message: "You must accept the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  emailLabel: string;
  usernameLabel: string;
  termsAndConditionsLabel: {
    value: any;
    links: {
      __typename: string;
      id: string;
      slug: string;
      pageHeadline: string;
    }[];
  };
  buttonText: string;
  thankYouText: string;
  logo: string;
}

export default function Form({ logo, thankYouText, buttonText, emailLabel, usernameLabel, termsAndConditionsLabel }: Readonly<Props>) {
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!("compliance" in data)) {
      data.compliance = "false";
    }

    try {
      const validatedData = formSchema.parse(data);
      setErrors({});

      // Convert compliance to boolean for API submission
      const submissionData = {
        ...validatedData,
        compliance: validatedData.compliance === "on" || validatedData.compliance === true,
      };

      const response = await fetch("https://hook.eu2.make.com/iznbojomnyg87bg43o89plvb4f4mc4fa", {
        method: "POST",
        body: JSON.stringify(submissionData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const popover = document.getElementById("sign-up-success");
        if (popover) {
          if (popover.showPopover) {
            popover.showPopover();
          } else {
            // Fallback for browsers that don't support the popover API
            popover.style.display = "block";
          }
        }
      }

      const responseData = await response.json();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Partial<FormData>);
      }
    }
  }

  return (
    <>
      <form className="space-y-10 md:space-y-14" onSubmit={submit}>
        <Input id="email" name="email" labelText={emailLabel} error={errors.email} />
        <Input id="username" name="username" labelText={usernameLabel} error={errors.username} />
        <div className="sr-only">
          <label className="-z-10" htmlFor="url">
            URL
            <input tabIndex={-1} type="text" name="url" className="-z-10" />
          </label>
        </div>
        <div className="flex gap-2 text-md relative">
          <input type="checkbox" name="compliance" id="compliance" checked={isChecked} onChange={checkHandler} />
          <label htmlFor="compliance">
            <StructuredText
              renderLinkToRecord={({ record, children, transformedMeta }) => {
                switch (record.__typename) {
                  case "PageRecord":
                    return (
                      <a className="hover:text-link underline" {...transformedMeta} href={`/${record.slug}`}>
                        {children}
                      </a>
                    );
                  default:
                    return null;
                }
              }}
              data={termsAndConditionsLabel}
            />
          </label>
          {errors.compliance && <p className="text-error absolute -bottom-10 md:-bottom-5">{errors.compliance}</p>}
        </div>
        <button
          id="sign-up-button"
          // @ts-ignore
          popovertarget="sign-up-success"
          popovertargetaction="show"
          className="text-md flex font-semibold cursor-pointer border border-baseDark px-10 gap-3 rounded-full text-baseDark py-4 md:text-lg items-center justify-center hover:bg-baseDark hover:text-baseLight [&>span]:ease-in [&>span]:size-2 [&>span]:transition-color hover:-translate-y-2 ease-in-out duration-300 hover:shadow-2xl"
        >
          {buttonText} <UpRightArrow />
        </button>
      </form>
      {/* @ts-ignore */}
      <div popover="auto" id="sign-up-success" className="text-lg space-y-5 bg-baseLightGray text-baseDark border-baseDark border border-opacity-10 py-6 px-10 rounded-md shadow-xl backdrop:bg-baseLight backdrop:backdrop-blur-[3px] backdrop:bg-opacity-50">
        <p>{thankYouText}</p>
        <img className="max-w-10 mx-auto" src={logo} alt="SYME Logo" />
      </div>
    </>
  );
}

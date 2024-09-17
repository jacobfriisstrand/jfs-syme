import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StructuredText } from "react-datocms";
import UpRightArrow from "@/icons/UpRightArrow";
import { CloseIcon } from "@/icons/CloseIcon";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Toaster } from "./ui/toaster";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    closeSignUpDialog: () => void;
  }
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .regex(/^(?!.*\.\.)(?!.*\.$)[a-z0-9._]{1,30}$/, "Invalid username.")
    .max(30, "Username must not exceed 30 characters"),
  url: z.string().max(0, "This field must be empty"),
  compliance: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

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
  submitText: string;
}

export default function SignUpForm({ submitText, thankYouText, emailLabel, usernameLabel, termsAndConditionsLabel }: Readonly<Props>) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldUnregister: false,
    defaultValues: {
      email: "",
      username: "",
      url: "",
      compliance: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const submissionData = {
        email: values.email,
        username: values.username,
        url: values.url,
        compliance: values.compliance,
      };

      const response = await fetch("https://hook.eu2.make.com/iznbojomnyg87bg43o89plvb4f4mc4fa", {
        method: "POST",
        body: JSON.stringify(submissionData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        description: "Something went wrong. Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      toast({
        description: `${thankYouText}`,
      });
      form.reset();
    }
  }

  useEffect(() => {
    const dialog = document.querySelector("#signup-dialog") as HTMLDialogElement;

    function closeDialog() {
      dialog.close();
    }

    window.closeSignUpDialog = closeDialog;

    return () => {
      ("");
    };
  }, []);

  return (
    <div className="p-10">
      <Button onClick={() => window.closeSignUpDialog()} variant="icon" className="absolute top-4 right-4" aria-label="Close dialog">
        <CloseIcon />
      </Button>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{emailLabel}</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="off" {...field} />
                </FormControl>
                <FormDescription>Please type your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{usernameLabel}</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormDescription>Please use only lowercase letters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sr-only">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input tabIndex={-1} {...field} />
                  </FormControl>
                  <FormDescription>Type your Instagram URL.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="compliance"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 items-center">
                  <FormLabel className="order-2 text-sm">
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
                  </FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" id="sign-up-button" variant="default" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 />
            ) : (
              <>
                {submitText} <UpRightArrow />
              </>
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

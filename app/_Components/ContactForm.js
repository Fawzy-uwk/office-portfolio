"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "../context/LanguageContext";

const MinimalFloatingInput = ({
  label,
  type = "text",
  name,
  required = false,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);
  const { locale } = useLanguage();

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className="relative mt-8">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        ref={inputRef}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => {
          onChange(e);
          setHasValue(!!e.target.value);
        }}
        className={`block w-full px-0 pt-3 pb-2 border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${locale==="ar"? "text-right":"text-left"} ${
          isFocused || hasValue ? "border-sky-950" : "border-sky-900"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dir="ltr" // Explicitly set to LTR for input text
      />
      <label id={name}
        className={`absolute ${locale==="ar"? "right-0":" left-0 "} duration-300 transform top-3 origin-[100%] peer-focus:${locale==="ar"? "right-0":" left-0 "} ${
          isFocused || hasValue
            ? "text-sky-950 -translate-y-6 "
            : "text-sky-800 translate-y-1 scale-100"
        }`}
        onClick={() => inputRef.current.focus()}
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
    </div>
  );
};

const MinimalFloatingTextarea = ({
  label,
  name,
  required = false,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const textareaRef = useRef(null);
  const {locale} = useLanguage();

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className="relative mt-8">
      <label htmlFor={name} id={name} className="sr-only">
        {label}
      </label>
      <textarea
        id={name}
        ref={textareaRef}
        name={name}
        required={required}
        value={value}
        onChange={(e) => {
          onChange(e);
          setHasValue(!!e.target.value);
        }}
        rows={5}
        className={`block w-full px-0 pt-3 pb-2 border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${locale==="ar"? "text-right":"text-left"} ${
          isFocused || hasValue ? "border-sky-950" : "border-sky-900"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dir="ltr" // Explicitly set to LTR for textarea text
      />
      <label id={name}
        className={`absolute ${locale==="ar"? "right-0":" left-0 "} duration-300 transform top-3 origin-[100%] peer-focus:${locale==="ar"? "right-0":" left-0 "} ${
          isFocused || hasValue
            ? "text-sky-950 -translate-y-6 "
            : "text-sky-900 translate-y-1 scale-100"
        }`}
        onClick={() => textareaRef.current.focus()}
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
    </div>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const { locale } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = {
      ...formData,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (result.status === "success") {
        toast.success(
          locale === "ar" ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!"
        );
        setFormData({ fullName: "", email: "", phone: "", notes: "" });
      } else {
        toast.error(
          locale === "ar"
            ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
            : "An error occurred during submission. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(
        locale === "ar"
          ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
          : "An error occurred during submission. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <MinimalFloatingInput
        label={locale === "ar" ? "الاسم الكامل" : "Full Name"}
        name="fullName"
        required
        value={formData.fullName}
        onChange={handleChange}
      />
      <MinimalFloatingInput
        label={locale === "ar" ? "البريد الإلكتروني" : "Email"}
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <MinimalFloatingInput
        label={locale === "ar" ? "رقم الهاتف" : "Phone Number"}
        name="phone"
        type="tel"
        required
        value={formData.phone}
        onChange={handleChange}
      />
      <MinimalFloatingTextarea
        label={locale === "ar" ? "الرسالة" : "Message"}
        name="notes"
        required
        value={formData.notes}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        aria-label={locale === "ar" ? "إرسال النموذج" : "Submit Form"}
        className={`btn btn-border-reveal w-full p-2 rounded-md text-sky-950 z-10 ${
          isSubmitting ? "bg-sky-900 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isSubmitting
          ? locale === "ar"
            ? "جاري الإرسال..."
            : "Submitting..."
          : locale === "ar"
          ? "إرسال"
          : "Send"}
      </button>
    </form>
  );
};

export default ContactForm;
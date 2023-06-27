'use client'

import { z } from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import IconButton from "@/assets/images/icon-arrow.svg";
import Image from "next/image";
import { useState } from "react";

type FormValues = {
  day: number;
  month: number;
  year: number;
} & FieldValues;

const schema = z.object({
  day: z
    .number()
    .min(1, "Must be a valid day")
    .max(31, "Must be a valid day")
    .refine((value) => !isNaN(value), "This field is required")
    .nullable(),
  month: z
    .number()
    .min(1, "Must be a valid month")
    .max(12, "Must be a valid month")
    .refine((value) => !isNaN(value), "This field is required")
    .nullable(),
  year: z
    .number()
    .min(1900, "Must be a year after 1900")
    .max(new Date().getFullYear(), "Must be in the past")
    .refine((value) => !isNaN(value), "This field is required")
    .nullable(),

}).refine((date) => {
  const { day, month, year } = date;
  if (!day && !month && !year) return true;
  const selectedDate = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date();
  return selectedDate <= currentDate;
}, {
  message: "Must be a valid date in the past",
}).refine((date) => {
  const { day, month, year } = date;
  if (!day && !month && !year) return true;

  if (day !== null && month !== null && year !== null) {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return day <= lastDayOfMonth;
  }

}, {
  message: "Must be a valid day of the month"
});


export default function Home() {
  const [elapsed, setElapsed] = useState<{
    days: number;
    months: number;
    years: number;
  }>({
    days: 0,
    months: 0,
    years: 0
  })

  const submitDate = (date: FieldValues) => {

    const { day, month, year } = date;

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    const timeDiff = Math.abs(currentDate.getTime() - inputDate.getTime());

    const elapsedYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const remainingTime = timeDiff - elapsedYears * (1000 * 60 * 60 * 24 * 365);

    const elapsedMonths = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 30));
    const remainingTimeMonths = remainingTime - elapsedMonths * (1000 * 60 * 60 * 24 * 30);

    const elapsedDays = Math.floor(remainingTimeMonths / (1000 * 60 * 60 * 24));

    setElapsed({
      days: elapsedDays,
      months: elapsedMonths,
      years: elapsedYears
    })
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <main className="h-screen w-full bg-off-white text-black flex justify-center items-center">
      <div className="bg-white rounded-xl rounded-br-4xl p-12 flex flex-col gap-4 justify-center items-start w-full max-w-lg mx-4 sm:w-auto sm:mx-auto">
        <form onSubmit={handleSubmit(submitDate)} className="w-full">
          <div className="flex text-smokey-grey font-bold gap-4 text-xl md:mr-14">
            <div className="flex flex-col gap-2 md:w-[100px] w-1/3">
              <label htmlFor="day" className="text-xs tracking-widest">
                DAY
              </label>
              <input
                id="day"
                {...register("day", { valueAsNumber: true })}
                type="number"
                placeholder="DD"
                className="border border-light-grey rounded p-2 w-full 
                focus:outline-none focus:border-purple 
                invalid:border-red-500 invalid:text-red-600
                focus:invalid:border-red-500 focus:invalid:ring-red-500"
              />
              {errors.day && (
                <span className="text-red-500 font-normal text-2xs italic">
                  {typeof errors.day === 'string' ? errors.day : null}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 md:w-[100px] w-1/3">
              <label htmlFor="month" className="text-xs tracking-widest">
                MONTH
              </label>
              <input
                id="month"
                {...register("month", { valueAsNumber: true })}
                type="number"
                placeholder="MM"
                className="border border-light-grey rounded p-2 
                focus:outline-none focus:border-purple 
                invalid:border-red-500 invalid:text-red-600
                focus:invalid:border-red-500 focus:invalid:ring-red-500"
              />

              {errors.month && (
                <span className="text-red-500 font-normal text-2xs italic">
                  {typeof errors.month === 'string' ? errors.month : null}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 md:w-[100px] w-1/3">
              <label htmlFor="year" className="text-xs tracking-widest">
                YEAR
              </label>
              <input
                id="year"
                {...register("year", { valueAsNumber: true })}
                type="number"
                placeholder="YYYY"
                className="border border-light-grey rounded p-2 
                focus:outline-none focus:border-purple 
                invalid:border-red-500 invalid:text-red-600
                focus:invalid:border-red-500 focus:invalid:ring-red-500"
              />
              {errors.year && (
                <span className="text-red-500 font-normal text-2xs italic">
                  {typeof errors.year === 'string' ? errors.year : null}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full md:mt-0 mt-2">
            <hr className="my-6 w-full border-b-light-grey"></hr>
            <button className="w-14 p-3 aspect-square bg-purple rounded-full hover:bg-off-black transition-all">
              <Image src={IconButton} className="" alt="icon-arrow" />
            </button>
          </div>
        </form>

        <div className="flex flex-col font-bold italic text-5xl md:text-6xl">
          <h1>
            <span className="text-purple">{elapsed.years ? elapsed.years : "--"}</span> years
          </h1>
          <h1>
            <span className="text-purple">{elapsed.months ? elapsed.months : "--"}</span> months
          </h1>
          <h1>
            <span className="text-purple">{elapsed.days ? elapsed.days : "--"}</span> days
          </h1>
        </div>
      </div>
    </main>
  );

}

'use client'
import { CustomLink, PaginationType } from "@/data/types";
import React, { FC, useState } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";
import {  useSearchParams } from "next/navigation";



export interface PaginationProps {
  count?: number;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ count = 10, className = "" }) => {

  const searchParams = useSearchParams()
 
  const p = searchParams.get('p') ?? '1'

  let pages = count / 6 + 1;
  pages < 10 ? pages : pages = 10

  let DEMO_PAGINATION: CustomLink[] = []
  for (let index = 1; index <= pages; index++) {
    const pag_item: CustomLink = { label: `${index}`, href: `/?p=${index}&sort_by=${searchParams.get('sort_by') ?? 'release_data'}&search=${searchParams.get('search') ?? 'none'}#latest-posts` }
    DEMO_PAGINATION.push(pag_item)
  };



  const renderItem = (pag: CustomLink, index: number) => {
    
      return (
        <Link href={pag.href}>
        <span
          key={index}
          className={`${pag.label === p ? "inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white" : "inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"}`}
        >
          {pag.label}
        </span>
        </Link>
      );

  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {DEMO_PAGINATION.map(renderItem)}
    </nav>
  );
};

export default Pagination;

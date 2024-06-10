import React from "react";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-5 sm:py-7 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap  text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadCrumbs?.map((breadCrumb, index) => (
            <li key={index} className="inline-flex items-center">
              <Link
                href={breadCrumb.url}
                className="text-gray-600 hover:text-blue-600">
                {breadCrumb.name}
                {console.log("bread", breadCrumbs.length)}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <i className="ml-3 text-gray-400 font-bold text-lg">
                  <Icon icon="oui:arrow-right" />
                </i>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;

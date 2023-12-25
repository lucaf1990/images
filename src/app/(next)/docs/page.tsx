import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowBigDownDash, ArrowDownWideNarrow } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center">
        <p>
          Parleremo dei principali concetti di Next js, ma per maggiori info
          visita
        </p>
        <ArrowBigDownDash size={40} className="mt-4 animate-pulse" />
        <Link
          className="hover:text-red-700 mt-4"
          href="https://nextjs.org/docs"
        >
          NEXT JS DOCS
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};
export default page;

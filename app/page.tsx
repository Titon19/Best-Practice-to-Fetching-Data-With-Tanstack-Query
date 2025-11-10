import { Button } from "@/components/ui/button";
import { Notebook } from "lucide-react";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button className="rounded-full">
        <Link
          href={"/todos"}
          className="flex gap-2 items-center justify-between"
        >
          Go to Todos <Notebook />
        </Link>
      </Button>
    </div>
  );
};

export default Home;

import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { useSession } from "next-auth/react";

function Navigation() {
  const {data: session} = useSession()
  return (
    <ul className="nc-Navigation flex items-center">
      {NAVIGATION_DEMO_2.map((item) => (
        <>
        {item.href === '/dashboard/users' && session?.user?.role !== 'admin'?
        <></>
        :
        <NavigationItem key={item.id} menuItem={item} />
        }
        </>
      ))}
    </ul>
  );
}

export default Navigation;
